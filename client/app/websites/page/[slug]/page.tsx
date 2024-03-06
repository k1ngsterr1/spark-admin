import { HeaderEditor } from "@features/HeaderEditor";
import React from "react";

const PageEditor = () => {
  return (
    <div className="flex">
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

export default PageEditor;
