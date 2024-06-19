"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useGetForms } from "@shared/lib/hooks/useGetRequests";
import { FormTab } from "@entities/FormTab";
import { EmptySvg } from "@assets/index";
import { SkeletonFormTab } from "@entities/SkeletonFormTab";
import Heading from "@shared/ui/Heading";

import styles from "../../../../../app/[locale]/websites/[slug]/requests/styles.module.scss";

export const RequestsDashboard = () => {
  const t = useTranslations("Requests");
  const { data, isLoading } = useGetForms();

  if (isLoading) {
    return (
      <div>
        <SkeletonFormTab />
        <SkeletonFormTab />
        <SkeletonFormTab />
        <SkeletonFormTab />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <Heading text={t("requests")} />
        <div className="flex items-center justify-center gap-4">
          <EmptySvg />
        </div>
        <p className={styles.container__already}>{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Heading text={t("requests")} />
      {data?.map((form, index) => (
        <FormTab
          key={index}
          name={form.name}
          email={form.email}
          phoneNumber={form.phoneNumber}
          date={form.date}
        />
      ))}
    </div>
  );
};
