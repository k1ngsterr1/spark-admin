'use client';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../useInterceptor';

export function useGetUsers() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/api/website/users');
        console.log(response.data);
        setData(response.data);


      } catch (error) {
        console.error('Failed to fetch websites:', error);

      } finally {
        setIsLoading(false);
      }
    };
    fetchWebsites();
  }, []);

  return { data, isLoading };
}
