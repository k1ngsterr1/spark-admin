"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useChangeTheme } from "@shared/lib/hooks/Misc/useChangeTheme";

import styles from "./styles.module.scss";

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const { changeTheme } = useChangeTheme();
  const prevThemeRef = useRef(theme);

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    if (prevThemeRef.current !== theme) {
      changeTheme(theme);
      prevThemeRef.current = theme;
    }
  }, [theme, changeTheme]);

  // console.log(
  //   `%c

  //         ███████╗██████╗  █████╗ ██████╗ ██╗  ██╗     █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
  //         ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝    ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
  //         ███████╗██████╔╝███████║██████╔╝█████╔╝     ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
  //         ╚════██║██╔═══╝ ██╔══██║██╔══██╗██╔═██╗     ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
  //         ███████║██║     ██║  ██║██║  ██║██║  ██╗    ██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
  //         ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝

  //     `,
  //   "color:#FF5722"
  // );

  return (
    <button
      className={`${styles.button} dark:hover:bg-gray-800 hoverable`}
      onClick={handleChangeTheme}
    >
      <FontAwesomeIcon
        className={styles.button__icon}
        icon={theme === "light" ? faSun : faMoon}
      />
    </button>
  );
};
