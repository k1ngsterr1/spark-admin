'use client';

import { axiosInstance } from "../../lib/hooks/useInterceptor";


export const useGetWebsitePages = () => {

    const getWebsitePages = async (websiteName: string): Promise<string | void> => {
        try {
            const response = await axiosInstance.get(`/api/page/get-pages/${websiteName}`,
            );

            console.log('Data fetched:', response.data);
        } catch (error: any) {
            console.error('Failed to fetch websites:', error);
            if (error.response) {
                return error.response.data.message;
            } else {
                return 'An unexpected error occurred';
            }
        }
    };

    return {getWebsitePages};
};