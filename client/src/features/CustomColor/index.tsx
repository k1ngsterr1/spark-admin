"use client";
import React, { useState } from "react";
import Draggable from "react-draggable";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "@features/ColorPicker";

export const CustomColorMenu = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff00bf");

  const handleOpenColorPicker = () => {
    setShowColorPicker(true);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleApplyColor = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false);
  };

  return (
    <Draggable handle=".handle">
      <div className={`${styles.custom_color} dark:bg-dark-super`}>
        <div className={`${styles.custom_color__upper} handle`}>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={styles.custom_color__upper__icon}
            />
            <span className={styles.custom_color__upper__text}>
              Custom Color
            </span>
          </div>
          <FontAwesomeIcon
            icon={faClose}
            className={styles.custom_color__upper__close}
          />
        </div>
        <hr className={styles.custom_color__border} />
        <ColorPicker
          initialColor={selectedColor}
          onCancel={handleCloseColorPicker}
          onApply={handleApplyColor}
        />
      </div>
    </Draggable>
  );
};
