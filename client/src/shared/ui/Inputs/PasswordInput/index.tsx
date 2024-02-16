"use client";
import { useState } from "react";

import styles from "../PasswordInput/styles.module.scss";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  margin?: string;
}

const PasswordInputProp: React.FC<PasswordInputProps> = ({
  margin,
  ...rest
}) => {
  return (
    <>
      <input
        className={`${styles.password_input} ${margin}`}
        required
        {...rest}
      />
    </>
  );
};

export default PasswordInputProp;
