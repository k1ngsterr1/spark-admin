"use client";
import React, { useState } from "react";
import Draggable from "react-draggable";
import ColorPicker from "@features/ColorPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { MenuSeparator } from "@shared/ui/MenuSeparator";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@shared/lib/hooks/hooks";
import { closeCustomColorMenu } from "@redux/slices/customColorMenuSlice";

import styles from "./styles.module.scss";

export const CustomColorMenu = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff00bf");
  const isOpen = useAppSelector((state) => state.customColorMenu.isOpen);
  const dispatch = useDispatch();

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

  const handleCloseMenuColor = () => {
    dispatch(closeCustomColorMenu());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Draggable handle=".handle">
      <div className={`${styles.custom_color} dark:bg-dark-super`}>
        <div className={`${styles.custom_color__upper} handle`}>
          <span className={styles.custom_color__upper__text}>Custom Color</span>
          <FontAwesomeIcon
            icon={faClose}
            onClick={handleCloseMenuColor}
            className={styles.custom_color__upper__close}
          />
        </div>
        <MenuSeparator margin="mt-2" />
        <ColorPicker
          initialColor={selectedColor}
          onCancel={handleCloseColorPicker}
          onApply={handleApplyColor}
        />
      </div>
    </Draggable>
  );
};
