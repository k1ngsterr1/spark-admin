import "./style.scss";

import { FcGoogle } from "react-icons/fc";

interface ButtonProps {
  className: string;
  text: string;
}

const ButtonProp: React.FC<ButtonProps> = ({ className, text }) => {
  return (
    <button className={`${className}`}>
      <span className="text">{text}</span>
      <span className="google-icon">
        <FcGoogle />
      </span>
    </button>
  );
};

export default ButtonProp;
