"use client";
import { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { SearchResult } from "./_shared";
import { SearchResultItem } from "./SearchResultItem";
import { LoadingSpinner } from "../LoadingSpinner";

interface SearchProps {
  onSelect: (id: number | null) => void;
}

export function Search({ onSelect }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    const searchData = async () => {
      try {
        const searchResponse = await fetch(
          `/api/search?query=${encodeURIComponent(searchValue)}`
        );
        const data = await searchResponse.json();
        if (!!data.error) {
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
        setIsFetching(false);
        setSearchResults(results);
      } catch {
        // handled by state
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchValue.trim() !== "") {
        setIsFetching(true);
        searchData();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    setSearchResults(null);
    onSelect(null);
    if (fetchError) {
      setFetchError(false);
    }
  };

  const handleOnSelect = (id: number) => {
    setSearchResults(null);
    onSelect(id);
  };

  return (
    <section className={styles.search}>
      <input
        className={styles.input}
        placeholder="Enter a city name to see results..."
        value={searchValue}
        onChange={(event) => handleInputChange(event)}
      />
      {fetchError && (
        <p className={styles.error}>There was a problem with that request.</p>
      )}
      {!!searchResults ? (
        <>
          <span className={styles.count}>
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "result" : "results"}
          </span>
          {searchResults.map((city) => (
            <SearchResultItem
              key={city.id}
              city={city}
              onSelect={(id) => handleOnSelect(id)}
            />
          ))}
        </>
      ) : isFetching ? (
        <LoadingSpinner />
      ) : null}
    </section>
  );
}
