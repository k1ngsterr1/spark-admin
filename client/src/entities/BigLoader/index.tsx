import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Logo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";

export const BigLoader = () => {
  return (
    <div className={`${styles.loader} dark:bg-dark-lighter`}>
      <div className="flex items-center justify-center flex-col">
        <div className={styles.loader__logo}>
          <Logo />
          <span className={styles.loader__logo__text}>Spark Admin</span>
        </div>
        <ClipLoader color="#FF5722" size={100} />
      </div>
    </div>
  );
};
