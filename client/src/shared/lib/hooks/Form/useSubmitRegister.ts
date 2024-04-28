"use client";

import { useState, FormEvent } from "react";
import { useRegister } from "@shared/lib/hooks/Form/useRegister";

export const useSubmitRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (password !== passwordConfirmation) {
      setConfirmPasswordError("Пароли не совпадают");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Пароль должен содержать не менее 8 символов");
      isValid = false;
    }

    const upperCaseChar = /[A-Z]/;
    if (!upperCaseChar.test(password)) {
      setPasswordError("Пароль должен содержать хотя бы одну заглавную букву");
      isValid = false;
    }

    const lowerCaseChar = /[a-z]/;
    if (!lowerCaseChar.test(password)) {
      setPasswordError("Пароль должен содержать хотя бы одну маленькую букву");
      isValid = false;
    }

    const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialChar.test(password)) {
      setPasswordError(
        "Пароль должен содержать хотя бы один специальный символ"
      );
      isValid = false;
    }

    if (isValid) {
      const result = await useRegister({
        username,
        email,
        password,
        passwordConfirmation,
      });

      if (typeof result === "string") {
        setPasswordError(result);
      }
    }
  };

return {
  username, setUsername,
  email, setEmail,
  password, setPassword,
  passwordConfirmation, setPasswordConfirmation,
  passwordError, setPasswordError,
  confirmPasswordError, setConfirmPasswordError,
  handleSubmit
};
