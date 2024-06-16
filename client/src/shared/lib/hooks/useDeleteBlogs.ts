import "./useInterceptor";
import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps

export function useDeleteBlog(blogId: number) {
  const [blogData, setBlogData] = useState<any>();

  const deleteBlog = async (data: any) => {
    try {
      const formData = new FormData();
      const response = await axios.delete(
        `https://ferla-backend-production.up.railway.app/api/blog/delete/${blogId}`,
        data
      );
      console.log("here is my data:", data, response.data);
      setBlogData(response.data);
    } catch (error) {
      console.error("There was an error with update blog card");
    }
  };

  return { deleteBlog, blogData };
}
// eslint-disable-next-line react-hooks/exhaustive-deps
