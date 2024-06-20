"use client";
import React from "react";
import { ModelViewer } from "@widgets/Models/Macintosh";
import { SwiperCard } from "@entities/Swiper_Card";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

import styles from "./styles.module.scss";

export const AboutBlock = () => {
  const t = useTranslations("MainPage");

  return (
    <section className={styles.about}>
      <div className="flex flex-col items-center">
        <h2 className={styles.about__heading}>Что такое Spark Admin?</h2>
        <span className={styles.about__under_heading}>
          Unleashing the Power of Efficient Management.
        </span>
        {}
      </div>
    </section>
  );
};
