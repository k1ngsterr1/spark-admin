"use client";
import React, { useEffect } from "react";
import { HeaderEditor } from "@features/HeaderEditor";
import { UserWebsite } from "@widgets/Screens/UserWebsite";
import { useGetWebsitePageByID } from "@shared/lib/hooks/useGetPageById";

const WebsiteEditablePage = ({ params }: { params: { pageID: string } }) => {
  const [websiteName, setWebsiteName] = useState<string>("");

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    if (pathSegments.length >= 2) {
      setWebsiteName(pathSegments[0]);
      setPageID(pathSegments[1]);
    }
  }, []);

  const { pageContent, isLoading } = useGetWebsitePageByID(params.pageID);

  return (
    <div className="flex flex-col">
      <main className="flex flex-col w-full">
        <HeaderEditor
          websiteName="Spark Studio"
          websiteURL="aa"
          pageType="Main"
          pageURL="aa"
        />
      </main>
    </div>
  );
};

export default WebsiteEditablePage;
