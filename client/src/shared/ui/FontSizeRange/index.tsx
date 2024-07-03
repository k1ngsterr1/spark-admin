import React, { useState } from "react";
import styles from "./styles.module.scss";

export const FontSizeRange = () => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex items-center gap-8">
      <input
        type="range"
        id="slider"
        min="10"
        className={styles.slider_input}
        max="100"
        value={value}
        onChange={handleChange}
      />
      <div className={styles.slider_input__size}>{value}</div>
    </div>
  );
};
