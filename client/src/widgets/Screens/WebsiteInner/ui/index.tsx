import Heading from "@shared/ui/Heading";
import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import { WebsitePageTab } from "@entities/WebsitePageTab";
import { WebsiteTab } from "@entities/WebsiteTab";

interface WebsiteInnerProps {
  websiteName: string;
}

export const WebsiteInner: React.FC<WebsiteInnerProps> = ({ websiteName }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto">
        <Heading text="Example" />
      </div>
      <section className="w-[90%] flex items-center justify-between m-auto mt-8">
        <span className={styles.small_text}>Страницы сайта</span>
        <Link className="text-primary" href="https://sparkstudio.kz/home">
          https://sparkstudio.kz/home
        </Link>
      </section>
      <WebsitePageTab name="Главная страница Spark Studio" />
    </div>
  );
};
