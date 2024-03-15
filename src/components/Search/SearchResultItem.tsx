import { SearchResultModel } from "@/schemas/searchSchema";
import styles from "./SearchResultItem.module.scss";

interface SearchResultProps {
  onSelect: (id: number, name: string) => void;
  city: SearchResultModel;
}

export function SearchResultItem({ city, onSelect }: SearchResultProps) {
  return (
    <button
      className={styles.card}
      onClick={() => onSelect(city.id, city.name)}
      tabIndex={0}
    >
      <div className={styles.left}>
        <span>{city.name},</span>
        <span>{city.region}</span>
      </div>
      <div className={styles.country}>
        <span>{city.country}</span>
      </div>
    </button>
  );
}
