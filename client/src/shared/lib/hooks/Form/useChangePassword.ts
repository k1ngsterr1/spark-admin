"use client";

import { axiosInstance } from "./../useInterceptor";

interface IData {
  newPassword: string;
  code: string;
}

export const useChangePassword = () => {
  const changePassword = async (data: IData): Promise<string | void> => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/change-password",
        data
      );

      console.log("Data created:", response.data);
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Failed to change password:", error);
      if (error.response) {
        return error.response.data.message;
      } else {
        return "An unexpected error occurred";
      }
    }
  };

  return changePassword;
};
