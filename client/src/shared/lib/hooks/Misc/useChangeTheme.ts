"use client";
import { socket } from "@shared/lib/services/socketService";

export function useChangeTheme() {
  const changeTheme = (newTheme: string | "dark" | "light") => {
    socket.emit("changeThemeRequest", newTheme, (response) => {
      if (response.success) {
        console.log("Theme changed successfully:", response.theme);
      } else {
        console.error("Failed to change theme:", response.errors);
      }
    });
  };

  return { changeTheme };
}
