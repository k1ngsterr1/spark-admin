"use client";
import { useState, useEffect } from "react";
import { axiosInstance } from "./useInterceptor";

export async function useCheckIsAdmin(): Promise<any> {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const checkIsAdmin = async () => {
    try {
      const response = await axiosInstance.post("/api/user/spark-check");

      console.log(response.data);

      setIsAdmin(response.data.value);
    } catch (error: unknown | any) {
      console.error("Failed to check is admin:", error);
      if (error.response) {
        return error.response.data.message;
      }
    }
  };

  useEffect(() => {
    checkIsAdmin();
  }, [checkIsAdmin]);

  return { isAdmin };
}
