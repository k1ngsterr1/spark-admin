import axios from "axios";

interface IData {
  code: string;
}

interface IUserData {
  accessToken: string;
}

export async function useEmailConfirm(data: IData, userData: IUserData): Promise<void | string> {
  try {
    const accessToken = userData.accessToken;

    const response = await axios.post(
      "https://spark-admin-production.up.railway.app/api/auth/verify",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Data created:", response.data);
    window.location.href = "/websites";
  } catch (error: unknown | any) {
    console.error("Failed to create data:", error);
    if (error.response) {
      return error.response.data.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
