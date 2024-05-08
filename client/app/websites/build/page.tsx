import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { PageTypeSelector } from "@features/PageTypeSelector";
import Heading from "@shared/ui/Heading";
import React from "react";

const BuildWebsite = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <Heading text="Новая страница" />
        <PageTypeSelector />
      </main>
    </div>
  );
};

export default BuildWebsite;
