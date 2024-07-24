"use client";

import React from "react";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";
import Heading from "@shared/ui/Heading/index";
import { ErrorDisplay } from "@shared/ui/Error";
import { useSubmitRegister } from "@shared/lib/hooks/Form/useSubmitRegister";
import { useTranslations } from "next-intl";
import { Button } from "@shared/ui/Buttons_Components/Buttons";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";
import { Loading } from "@entities/Loading";

const Form = () => {
  const t = useTranslations("RegistrationPage");

  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    loading,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    handleSubmit,
    errors,
    backendError,
  } = useSubmitRegister();

  return (
    <section className={styles.registration}>
      {loading && <Loading />}
      <div className={styles.registration__content}>
        <div className={styles.registration__content__logo}>
          <SparkLogo />
        </div>
        <Heading text={t("heading")} margin="mt-8" />
        <form
          className={styles.registration__content__form}
          onSubmit={handleSubmit}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("username")}
            type="text"
            inputType="default"
            required
            name="username"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            type="email"
            inputType="default"
            required
            name="email"
          />
          <ErrorDisplay message={errors.email || ""} />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            margin="mt-3"
            type="password"
            required
            name="password"
          />
          <ErrorDisplay message={errors.password || ""} />
          <PasswordInput
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder={t("password_confirm")}
            margin="mt-3"
            type="password"
            required
            name="passwordConfirmation"
          />
          <ErrorDisplay message={backendError} />
          <ErrorDisplay message={errors.passwordConfirmation || ""} />
          <Button
            text={t("sign_up")}
            buttonType="regular"
            margin="mt-8"
            type="submit"
          />
        </form>
        <MiniText
          margin="mt-2"
          href="login"
          text={t("account")}
          linktext={t("login")}
        />
      </div>
    </section>
  );
};

export default Form;
