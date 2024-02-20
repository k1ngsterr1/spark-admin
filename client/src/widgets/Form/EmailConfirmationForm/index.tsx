import { Button } from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import Heading from "@shared/ui/Heading/index";

import styles from "../styles/styles.module.scss";
import "../../../shared/styles/mixins.scss";
import SparkLogo from "@assets/spark_product_logo.svg";

const EmailConfirm = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <div className={styles.registration__logo}>
          <SparkLogo />
        </div>
        <Heading text="Подтверждение почты" margin="mt-8" />
        <div className="text_orange">
          <span className="text_with_detail">
            Аккаунт:
            <span className="text_orange">smth</span>
          </span>
        </div>
        <div className={styles.registration__mini_text_account_mail}>
          <span>Письмо с подтверждением отправлена на почту </span>
          <div className={styles.login__orange}>ruslanmakmhatom@gmail.com</div>
        </div>
        <form className={styles.registration__form}>
          <Button text="Подтвердить" buttonType="regular" margin="mt-8" />
        </form>
      </div>
    </section>
  );
};

export default EmailConfirm;
