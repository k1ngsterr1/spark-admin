"use client";
import { useSocket } from "@shared/lib/contexts/SocketContext";
import { useUserData } from "../Form/useGetData";

export function useChangeLanguage() {
  const socket = useSocket();
  const { userData } = useUserData();

  const userId = userData?.email;

  const changeLanguage = (newLanguage: string | "RU" | "EN") => {
    socket.emit(
      "changeLanguageRequest",
      { userId, newLanguage },
      (response) => {
        if (response.success) {
          console.log("Language changed successfully:", response.language);
        } else {
          console.error("Failed to change language:", response.errors);
        }
      }
    );
  };

  // socket.on("themeChanged", (newTheme) => {
  //   console.log("Theme changed to2:", newTheme);
  //   // Update the theme in your application
  //   // For example, update the theme in your state or context
  // });

  return { changeLanguage };
}
