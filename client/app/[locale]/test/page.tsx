import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { TextMenu } from "@features/TextMenu";
import React from "react";

const Testing = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex flex-col w-full p-8">
        <Header />
        <TextMenu />
        <span className="w-[90%]">Testing the text menu</span>
      </main>
    </div>
  );
};

export default Testing;
