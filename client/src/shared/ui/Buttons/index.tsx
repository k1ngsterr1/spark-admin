import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin?: string;
  text: string;
  // buttonType: "regular" | "transparent";
  buttonType: "regular" | "transparent" | "regular--small";
}

const Button: React.FC<ButtonProps> = ({
  margin,
  text,
  buttonType,
  ...rest
}) => {
  // const buttonClass = `${styles.button} ${
  //   buttonType === "regular" ? styles.regular : styles.transparent
  // } ${margin ? margin : ""}`;
  const buttonClass = `${styles.button} ${styles[`button--${buttonType}`]} ${
    margin ? margin : ""
  }`;

  return (
    <button className={buttonClass} {...rest}>
      {text}
    </button>
  );
};

export default Button;
