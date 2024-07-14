"use client";
import React from "react";
import { useParams } from "next/navigation";
import { HeaderEditor } from "@features/HeaderEditor";

import styles from "../../../app/[locale]/websites/[slug]/styles.module.scss";

export const WebsiteAdminDashboard = () => {
  const { slug, locale } = useParams();

  return (
    <>
      {" "}
      <HeaderEditor
        isLoading={false}
        hasRequests={true}
        hasBlog={true}
        websiteName={slug}
        websiteURL={slug}
        locale={locale}
        pageURL={slug}
        pageType={slug}
      />
      <main className="flex flex-col w-full h-full ">
        <iframe
          src={`https://spark-admin-production.up.railway.app/${slug}/`}
          width="100%"
          className={styles.iframe}
          style={{ border: "none" }}
        />
      </main>
    </>
  );
};
