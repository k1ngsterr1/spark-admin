"use client";
import { useFetchPageContent } from "@shared/lib/hooks/useFetchPageContent";
import { useParseHTMLContent } from "@shared/lib/hooks/useParseHTMLContent";
import { useParams } from "next/navigation";
import React from "react";

//  Тут будет редактируемая страница
export default function ChangablePageContent() {
  const { slug } = useParams();
  const { htmlContent } = useFetchPageContent(slug);
  const cleanContent = htmlContent?.replace(/<\/?body>|<\/?html>/gi, ""); // Remove body and html tags
  const { content } = useParseHTMLContent(cleanContent);

  const parsedContent = content.map((item, index) => (
    <React.Fragment key={index}>{item}</React.Fragment>
  ));

  console.log(content);

  // return <div dangerouslySetInnerHTML={{ __html: htmlContent }} id="zhopa" />;
  return (
    <div>
      {content.map((item, index) => (
        <React.Fragment key={index}>{item}</React.Fragment>
      ))}
    </div>
  );
}
