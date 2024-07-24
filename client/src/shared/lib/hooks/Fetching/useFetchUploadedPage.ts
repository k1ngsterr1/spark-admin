"use client";
import { useState, useEffect } from "react";
import { axiosInstance } from "../Misc/useInterceptor";

// Получаем изменяемый контент из залитых сайтов
export function useFetchUploadedPage(slug: any) {
  const [htmlContent, setHtmlContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/${slug}/`);
        setHtmlContent(response.data);
        setIsLoading(false);
      } catch (error: unknown | any) {
        setError(
          "Failed to fetch data:" +
            (error.response?.data.message || error.message)
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { htmlContent, isLoading, error };
}
