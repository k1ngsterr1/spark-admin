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
  const animationSequence = [
    "Spark Admin",
    1000, // Pause for 1 second
    "Developed By",
    1000,
    "Spark Studio",
    1000,
    "Spark Admin.",
  ];

  return (
    <TypeAnimation
      sequence={animationSequence}
      speed={speed}
      wrapper="h1"
      repeat={repeat}
      style={{
        fontSize: "clamp(64px,6.66624vw,256px)",
        fontWeight: "bold",
        color: "#FF5722",
      }}
    />
  );
};
