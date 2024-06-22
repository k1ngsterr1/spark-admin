import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHolographicAnimation } from "@shared/lib/hooks/animations/useHolographicAnimation";

import styles from "./styles.module.scss";

interface ISwiperCard {
  name: string;
  icon: IconDefinition;
  description: string;
}

export const SwiperCard: React.FC<ISwiperCard> = ({
  name,
  icon,
  description,
}) => {
  const { cardRef } = useHolographicAnimation();

  return (
    <div className={styles.card} ref={cardRef}>
      <div className="flex items-center gap-2 justify-center">
        <FontAwesomeIcon icon={icon} className={styles.card__icon} />
        <span className={styles.card__name}>{name}</span>
      </div>
      <p className={styles.card__paragraph}>{description}</p>
    </div>
  );
};
