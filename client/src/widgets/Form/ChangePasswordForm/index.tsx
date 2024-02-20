import { ButtonLink } from "@shared/ui/Buttons/index";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import Heading from "@shared/ui/Heading/index";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const ChangePassword = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <Heading text="Сменить пароль" margin="mt-8" />
        <form className={styles.registration__form}>
          <PasswordInput placeholder="Текущий пароль" margin="mt-3" />
          <PasswordInput placeholder="Новый пароль" margin="mt-3" />
          <PasswordInput placeholder="Повторите новый пароль" margin="mt-3" />
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
