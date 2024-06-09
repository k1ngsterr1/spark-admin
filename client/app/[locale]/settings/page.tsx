import React from "react";
import { Menu } from "@features/Menu";
import SettingsPage from "@widgets/Screens/Settings";
import { Header } from "@features/Header";

export const Settings = () => {
  return (
    <div className="flex">
      <Menu />
      <div className="flex flex-col w-full">
        <Header />
        <SettingsPage />
      </div>
    </div>
  );
};
export default Settings;
