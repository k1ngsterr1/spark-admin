import Heading from "@shared/ui/Heading";
import React from "react";
import Link from "next/link";
import { WebsitePageTab } from "@entities/Tabs_Components/WebsitePageTab";

import styles from "./styles.module.scss";

interface WebsiteInnerProps {
  websiteName: string;
  pageType: string;
  href: string;
  isLoading: boolean;
}

export const WebsiteInner: React.FC<WebsiteInnerProps> = ({
  websiteName,
  pageType,
  href,
  isLoading,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto">
        <Heading text="Example" />
      </div>
      <section className="w-[90%] flex items-center justify-between m-auto mt-8">
        <span className={`${styles.small_text} dark:text-white`}>
          Страницы сайта
        </span>
        <Link className="text-primary" href="https://sparkstudio.kz/home">
          https://sparkstudio.kz/home
        </Link>
      </section>
      <WebsitePageTab
        name={websiteName}
        pageType={pageType}
        href={href}
        isLoading={isLoading}
      />
    </div>
  );
};
