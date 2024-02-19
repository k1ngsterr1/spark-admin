import React from "react";

import styles from "./styles.module.scss";
import Image, { StaticImageData } from "next/image";

interface WebsiteTabProps {
  text: string;
  preview: StaticImageData;
  userQuantity: number;
}

export const WebsiteTab: React.FC<WebsiteTabProps> = ({ text, preview }) => {
  return (
    <div className={styles.website_tab}>
      <div className={styles.website_tab__preview_content}>
        <Image
          src={preview}
          className={styles.website_tab__preview_content__preview}
          alt={text}
        />
        <div className={styles.website_tab__preview_content__text}></div>
      </div>
    </div>
  );
};
