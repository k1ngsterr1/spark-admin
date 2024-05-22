import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

export const useParseHTMLContent = (htmlContent: string) => {
  const [sections, setSections] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (htmlContent) {
      const parsedSections = htmlContent
        .split(/<\/section>/)
        .map((section, index) => parse(`${section}</section>`));
      setSections(parsedSections);
    }
  }, [htmlContent]);

  return { sections };
};
