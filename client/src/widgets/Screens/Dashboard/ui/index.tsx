import Button from "@shared/ui/Buttons";
import React from "react";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <h1>Ваши Сайты</h1>
        <Button text="Добавить сайт" buttonType="regular--small" />
      </div>
    </div>
  );
};
