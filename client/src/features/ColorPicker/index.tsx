"use client";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import styles from "./styles.module.scss";
import { Button } from "@shared/ui/Buttons_Components/Buttons";

const ColorPicker = ({ onCancel, onApply }) => {
  const [color, setColor] = useState("#FF5722");
  const [activeTab, setActiveTab] = useState("hex");

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleApply = () => {
    onApply(color);
  };

  return (
    <div className={`${styles.color_picker} dark:bg-dark-super`}>
      <HexColorPicker
        color={color}
        onChange={setColor}
        className={styles.color_picker__scheme}
      />
      <div
        className={styles.color_picker__tab}
        style={{
          backgroundColor: color,
        }}
      />
      <div className={styles.color_picker__tabs}>
        <button
          className={activeTab === "hex" ? styles.active : ""}
          onClick={() => setActiveTab("hex")}
        >
          HEX
        </button>
        <button
          className={activeTab === "rgb" ? styles.active : ""}
          onClick={() => setActiveTab("rgb")}
        >
          RGB
        </button>
      </div>
      <div className={styles.color_picker__input}>
        {activeTab === "hex" && <input type="text" value={color} readOnly />}
        {activeTab === "rgb" && (
          <input
            type="text"
            value={`rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
              color.slice(3, 5),
              16
            )}, ${parseInt(color.slice(5, 7), 16)})`}
            readOnly
          />
        )}
      </div>
      <div className={styles.color_picker__buttons}>
        <Button
          buttonType="regular--xxs--cancel"
          text="Cancel"
          margin="!rounded-full"
        />
        <Button buttonType="regular--xxs" text="Apply" margin="!rounded-full" />
      </div>
    </div>
  );
};

export default ColorPicker;
