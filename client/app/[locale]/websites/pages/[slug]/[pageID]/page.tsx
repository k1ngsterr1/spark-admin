"use client";
import React, { useEffect, useState } from "react";
import { HeaderEditor } from "@features/HeaderEditor";
import { UserWebsite } from "@widgets/Screens/UserWebsite";
import { useGetWebsitePageByID } from "@shared/lib/hooks/useGetPageById";
import { DynamicContent } from "@features/DynamicContent";
import { useFetchHTMLContent } from "@shared/lib/hooks/useFetchHTMLContent";

const WebsiteEditablePage = ({ params }: { params: { pageID: string } }) => {
  const [websiteName, setWebsiteName] = useState<string>("");

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    console.log(pathSegments);
    if (pathSegments.length >= 2) {
      setWebsiteName(pathSegments[2]);
    }
  }, []);

  const { pageContent, isLoading } = useGetWebsitePageByID(
    websiteName,
    params.pageID
  );

  const { content } = useFetchHTMLContent(
    "https%3A%2F%2Fsamigroup.kz",
    pageContent?.id
  );

  return (
    <div className="flex flex-col">
      <main className="flex flex-col w-full">
        <HeaderEditor
          websiteName={pageContent?.name}
          websiteURL={pageContent?.url}
          pageType={pageContent?.type}
          pageURL={pageContent?.url}
          isLoading={isLoading}
        />
        <DynamicContent htmlContent={content} />
      </main>
    </div>
  );
};

export default WebsiteEditablePage;
