"use client";
import React from "react";
import { HeaderEditor } from "@features/HeaderEditor";
import { useParams } from "next/navigation";

import styles from "../styles.module.scss";
import Heading from "@shared/ui/Heading";
import { Menu } from "@features/Menu";
import { Header } from "@features/Header";

const RequestsPage = () => {
  const { slug } = useParams();

  return (
    <div className={`flex`}>
      <Menu />
      <main className="flex flex-col w-full h-full">
        <Header />
      </main>
    </div>
  );
};

export default RequestsPage;
