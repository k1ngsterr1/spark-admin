"use client";
import axios from "axios";
import { useUserData } from "./useGetData";

interface IData {
  newPassword: string;
  code: string;
}

export async function useChangePassword(data: IData): Promise<string | void> {
  try {
    const userData = useUserData();
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
    console.error("Failed to create data:", error);
    if (error.response) {
      return error.response.data.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
