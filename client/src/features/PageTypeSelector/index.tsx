"use client";
import React, { useState } from "react";
import { pageTypes } from "@shared/lib/content/pageTypeContent";
import { PageTypeTab } from "@shared/ui/PageTypeTab";
import { Button } from "@shared/ui/Buttons_Components/Buttons";

import styles from "./styles.module.scss";

interface IPageTypeSelectorProps {
  // Передача пропса для проверки роли юзера
  isAdmin: boolean;
}

export const PageTypeSelector: React.FC<IPageTypeSelectorProps> = ({
  isAdmin,
}) => {
  const [activeType, setActiveType] = useState<string | null>(null);

  const handleSetActive = (type: string) => {
    setActiveType(type);
  };

  return (
    <div className={styles.page_type_selector}>
      <div className="flex items-center gap-4">
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
      {isAdmin && (
        <div className="flex">
          <Button
            text="Создать шаблон"
            buttonType="regular--small"
            functionType="pageCardPopup"
          />
        </div>
      )}
    </div>
  );
};
