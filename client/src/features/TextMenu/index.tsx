"use client";
import React from "react";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import { FontSizeRange } from "@shared/ui/FontSizeRange";
import { useDispatch } from "react-redux";
import { generalColorMenu, openColorMenu } from "@redux/slices/colorMenuSlice";
import { ReactTooltip } from "@shared/ui/Tooltip";
import { MenuIconButton } from "@shared/ui/MenuIconButton";
import { closeTextMenu } from "@redux/slices/textMenuSlice";
import { useAppSelector } from "@shared/lib/hooks/hooks";

import styles from "./styles.module.scss";

export const TextMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useAppSelector((state) => state.textMenu.isOpen);
  const googleFonts = useFetchFonts();

  const handleOpenColorMenu = () => {
    dispatch(generalColorMenu());
  };

  const handleCloseTextMenu = () => {
    dispatch(closeTextMenu());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Draggable handle=".handle">
      <div className={`${styles.text_menu} dark:bg-dark-super `}>
        <div className={`${styles.text_menu__container} handle`}>
          <span className={styles.text_menu__container__text}>
            Text Settings
          </span>
          <FontAwesomeIcon
            icon={faClose}
            onClick={handleCloseTextMenu}
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
          <MenuIconButton
            text="B"
            id="bold"
            isChevron={false}
            isIcon={false}
            isBold
            data_tooltip_content="Bold"
            data_tooltip_id="bold"
            data_tooltip_place="top"
          />
          <ReactTooltip id="bold" />
          <MenuIconButton
            text="I"
            id="italic"
            isChevron={false}
            isIcon={false}
            isItalic
            data_tooltip_content="Italic"
            data_tooltip_id="italic"
            data_tooltip_place="top"
          />
          <ReactTooltip id="italic" />
          <MenuIconButton
            text="U"
            id="underline"
            isChevron={false}
            isIcon={false}
            isUnderline
            data_tooltip_content="Underline"
            data_tooltip_id="underline"
            data_tooltip_place="top"
          />
          <ReactTooltip id="underline" />
          <MenuIconButton
            id="droplet"
            isIcon
            onClick={() => handleOpenColorMenu()}
            isChevron={false}
            data_tooltip_id="droplet"
            data_tooltip_content="Change your color"
            data_tooltip_place="top"
            icon={faDroplet}
          />
          <ReactTooltip id="droplet" />
          <MenuIconButton
            id="link"
            isIcon
            isChevron={false}
            data_tooltip_id="link"
            data_tooltip_content="Insert Links In Your Text"
            data_tooltip_place="top"
            icon={faLink}
          />
          <ReactTooltip id="link" />
        </div>
        <hr className={`${styles.text_menu__border} !mt-2`} />
        <div className="flex flex-col items-start mt-4">
          <span className={styles.text_menu__text}>Font size(px)</span>
          <FontSizeRange />
        </div>
        <hr className={`${styles.text_menu__border} !mt-2`} />
        <div className={styles.text_menu__buttons}>
          <button
            className={styles.text_menu__buttons__alignment}
            id="alignment"
            data-tooltip-id="alignment"
            data-tooltip-content="Alignment"
            data-tooltip-place="top"
          >
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
          <ReactTooltip id="alignment" />
          <button
            className={styles.text_menu__buttons__alignment}
            id="alignment"
            data-tooltip-id="bullets"
            data-tooltip-content="Bullets & numbering"
            data-tooltip-place="top"
          >
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
          <ReactTooltip id="bullets" />

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
    </Draggable>
  );
};
