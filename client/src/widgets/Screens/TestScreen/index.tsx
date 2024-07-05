"use client";
import React from "react";
import { ColorMenu } from "@features/ColorMenu";
import { Header } from "@features/Header";
import { TextMenu } from "@features/TextMenu";
import { useDispatch, useSelector } from "react-redux";

export const TestScreen = () => {
  const isColorMenuOpen = useSelector(
    (state: any) => state.colorMenu.colorMenu
  );
  const dispatch = useDispatch();

  return (
    <main className="flex flex-col w-full p-8">
      <Header />
      <TextMenu />
      {isColorMenuOpen && <ColorMenu />}
      <span className="w-[90%]">Testing the text menu</span>
    </main>
  );
};
