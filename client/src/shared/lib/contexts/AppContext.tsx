"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AppContextType {
  // Popup for website add
  isWebPopupVisible: boolean;
  toggleWebPopup: () => void;
  // Popup for user add
  isUserPopupVisible: boolean;
  toggleUserPopup: () => void;
  // Popup for website verification & code generation
  isWebVerifyPopupVisible: boolean;
  toggleWebVerifyPopup: () => void;
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
  const [isWebVerifyPopupVisible, setIsWebVerifyPopupVisible] = useState(false);

  const toggleWebPopup = useCallback(() => {
    setIsWebPopupVisible(!isWebPopupVisible);
  }, [isWebPopupVisible]);

  const toggleUserPopup = useCallback(() => {
    setIsUserPopupVisible(!isUserPopupVisible);
  }, [isUserPopupVisible]);

  const toggleWebVerifyPopup = useCallback(() => {
    setIsWebVerifyPopupVisible(!isWebVerifyPopupVisible);
  }, [isWebVerifyPopupVisible]);

  return (
    <AppContext.Provider
      value={{
        isWebPopupVisible,
        toggleWebPopup,
        isUserPopupVisible,
        toggleUserPopup,
        isWebVerifyPopupVisible,
        toggleWebVerifyPopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
