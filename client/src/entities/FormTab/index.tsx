import React from "react";
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
import { useDeleteRequest } from "@shared/lib/hooks/Requests/useDeleteRequests";

import styles from "./styles.module.scss";

interface IFormTab {
  name: string;
  phoneNumber: string;
  email: string;
  date: string;
  index: number;
}

export const FormTab: React.FC<IFormTab> = ({
  name,
  phoneNumber,
  email,
  date,
  index,
}) => {
  const t = useTranslations("Requests");
  const { deleteRequest } = useDeleteRequest();

  return (
    <div className={`${styles.form_tab} dark:bg-dark-lighter`}>
      <span className={styles.form_tab__name}>
        <FontAwesomeIcon
          icon={faCircleUser}
          className={styles.form_tab__name__icon}
        />
        {name}
      </span>
      <span className={`${styles.form_tab__phoneNumber} dark:text-white`}>
        {" "}
        <FontAwesomeIcon
          icon={faPhone}
          className={styles.form_tab__phoneNumber__icon}
        />{" "}
        {phoneNumber}
      </span>
      <span className={`${styles.form_tab__email} dark:text-white`}>
        {" "}
        <FontAwesomeIcon
          icon={faEnvelope}
          className={styles.form_tab__email__icon}
        />{" "}
        {email}
      </span>
      <span className={`${styles.form_tab__date} dark:text-white`}>
        {" "}
        <FontAwesomeIcon
          icon={faCalendar}
          className={styles.form_tab__date__icon}
        />{" "}
        {date}
      </span>
      <KebabMenu
        buttons={
          <span className="mt-2 mb-2" onClick={() => deleteRequest(index)}>
            {t("delete")}
          </span>
        }
      />
    </div>
  );
};
