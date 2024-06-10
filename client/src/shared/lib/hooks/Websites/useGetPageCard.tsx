import { useState, useEffect } from 'react';
import { axiosInstance } from '../useInterceptor';

export function useGetPageCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axiosInstance.get(`/api/page-card/render/business-landing`);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch blocks:', error);
      } finally {
        setLoading(false);
      }
    };

    getCards();
  }, []);

  return { data, loading };
}
