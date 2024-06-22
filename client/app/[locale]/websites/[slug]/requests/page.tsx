import React from "react";
import { Metadata } from "next";
import { Menu } from "@features/Menu";
import { Header } from "@features/Header";
import { RequestsDashboard } from "@widgets/Screens/RequestsDashboard/ui";

import styles from "./styles.module.scss";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Your Requests | Spark Admin",
    description: "Your Requests",
  };
}

const RequestsPage = () => {
  return (
    <div className={`flex`}>
      <Menu />
      <main className={`flex flex-col w-full ${styles.main}`}>
        <Header />
        <RequestsDashboard />
      </main>
    </div>
  );
};

export default RequestsPage;
