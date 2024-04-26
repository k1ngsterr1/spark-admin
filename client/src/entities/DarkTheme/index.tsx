"use client";
import React, {useState, useEffect} from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();
  

  return (
    <button
      className={styles.button}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FontAwesomeIcon
        className={styles.button__icon}
        icon={theme === "light" ? faSun : faMoon}
      />
    </button>
  );
};
