import React from "react";

import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleUser,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { KebabMenu } from "@shared/ui/KebabMenu";
import { useTranslations } from "next-intl";

interface IFormTab {
  name: string;
  phoneNumber: string;
  email: string;
  date: string;
}

export const FormTab: React.FC<IFormTab> = ({
  name,
  phoneNumber,
  email,
  date,
}) => {
  const t = useTranslations("Requests");

  return (
    <div className={`${styles.form_tab} dark:bg-dark-lighter`}>
      <span className={styles.form_tab__name}>
        <FontAwesomeIcon
          icon={faCircleUser}
          className={styles.form_tab__name__icon}
        />
        {name}
      </span>
      <span className={styles.form_tab__phoneNumber}>
        {" "}
        <FontAwesomeIcon
          icon={faPhone}
          className={styles.form_tab__phoneNumber__icon}
        />{" "}
        {phoneNumber}
      </span>
      <span className={styles.form_tab__email}>
        {" "}
        <FontAwesomeIcon
          icon={faEnvelope}
          className={styles.form_tab__email__icon}
        />{" "}
        {email}
      </span>
      <span className={styles.form_tab__date}>
        {" "}
        <FontAwesomeIcon
          icon={faCalendar}
          className={styles.form_tab__date__icon}
        />{" "}
        {date}
      </span>
      <KebabMenu buttons={<span className="mt-2 mb-2">{t("delete")}</span>} />
    </div>
  );
};
