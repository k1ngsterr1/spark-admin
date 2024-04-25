'use client'

import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons/index";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import Heading from "@shared/ui/Heading/index";
import { useChangePassword } from "@shared/lib/hooks/Form/useChangePassword";
import { useState } from "react";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const result = await useChangePassword({  currentPassword, newPassword, confirmNewPassword });
    if (typeof result === 'string') {
      alert(result); 
    }
  };
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <Heading text="Сменить пароль" margin="mt-8" />
        <form className={styles.registration__form} onSubmit={handleSubmit}>
          <PasswordInput placeholder="Текущий пароль" margin="mt-3" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
          <PasswordInput placeholder="Новый пароль" margin="mt-3" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
          <PasswordInput placeholder="Повторите новый пароль" margin="mt-3" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
          <ButtonLink
            text="Сменить пароль"
            buttonType="regular"
            margin="mt-8"
            href="login"
          />
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
