"use client";
import { useSocket } from "@shared/lib/contexts/SocketContext";
import { useUserData } from "../Form/useGetData";
import { axiosInstance } from "./useInterceptor";

export function useChangeTheme() {
  const socket = useSocket();
  const { userData } = useUserData();

  const userId = userData?.id;

  const changeTheme = async (newTheme: string) => {
    try {
      console.log("new theme:", newTheme);

      const response = await axiosInstance.post("/api/user/change-theme", {
        theme: newTheme,
      });

      // Notify other clients via WebSocket
      socket.emit("changeThemeRequest", { userId, newTheme }, (response) => {
        if (response.success) {
          console.log("Theme changed successfully:", response.theme);
        } else {
          console.error("Failed to change theme:", response.errors);
        }
      });
    } catch (error) {
      console.error("There was an error with updating theme:", error);
    }
  };

  return { changeTheme };
}
