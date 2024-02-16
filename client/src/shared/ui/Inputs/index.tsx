import "../Inputs/style.scss";

interface InputProps {
  className: string;
  text: string;
  placeholder: string;
}

const InputProp: React.FC<InputProps> = ({ placeholder, text }) => {
  return (
    <input
      className="registration__input mb-3"
      type={text}
      required
      placeholder={placeholder}
    />
  );
};

export default InputProp;
