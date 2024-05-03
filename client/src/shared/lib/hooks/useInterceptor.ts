"use client";
import axios from "axios";

interface IData {
  email: string;
  password: string;
}

// проверка jwt token

export async function useIsTokenActive(data: IData): Promise<string | void> {
  try {
    const response = await axios.post(
      "https://spark-admin-production.up.railway.app/access",
      data
    );

    const accessToken = response.data.access;
    localStorage.setItem("accessToken", accessToken);

    const userData = {
      id: response.data.user.id,
      username: response.data.user.username,
      email: response.data.user.email,
      refreshToken: response.data.refreshToken,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    return accessToken;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
  }
}
