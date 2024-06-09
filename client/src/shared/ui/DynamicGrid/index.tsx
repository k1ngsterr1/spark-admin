"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const DynamicGrid = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  const radialGradient = `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 165, 0, 1), transparent 80%)`;

  const backgroundStyle = {
    backgroundImage: `${radialGradient},`,
    backgroundSize: "50px 50px",
  };

  return <div className={styles.grid} style={backgroundStyle}></div>;
};

export default DynamicGrid;
