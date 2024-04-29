"use client";
import React from "react";

import styles from "./styles.module.scss";

interface IStepProps {
  number: number;
  isActive: boolean;
}

export const Step: React.FC<IStepProps> = ({ number, isActive }) => {
  return <div className={styles.step}>{number}</div>;
};
