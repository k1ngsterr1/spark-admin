import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export const useEditorHeading = (isOpen: boolean) => {
  const headerRef = useRef(null);
  const textRefs = useRef([]);

  const getTextRef = useCallback((index: number) => {
    if (!textRefs.current[index]) {
      textRefs.current[index] = { current: null };
    }
    return textRefs.current[index];
  }, []);

  useEffect(() => {
    if (headerRef.current) {
    }
  });
};
