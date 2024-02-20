import React from "react";
import Image, { StaticImageData } from "next/image";

import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPerson,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
        <div className={styles.website_tab__preview_content__text_content}>
          <span className={styles.text}>
            Spark Studio - Студия веб-разработки
          </span>
          <div
            className={styles.website_tab__preview_content__text_content__lower}
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faUser}
                className={styles.icon}
                size="lg"
              />
              <span className={styles.count}>3</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCalendar}
                className={styles.icon}
                size="lg"
              />
              <span className={styles.count}>18.02.2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
