import React from "react";
import { Button } from "@shared/ui/Buttons";
import Heading from "@shared/ui/Heading/index";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Ваши Сайты" />
        <Button text="Добавить сайт" buttonType="regular--small" />
      </div>
    </div>
  );
};
