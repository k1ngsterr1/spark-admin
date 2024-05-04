"use client";
import { FormEvent, useState } from "react";
import { axiosInstance } from "./../useInterceptor";
import { ICheckWebsiteData } from "./useGetWebsiteCode";

export function useCheckWebsiteVerification() {
  const [message, setMessage] = useState<string>();

  const checkVerificationWebsite = async (
    event: FormEvent<HTMLFormElement>,
    url: string
  ) => {
    const data: ICheckWebsiteData = { url };

    event.preventDefault();
    try {
      console.log(url);

      const response = await axiosInstance.post(
        "/api/website/check-verification",
        data
      );

      setMessage(response.data.message);
      console.log("Data created:", response.data);
    } catch (error: any | unknown) {
      console.error("Failed to create data:", error);
    }
  };

  return { checkVerificationWebsite, message };
}
