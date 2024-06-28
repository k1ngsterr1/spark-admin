import { useState, useEffect } from "react";
import { axiosInstance } from "./useInterceptor";

// Function to fetch blocks
export function useFetchBlocks(type) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/block/get-blocks/${type}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch blocks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchBlocks();
    }
  }, [type]);

  return { data, loading };
}
