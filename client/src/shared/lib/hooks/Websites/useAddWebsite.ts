"use client";
import axios from "axios";
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
      const response = await axios.post(
        "https://spark-admin-production.up.railway.app/api/website/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken} `,
          },
        }
      );
      console.log("Data created:", response.data);
    } catch (error: any) {
      console.error("Failed to create data:", error);
    }
  };

  return { addWebsite, name, setName, url, setUrl };
}
