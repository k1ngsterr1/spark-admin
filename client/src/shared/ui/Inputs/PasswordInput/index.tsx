"use client";
import { useState } from "react";

import styles from "../PasswordInput/styles.module.scss";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  margin?: string;
}

const PasswordInputProp: React.FC<PasswordInputProps> = ({
  margin,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <input
        className={`${styles.password_input} ${margin}`}
        required
        {...rest}
        type={visible ? "text" : "password"}
      />
      <div onClick={() => setVisible(!visible)}>
        {visible ? (
          <FontAwesomeIcon icon={faEye} />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        )}
      </div>
    </>
  );
};

export default PasswordInputProp;
