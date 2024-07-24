import { axiosInstance } from "../Misc/useInterceptor";

// Function to upload website
export function useUploadWebsite() {
  const uploadWebsite = async (e: React.SyntheticEvent, file: File) => {
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post(
          "/api/website/upload-website",
          formData
        );

        console.log("Website successfully uploaded:", response.data);
      } else {
        console.error("There is no file to upload");
      }
    } catch (error) {
      console.error("Failed to upload website:", error);
    }
  };

  return { uploadWebsite };
}
