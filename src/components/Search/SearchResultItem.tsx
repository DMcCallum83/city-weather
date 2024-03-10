import { SearchResult } from "./_shared";
import styles from "./SearchResultItem.module.scss";

interface SearchResultProps {
  onSelect: (id: number, name: string) => void;
  city: SearchResult;
}

export function SearchResultItem({ city, onSelect }: SearchResultProps) {
  return (
    <div className={styles.card} onClick={() => onSelect(city.id, city.name)}>
      <div className={styles.left}>
        <span>{city.name},</span>
        <span>{city.region}</span>
      </div>
      <div className={styles.country}>
        <span>{city.country}</span>
      </div>
    </div>
  );
}
