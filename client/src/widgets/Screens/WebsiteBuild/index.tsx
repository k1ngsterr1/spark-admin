"use client";
import React from "react";
import Heading from "@shared/ui/Heading";
import { Header } from "@features/Header";
import { PageTypeSelector } from "@features/PageTypeSelector";
import { PageCardsLayout } from "@features/PageCardsLayout";
import { useCheckIsAdmin } from "@shared/lib/hooks/Misc/useCheckIsAdmin";
import { PageCardPopup } from "@entities/Popup_Components/PageCardPopup";
import { useTranslations } from "next-intl";

export const WebsiteBuildScreen = () => {
  const t = useTranslations("BuildWebsite");
  const { isAdmin } = useCheckIsAdmin();

  return (
    <main className="flex flex-col items-center w-[90%]">
      <Header />
      <PageCardPopup />
      <Heading position="w-[92%]" text={t("heading")} />
      <PageTypeSelector isAdmin={isAdmin} />
      <PageCardsLayout pageType="a" />
    </main>
  );
};
