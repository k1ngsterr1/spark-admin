import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin?: string;
  text: string;
  buttonType: "regular" | "transparent";
}

const Button: React.FC<ButtonProps> = ({
  margin,
  text,
  buttonType,
  ...rest
}) => {
  const buttonClass = `${styles.button} ${
    buttonType === "regular" ? styles.regular : styles.transparent
  } ${margin ? margin : ""}`;

  return (
    <button className={buttonClass} {...rest}>
      {text}
    </button>
  );
};

export default Button;
