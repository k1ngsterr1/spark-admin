"use client";
import { useSocket } from "@shared/lib/contexts/SocketContext";
import { useUserData } from "../Form/useGetData";
import { axiosInstance } from "./useInterceptor";
import { useState } from "react";

export function useChangeLanguage() {
  const socket = useSocket();
  const [isSocketSent, setSocketSent] = useState<boolean>(false);
  const { userData } = useUserData();

  if (!userData) {
    return;
  }

  const userId = userData?.id;

  const changeLanguage = async (newLanguage: string | "RU" | "EN") => {
    try {
      // const response = await axiosInstance.post("/api/user/change-language", {
      //   language: newLanguage,
      // });

      console.log(newLanguage);

      socket.emit(
        "changeLanguageRequest",
        { userId, newLanguage },
        (response) => {
          console.log("Working fine");
          if (response.success) {
            console.log("Theme changed successfully:", response.theme);
          } else {
            console.error("Failed to change theme:", response.errors);
          }
        }
      );
    } catch (error) {
      console.error("There was an error with changing language:", error);
    } finally {
      setSocketSent(true);
    }
  };

  return { changeLanguage, isSocketSent };
}
