"use client";
import React, { useState } from "react";
import { pageTypes } from "@shared/lib/content/pageTypeContent";
import { PageTypeTab } from "@shared/ui/PageTypeTab";
import styles from "./styles.module.scss";

export const PageTypeSelector = () => {
  const [activeType, setActiveType] = useState<string | null>(null);

  const handleSetActive = (type: string) => {
    setActiveType(type);
  };

  return (
    <div className={styles.page_type_selector}>
      {pageTypes.map((pageType) => (
        <PageTypeTab
          key={pageType.type}
          name={pageType.label}
          type={pageType.type}
          isActive={activeType === pageType.type}
          onClick={() => handleSetActive(pageType.type)}
        />
      ))}
    </div>
  );
};
