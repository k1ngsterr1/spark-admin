"use client";
import { useState } from "react";

import Link from "next/link";

import { ButtonLink } from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";

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
          <PasswordInput placeholder="Пароль" margin="mt-3" />
          <PasswordInput placeholder="Подтвердить пароль" margin="mt-3" />
          <ButtonLink
            text="Зарегистрироваться"
            buttonType="regular"
            margin="mt-8"
            href="email-confirmation"
          />
        </form>
        <MiniText
          margin="mt-2"
          href="login"
          text="Уже есть аккаунт? "
          linktext="Войти"
        />
      </div>
    </section>
  );
};

export default Form;
