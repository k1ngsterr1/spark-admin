import { axiosInstance } from "../Misc/useInterceptor";

interface IData {
  code: string;
}

export async function useEmailConfirm(data: IData): Promise<void | string> {
  try {
    const response = await axiosInstance.post("/api/auth/verify", data);

    window.location.href = "websites";
  } catch (error: unknown | any) {
    console.error("Failed to create data:", error);
    if (error.response) {
      return error.response.data.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
