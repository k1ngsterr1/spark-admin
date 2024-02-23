import { Button } from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";
import Heading from "@shared/ui/Heading/index";
import MiniText from "@shared/ui/MiniText";

import styles from "../styles/styles.module.scss";
// import "../EmailConfirmationForm/styles.scss";
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
        <div className="text-user">
          <span className="text_with_detail">
            Аккаунт: 
            <span className="text_orange"> smth</span>
          </span>
        </div>
        <div className="text-mail">
          <span className="text_with_detail">Письмо с подтверждением отправлена на почту 
              <div><span className="text_orange">ruslanmakmhatom@gmail.com</span></div>
          </span>
        </div>
        <form className={styles.registration__form}>
          <div className={styles.confirmation_input}>
          <Input inputType="email" maxLength={1} autoComplete="none"/>
          <Input inputType="email" maxLength={1} autoComplete="none"/>
          <Input inputType="email" maxLength={1} autoComplete="none"/>
          <Input inputType="email" maxLength={1} autoComplete="none"/>
          <Input inputType="email" maxLength={1} autoComplete="none"/>
          </div>
          <Button text="Подтвердить" buttonType="regular" margin="mt-16" />
          <MiniText linktext="Отправить еще раз" text="Не пришел код?" href="email-confirmation" margin="mt-4"/>
        </form>
      </div>
    </section>
  );
};

export default EmailConfirm;
