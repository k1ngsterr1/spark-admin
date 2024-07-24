"use client";

import { ReactNode } from "react";

// Функция которая двигает блоки в админке
export function useSectionMover() {
  const moveSection = (
    sections: any[] | ReactNode[],
    setSections: any,
    index: number,
    direction: number
  ) => {
    const position = index + direction;
    if (position < 0 || position >= sections.length) return;
    const newSections = [...sections];
    [newSections[index], newSections[position]] = [
      newSections[position],
      newSections[index],
    ];
    setSections(newSections);
  };

  const moveSectionUp = (
    sections: any[] | ReactNode[],
    setSections: any,
    index: number
  ) => moveSection(sections, setSections, index, -1);

  const moveSectionDown = (
    sections: any[] | ReactNode[],
    setSections: any,
    index: number
  ) => moveSection(sections, setSections, index, 1);

  return {
    moveSectionUp,
    moveSectionDown,
  };
}
