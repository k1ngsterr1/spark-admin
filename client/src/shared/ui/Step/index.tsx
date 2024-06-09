"use client";
import React from "react";

import styles from "./styles.module.scss";

interface IStepProps {
  number: number;
  margin: string;
  isActive: boolean;
}

export const Step: React.FC<IStepProps> = ({ number, isActive, margin }) => {
  const stepClass = `${
    isActive ? styles.step : styles.step_inactive
  } ${margin}`;

  return <div className={stepClass}>{number}</div>;
};
