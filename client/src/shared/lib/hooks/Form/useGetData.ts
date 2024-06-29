import { useState, useEffect } from "react";

interface IUserData {
  username: string | null;
  email: string | null;
  accessToken: string | null;
}

interface UserDataHookResult {
  userData: IUserData;
  isLoading: boolean;
}

export const useUserData = (): UserDataHookResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>(() => {
    const data = localStorage.getItem("userData");
    return data
      ? JSON.parse(data)
      : { username: null, email: null, accessToken: null };
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userData") {
        try {
          setIsLoading(true);
          const newData = event.newValue ? JSON.parse(event.newValue) : null;
          setUserData(newData);
        } catch (error) {
          console.error(
            "Error parsing updated user data from localStorage",
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { userData, isLoading };
};
