"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useUserData } from "@shared/lib/hooks/Form/useGetData";

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { userData, isLoading } = useUserData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = (token) => {
      try {
        const { exp } = jwtDecode(token);
        return exp * 1000; // Convert to milliseconds
      } catch (error) {
        return null;
      }
    };

    const verifyToken = async () => {
      if (isLoading) return;

      const token = userData?.accessToken;

      if (token) {
        const expirationTime = checkTokenExpiration(token);
        if (expirationTime) {
          const timeUntilExpiration = expirationTime - Date.now();
          setIsAuthenticated(true); // Set authenticated initially if token is present and valid

          const timeout = setTimeout(() => {
            localStorage.removeItem("accessToken"); // Remove expired token
            setIsAuthenticated(false); // Set authenticated to false on token expiration
            router.push("login"); // Redirect to login page
          }, timeUntilExpiration);

          return () => clearTimeout(timeout);
        }
      } else {
        setIsAuthenticated(false); // No token or expired token
        router.push("login"); // Redirect to login page
      }
    };

    verifyToken(); // Call async function to verify token
  }, [userData?.accessToken, router, isLoading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
