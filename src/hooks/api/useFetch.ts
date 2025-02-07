import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com"; // Replace with your API URL

export function useFetch<T>(key: string, endpoint: string) {
  return useQuery<T>({
    queryKey: [key], // Unique cache key
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/${endpoint}`);
      return data;
    },
  });
}
