// В этом компоненте находится логика для отправки специального кода, который пользователь получает на электронную почту для подтверждения почты

"use client";

import Input from "@shared/ui/Inputs/DefaultInport";
import Heading from "@shared/ui/Heading/index";
import MiniText from "@shared/ui/MiniText";
import useSubmitEmail from "@shared/lib/hooks/Form/useSubmitEmail";
import SparkLogo from "@assets/spark_product_logo.svg";
import { ErrorDisplay } from "@shared/ui/Error/index";
import { Button } from "@shared/ui/Buttons_Components/Buttons";

import "@shared/styles/_mixins.scss";

import styles from "../styles/styles.module.scss";

const EmailConfirm = () => {
  const { code, handleInputChange, userData, emailError, handleSubmit } =
    useSubmitEmail();

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__content__logo}>
          <SparkLogo />
        </div>
        <Heading text="Подтверждение почты" margin="mt-8" />
        <div className={styles.registration__content__mail}>
          <span className={styles.registration__content__mail__text}>
            Аккаунт:
            <span
              className={`${styles.registration__content__mail__text_orange} ml-2`}
            >
              {userData.username || "Неизвестно"}
            </span>
          </span>
        </div>
        <div className={styles.registration__content__mail}>
          <span className={styles.registration__content__mail__text}>
            Письмо с подтверждением отправлено на почту
            <div>
              <span className={styles.registration__content__mail__text_orange}>
                {userData.email || "Неизвестно"}
              </span>
            </div>
          </span>
        </div>
        <form
          className={styles.registration__content__form}
          onSubmit={handleSubmit}
        >
          <div className={styles.confirmation_input}>
            {code.map((value, index) => (
              <Input
                key={index}
                autoCapitalize="characters"
                inputType="email"
                placeholder=""
                autoComplete="off"
                name={`code-${index}`}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={1}
                type="text"
              />
            ))}
          </div>
          <ErrorDisplay message={emailError} />
          <Button text="Подтвердить" buttonType="regular" margin="mt-16" />
          <MiniText
            linktext="Отправить еще раз"
            text="Не пришел код?"
            href="email-confirmation"
            margin="mt-4"
          />
        </form>
      </div>
    </section>
  );
};

export default EmailConfirm;
