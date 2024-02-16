"use client";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import Button from "@shared/ui/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport";

import styles from "../styles/styles.module.scss";

import logo from "@assets/logo.webp";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const LoginForm = () => {
  const [visible, setVisible] = useState(false);

  return (
    <section className={styles.registration}>
      <div className={styles.registration__content}>
        <Image className={styles.registration__logo} src={logo} alt="logo" />
        <span className={styles.registration__heading}>Welcome back</span>
        <form className={styles.registration__form}>
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
          {/* <Button>Продолжить с Google</Button> */}
        </form>
        <div className={styles.registration__minitext}>
          <span>Don't have an account? </span>
          <Link href="registration" className={styles.login__orange}>
            Sign up
          </Link>
        </div>
        <div className={styles.registration__google}>
          <div className={styles.registration__separator} />
          <span className={styles.registration__separator__or}>OR</span>
          <div className={styles.registration__separator} />
        </div>
        {/* <ButtonProp
          text={"Продолжить с Google"}
          className={"google-button mt-6"}
        />
      </div> */}
      </div>
    </section>
  );
};

export default LoginForm;
