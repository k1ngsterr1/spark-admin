import React from "react";
import styles from "./styles.module.scss";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  margin?: string;
  text: string;
  position: string;
}

const Heading: React.FC<HeadingProps> = ({
  margin,
  text,
  position,
  ...rest
}) => {
  return (
    <h1
      className={`${styles.heading} ${margin} ${position} dark:text-white`}
      {...rest}
    >
      {text}
    </h1>
  );
};

export default Heading;
