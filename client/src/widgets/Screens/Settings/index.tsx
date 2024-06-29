import React from "react";
import Heading from "@shared/ui/Heading";
import UserTab from "@entities/User_Components";

export const SettingsPage = () => {
  return (
    <div className="flex flex-col">
      <main className="flex w-[90%] flex-col items-start m-auto">
        <Heading text="Settings" />
      </main>
    </div>
  );
};

export default SettingsPage;
