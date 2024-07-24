"use client";
import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactTooltip } from "../Tooltip";

import styles from "./styles.module.scss";

interface IAddColorTab {
  onClick: () => void;
}

export const AddColorTab: React.FC<IAddColorTab> = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={styles.add_color_tab}
        data-tooltip-id="add_color"
        data-tooltip-content="Add your color"
        data-tooltip-place="top"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <ReactTooltip id="add_color" />
    </>
  );
};
