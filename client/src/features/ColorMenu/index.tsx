"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ColorTab } from "@shared/ui/ColorTab";
import { AddColorTab } from "@shared/ui/AddColorTab";
import { useDispatch } from "react-redux";
import { closeColorMenu } from "@redux/slices/colorMenuSlice";
import Draggable from "react-draggable";

import styles from "./styles.module.scss";

const colors = [
  "#ffffff",
  "#f5f5f5",
  "#d3d3d3",
  "#a9a9a9",
  "#000000",
  "#008000",
  "#add8e6",
  "#ff4500",
];

export const ColorMenu = () => {
  const rows = [];
  for (let i = 0; i < colors.length; i += 5) {
    rows.push(colors.slice(i, i + 5));
  }

  const dispatch = useDispatch();

  const handleCloseColorMenu = () => {
    dispatch(closeColorMenu());
  };

  return (
    <Draggable>
      <div className={`${styles.color_menu}  dark:bg-dark-super handle`}>
        <div className={styles.color_menu__upper}>
          <span className={styles.color_menu__upper__text}>Color Picker</span>
          <FontAwesomeIcon
            icon={faClose}
            onClick={handleCloseColorMenu}
            className={styles.color_menu__upper__icon}
          />
        </div>
        <hr className={styles.color_menu__border} />
        <div className={styles.color_menu__theme_colors}>
          <div className="flex items-center justify-between">
            <span className={styles.color_menu__theme_colors__text}>
              Theme colors
            </span>
            <button className={styles.color_menu__theme_colors__link}>
              Edit
            </button>
          </div>
          <div className={styles.color_menu__theme_colors__colors}>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.color_row}>
                {row.map((color, index) => (
                  <ColorTab key={index} color={color} />
                ))}
                {rowIndex === rows.length - 1 && (
                  <AddColorTab onClick={() => console.log("LOL")} />
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className={`${styles.color_menu__border} !mt-6`} />
        <div className={styles.color_menu__theme_colors}>
          <div className="flex items-center justify-between">
            <span className={styles.color_menu__theme_colors__text}>
              My colors
            </span>
            <button className={styles.color_menu__theme_colors__link}>
              + Add
            </button>
          </div>
          <div className={styles.color_menu__theme_colors__colors}>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.color_row}>
                {row.map((color, index) => (
                  <ColorTab key={index} color={color} />
                ))}
                {rowIndex === rows.length - 1 && (
                  <AddColorTab onClick={() => console.log("LOL")} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
