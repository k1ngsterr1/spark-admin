import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

export const useParseHTMLContent = (htmlContent: string) => {
  const [parsedSections, setParsedSections] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (htmlContent) {
      const sections = htmlContent
        .split(/<\/section>/)
        .map((section, index) => parse(`${section}</section>`));
      setParsedSections(sections);
    }
  }, [htmlContent]);

  return { parsedSections };
};
