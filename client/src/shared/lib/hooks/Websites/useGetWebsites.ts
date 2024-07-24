"use client";
import { useState, useEffect } from "react";
import { axiosInstance } from "../Misc/useInterceptor";

// функция для получения списка вебсайтов
export function useGetWebsites() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasWebsites, setHasWebsites] = useState(false);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/website");
        console.log("websites:", response);
        setData(response.data);
        setHasWebsites(response.data.length > 0);
      } catch (error) {
        console.error("Failed to fetch websites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWebsites();
  }, []);

  return { isLoading, data, hasWebsites };
}
