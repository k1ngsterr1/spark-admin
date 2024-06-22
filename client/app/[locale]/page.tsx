import React from "react";
import { MainPageHeader } from "@features/MainPageHeader";
import { MainBlock } from "@widgets/Screens/MainBlock";
import { AboutBlock } from "@widgets/Screens/About";
import { Metadata } from "next";
import Cursor from "@shared/ui/Cursor";
import DynamicGrid from "@shared/ui/DynamicGrid";

import styles from "./styles.module.scss";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Spark Admin",
    description: "Registration",
  };
}

const MainPage = () => {
  return (
    <>
      <Cursor />
      <MainPageHeader />
      <DynamicGrid />
      <MainBlock />
      {/* <AboutBlock /> */}
    </>
  );
};

export default MainPage;
