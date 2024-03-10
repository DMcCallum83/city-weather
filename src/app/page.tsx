"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Search } from "@/components/Search/Search";
import { Result } from "@/components/Result/Result";

export default function Home() {
  const [cityId, setCityId] = useState<number | null>(null);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Use the search box below to find cities around the world, and display
          the current weather.
        </p>
      </div>
      <Search onSelect={(id) => setCityId(id)} />
      {!!cityId && <Result cityId={cityId} />}
    </main>
  );
}
