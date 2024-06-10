"use client";
import { axiosInstance } from "./../useInterceptor";

export const useInitiateChangePassword = () => {
  const initiateChangePassword = async (): Promise<void | string> => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/initiate-password-change",
        {}
      );

      console.log("Data created:", response.data);
      window.location.href = "/change-password";
    } catch (error: any) {
      console.error("Failed to create data:", error);
      if (error.response) {
        return error.response.data.message;
      } else {
        return "An unexpected error occurred";
      }
    }
  };
      console.log("Data created:", response.data);
      window.location.href = "/change-password";
    } catch (error: any) {
      console.error("Failed to create data:", error);
      if (error.response) {
        return error.response.data.message;
      } else {
        return "An unexpected error occurred";
      }
    }
  };

  return initiateChangePassword;
  return initiateChangePassword;
};

