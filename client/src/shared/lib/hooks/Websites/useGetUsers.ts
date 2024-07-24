"use client";
import { useState, useEffect } from "react";
import { axiosInstance } from "../Misc/useInterceptor";

// функция для получения списка вебсайтов
export function useGetUsers() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUsers, setHasUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/website/users");
        setData(response.data);
        setHasUsers(response.data.length > 0);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { isLoading, data, hasUsers };
}
