// useScrollAnimation.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimation = (movement: any, theme: any) => {
  const pageSelectorRef = useRef(null);

  console.log(theme);

  useEffect(() => {
    if (pageSelectorRef.current) {
      gsap.to(pageSelectorRef.current, {
        y: movement,
        scrollTrigger: {
          trigger: pageSelectorRef.current,
          start: "top top",
          onEnter: () =>
            gsap.to(pageSelectorRef.current, {
              backgroundColor: theme === "dark" ? "#474556" : "#FFFFFF",
              position: "sticky",
              right: "0px",
              top: "-80px",
              boxShadow: "0 4px 8px rgba(255, 111, 67, 0.5)",
              padding: "16px",
              borderRadius: "12px",
              ease: "none",
            }),
          onLeaveBack: () => {
            console.log("Left Back");
            gsap.to(pageSelectorRef.current, {
              backgroundColor: "transparent",
              position: "relative",
              boxShadow: "none", // Remove the shadow
              padding: "0px", // Reset padding if needed
              borderRadius: "0", // Reset borderRadius if needed
              ease: "none",
            });
          },
        },
      });
    } else {
      console.warn("No elements matched the selector:", selector);
    }
  }, [movement, theme]);

  return { pageSelectorRef };
};

export default useScrollAnimation;
