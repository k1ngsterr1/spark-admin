'use client';
import { useState, useEffect } from 'react';
import { axiosInstance } from './useInterceptor';

export function useGetWebsites() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/api/website');
        setData(response.data);

      } catch (error) {
        console.error('Failed to fetch websites:', error);

      } finally {
        setIsLoading(false);
      }
    };
    fetchWebsites();
  }, []);

  return { isLoading };
}
