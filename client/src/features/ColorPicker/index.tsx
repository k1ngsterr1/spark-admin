"use client";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import styles from "./styles.module.scss"; // Make sure to create this file

const ColorPicker = ({ initialColor = "#ff00bf", onCancel, onApply }) => {
  const [color, setColor] = useState(initialColor);
  const [activeTab, setActiveTab] = useState("hex");

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleApply = () => {
    onApply(color);
  };

  return (
    <div className={`${styles.color_picker} dark:bg-dark-super`}>
      <SketchPicker color={color} onChangeComplete={handleColorChange} />
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
        <button
          className={activeTab === "hsb" ? styles.active : ""}
          onClick={() => setActiveTab("hsb")}
        >
          HSB
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
        {activeTab === "hsb" && (
          <input type="text" value="HSB value here" readOnly /> // Update to actual HSB value
        )}
      </div>
      <div className={styles.color_picker__buttons}>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default ColorPicker;
