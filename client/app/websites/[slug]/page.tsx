"use client";
import { HeaderEditor } from "@features/HeaderEditor";
import { useFetchUploadedPage } from "@shared/lib/hooks/useFetchUploadedPage";
import { useParams } from "next/navigation";
import React from "react";

export default function WebsitePage() {
  const { slug } = useParams();
  const { htmlContent } = useFetchUploadedPage(slug);

  return (
    <div className="flex flex-col">
      <HeaderEditor
        isLoading={false}
        websiteName="Test"
        websiteURL="Test"
        pageURL="Test"
        pageType="Test"
      />
      <main className="flex flex-col w-full"></main>
    </div>
  );
}
