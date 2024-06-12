"use client";

import { axiosInstance } from "../hooks/useInterceptor";
import { StaticImageData } from "next/image";

interface IData {
  image: File | null;
  title: string;
  href: string;
}

export async function useAddBlogCard(data: IData): Promise<void> {
  try {
    const response = await axiosInstance.post(
      "https://ferla-backend-production.up.railway.app/api/blog/add",
      data
    );
    console.log("Data created:", response.data);
    // window.location.reload();
  } catch (error: unknown | any) {
    console.error("Failed to create data:", error);
    if (error.response) {
      return error.response.data.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
