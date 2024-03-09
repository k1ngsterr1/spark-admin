import React from "react";

import styles from "./styles.module.scss";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons";

interface WebsitePageTabProps {
  name: string;
}

export const WebsitePageTab: React.FC<WebsitePageTabProps> = ({ name }) => {
  return (
    <div className={styles.website_page_tab}>
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faGlobe} className="text-primary text-2xl" />
        <span className="flex flex-col items-start ml-4">
          <span className={styles.website_page_tab__name}>{name}</span>
          <span className={styles.website_page_tab__type}>Главная</span>
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <ButtonLink
          buttonType="regular--small"
          text="Редактировать"
          href="zhopa"
        />
      </div>
    </div>
  );
};
