"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import Button from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import HorizontalSeparator from "@shared/ui/Separators/HorizontalSeparators";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  const [visible, setVisible] = useState(false);

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <span className={styles.registration__heading}>Welcome back</span>
        <form className={styles.registration__form}>
          <Input placeholder={"example@gmail.com"} />
          <PasswordInput
            placeholder="Password"
            type={visible ? "text" : "password"}
          />
          <div
            className={styles.show_password_login}
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
          <Button text="Login" buttonType="regular" margin="mt-8" />
        </form>
        <div className={styles.registration__minitext}>
          <span>Don't have an account? </span>
          <Link href="registration" className={styles.login__orange}>
            Sign up
          </Link>
        </div>
        <div className={styles.registration__text_separator}>
          <HorizontalSeparator />
          <span className={styles.registration__text_or}>OR</span>
          <HorizontalSeparator />
        </div>
        <Button
          text="Продолжить с Google"
          buttonType="transparent"
          margin="mt-5"
        ></Button>
      </div>
    </section>
  );
};

export default LoginForm;
