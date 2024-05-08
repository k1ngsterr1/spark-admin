import React from "react";
import { HeaderEditor } from "@features/HeaderEditor";
import { UserWebsite } from "@widgets/Screens/UserWebsite";

const WebsiteEditablePage = ({ params }: { params: { websiteID: string } }) => {
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
