"use client";
import React from "react";
import { ColorMenu } from "@features/ColorMenu";
import { Header } from "@features/Header";
import { TextMenu } from "@features/TextMenu";
import { useDispatch, useSelector } from "react-redux";
import { CustomColorMenu } from "@features/CustomColor";
import { useAppSelector } from "@shared/lib/hooks/hooks";
import { HeaderEditor } from "@features/HeaderEditor";

export const TestScreen = () => {
  const isColorMenuOpen = useAppSelector(
    (state: any) => state.colorMenu.isOpen
  );

  return (
    <main className="flex flex-col w-full p-8">
      <Header />
      <TextMenu />
      <CustomColorMenu />
      {isColorMenuOpen && <ColorMenu />}
      <span className="w-[90%]">Testing the text menu</span>
    </main>
  );
};
