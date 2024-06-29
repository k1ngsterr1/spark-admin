"use client";
import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../Misc/useInterceptor";

export const useGetWebsitePages = (websiteName: string) => {
  const [pageContent, setPageContent] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWebsitePages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/page/get-pages/${websiteName}`
      );
      const pages = response.data.pages;
      setPageContent(pages[0]);
      console.log("Data fetched:", response.data.pages);
    } catch (error) {
      console.error("Failed to fetch websites:", error);
    } finally {
      setIsLoading(false);
    }
  }, [websiteName]);

  useEffect(() => {
    getWebsitePages();
  }, [getWebsitePages]);

  return { pageContent, isLoading };
};
