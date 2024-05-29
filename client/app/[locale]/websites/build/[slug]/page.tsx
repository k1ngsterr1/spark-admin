"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useFetchPageContent } from "@shared/lib/hooks/useFetchPageContent";
import { useParseHTMLContent } from "@shared/lib/hooks/useParseHTMLContent";
import { useParams } from "next/navigation";
import { BlockButton } from "@shared/ui/BlockButton";
import {
  faDownLong,
  faTrash,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderEditor } from "@features/HeaderEditor";
import { AddBlockButton } from "@shared/ui/AddBlockButton";
import { useSectionMover } from "@shared/lib/hooks/useSectionMovement";

import styles from "./styles.module.scss";

//  Тут будет редактируемая страница
export default function ChangablePageContent() {
  const { slug } = useParams();
  const { htmlContent } = useFetchPageContent(slug);

  // Очищаем контент от лишних Body и HTML Тэгов
  const cleanContent = htmlContent?.replace(/<\/?body>|<\/?html>/gi, "");
  const { parsedSections } = useParseHTMLContent(cleanContent);

  const [sections, setSections] = useState<ReactNode[]>([]);
  const { moveSectionUp, moveSectionDown } = useSectionMover();

  useEffect(() => {
    setSections(parsedSections);
  }, [parsedSections]);

  return (
    <>
      <HeaderEditor
        isLoading={false}
        websiteName="Test"
        websiteURL="Test"
        pageURL="Test"
        pageType="Test"
      />
      {sections.map((item: any, index: number) => (
        <div key={index} className={styles.content_container}>
          <div className="w-[95%] flex justify-end gap-2 m-auto pt-3 pb-3">
            <BlockButton
              icon={faUpLong}
              onClick={() => moveSectionUp(sections, setSections, index)}
            />
            <BlockButton
              icon={faDownLong}
              onClick={() => moveSectionDown(sections, setSections, index)}
            />
            <BlockButton icon={faTrash} onClick={() => console.log("LOL")} />
          </div>
          {item}
          <div className="w-full flex justify-center items-center">
            <AddBlockButton />
          </div>
        </div>
      ))}
    </>
  );
}
