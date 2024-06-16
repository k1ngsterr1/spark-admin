import "./useInterceptor";
import { axiosInstance } from "./useInterceptor";
import { useState } from "react";

export function useUpdateBlog(blogId: number) {
  const [blogData, setBlogData] = useState<any>();

  const updateBlog = async (data: any) => {
    try {
      const formData = new FormData();
      const response = await axiosInstance.patch(
        `https://ferla-backend-production.up.railway.app/api/blog/update/${blogId}`,
        data
      );
      console.log("here is my data:", data, response.data);
      setBlogData(response.data);
    } catch (error) {
      console.error("There was an error with updating showman");
    }
  };

  return { updateBlog, blogData };
}
// eslint-disable-next-line react-hooks/exhaustive-deps
