import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.webp";
import styles from "./styles.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = () => {
  return (
    <section className="registration">
      <div className="registration__content">
        <p>
          {/* <FontAwesomeIcon  icon={}/> */}
          {/* <Icon icon="mdi:eye" /> */}
        </p>
        <Image src={logo} alt="logo" />
        <span className="registration__heading">Welcome back</span>
        <form className="registration__form">
          <div className="registration__input-name">
            <label htmlFor="username" className="visually-hidden">
              Username
            </label>
            <input
              id="username"
              className="registration__input"
              type="text"
              required
              placeholder="Username"
            />
          </div>
          <div className="registration__input-email">
            <label htmlFor="email" className="visually-hidden">
              Email
            </label>
            <input
              id="email"
              className="registration__input"
              type="email"
              required
              placeholder="example@gmail.com"
            />
          </div>
          <div className="registration__input-password">
            <label htmlFor="password" className="visually-hidden">
              Password
            </label>
            <input
              id="password"
              className="registration__input"
              type="password"
              required
              placeholder="Password"
            />
          </div>
          <div className="registration__input-password-confirm">
            <label htmlFor="confirmPassword" className="visually-hidden">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="registration__input"
              type="password"
              required
              placeholder="Confirm Password"
            />
          </div>
          <button className="registration__sign-up">Sign Up</button>
        </form>
        <div className="registration__mini-text">
          <span>Already a User? </span>
          <Link href="" className="login-orange">
            Login
          </Link>
        </div>
        <div className="registration__google">
          <div className="registration__separator" />
          <span className="registration__separator-or">OR</span>
          <div className="registration__separator" />
        </div>
        <button className="registration__google-button">
          Продолжить с Google
        </button>
      </div>
    </section>
  );
};

export default Form;
