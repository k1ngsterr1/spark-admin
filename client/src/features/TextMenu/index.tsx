"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faArrowsLeftRight,
  faChevronDown,
  faClose,
  faDroplet,
  faIndent,
  faLink,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontMenuSelector } from "@shared/ui/Selector_Components/FontMenuSelector";
import { useFetchFonts } from "@shared/lib/hooks/Fonts/useFetchFonts";
import { HeadingSelector } from "@shared/ui/Selector_Components/HeadingSelector";
import { headingContent } from "@shared/lib/content/headingContent";

import styles from "./styles.module.scss";
import { FontSizeRange } from "@shared/ui/FontSizeRange";

export const TextMenu = () => {
  const googleFonts = useFetchFonts();

  return (
    <div className={`${styles.text_menu} dark:bg-dark-super `}>
      <div className={styles.text_menu__container}>
        <span className={styles.text_menu__container__text}>Text Settings</span>
        <FontAwesomeIcon
          icon={faClose}
          className={styles.text_menu__container__icon}
        />
      </div>
      <hr className={styles.text_menu__border} />
      <div className="flex flex-col items-start mt-4">
        <span className={styles.text_menu__text}>Style</span>
        <HeadingSelector options={headingContent} margin="mt-2" />
      </div>
      <div className="flex flex-col items-start justify-end mt-4 mb-5">
        <span className={styles.text_menu__text}>Fonts</span>
        <FontMenuSelector options={googleFonts} margin="mt-2" />
      </div>
      <hr className={`${styles.text_menu__border} !mt-2`} />
      <div className={styles.text_menu__buttons}>
        <button className={styles.text_menu__buttons__bold}>
          <strong>B</strong>
        </button>
        <button className={styles.text_menu__buttons__italic}>
          <i>I</i>
        </button>
        <button className={styles.text_menu__buttons__underline}>
          <u>U</u>
        </button>
        <button className={styles.text_menu__buttons__color}>
          <FontAwesomeIcon
            icon={faDroplet}
            className={styles.text_menu__buttons__color__tab}
          />{" "}
        </button>
        <button className={styles.text_menu__buttons__link}>
          <FontAwesomeIcon
            icon={faLink}
            className={styles.text_menu__buttons__link__icon}
          />
        </button>
      </div>
      <hr className={`${styles.text_menu__border} !mt-2`} />
      <div className="flex flex-col items-start mt-4">
        <span className={styles.text_menu__text}>Font size(px)</span>
        <FontSizeRange />
      </div>
      <hr className={`${styles.text_menu__border} !mt-2`} />
      <div className={styles.text_menu__buttons}>
        <button className={styles.text_menu__buttons__alignment}>
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon
              icon={faAlignLeft}
              className={styles.text_menu__buttons__color__icon}
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.text_menu__buttons__chevron}
            />
          </div>
        </button>
        <button className={styles.text_menu__buttons__alignment}>
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon
              icon={faList}
              className={styles.text_menu__buttons__color__icon}
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.text_menu__buttons__chevron}
            />
          </div>
        </button>
        <button className={styles.text_menu__buttons__alignment}>
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon
              icon={faIndent}
              className={styles.text_menu__buttons__color__icon}
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.text_menu__buttons__chevron}
            />
          </div>
        </button>
        <button className={styles.text_menu__buttons__alignment}>
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon
              icon={faArrowsLeftRight}
              className={styles.text_menu__buttons__color__icon}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
