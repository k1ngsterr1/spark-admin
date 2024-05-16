'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { axiosInstance } from './useInterceptor';


// Получаем изменяемый контент из шаблона для сайта
export function useFetchPageContent(slug: any) {
    const [htmlContent, setHtmlContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/api/page-card/render/${slug}`);
                setHtmlContent(response.data);
                setIsLoading(false);
            } catch (error: unknown | any) {
                setError('Failed to fetch data: ' + (error.response?.data.message || error.message));
                setIsLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    return { htmlContent, isLoading, error };
}
