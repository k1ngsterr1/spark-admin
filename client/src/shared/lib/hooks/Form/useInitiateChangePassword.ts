'use client'

import axios from "axios";
import { useUserData } from "./useGetData";

export const useInitiateChangePassword = () => {
    const userData = useUserData();

    const initiateChangePassword = async (): Promise<void | string> => {
        try {
            const accessToken = userData.accessToken;

            const response = await axios.post(
                "https://spark-admin-production.up.railway.app/api/auth/initiate-password-change",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
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

    return initiateChangePassword;
};
