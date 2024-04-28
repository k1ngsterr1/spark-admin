"use client";

import React from "react";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";
import Heading from "@shared/ui/Heading/index";
import { ErrorDisplay } from "@shared/ui/Error";
import { useSubmitRegister } from "@shared/lib/hooks/Form/useSubmitRegister";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const Form = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    handleSubmit,
  } = useSubmitRegister();

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__content__logo}>
          <SparkLogo />
        </div>
        <Heading text="Добро пожаловать" margin="mt-8" />
        <form
          className={styles.registration__content__form}
          onSubmit={handleSubmit}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Имя пользователя"
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
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            margin="mt-3"
            type="password"
            required
            name="password"
          />
          <ErrorDisplay message={passwordError} />
          <PasswordInput
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Подтвердить пароль"
            margin="mt-3"
            type="password"
            required
            name="passwordConfirmation"
          />
          <ErrorDisplay message={confirmPasswordError} />
          <Button
            text="Зарегистрироваться"
            buttonType="regular"
            margin="mt-8"
            type="submit"
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
