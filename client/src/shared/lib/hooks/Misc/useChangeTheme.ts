"use client";
import { useSocket } from "@shared/lib/contexts/SocketContext";

export function useChangeTheme() {
  const socket = useSocket();

  const changeTheme = (newTheme: string | "dark" | "light") => {
    socket.emit("changeThemeRequest", newTheme, (response) => {
      if (response.success) {
        console.log("Theme changed successfully:", response.theme);
      } else {
        console.error("Failed to change theme:", response.errors);
      }
    });
  };

  socket.on("themeChanged", (newTheme) => {
    console.log("Theme changed to2:", newTheme);
    // Update the theme in your application
    // For example, update the theme in your state or context
  });

  return { changeTheme };
}
