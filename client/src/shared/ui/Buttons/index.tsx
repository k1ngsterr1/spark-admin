"use client";
import React from "react";
import { useWebPopup } from "@shared/lib/contexts/AppContext";
<<<<<<< HEAD
import { useUserPopup } from "@shared/lib/contexts/AppContext";
import { FunctionTypes, functions } from "@shared/lib/hooks/useFunctions";
=======
import { FunctionTypes } from "@shared/lib/hooks/useFunctions";
>>>>>>> 7a33874621262f0282af2d7a53ccb9b8cbcae1df
import Link from "next/link";

import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin?: string;
  text: string;
  buttonType: "regular" | "transparent" | "regular--small" | "regular--xs";
  functionType?: FunctionTypes;
}

const Button: React.FC<ButtonProps> = ({
  margin,
  text,
  buttonType,
  functionType,
  ...rest
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${buttonType}`]} ${
    margin ? margin : ""
  }`;
  const { toggleWebPopup } = useWebPopup();
  const { toggleUserPopup } = useUserPopup();

  const handleClick = () => {
    if (functionType === "webPopup") {
      toggleWebPopup();
    }
    if (functionType === "userPopup") {
      toggleUserPopup();
    }
  };

  return (
    <button className={buttonClass} onClick={handleClick} {...rest}>
      {text}
    </button>
  );
};

interface LinkButtonProps {
  margin?: string;
  href: string;
  text: string;
  buttonType: "regular" | "transparent" | "regular--small" | "regular--xs";
}

const ButtonLink: React.FC<LinkButtonProps> = ({
  margin,
  buttonType,
  href,
  text,
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${buttonType}`]} ${
    margin ? margin : ""
  }`;

  return (
    <Link className={buttonClass} href={href}>
      {text}
    </Link>
  );
};

export { ButtonLink, Button };
