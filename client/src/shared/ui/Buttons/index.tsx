import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin?: string;
  text: string;
  buttonType: string;
}

const Button: React.FC<ButtonProps> = ({ margin, text, ...rest }) => {
  return (
    <button className={`${styles.button} ${margin}`} {...rest}>
      <span className="text">{text}</span>
    </button>
  );
};

export default Button;
