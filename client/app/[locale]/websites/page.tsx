"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { Dashboard } from "@widgets/Screens/Dashboard/ui";
import { WebsitePopup } from "@entities/Popup_Components/WebsitePopup";
import { WebsiteItem } from "@shared/lib/types";
import { useGetWebsites } from "@shared/lib/hooks/useGetWebsites";
import { CodePopup } from "@entities/Popup_Components/CodePopup";
import { WebsiteUploadPopup } from "@entities/Popup_Components/WebsiteUploadPopup";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { useParams } from "next/navigation";

/* eslint-disable react-hooks/rules-of-hooks */

interface DashboardProps {
  websites: WebsiteItem[];
  popupState: any;
}

const WebsitesPage: React.FC<DashboardProps> = () => {
  const [data, setData] = useState<WebsiteItem[]>([]);
  const { locale } = useParams();

  useEffect(() => {
    const usefetchData = async () => {
      try {
        const result = await useGetWebsites();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch websites:", error);
      }
    };

    usefetchData();
  }, []);

  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <WebsitePopup />
        <CodePopup />
        <WebsiteUploadPopup />
        <Dashboard sites={data} locale={locale} />
      </main>
    </div>
  );
};

export default WebsitesPage;
/* eslint-disable react-hooks/rules-of-hooks */
