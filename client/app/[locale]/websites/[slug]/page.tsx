"use client";
import React from "react";
import { HeaderEditor } from "@features/HeaderEditor";
import { useFetchUploadedPage } from "@shared/lib/hooks/useFetchUploadedPage";
import { useParams } from "next/navigation";

import styles from "./styles.module.scss";

export default function WebsitePage() {
  const { slug } = useParams();
  const { htmlContent } = useFetchUploadedPage(slug);

  return (
    <div className="flex flex-col h-full">
      <HeaderEditor
        isLoading={false}
        websiteName="Test"
        websiteURL="Test"
        pageURL="Test"
        pageType="Test"
      />
      <main className="flex flex-col w-full h-full border-2">
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
