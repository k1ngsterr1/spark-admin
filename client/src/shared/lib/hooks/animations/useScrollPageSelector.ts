// useScrollAnimation.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimation = (movement: any) => {
  const pageSelectorRef = useRef(null);

  useEffect(() => {
    if (pageSelectorRef.current) {
      gsap.to(pageSelectorRef.current, {
        y: movement,
        scrollTrigger: {
          trigger: pageSelectorRef.current,
          start: "top top",
          //   pin: true,
          onEnter: () =>
            gsap.to(pageSelectorRef.current, {
              backgroundColor: "#474556",
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
              padding: "0", // Reset padding if needed
              borderRadius: "0", // Reset borderRadius if needed
              ease: "none",
            });
          },
        },
      });
    } else {
      console.warn("No elements matched the selector:", selector);
    }
  }, [movement]);

  return { pageSelectorRef };
};

export default useScrollAnimation;
