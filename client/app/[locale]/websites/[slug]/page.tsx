"use client";
import React from "react";
import { HeaderEditor } from "@features/HeaderEditor";
import { useFetchUploadedPage } from "@shared/lib/hooks/useFetchUploadedPage";
import { useParams } from "next/navigation";

import styles from "./styles.module.scss";

export default function WebsitePage() {
  const { slug } = useParams();

  return (
    <div className={`flex flex-col ${styles.page}`}>
      <HeaderEditor
        isLoading={false}
        websiteName={slug}
        websiteURL="Test"
        pageURL={slug}
        pageType={slug}
      />
      <main className="flex flex-col w-full h-full ">
        <iframe
          src={`https://spark-admin-production.up.railway.app/${slug}/`}
          width="100%"
          className={styles.iframe}
          style={{ border: "none" }}
        ></iframe>
      </main>
    </div>
  );
}
