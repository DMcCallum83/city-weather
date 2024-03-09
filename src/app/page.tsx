import styles from "./page.module.scss";
import { SearchBar } from "@/components/SearchBar/SearchBar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Use the search box below to find cities around the world, and display
          the current wather.
        </p>
      </div>
      <SearchBar />
    </main>
  );
}
