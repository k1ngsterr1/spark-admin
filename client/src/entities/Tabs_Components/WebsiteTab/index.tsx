"use client";

import { faLink, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SyntheticEvent } from "react";
import { useTranslations } from "next-intl";

import styles from "./styles.module.scss";

interface IWebsiteTabProps {
  name: string;
  href: string;
  url: string;
}

export const WebsiteTab: React.FC<IWebsiteTabProps> = ({ name, href, url }) => {
  const router = useRouter();
  const t = useTranslations("WebsiteTab");

  const handleClick = (slug, event: SyntheticEvent) => {
    event.stopPropagation();
    router.push(`websites/${slug}`);
  };

  return (
    <div className="flex flex-col" onClick={(e) => handleClick(name, e)}>
      <div
        className={`${styles.sites_section} dark:bg-dark-lighter hover:dark:bg-dark-upper`}
      >
        <div className={styles.sites_section__name}>{name}</div>
        <div className={styles.sites_section__row}>
          <span
            className={styles.sites_section__row__click}
            onClick={(e) => handleClick(name, e)}
          >
            <FontAwesomeIcon
              icon={faEdit}
              className={styles.sites_section__row__item}
              size="lg"
              color="#FF5722"
            />
            {t("edit")}
          </span>
          <a
            href={href}
            onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
            target="_blank"
            className={styles.sites_section__row__hover}
          >
            <FontAwesomeIcon
              icon={faLink}
              className={styles.sites_section__row__item}
              size="lg"
              color="#FF5722"
            />
            {url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTab;
