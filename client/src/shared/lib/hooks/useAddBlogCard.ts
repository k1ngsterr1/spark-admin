"use client";

import { axiosInstance } from "../hooks/useInterceptor";
import { StaticImageData } from "next/image";

interface IData {
  image: File | null;
  title: string;
  href: string;
  code: string;
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

// "code": "SPARK-STUDIO-85209af2e07011fafd442671ef8ae84b647be17c7f517ea5942075dda6fbeeb7"
