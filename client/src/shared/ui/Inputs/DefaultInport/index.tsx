import styles from "../DefaultInport/styles.module.scss";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  margin?: string;
  inputType: "default" | "email";
}

const InputProp: React.FC<DefaultInputProps> = ({
  margin,
  inputType,
  ...rest
}) => {
  const inputClass = `${styles.input} dark:border-primary ${styles[`input--${inputType}`]} ${
    margin ? margin : ""
  }`;

  return <input className={`${inputClass} dark:text-white`} {...rest} required />;
};

export default InputProp;
