import styles from "../DefaultInport/styles.module.scss";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  margin?: string;
}

const InputProp: React.FC<DefaultInputProps> = ({ margin, ...rest }) => {
  return (
    <input className={`${styles.default_input} ${margin}`} {...rest} required />
  );
};

export default InputProp;
