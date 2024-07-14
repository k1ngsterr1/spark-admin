import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useHolographicAnimation = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element

        gsap.to(cardRef, {
          backgroundPosition: `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      cardRef.current?.addEventListener("mousemove", handleMouseMove);

      return () => {
        cardRef.current?.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return { cardRef };
};
