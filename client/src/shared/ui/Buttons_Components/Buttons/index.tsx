"use client";
import {
  usePageCardPopup,
  useWebPopup,
  useWebVerifyPopup,
  useWebsiteUploadPopup,
} from "@shared/lib/contexts/AppContext";
import { useUserPopup } from "@shared/lib/contexts/AppContext";
import { FunctionTypes } from "@shared/lib/hooks/Misc/useFunctions";
import Link from "next/link";

import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin?: string;
  text: string;
  href?: string;

  buttonType:
    | "regular"
    | "transparent"
    | "regular--small"
    | "regular--xxs--cancel"
    | "regular--xs"
    | "regular--xxs"
    | "regular--text"
    | "regular--text--xs";

  functionType?: FunctionTypes;
}

const Button: React.FC<ButtonProps> = ({
  margin,
  text,
  buttonType,
  functionType,
  href,
  ...rest
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${buttonType}`]} ${
    margin ? margin : ""
  }`;
  const { toggleWebPopup } = useWebPopup();
  const { toggleWebVerifyPopup } = useWebVerifyPopup();
  const { toggleUserPopup } = useUserPopup();
  const { togglePageCardPopup } = usePageCardPopup();
  const { toggleWebsiteUploadPopup } = useWebsiteUploadPopup();

  const handleClick = () => {
    if (functionType === "webPopup") {
      toggleWebPopup();
    }
    if (functionType === "userPopup") {
      toggleUserPopup();
    }

    if (functionType === "verifyPopup") {
      toggleWebVerifyPopup();
    }

    if (functionType === "pageCardPopup") {
      togglePageCardPopup();
    }

    if (functionType === "websiteUploadPopup") {
      toggleWebsiteUploadPopup();
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
  buttonType:
    | "regular"
    | "regular--bigger"
    | "transparent"
    | "transparent--small"
    | "regular--small"
    | "regular--xs"
    | "card-button";
}

const ButtonLink: React.FC<LinkButtonProps> = ({
  margin,
  buttonType,
  href,
  text,
}) => {
  const buttonClass = `${styles.button} ${styles[`button--${buttonType}`]} ${
    margin ? margin : ""
  } hoverable`;

  return (
    <Link className={buttonClass} href={href}>
      {text}
    </Link>
  );
};

export { ButtonLink, Button };
