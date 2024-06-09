"use client";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../../lib/hooks/useInterceptor";

export const useFetchHTMLContent = (url: string, pageID: string | number) => {
  const [content, setContent] = useState(null);

  const fetchWebsitePage = useCallback(async () => {
    try {
      console.log("fetch website page");

      const response = await axiosInstance.get(
        `/api/page/fetch-content/${url}/${pageID}`
      );

      console.log(`/api/page/fetch-content/${url}/${pageID}`);
      console.log(response.data);
      setContent(response.data.html);
    } catch (error: any | unknown) {
      console.error("Failed to fetch content:", error);
    }
  }, [url, pageID]);

  useEffect(() => {
    fetchWebsitePage();
  }, [fetchWebsitePage]);

  return { content };
};
