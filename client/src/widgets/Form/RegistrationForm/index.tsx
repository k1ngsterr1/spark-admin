'use client'

import React, { useState } from 'react';
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";
import Heading from "@shared/ui/Heading/index";
import {useRegister}  from '@shared/lib/hooks/Form/useRegister';

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const Form = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    setPasswordError('');
    setConfirmPasswordError('');

    if (password !== confirmPassword) {
      setConfirmPasswordError("Пароли не совпадают");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Пароль должен содержать не менее 6 символов");
      isValid = false;
    }

    if (isValid) {
      const result = await useRegister({ username, email, password, confirmPassword });
      if (typeof result === 'string') {
        alert(result);
      }
    }
  };

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <Heading text="Добро пожаловать" margin="mt-8" />
        <form className={styles.registration__form} onSubmit={handleSubmit}>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Имя пользователя"
            type="text"
            inputType="default"
            required
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            type="email"
            inputType="default"
            required
          />
          <PasswordInput
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
            margin="mt-3"
            type='password'
            required
          />
          {passwordError && <div className={styles.error}>{passwordError}</div>}
          <PasswordInput
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Подтвердить пароль"
            margin="mt-3"
            type='password'
            required
          />
          {confirmPasswordError && <div className={styles.error}>{confirmPasswordError}</div>}
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
