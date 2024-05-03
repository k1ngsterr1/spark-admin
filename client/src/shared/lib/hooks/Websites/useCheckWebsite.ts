"use client";
import { FormEvent, useState } from "react";
import { useUserData } from "../Form/useGetData";

import { axiosInstance } from "./../useInterceptor";

interface ICheckWebsiteData {
  url: string;
}

export function useCheckWebsite() {
  const [url, setUrl] = useState("");
  const userData = useUserData();

  const checkWebsite = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data: ICheckWebsiteData = { url };
      const response = await axiosInstance.post(
        "/api/website/check-website",
        data
      );
      console.log("Data created:", response.data);
    } catch (error: any | unknown) {
      console.error("Failed to create data:", error);
    }
  };

  return { checkWebsite, url, setUrl };
}
