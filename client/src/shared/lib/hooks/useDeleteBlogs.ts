import axios from "axios";
import { useState } from "react";

export function useDeleteBlogCard() {
  const [blogData, setBlogData] = useState();

  const deleteBlog = async ({ blogId, code}) => {
    try {
      const formData = new FormData();
      formData.append('blogId', blogId);
      formData.append("SPARK-STUDIO-85209af2e07011fafd442671ef8ae84b647be17c7f517ea5942075dda6fbeeb7", code);

      const response = await axios.delete(
        `https://ferla-backend-production.up.railway.app/api/blog/delete/${blogId}/${code}`, 
        {
          data: formData  
        }
      );
      console.log("Deleted blog data:", response.data);
      setBlogData(response.data);
    } catch (error) {
      console.error("There was an error deleting the blog:", error);
    }
  };

  return { deleteBlog, blogData };
}
