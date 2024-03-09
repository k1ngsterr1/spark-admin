import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface SiteValueProps {
  icon: IconDefinition;
  value: string;
  margin: string;
}

export const SiteValue: React.FC<SiteValueProps> = ({
  icon,
  value,
  margin,
}) => {
  return (
    <div className={`${"flex items-center w-[105%] justify-around"} ${margin}`}>
      <FontAwesomeIcon icon={icon} color="#FF5722" size="base" />
      <div className="flex">
        <p className={styles.value}>Кол-во сайтов: {value}</p>
      </div>
    </div>
  );
};
