"use client";
import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        backgroundColor: "#FF5722",
        boxShadow: "0 0 30px 5px #FF5722",
        pointerEvents: "none", // This prevents the cursor element from interfering with mouse events
        transform: "translate(-50%, -50%)", // Centers the cursor effect on the cursor
        zIndex: 9999,
        transition: "transform 100ms, opacity 0.2s",
        opacity: 0.5, // Customize the opacity to your liking
      }}
    />
  );
};

export default Cursor;
