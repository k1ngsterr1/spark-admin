"use client";
import { FormEvent, useState } from "react";
import { axiosInstance } from "./../useInterceptor";

export function useCheckWebsiteVerification() {
  const [message, setMessage] = useState<string>();

  const checkVerificationWebsite = async (
    event: FormEvent<HTMLFormElement>,
    url: string
  ) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/api/website/check-website",
        url
      );

      setMessage(response.data.message);
      console.log("Data created:", response.data);
    } catch (error: any | unknown) {
      console.error("Failed to create data:", error);
    }
  };

  return { checkVerificationWebsite, message };
}
