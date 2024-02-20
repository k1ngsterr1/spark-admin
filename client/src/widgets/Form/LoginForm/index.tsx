"use client";
import { useState } from "react";

import Link from "next/link";

import { Button } from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";

import styles from "../styles/styles.module.scss";

<<<<<<< HEAD
import SparkLogo from "@assets/spark_product_logo.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import logo from "@assets/logo.webp";
// import { IoMdEye } from "react-icons/io";
// import { IoMdEyeOff } from "react-icons/io";
>>>>>>> 678f273510fdb90c540316657b244b89a60eb16b

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
          <div className={styles.registration__mini_text_change_password}>
            <span>Забыли ваш </span>
            <Link href="change-password" className={styles.login__orange}>
              пароль?
            </Link>
          </div>
          <Button text="Войти" buttonType="regular" margin="mt-4" />
        </form>
        <div className={styles.registration__mini_text}>
          <span>Еще нет аккаунта? </span>
          <Link href="registration" className={styles.login__orange}>
            Создать аккаунт
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
