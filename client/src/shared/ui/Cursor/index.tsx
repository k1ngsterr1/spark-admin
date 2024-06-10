"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      position.current = { x: event.clientX, y: event.clientY };
      gsap.to(cursorRef.current, {
        x: position.current.x,
        y: position.current.y,
        duration: 0.1, // smooth and quick mouse follow
        ease: "Power3.easeOut",
      });
    };

    const hoverables = document.querySelectorAll(".hoverable");
    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, {
        scale: 0.75, // Smaller size when hovering
        boxShadow: "0px 0px 150px 25px #FF5722",
        duration: 0.3,
        ease: "Power3.easeOut",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, {
        scale: 1, // Return to original size
        boxShadow: "0px 0px 300px 50px #FF5722",
        duration: 0.3,
        ease: "Power3.easeOut",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        boxShadow: "0px 0px 300px 50px #FF5722",

        backgroundColor: "#FF5722",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)", // Centers the cursor effect on the cursor
        zIndex: 9999,
        opacity: 0.5, // Customize the opacity to your liking
      }}
    />
  );
};

export default Cursor;
