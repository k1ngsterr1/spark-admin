"use client";
import { axiosInstance } from "../Misc/useInterceptor";
import { FormEvent, useState } from "react";
import { useUserData } from "../Form/useGetData";

interface IAddWebsiteData {
  name: string;
  url: string;
}

export function useAddWebsite() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const userData = useUserData();

  const addWebsite = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data: IAddWebsiteData = { name, url };
      const response = await axiosInstance.post("/api/website/add", {});
      console.log("Data created:", response.data);
    } catch (error: any) {
      console.error("Failed to create data:", error);
    }
  };

  return { addWebsite, name, setName, url, setUrl };
}
