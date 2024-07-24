import React from "react";
import {
  IconDefinition,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { PlacesType } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

interface IMenuIconButton {
  icon?: IconDefinition;
  text?: any;
  onClick?: () => void;
  id: string;
  isIcon: boolean;
  isChevron: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  data_tooltip_id: string;
  data_tooltip_content: string;
  data_tooltip_place: PlacesType;
}

export const MenuIconButton: React.FC<IMenuIconButton> = ({
  icon,
  id,
  text,
  onClick,
  isIcon,
  isChevron,
  isBold,
  isItalic,
  isUnderline,
  data_tooltip_content,
  data_tooltip_id,
  data_tooltip_place,
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.menu_icon_button}
      id={id}
      data-tooltip-id={data_tooltip_id}
      data-tooltip-content={data_tooltip_content}
      data-tooltip-place={data_tooltip_place}
    >
      {isIcon ? (
        <FontAwesomeIcon
          icon={icon}
          className={styles.menu_icon_button__icon}
        />
      ) : isBold ? (
        <strong>{text}</strong>
      ) : isItalic ? (
        <i>{text}</i>
      ) : isUnderline ? (
        <u>{text}</u>
      ) : (
        text
      )}
      {isChevron && (
        <FontAwesomeIcon
          icon={faChevronDown}
          className={styles.menu_icon_button__chevron}
        />
      )}
    </button>
  );
};
