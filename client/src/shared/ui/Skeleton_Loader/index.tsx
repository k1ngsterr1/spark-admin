import React from "react";
import { useTheme } from "next-themes"; // Import useTheme
import styles from "./styles.module.scss";

interface ISkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader: React.FC<ISkeletonLoaderProps> = ({
  width = "100%",
  height = "20px",
  className = "",
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const loaderStyle = {
    width,
    height,
    ...(className.includes("text") && { borderRadius: "4px" }),
  };

  const themeClass = isDarkMode
    ? styles.skeletonDarkLoader
    : styles.skeletonLoader;

  return <div className={`${themeClass} ${className}`} style={loaderStyle} />;
};

export default SkeletonLoader;
