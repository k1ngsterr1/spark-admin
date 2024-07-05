import React from "react";
import { Menu } from "@features/Menu";
import { TestScreen } from "@widgets/Screens/TestScreen";

const Testing = () => {
  return (
    <div className="flex">
      <Menu />
      <TestScreen />
    </div>
  );
};

export default Testing;
