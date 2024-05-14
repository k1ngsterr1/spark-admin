import { axiosInstance } from "./useInterceptor";

interface IData {
  data1: string;
  data2: string;
  data3: string;
  data4: string;
}

export async function useCheckIsAdmin(): Promise<void> {
  try {
    const response = await axiosInstance.post("api/spark-check");
  } catch (error: unknown | any) {
    console.error("Failed to create data:", error);
    if (error.response) {
      return error.response.data.message;
    }
  }
}
