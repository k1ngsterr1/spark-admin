import { useState, useEffect } from "react";
import { axiosInstance } from "./useInterceptor";

// Function to fetch blocks
export function useGetBlogs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axiosInstance.get(
          `https://ferla-backend-production.up.railway.app/api/blog/get-blogs`
        );
        setData(response.data.cards);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch blocks:", error);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);
  return { data, loading };
}
