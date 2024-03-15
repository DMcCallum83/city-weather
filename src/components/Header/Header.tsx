import Image from "next/image";
import styles from "./Header.module.scss";

export function Header() {
  return (
      <header className={styles.header}>
        <h3>City Weather</h3>
        <Image priority src={'/sun.svg'} width="50" height="50" alt="City Weather Logo" />
      </header>
  );
}
