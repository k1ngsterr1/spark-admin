'use client'

import { Button } from "@shared/ui/Buttons_Components/Buttons";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import Heading from "@shared/ui/Heading/index";
import Input from "@shared/ui/Inputs/DefaultInport";
import { useSubmitChangePassword } from "@shared/lib/hooks/Form/useSubmitChangePassword";
import { ErrorDisplay } from "@shared/ui/Error/index";


import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const ChangePassword = () => {

const {code, setCode, userData, newPassword, setNewPassword, handleSubmit, backendError, passwordError} = useSubmitChangePassword();

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__content__logo}>
          <SparkLogo />
        </div>
        <Heading text="Сменить пароль" margin="mt-8" />
        <div className={styles.registration__content__mail}>
          <span className={styles.registration__content__mail__text}>
            Письмо со специальным кодом отправлено на почту
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
            name="code"
          />    
          <ErrorDisplay message={backendError}/>
          <PasswordInput placeholder="Новый пароль" margin="mt-3" name="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
          <ErrorDisplay message={passwordError}/>
          <Button text="Сменить пароль" buttonType="regular" margin="mt-4" />
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
