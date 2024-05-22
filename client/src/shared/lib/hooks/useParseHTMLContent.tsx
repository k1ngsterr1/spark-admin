import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

export const useParseHTMLContent = (htmlContent: string) => {
  const [content, setContent] = useState<React.ReactNode[]>([]);

  const handleAddBlock = (index: number) => {
    console.log("Add block at index:", index);
  };

  useEffect(() => {
    if (htmlContent) {
      const sections = htmlContent.split(/<\/section>/);
      const contentWithButtons = sections.flatMap((section, index) => [
        parse(`${section}</section>`),
        <button
          key={`btn-${index}`}
          className="bg-red-500 w-20 h-20 rounded-full"
          onClick={() => handleAddBlock(index)}
        >
          +
        </button>,
      ]);
      setContent(contentWithButtons);

      console.log(
        content.map((item) =>
          React.isValidElement(item) ? "Valid React Element" : "Invalid Element"
        )
      );
    }
  }, [htmlContent]);

  return { content };
};
