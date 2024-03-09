import React from "react";
import { ButtonLink } from "../../Buttons_Components/Buttons";
import { AdditionalButtons } from "../../Buttons_Components/AdditionalButtons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import { Option } from "../Option";

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
      <div className="flex flex-col items-center mt-4 gap-2">
        <Option name="Example" />
        <Option name="Example" />
        <Option name="Example" />
      </div>
    </div>
  );
};
