"use client";
import { useState } from "react";

import Link from "next/link";

import { Button } from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <span className={styles.registration__heading}>Войти</span>
        <form className={styles.registration__form}>
          <Input placeholder={"example@gmail.com"} />
          <PasswordInput placeholder="Пароль" />
          <MiniText
            margin="mt-2"
            href="change-password"
            text="Забыли ваш "
            linktext="пароль?"
          />
          <Button text="Войти" buttonType="regular" margin="mt-4" />
        </form>
        <MiniText
          margin="mt-2"
          href="registration"
          text="Еще нет аккаунта?"
          linktext="Создать аккаунт"
        />
      </div>
    </section>
  );
};

export default LoginForm;
