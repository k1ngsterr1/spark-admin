"use client";

import { axiosInstance } from "../hooks/useInterceptor";
import { useState } from "react";

export function useAddBlogCard() {
  const [blogData, setBlogData] = useState<any>();

  const addBlog = async (data: any) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      const response = await axiosInstance.post(
        "https://ferla-backend-production.up.railway.app/api/blog/add",
        data
      );
      console.log("here is my data:", data, response.data);
      setBlogData(response.data);
    } catch (error) {
      console.error("There was an error with adding product");
    }
  };

  return { addBlog, blogData };
}
