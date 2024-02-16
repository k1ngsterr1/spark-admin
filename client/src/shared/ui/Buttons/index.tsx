import "./style.scss";

interface ButtonProps {
  className: string;
  text: string;
}

const ButtonProp: React.FC<ButtonProps> = ({ className, text }) => {
  return <button className={`${className}`}>{text}</button>;
};

export default ButtonProp;
