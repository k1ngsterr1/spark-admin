"use client";
import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../../lib/hooks/useInterceptor";

export const useGetWebsitePages = (websiteName: string) => {
  const [pageContent, setPageContent] = useState(null);

  const getWebsitePages = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/page/get-pages/${websiteName}`
      );
      const pages = response.data.pages;
      setPageContent(pages[0]);
      console.log("Data fetched:", response.data.pages);
    } catch (error) {
      console.error("Failed to fetch websites:", error);
    }
  }, [websiteName]);

  useEffect(() => {
    getWebsitePages();
  }, [getWebsitePages]);

  return { pageContent };
};
