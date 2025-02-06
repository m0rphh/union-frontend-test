import axios from "axios";
import { Country } from "../types/country";

// Fetch countries from API
export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(
    "https://restcountries.com/v3.1/region/europe"
  );
  return response.data;
};
