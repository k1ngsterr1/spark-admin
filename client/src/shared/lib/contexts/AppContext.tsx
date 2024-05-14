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
  // Popup with form for page card
  isPageCardPopupVisible: boolean;
  togglePageCardPopup: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useWebPopup = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a AppProvider");
  }
  return context;
};

export const useWebVerifyPopup = () => {
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

export const usePageCardPopup = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isWebPopupVisible, setIsWebPopupVisible] = useState<boolean>(false);
  const [isUserPopupVisible, setIsUserPopupVisible] = useState<boolean>(false);
  const [isWebVerifyPopupVisible, setIsWebVerifyPopupVisible] =
    useState<boolean>(false);
  const [isPageCardPopupVisible, setIsPageCardPopupVisible] =
    useState<boolean>(false);

  const toggleWebPopup = useCallback(() => {
    setIsWebPopupVisible(!isWebPopupVisible);
  }, [isWebPopupVisible]);

  const togglePageCardPopup = useCallback(() => {
    setIsPageCardPopupVisible(!isPageCardPopupVisible);
  }, [isPageCardPopupVisible]);

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
        isPageCardPopupVisible,
        togglePageCardPopup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
