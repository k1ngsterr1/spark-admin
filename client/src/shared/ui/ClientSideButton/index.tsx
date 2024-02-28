"use client";

import { useDispatch } from "react-redux";
import { Button } from "../Buttons";
import { toggleOnPopup } from "@redux/slices/websitePopupSlice";

interface ClientSideButtonProps {
  actionId: string;
  text: string;
  buttonType: "regular" | "transparent" | "regular--small";
}

export const ClientSideButton: React.FC<ClientSideButtonProps> = ({
  text,
  buttonType,
  actionId,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const action = actionMap[actionId];
    if (action) {
      dispatch(action());
    }
  };
  return <Button onClick={handleClick} text={text} buttonType={buttonType} />;
};
