import React, { useEffect, useState } from "react";
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";
import { WebsitePopup } from "@entities/Popup_Components/WebsitePopup";
import { CodePopup } from "@entities/Popup_Components/CodePopup";
import { WebsiteUploadPopup } from "@entities/Popup_Components/WebsiteUploadPopup";
import { Metadata } from "next";

import "@fortawesome/fontawesome-svg-core/styles.css";

/* eslint-disable react-hooks/rules-of-hooks */

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Websites | Spark Admin",
    description: "Your Websites",
  };
}

const WebsitesPage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <WebsitePopup />
        <CodePopup />
        <WebsiteUploadPopup />
        <Dashboard />
      </main>
    </div>
  );
};

export default WebsitesPage;
/* eslint-disable react-hooks/rules-of-hooks */
