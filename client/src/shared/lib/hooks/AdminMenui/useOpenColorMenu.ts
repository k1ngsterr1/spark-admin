import { useState } from "react";

export function useOpenColorMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOpenColorMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return { isMenuOpen, handleOpenColorMenu };
}
