"use client";
import { useState } from "react";

import Link from "next/link";

import { ButtonLink } from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import HorizontalSeparator from "@shared/ui/Separators/HorizontalSeparators";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = () => {
  const [visible, setVisible] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <span className={styles.registration__heading}>Добро пожаловать</span>
        <form className={styles.registration__form}>
          <Input placeholder="Имя пользователя" type="text" />
          <Input placeholder="example@gmail.com" type="text" />
          <PasswordInput placeholder="Пароль" />
          <PasswordInput placeholder="Подтвердить пароль" />
          <ButtonLink
            text="Зарегистрироваться"
            buttonType="regular"
            margin="mt-8"
            href="email-confirmation"
          />
        </form>
        <div className={styles.registration__mini_text}>
          <span>Уже есть аккаунт? </span>
          <Link href="login" className={styles.login__orange}>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Form;
