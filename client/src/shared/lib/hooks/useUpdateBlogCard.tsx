import "./useInterceptor";
import axios from "axios";
import { useState } from "react";

export function useUpdateBlog(blogId: number) {
  const [blogData, setBlogData] = useState<any>();

  const updateBlog = async (data: any) => {
    try {
      const formData = new FormData();
      const response = await axios.post(
        `https://ferla-backend-production.up.railway.app/api/blog/update/${blogId}`,
        data
      );
      console.log("here is my data:", data, response.data);
      setBlogData(response.data);
    } catch (error) {
      console.error("There was an error with update blog card");
    }
  };

  return { updateBlog, blogData };
}
