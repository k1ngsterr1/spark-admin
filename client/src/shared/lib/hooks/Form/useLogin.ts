import { axiosInstance } from "../Misc/useInterceptor";

interface IData {
  email: string;
  password: string;
}

export async function useLogin(
  data: IData,
  locale: string | string[]
): Promise<string | void> {
  try {
    const response = await axiosInstance.post("/api/auth/login", data);
    const isVerified = response.data.user.isVerified;

    if (isVerified === true) {
      window.location.href = `websites`;
    } else {
      window.location.href = `email-confirmation`;
    }

    const userData = {
      id: response.data.user.id,
      username: response.data.user.username,
      email: response.data.user.email,
      refreshToken: response.data.refreshToken,
      accessToken: response.data.accessToken,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (error: unknown | any) {
    console.error("Failed to create data:", error);
    if (error.response) {
      return error.response.data.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
