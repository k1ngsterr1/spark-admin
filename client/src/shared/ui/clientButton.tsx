"use client";
import { useWebPopup } from "@shared/lib/contexts/AppContext";
import { Button } from "./Buttons";

export const ClientButton = () => {
  const { toggleWebPopup } = useWebPopup();

  return (
    <>
      <Button
        text="Добавить сайт"
        functionType="webPopup"
        buttonType="regular--small"
        onClick={toggleWebPopup}
      />
    </>
  );
};
