"use client";
import { TypeAnimation } from "react-type-animation";
import React from "react";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { useParams } from "next/navigation";

export const Development = () => {
  const { locale } = useParams();
  return (
    <main className="w-full h-[100vh] flex flex-col items-center justify-center">
      <TypeAnimation
        speed={25}
        wrapper="h1"
        repeat={0}
        sequence={["Coming Soon."]}
        style={{
          fontSize: "clamp(64px,6.66624vw,256px)",
          fontWeight: "bold",
          color: "#FF5722",
        }}
      />
      <ButtonLink
        buttonType="regular--small"
        margin="mt-8"
        text="Go back"
        href={`websites`}
      />
    </main>
  );
};
