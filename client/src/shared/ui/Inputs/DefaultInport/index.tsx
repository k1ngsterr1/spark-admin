import styles from "../DefaultInport/styles.module.scss";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  margin?: string;
  inputType: "default" | "email";
  autoCapitalize?: string;
}

const InputProp: React.FC<DefaultInputProps> = ({
  margin,
  inputType,
  autoCapitalize,
  ...rest
}) => {
  const inputClass = `${styles.input} dark:border-primary ${styles[`input--${inputType}`]} ${
    margin ? margin : ""
  }`;

  return (
    <input
      className={`${inputClass} dark:text-white`}
      {...rest}
      required
      autoCapitalize={autoCapitalize}
    />
  );
};

export default InputProp;
