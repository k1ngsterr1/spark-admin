import React from "react";
import { useTranslations } from "next-intl";
import { supportTabContent } from "@shared/lib/content/supportContent";
import Heading from "@shared/ui/Heading";

import styles from "./styles.module.scss";
import { SupportTab } from "@entities/SupportTab";

export const SupportScreen = () => {
  const t = useTranslations("Support");

  return (
    <main className={styles.container}>
      <div className="flex justify-between w-[90%] items-center mb-24">
        <Heading text={t("support")} />
      </div>
      <div className={styles.gridContainer}>
        {supportTabContent.map((item, index) => (
          <SupportTab
            additionalStyles={styles.gridItem}
            key={index}
            name={t(item.name)}
            description={t(item.description)}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </main>
  );
};
