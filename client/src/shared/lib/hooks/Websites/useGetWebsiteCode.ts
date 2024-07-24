"use client";
import { axiosInstance } from "../Misc/useInterceptor";
import { FormEvent, useState } from "react";
import { useUserData } from "../Form/useGetData";

export interface ICheckWebsiteData {
  url: string;
}

// Хук для получения кода верификации веб-сайта
export function useGetWebsiteCode() {
  const [url, setUrl] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const userData = useUserData();

  const getWebsiteCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data: ICheckWebsiteData = { url };
      const response = await axiosInstance.post("/api/website/get-code", {});
      setCode(response.data.code);
      console.log("Data created:", response.data);
    } catch (error: any | unknown) {
      console.error("Failed to create data:", error);
    }
  };

  return { getWebsiteCode, url, setUrl, code };
}
