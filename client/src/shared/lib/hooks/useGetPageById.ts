"use client";
import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "./useInterceptor";

export const useGetWebsitePageByID = (websiteName: string, pageID: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageContent, setPageContent] = useState(null);

  const getWebsiteByPageID = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/page/get-page/${websiteName}/${pageID}`
      );
      setPageContent(response.data.page);
      console.log("Data fetched", response.data);
    } catch (error: any | unknown) {
      console.error("Failed to fetch website page by its ID:", error);
    } finally {
      setIsLoading(false);
    }
  }, [websiteName, pageID]);

  useEffect(() => {
    getWebsiteByPageID();
  }, [getWebsiteByPageID]);

  return { pageContent, isLoading };
};
