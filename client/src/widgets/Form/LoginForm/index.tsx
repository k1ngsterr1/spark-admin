import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import PasswordInput from "@shared/ui/Inputs/PasswordInput";
import MiniText from "@shared/ui/MiniText/index";
import Heading from "@shared/ui/Heading/index";

import styles from "../styles/styles.module.scss";

import SparkLogo from "@assets/spark_product_logo.svg";

const LoginForm = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <Heading text="Войти" margin="mt-8" />
        <form className={styles.registration__form}>
          <Input
            placeholder={"example@gmail.com"}
            inputType="default"
            type="text"
          />
          <PasswordInput placeholder="Пароль" margin="mt-3" />
          <MiniText
            margin="mt-2"
            href="change-password"
            text="Забыли ваш "
            linktext="пароль?"
          />
          <Button text="Войти" buttonType="regular" margin="mt-4" />
        </form>
        <MiniText
          margin="mt-2"
          href="registration"
          text="Еще нет аккаунта?"
          linktext="Создать аккаунт"
        />
      </div>
    </section>
  );
};

export default LoginForm;
