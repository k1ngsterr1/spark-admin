import "./useInterceptor";
import { axiosInstance } from "./useInterceptor";

// eslint-disable-next-line react-hooks/exhaustive-deps

export async function useUpdateBlogCard(
  url: `https://ferla-backend-production.up.railway.app/api/blog/update`,
  updateData: {
    title: string;
    href: string;
    image: File;
  }
): Promise<void> {
  try {
    const response = await axiosInstance.patch(url, updateData);
    console.log("Resource updated successfully:", response.data);
  } catch (error: unknown | any) {
    console.error("Failed to update resource:", error);
    return error.response
      ? error.response.data.message
      : "An unexpected error occurred";
  }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
