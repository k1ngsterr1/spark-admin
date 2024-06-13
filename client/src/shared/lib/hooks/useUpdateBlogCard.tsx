import "./useInterceptor";
import { axiosInstance } from "./useInterceptor";

export async function useUpdateBlogCard(
  url: `https://ferla-backend-production.up.railway.app/api/blog/update/blogId`,
  updateData: {
    title: string;
    href: string;
    image: File;
    code: string;
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
