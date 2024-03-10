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
          region: data.location.region,
          country: data.location.country,
          localtime: data.location.localtime,
          tempC: data.current["temp_c"],
          feelsLikeC: data.current["feelslike_c"],
          tempF: data.current["temp_f"],
          feelsLikeF: data.current["feelslike_f"],
          windMph: data.current["wind_mph"],
          windKph: data.current["wind_kph"],
          windDirection: data.current["wind_dir"],
          condition: data.current.condition.text,
          conditionIcon: data.current.condition.icon,
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

  return cityResult ? (
    <section className={styles.result}>
      {!!cityResult.name && cityResult.name !== "null" && (
        <div>
          <span>{cityResult.name}</span>
        </div>
      )}
      {!!cityResult.region && (
        <div>
          <span>{cityResult.region}</span>
        </div>
      )}
      <div>
        <span>{cityResult.country}</span>
      </div>
      <div>
        <span>{convertToAMPM(cityResult.localtime)}</span>
      </div>
      <div>
        <span>
          {cityResult.tempC}&deg;C (Feels like {cityResult.feelsLikeC}&deg;C)
        </span>
      </div>
      <div>
        <span>
          {cityResult.tempF}&deg;F (Feels like {cityResult.feelsLikeF}&deg;F)
        </span>
      </div>
      <div>
        <span>
          {cityResult.windMph}mph ({cityResult.windKph}kph)
        </span>
      </div>
      <div>
        <span>{cityResult.windDirection}</span>
      </div>
      <div>
        <span>{cityResult.condition} </span>
        <Image
          src={`https:${cityResult.conditionIcon}`}
          alt={`${cityResult.condition} Icon`}
          width={50}
          height={50}
        />
      </div>
    </section>
  ) : (
    <LoadingSpinner />
  );
}
