import React from "react";
import Heading from "@shared/ui/Heading";

import { PageCard } from "@entities/PageCard";
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { PageTypeSelector } from "@features/PageTypeSelector";
import { PageCardsLayout } from "@features/PageCardsLayout";

const BuildWebsite = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full ml-16">
        <Header />
        <Heading text="Новая страница" />
        <PageTypeSelector />
        <PageCardsLayout pageType="a" />
      </main>
    </div>
  );
};

export default BuildWebsite;
