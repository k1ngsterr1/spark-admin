import { useRef, useEffect } from "react";
import gsap from "gsap";

export const useSideMenu = (
  isOpen: boolean
): {
  menuRef: React.RefObject<HTMLElement>;
} => {
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      const maxWidth = "250px";
      const minWidth = "90px";

      // Adjust width and opacity based on isOpen state
      gsap.to(menuRef.current, {
        width: isOpen ? maxWidth : minWidth,
        duration: 0.5,
        ease: "power1.inOut",
      });

      // Control the opacity of text labels
      gsap.to(menuRef.current.querySelectorAll(".nav-text"), {
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        delay: isOpen ? 0.3 : 0,
        ease: "power1.inOut",
      });
    }
  }, [isOpen]);

  return { menuRef };
};
