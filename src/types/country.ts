export type Country = {
  name: {
    common: string; // The common name of the country
    official: string; // The official name
  };
  cca2: string; // 2-letter country code
  cca3: string; // 3-letter country code
  flag: string; // Unicode flag emoji
  flags: {
    png: string; // URL to the flag image (PNG)
    svg: string; // URL to the flag image (SVG)
    alt?: string; // Alternative text for accessibility
  };
  region: string; // Continent or region
  subregion?: string; // Subregion (optional)
  population: number; // Population count
  languages?: Record<string, string>; // Key-value pairs of languages spoken
  currencies?: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >; // Currencies with name and symbol
};
