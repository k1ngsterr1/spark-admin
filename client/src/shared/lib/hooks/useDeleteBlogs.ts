import { axiosInstance } from "./useInterceptor";

// eslint-disable-next-line react-hooks/exhaustive-deps

export async function useDeleteBlogs(url: string): Promise<void> {
  try {
    const response = await axiosInstance.delete(
      `https://ferla-backend-production.up.railway.app/api/blog/delete/blogId`
    );
    console.log("Resource deleted successfully:", response.data);
  } catch (error: unknown | any) {
    console.error("Failed to delete resource:", error);
    return error.response
      ? error.response.data.message
      : "An unexpected error occurred";
  }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
