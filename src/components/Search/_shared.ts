export interface SearchResult {
    id: number;
    name: string;
    region: string;
    country: string;
  }

  export interface CityResult {
    name: string;
    country: string;
    localtime: string;
    tempC: string;
    feelsLikeC: string;
    tempF: string;
    feelsLikeF: string;
    windMph: string;
    windKph: string;
    windDirection: string;
    windDegrees: string;
    condition: string;
    conditionIcon: string;
  }