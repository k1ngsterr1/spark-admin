import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

export const useParseHTMLContent = (htmlContent: string) => {
  const [parsedSections, setParsedSections] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (htmlContent) {
      const regex = /<\/(main|section|footer|header)>/g;
      const parts = htmlContent.split(regex);
      const sections = [];

      for (let i = 0; i < parts.length; i += 2) {
        if (i + 1 < parts.length) {
          sections.push(
            parse(`<${parts[i + 1]}>${parts[i]}</${parts[i + 1]}>`)
          );
        }
      }

      setParsedSections(sections);
    }
  }, [htmlContent]);

  return { parsedSections };
};
