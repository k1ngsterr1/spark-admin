"use client";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useUserData } from "../Form/useGetData";

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
      const response = await axios.post(
        "https://spark-admin-production.up.railway.app/api/website/check-website",
        data,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken} `,
          },
        }
      );
      console.log("Data created:", response.data);
    } catch (error: any | unknown) {
      console.error("Failed to create data:", error);
    }
  };

  return { checkWebsite, url, setUrl };
}
