import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export function usePost<T>(endpoint: string) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, Partial<T>>({
    mutationFn: async (data) => {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); // Refetch updated data
    },
  });
}
