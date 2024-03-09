import { SearchResult } from "./SearchBar/_shared";

export function SearchResultItem({ id, name, region, country }: SearchResult) {
  return (
    <div>
      <span>{name}</span>
      {", "}
      <span>{country}</span>
    </div>
  );
}
