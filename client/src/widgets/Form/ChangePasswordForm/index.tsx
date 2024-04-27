'use client'

import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons/index";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import Heading from "@shared/ui/Heading/index";
import { useChangePassword } from "@shared/lib/hooks/Form/useChangePassword";
import { useState , FormEvent} from "react";
import Input from "@shared/ui/Inputs/DefaultInport";
import {useUserData} from "@shared/lib/hooks/Form/useGetData";


import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');

  const userData = useUserData()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const result = await useChangePassword({  code, newPassword });
    if (typeof result === 'string') {
      alert(result); 
    }
  };
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__content__logo}>
          <SparkLogo />
        </div>
        <Heading text="Сменить пароль" margin="mt-8" />
        <div className={styles.registration__content__mail}>
          <span className={styles.registration__content__mail__text}>
            Письмо с подтверждением отправлено на почту
            <div>
              <span className={styles.registration__content__mail__text_orange}>{userData.email || 'Неизвестно'}</span>
            </div>
          </span>
        </div>
        <form className={styles.registration__content__form} onSubmit={handleSubmit}>
        <Input
            placeholder={"Ваш код"}
            inputType="default"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
          />        
          <PasswordInput placeholder="Новый пароль" margin="mt-3" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
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
