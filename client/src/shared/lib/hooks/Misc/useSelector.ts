import { useState } from "react";

interface UseSelectorReturn<T> {
  selectedItem: T;
  setSelectedItem: React.Dispatch<React.SetStateAction<T>>;
}

function useSelector<T>(defaultValue: T): UseSelectorReturn<T> {
  const [selectedItem, setSelectedItem] = useState<T>(defaultValue);

  return {
    selectedItem,
    setSelectedItem,
  };
}

export default useSelector;
