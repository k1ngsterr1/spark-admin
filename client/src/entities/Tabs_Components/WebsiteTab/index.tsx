"use client";

import { faLink, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";
import { SyntheticEvent } from "react";

import styles from "./styles.module.scss";

interface IWebsiteTabProps {
  name: string;
  href: string;
  url: string;
  isLoading: boolean;
}

export const WebsiteTab: React.FC<IWebsiteTabProps> = ({ name, href, url, isLoading }) => {
  const router = useRouter();

  const handleClick = (slug: string, event: SyntheticEvent) => {
    event.stopPropagation();
    router.push(`/websites/pages/${slug}`);
  };

  if (isLoading) {
    return (
      <div className={styles.sites_section}>
        <SkeletonLoader width="1000px" height="16px" className="circle" />
      </div>
    )
  }

  return (
    <div className="flex flex-col" onClick={(e) => handleClick(name, e)}>
      <div
        className={`${styles.sites_section} dark:bg-dark-lighter hover:dark:bg-dark-upper`}
      >
        <div className={styles.sites_section__name}>{name}</div>
        <div className={styles.sites_section__row}>
          <span className={styles.sites_section__row__click}>
            <FontAwesomeIcon
              icon={faEdit}
              className={styles.sites_section__row__item}
              size="lg"
              color="#FF5722"
            />
            Редактировать Сайт
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
