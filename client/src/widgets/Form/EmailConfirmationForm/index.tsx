"use client";
import { useState } from "react";

import Link from "next/link";

import { Button } from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const EmailConfirm = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <h1 className={styles.registration__heading}>Подтверждение почты</h1>
        <div className={styles.registration__mini_text_account_user}>
          <span>Аккаунт:</span>
          <span className={styles.login__orange}>smth</span>
        </div>
        <div className={styles.registration__mini_text_account_mail}>
          <span>Письмо с подтверждением отправлена на почту </span>
          <div className={styles.login__orange}>ruslanmakmhatom@gmail.com</div>
        </div>
        <form className={styles.registration__form}>
          <Button text="Login" buttonType="regular" margin="mt-8" />
        </form>
      </div>
    </section>
  );
};

export default EmailConfirm;
