import { useState, useEffect } from "react";
import { axiosInstance } from "./useInterceptor";

export function useCheckIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkIsAdmin = async () => {
      try {
        const response = await axiosInstance.post("/api/user/spark-check");
        console.log("is spark admin checked: ", response);
        setIsAdmin(response.data.value);
      } catch (error: any) {
        console.error("Failed to check is admin:", error);
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      }
    };

    checkIsAdmin();
  }, []);

  return { isAdmin, error };
}
