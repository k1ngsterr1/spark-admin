import React from "react";
import styles from "./styles.module.scss";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  margin?: string;
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ margin, text, ...rest }) => {
  return (
    <h1 className={`${styles.heading} ${margin}`} {...rest}>
      {text}
    </h1>
  );
};

export default Heading;
