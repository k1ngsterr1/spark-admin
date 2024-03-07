"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AppContextType {
  isWebPopupVisible: boolean;
  toggleWebPopup: () => void;
  isUserPopupVisible: boolean;
  toggleUserPopup: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useWebPopup = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a AppProvider");
  }
  return context;
};

export const useUserPopup = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isWebPopupVisible, setIsWebPopupVisible] = useState(false);
  const [isUserPopupVisible, setIsUserPopupVisible] = useState(false);

  const toggleWebPopup = useCallback(() => {
    setIsWebPopupVisible(!isWebPopupVisible);
  }, [isWebPopupVisible]);

  const toggleUserPopup = useCallback(() => {
    setIsUserPopupVisible(!isUserPopupVisible);
  }, [isUserPopupVisible]);

  return (
    <AppContext.Provider
      value={{
        isWebPopupVisible,
        toggleWebPopup,
        isUserPopupVisible,
        toggleUserPopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
