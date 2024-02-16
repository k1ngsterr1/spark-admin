"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import ButtonProp from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs";

import styles from "./styles.module.scss";

import logo from "../../assets/logo.webp";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Form = () => {
  const [visible, setVisible] = useState(false);

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <Image className={styles.registration__logo} src={logo} alt="logo" />
        <span className={styles.registration__heading}>Welcome back</span>
        <form className={styles.registration__form}>
          <Input placeholder={"Username"} />
          <Input placeholder={"example@gmail.com"} />
          <input
            className="registration__input mb-3"
            type={visible ? "text" : "password"}
            required
            placeholder={"Password"}
          />
          <div
            className={styles.show_password}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <IoMdEye /> : <IoMdEyeOff />}
          </div>
          <input
            className="registration__input mb-3"
            type={visible ? "text" : "password"}
            required
            placeholder={"Confirm Password"}
          />
          <div
            className={styles.show_password_confirm}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <IoMdEye /> : <IoMdEyeOff />}
          </div>
          <ButtonProp text={"Sign Up"} className={"sign-up mt-6"} />
        </form>
        <div className={styles.registration__minitext}>
          <span>Already a User? </span>
          <Link href="login" className={styles.login__orange}>
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
