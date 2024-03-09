"use client";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { SearchResult } from "./_shared";
import { SearchResult, SearchResultItem } from "../SearchResult";

export function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    const searchData = async () => {
      try {
        const searchResponse = await fetch(
          `/api/search?query=${encodeURIComponent(searchValue)}`
        );
        const data = await searchResponse.json();
        if (!!data.error) {
          console.log("Error");
          setFetchError(true);
        }

        const results = data.map((city: any) => {
          return {
            id: city.id,
            name: city.name,
            region: city.region,
            country: city.country,
          } as SearchResult;
        });
        setSearchResults(results);
        console.log(data);
      } catch {
        // handled by state
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchValue.trim() !== "") {
        searchData();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    setSearchResults(null);
    if (fetchError) {
      setFetchError(false);
    }
  };

  return (
    <>
      <input
        className={styles.search}
        placeholder="Enter a city name to see results..."
        value={searchValue}
        onChange={(event) => handleInputChange(event)}
      />
      {fetchError && (
        <p className={styles.error}>There was a problem with that request.</p>
      )}
      {!!searchResults?.length &&
        searchResults.map((city) => (
          <SearchResultItem
            key={city.id}
            id={city.id}
            name={city.name}
            region={city.region}
            country={city.country}
          />
        ))}
    </>
  );
}
