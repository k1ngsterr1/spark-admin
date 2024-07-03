import React, { useState } from "react";

export const FontSizeRange = () => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="range"
        id="slider"
        min="10"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <div style={{ fontSize: `${value}px` }}>
        This is a sample text with font size {value}px.
      </div>
    </div>
  );
};
