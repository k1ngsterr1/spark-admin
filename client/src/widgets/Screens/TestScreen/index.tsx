"use client";
import React from "react";
import { ColorMenu } from "@features/ColorMenu";
import { Header } from "@features/Header";
import { TextMenu } from "@features/TextMenu";
import { useDispatch, useSelector } from "react-redux";
import { CustomColorMenu } from "@features/CustomColor";
import { useAppSelector } from "@shared/lib/hooks/hooks";
import { HeaderEditor } from "@features/HeaderEditor";
import { openTextMenu } from "@redux/slices/textMenuSlice";

export const TestScreen = () => {
  const dispatch = useDispatch();
  const isColorMenuOpen = useAppSelector(
    (state: any) => state.colorMenu.isOpen
  );

  const handleOpenTextMenu = () => {
    dispatch(openTextMenu());
  };

  return (
    <main className="flex flex-col w-full p-8">
      <Header />
      <button onClick={handleOpenTextMenu}>Test</button>
      <TextMenu />
      <CustomColorMenu />
      {isColorMenuOpen && <ColorMenu />}
      <span className="w-[90%]">Testing the text menu</span>
    </main>
  );
};
