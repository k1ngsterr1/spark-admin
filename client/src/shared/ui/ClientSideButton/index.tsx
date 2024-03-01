"use client";

import { Provider, useDispatch } from "react-redux";
import { Button } from "../Buttons";
import { makeStore } from "@redux/store";
import actionMap from "@redux/actions";

type ActionId = keyof typeof actionMap;

interface ClientSideButtonProps {
  actionId: ActionId;
  text: string;
  buttonType: "regular" | "transparent" | "regular--small";
  popupState: any;
}

export const ClientSideButton: React.FC<ClientSideButtonProps> = ({
  text,
  buttonType,
  actionId,
  popupState,
}) => {
  const dispatch = useDispatch();
  const store = makeStore(popupState);

  const handleClick = () => {
    const action = actionMap[actionId];
    if (action) {
      dispatch(action());
    }
  };
  return (
    <Provider store={store}>
      <Button onClick={handleClick} text={text} buttonType={buttonType} />;
    </Provider>
  );
};
