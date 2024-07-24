"use client";
import React, { useState, useEffect } from "react";
import { pageTypes } from "@shared/lib/content/pageTypeContent";
import { PageTypeTab } from "@shared/ui/PageTypeTab";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import useScrollAnimation from "@shared/lib/hooks/animations/useScrollPageSelector";

import styles from "./styles.module.scss";

interface IPageTypeSelectorProps {
  // Передача пропса для проверки роли юзера
  isAdmin: boolean;
}

export const PageTypeSelector: React.FC<IPageTypeSelectorProps> = ({
  isAdmin,
}) => {
  const t = useTranslations("BuildWebsite");
  const { theme } = useTheme();
  const [activeType, setActiveType] = useState<string | null>(null);
  const { pageSelectorRef } = useScrollAnimation(100, theme);

  const handleSetActive = (type: string) => {
    setActiveType(type);
  };

  return (
    <div className={styles.page_type_selector} ref={pageSelectorRef}>
      <div className="flex items-center gap-4">
        {pageTypes.map((pageType) => (
          <PageTypeTab
            key={pageType.type}
            name={t(pageType.type)}
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
