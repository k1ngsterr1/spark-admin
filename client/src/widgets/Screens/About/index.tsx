"use client";
import React from "react";
import { ModelViewer } from "@widgets/Models/Macintosh";

import styles from "./styles.module.scss";

export const AboutBlock = () => {
  return (
    <section className={styles.about}>
      <div className="flex flex-col items-center">
        <h2 className={styles.about__heading}>Что такое Spark Admin?</h2>
        <span className={styles.about__under_heading}>
          Unleashing the Power of Efficient Management!
        </span>
        <ModelViewer />
      </div>
    </section>
  );
};
