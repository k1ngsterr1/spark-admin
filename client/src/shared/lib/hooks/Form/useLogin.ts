import { axiosInstance } from "./../useInterceptor";

interface IData {
  email: string;
  password: string;
}

export async function useLogin(data: IData): Promise<string | void> {
  try {
    const response = await axiosInstance.post("/api/auth/login", data);

    console.log("Data created:", response.data);
    window.location.href = "/email-confirmation";

    const userData = {
      id: response.data.user.id,
      username: response.data.user.username,
      email: response.data.user.email,
      accessToken: response.data.accessToken,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    console.log(response.data.user);
  } catch (error: unknown | any) {
    console.error("Failed to create data:", error);
    if (error.response) {
      return error.response.data.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
