import { useEffect, useState } from "react";
import { CityResult } from "../Search/_shared";
import styles from "./Result.module.scss";
import Image from "next/image";
import { convertToAMPM } from "./_helpers";
import { LoadingSpinner } from "../LoadingSpinner";

interface ResultProps {
  cityId: number;
}

export function Result({ cityId }: ResultProps) {
  const [cityResult, setCityResult] = useState<CityResult | null>(null);
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    const cityData = async () => {
      try {
        const currentResponse = await fetch(
          `/api/current?query=${encodeURIComponent(cityId)}`
        );
        const data = await currentResponse.json();
        if (!!data.error) {
          setFetchError(true);
        }

        const result = {
          name: data.location.name,
          country: data.location.country,
          localtime: data.location.localtime,
          tempC: data.current["temp_c"],
          feelsLikeC: data.current["feelslike_c"],
          tempF: data.current["temp_f"],
          feelsLikeF: data.current["feelslike_f"],
          windMph: data.current["wind_mph"],
          windKph: data.current["wind_kph"],
          windDirection: data.current["wind_dir"],
          windDegrees: data.current["wind_degree"],
          condition: data.current.condition.text,
          conditionIcon: data.current.condition.icon,
          humidity: data.current.humidity,
        } as CityResult;

        setCityResult(result);
        console.log(result);
      } catch {
        //handled by state
      }
    };

    if (!!cityId && !cityResult) {
      cityData();
    }
  });

  return fetchError ? (
    <p className={styles.error}>There was a problem with that request.</p>
  ) : cityResult ? (
    <section className={styles.result}>
      <div className={styles.layout}>
        {!!cityResult.name && cityResult.name !== "null" && (
          <div className={styles.location}>
            <span className={styles.textLarge}>{cityResult.name}</span>
            <span className={styles.textSmall}>{cityResult.country}</span>
            <span>{convertToAMPM(cityResult.localtime)} (local)</span>
          </div>
        )}
        <div className={styles.condition}>
          <div className={styles.conditionLayout}>
            <span>{cityResult.condition} </span>
            <Image
              priority
              src={`https:${cityResult.conditionIcon}`}
              alt={`${cityResult.condition} Icon`}
              width={75}
              height={75}
            />
          </div>
        </div>
        <div className={styles.temp}>
          <h2 className={styles.heading}>Temperature</h2>
          <div className={styles.tempLayout}>
            <span className={styles.textLarge}>
              {cityResult.tempC}&deg;C ({cityResult.tempF}&deg;F)
            </span>
            <span className={styles.textSmall}>
              (feels like {cityResult.feelsLikeC}&deg;C /{" "}
              {cityResult.feelsLikeF}
              &deg;F)
            </span>
          </div>
        </div>
        <div className={styles.wind}>
          <h2 className={styles.heading}>Wind</h2>
          <div className={styles.windLayout}>
            <span className={styles.textLarge}>
              {cityResult.windMph}mph ({cityResult.windKph}kph)
            </span>
            <span className={styles.textSmall}>
              {cityResult.windDirection} ({cityResult.windDegrees}&deg;)
            </span>
          </div>
        </div>
      </div>
      <div className={styles.humidity}>
        <h2 className={styles.heading}>Humidity</h2>
        <div className={styles.humidityLayout}>
          <span className={styles.textLarge}>{cityResult.humidity}%</span>
        </div>
      </div>
    </section>
  ) : (
    <LoadingSpinner />
  );
}
