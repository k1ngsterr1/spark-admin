"use client";
import { useState } from "react";

import Link from "next/link";

import Button from "@shared/ui/Buttons";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChangePassword = () => {
  const [visibleCurrent, setVisibleCurrent] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleReType, setVisibleReType] = useState(false);

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <span className={styles.registration__heading}>Change password</span>
        <form className={styles.registration__form}>
          <PasswordInput
            placeholder="Current password"
            type={visibleCurrent ? "text" : "password"}
          />
          <div
            className={styles.show_password_current}
            onClick={() => setVisibleCurrent(!visibleCurrent)}
          >
            {visibleCurrent ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
          <PasswordInput
            placeholder="New password"
            type={visibleNew ? "text" : "password"}
          />
          <div
            className={styles.show_password_new}
            onClick={() => setVisibleNew(!visibleNew)}
          >
            {visibleNew ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
          <PasswordInput
            placeholder="Re-type new password"
            type={visibleReType ? "text" : "password"}
          />
          <div
            className={styles.show_password_retype}
            onClick={() => setVisibleReType(!visibleReType)}
          >
            {visibleReType ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
          <div className={styles.registration__minitext}>
            <span>Forgot your </span>
            <Link href="registration" className={styles.login__orange}>
              password?
            </Link>
          </div>
          <Button text="Change password" buttonType="regular" margin="mt-6" />
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
