"use client";
import { useState, useEffect } from "react";
import { axiosInstance } from "./useInterceptor";

export function useGetForms() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/website/ferla-bikes/89d6700c-288d-46c6-b463-60aae8b1b830/get-forms/https%3A%2F%2Fferla-backend-production.up.railway.app%2Fapi%2Fforms%2Fget-forms"
        );
        setData(response.data.forms.forms);
        setIsLoading(false);
      } catch (error: unknown | any) {
        setError(
          "Failed to fetch data: " +
            (error.response?.data.message || error.message)
        );
        setIsLoading(false);
      }
    };

    fetchData();
  });

  return { data, isLoading, error };
}
