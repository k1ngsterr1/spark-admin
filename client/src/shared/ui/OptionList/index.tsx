import React from "react";
import { ButtonLink } from "../Buttons";

import styles from "./styles.module.scss";
import { AdditionalButtons } from "../AdditionalButtons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface OptionItem {
  name: string;
}

interface OptionListProps {
  options: OptionItem[];
}

export const OptionList: React.FC<OptionListProps> = ({ options }) => {
  return (
    <div className={styles.option_list}>
      <div className="flex items-center gap-2">
        <ButtonLink
          text="Добавить новую страницу"
          buttonType="regular--xs"
          href="aa"
        />
        <AdditionalButtons icon={faSearch} />
      </div>
    </div>
  );
};
