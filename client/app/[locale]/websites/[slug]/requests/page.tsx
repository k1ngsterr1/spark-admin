"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Menu } from "@features/Menu";
import { Header } from "@features/Header";
import { useTranslations } from "next-intl";
import { FormTab } from "@entities/FormTab";
import { useGetForms } from "@shared/lib/hooks/useGetRequests";
import Heading from "@shared/ui/Heading";

import styles from "./styles.module.scss";

const RequestsPage = () => {
  const t = useTranslations("Requests");
  const { data } = useGetForms();

  console.log("DATA:", data);
  const { slug } = useParams();

  return (
    <div className={`flex`}>
      <Menu />
      <main className={`flex flex-col w-full ${styles.main}`}>
        <Header />
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
      </main>
    </div>
  );
};

export default RequestsPage;
