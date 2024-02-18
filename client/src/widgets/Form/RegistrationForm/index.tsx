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

const Form = () => {
  const [visible, setVisible] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <span className={styles.registration__heading}>Welcome back</span>
        <form className={styles.registration__form}>
          <Input placeholder="Username" type="text" />
          <Input placeholder="example@gmail.com" type="text" />
          <PasswordInput
            placeholder="Password"
            type={visible ? "text" : "password"}
          />
          <div
            className={styles.show_password}
            onClick={() => setVisible(!visible)}
          >
            {visible ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
          <PasswordInput
            placeholder="Confirm Password"
            type={visibleConfirmPassword ? "text" : "password"}
          />
          <div
            className={styles.show_password_confirm}
            onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}
          >
            {visibleConfirmPassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
          <Button text="Sign Up" buttonType="regular" margin="mt-8" />
        </form>
        <div className={styles.registration__minitext}>
          <span>Already a User? </span>
          <Link href="login" className={styles.login__orange}>
            Login
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
        {/* <FontAwesomeIcon icon={faGoogle} /> */}
      </div>
    </section>
  );
};

export default Form;
