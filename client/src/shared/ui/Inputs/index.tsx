import "../Inputs/style.scss";

interface InputProps {
  placeholder: string;
}

const InputProp: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <input
      className="registration__input mb-3"
      type="text"
      required
      placeholder={placeholder}
    />
  );
};

export default InputProp;
