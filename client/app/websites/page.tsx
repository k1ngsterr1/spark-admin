"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";
import { WebsitePopup } from "@entities/Popup_Components/WebsitePopup";
import { WebsiteItem } from "@shared/lib/types";
import { useGetWebsites } from "@shared/lib/hooks/useGetWebsites";
import { CodePopup } from "@entities/Popup_Components/CodePopup";

import "@fortawesome/fontawesome-svg-core/styles.css";

interface DashboardProps {
  websites: WebsiteItem[];
  popupState: any;
}

const WebsitesPage: React.FC<DashboardProps> = () => {
  const [data, setData] = useState<WebsiteItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useGetWebsites();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch websites:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <WebsitePopup />
        <CodePopup />
        <Dashboard sites={data} />
      </main>
    </div>
  );
};

export default WebsitesPage;
/* eslint-disable react-hooks/rules-of-hooks */
