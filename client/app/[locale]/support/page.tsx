import React from "react";
import { Menu } from "@features/Menu";
import { SupportScreen } from "@widgets/Screens/Support";
import { Metadata } from "next";
import { Header } from "@features/Header";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Support | Spark Admin",
    description: "Support",
  };
}

const Support = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <SupportScreen />
      </main>
    </div>
  );
};

export default Support;
