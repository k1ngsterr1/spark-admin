import { useState, useEffect } from 'react';

interface IUserData {
  username: string | null;
  email: string | null;
}

export const useUserData = (): IUserData => {
  const [userData, setUserData] = useState<IUserData>({ username: null, email: null });

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return userData;
}
