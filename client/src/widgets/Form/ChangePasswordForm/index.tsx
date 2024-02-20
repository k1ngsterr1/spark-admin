"use client";
import { useState } from "react";
import { ButtonLink } from "@shared/ui/Buttons/index";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChangePassword = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <h1 className={styles.registration__heading}>Сменить пароль</h1>
        <form className={styles.registration__form}>
          <PasswordInput placeholder="Текущий пароль" />
          <PasswordInput placeholder="Новый пароль" />
          <PasswordInput placeholder="Повторите новый пароль" />
          <ButtonLink
            text="Сменить пароль"
            buttonType="regular"
            margin="mt-8"
            href="login"
          />
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
