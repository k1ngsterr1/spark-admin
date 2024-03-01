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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useWebPopup = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("usePopup must be used within a AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isWebPopupVisible, setIsWebPopupVisible] = useState(false);

  const toggleWebPopup = useCallback(() => {
    setIsWebPopupVisible(!isWebPopupVisible);
  }, [isWebPopupVisible]);

  return (
    <AppContext.Provider value={{ isWebPopupVisible, toggleWebPopup }}>
      {children}
    </AppContext.Provider>
  );
};
