import { axiosInstance } from "./../useInterceptor";

interface IData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export async function useRegister(data: IData): Promise<string | void> {
  try {
    const response = await axiosInstance.post("/api/auth/register", data);

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
