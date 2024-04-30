"use client";

import axios from "axios";
import { useUserData } from "./useGetData";

interface IData {
  newPassword: string;
  code: string;
}

export const useChangePassword = () => {
  const userData = useUserData();

  const changePassword = async (data: IData): Promise<string | void> => {
    try {
      const accessToken = userData.accessToken;
      const response = await axios.post(
        "https://spark-admin-production.up.railway.app/api/auth/change-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
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
