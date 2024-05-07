'use client';
import { useState } from "react";
import { axiosInstance } from "../../lib/hooks/useInterceptor";


export const useGetWebsitePages = () => {
    const [pageContent, setPageContent] = useState()

    const getWebsitePages = async (websiteName: string): Promise<string | void> => {
        try {
            const response = await axiosInstance.get(`/api/page/get-pages/${websiteName}`,
            );
            
            setPageContent(response.data)

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

    return {getWebsitePages, pageContent};
};