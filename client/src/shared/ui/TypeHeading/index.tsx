"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

import styles from "./styles.module.scss";

interface ITypeAnimation {
  text: any;
  headingType: string;
  speed: any | unknown;
  repeat: number;
}

export const TypeHeading: React.FC<ITypeAnimation> = ({
  text,
  headingType,
  speed,
  repeat,
}) => {
  return (
    <TypeAnimation
      sequence={text}
      speed={speed}
      wrapper="h1"
      repeat={repeat}
      style={{
        fontFamily: "Mulish",
        fontSize: "clamp(32px,3.33312vw,128px)",
        fontWeight: "bold",
        color: "#FF5722",
      }}
    />
  );
};
