"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export const UploadedChangableWebsite = () => {
  const { slug } = useParams();

  return (
    <>
      <HeaderEditor
        websiteName="Agro PV"
        websiteURL="agro"
        pageType="Main"
        pageURL="aa"
      />
    </>
  );
};
