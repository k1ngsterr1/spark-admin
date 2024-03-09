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
  const inputClass = `${styles.input} ${styles[`input--${inputType}`]} ${
    margin ? margin : ""
  }`;

  return <input className={inputClass} {...rest} required />;
};

export default InputProp;
