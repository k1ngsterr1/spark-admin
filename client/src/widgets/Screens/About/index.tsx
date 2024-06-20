"use client";
import React from "react";
import { ModelViewer } from "@widgets/Models/Macintosh";
import { SwiperCard } from "@entities/Swiper_Card";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import { useHolographicAnimation } from "@shared/lib/hooks/animations/useHolographicAnimation";

export const AboutBlock = () => {
  return (
    <section className={styles.about}>
      <div className="flex flex-col items-center">
        <h2 className={styles.about__heading}>Что такое Spark Admin?</h2>
        <span className={styles.about__under_heading}>
          Unleashing the Power of Efficient Management.
        </span>
        <SwiperCard
          name="Удобство"
          description="Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
          icon={faUser}
        />
      </div>
    </section>
  );
};
