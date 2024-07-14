"use client";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";
import Heading from "@shared/ui/Heading/index";
import { useSubmitLogin } from "@shared/lib/hooks/Form/useSubmitLogin";
import { ErrorDisplay } from "@shared/ui/Error";
import { useClickChangePassword } from "@shared/lib/hooks/Form/useClickChangePassword";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const LoginForm = () => {
  const t = useTranslations("LoginPage");

  const { handleClickChangePassword } = useClickChangePassword();
  const { locale } = useParams();

  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordError,
    handleSubmit,
    errors,
  } = useSubmitLogin(locale);

  return (
    <section className={styles.registration}>
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
            placeholder={"example@gmail.com"}
            inputType="default"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ErrorDisplay message={errors.email} />
          <PasswordInput
            placeholder={t("password")}
            type="password"
            name="password"
            margin="mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorDisplay message={passwordError} />
          <MiniText
            margin="mt-2"
            href="change-password"
            text={t("forgot_password")}
            linktext={t("forgot_password_orange")}
            onClick={handleClickChangePassword}
          />
          <Button text={t("heading")} buttonType="regular" margin="mt-4" />
        </form>
        <MiniText
          margin="mt-2"
          href="registration"
          text={t("dont_have_account")}
          linktext={t("create_account")}
        />
      </div>
    </section>
  );
};

export default LoginForm;
