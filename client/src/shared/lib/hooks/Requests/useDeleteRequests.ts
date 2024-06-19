import { axiosInstance } from "../useInterceptor";

export function useDeleteRequest() {
  const deleteRequest = async (id: number | string) => {
    try {
      const encodedId = encodeURIComponent(String(id));
      const baseUrl =
        "https://ferla-backend-production.up.railway.app/api/forms/delete";
      const encodedBaseUrl = encodeURIComponent(baseUrl);

      const url = `/api/website/ferla-bikes/89d6700c-288d-46c6-b463-60aae8b1b830/delete-form/${encodedBaseUrl}/${encodedId}`;

      console.log("url:", url);

      const response = await axiosInstance.delete(url);
      console.log(response.data);
    } catch (error: unknown | any) {
      console.error(error);
    }
  };

  return { deleteRequest };
}
