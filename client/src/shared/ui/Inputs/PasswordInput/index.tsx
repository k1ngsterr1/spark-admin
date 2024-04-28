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
      <div className={styles.input_container}>
        <input
          className={`${styles.password_input} dark:text-white ${margin}`}
          required
          {...rest}
          type={visible ? "text" : "password"}
        />
        <div
          onClick={() => setVisible(!visible)}
          className={`${styles.show_password} dark:text-white`}
        >
          {visible ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordInputProp;
