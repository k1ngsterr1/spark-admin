import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export const useSideMenu = (isOpen: boolean) => {
  const menuRef = useRef(null);
  const textRefs = useRef([]);
  const logoRef = useRef(null);

  const getTextRef = useCallback((index: number) => {
    if (!textRefs.current[index]) {
      textRefs.current[index] = { current: null };
    }
    return textRefs.current[index];
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      const maxWidth = "250px";
      const minWidth = "90px";

      const logoOpenedWidth = "90px";
      const logoClosedWith = "60px";

      // Adjust the sidebar width
      gsap.to(menuRef.current, {
        width: isOpen ? maxWidth : minWidth,
        duration: 0.5,
        ease: "power1.inOut",
      });

      textRefs.current.forEach((ref) => {
        if (ref.current) {
          gsap.to(ref.current, {
            opacity: isOpen ? 1 : 0,
            duration: 0.3,
            delay: isOpen ? 0.3 : 0,
            ease: "power1.inOut",
          });
        }
      });

      gsap.to(logoRef.current, {
        width: isOpen ? logoOpenedWidth : logoClosedWith,
      });
    }
  }, [isOpen]);

  return { menuRef, getTextRef, logoRef };
};
