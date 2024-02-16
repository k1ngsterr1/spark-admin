import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.webp";
import styles from "./styles.module.scss";
import ButtonProp from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = () => {
  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <Image className={styles.registration__logo} src={logo} alt="logo" />
        <span className={styles.registration__heading}>Welcome back</span>
        <form className={styles.registration__form}>
          <Input placeholder={"Username"} />
          <Input placeholder={"example@gmail.com"} />
          <Input placeholder={"Password"} />
          <Input placeholder={"Confirm Password"} />
          <ButtonProp text={"Sign Up"} className={"sign-up mt-6"} />
        </form>
        <div className={styles.registration__minitext}>
          <span>Already a User? </span>
          <Link href="" className={styles.login__orange}>
            Login
          </Link>
        </div>
        <div className={styles.registration__google}>
          <div className={styles.registration__separator} />
          <span className={styles.registration__separator__or}>OR</span>
          <div className={styles.registration__separator} />
        </div>
        <ButtonProp
          text={"Продолжить с Google"}
          className={"google-button mt-6"}
        />
      </div>
    </section>
  );
};

export default Form;
