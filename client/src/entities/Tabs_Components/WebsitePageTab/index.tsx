import React, { SyntheticEvent } from "react";
import SkeletonLoader from "@shared/ui/Skeleton_Loader";
import { useRouter } from "next/navigation";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface WebsitePageTabProps {
  name: string;
  pageType: string;
  href: string;
  id: number;
  isLoading: boolean;
}

export const WebsitePageTab: React.FC<WebsitePageTabProps> = ({
  name,
  pageType,
  isLoading,
  id,
}) => {
  const router = useRouter();

  const handleNavigate = (event: SyntheticEvent) => {
    event.stopPropagation();
    router.push(`/websites/pages/${name}/${id}`);
  };

  if (isLoading) {
    return (
      <div className={`${styles.website_page_tab} dark:bg-dark-lighter`}>
        <div className="flex gap-2 items-center">
          <SkeletonLoader width="24px" height="24px" className="circle" />
          <div className="flex flex-col items-start ml-4">
            <SkeletonLoader width="160px" height="20px" className="text" />
            <SkeletonLoader width="120px" height="16px" className="mt-4" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <SkeletonLoader width="120px" height="40px" />
          <SkeletonLoader width="120px" height="40px" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.website_page_tab} dark:bg-dark-lighter`}
      onClick={handleNavigate}
    >
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faGlobe} className="text-primary text-2xl" />
        <span className="flex flex-col items-start ml-4">
          <span className={styles.website_page_tab__name}>{name}</span>
          <span
            className={`${styles.website_page_tab__type} dark:text-primary`}
          >
            {pageType}
          </span>
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <ButtonLink
          buttonType="regular--small"
          text="Редактировать"
          href="/zhopa"
        />
        <ButtonLink buttonType="regular--small" text="Удалить" href="/zhopa" />
      </div>
    </div>
  );
};
