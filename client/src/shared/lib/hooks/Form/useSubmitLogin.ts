"use client";

import { useState, FormEvent } from "react";
import { useLogin } from "@shared/lib/hooks/Form/useLogin";
import { useFieldValidator } from "./useValidate";


export const useSubmitLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { error: emailError, validateField: validateEmail } = useFieldValidator();


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;



    if (!validateEmail(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    , "Неверный формат email")) {
      isValid = false;
    }

    const result = await useLogin({ email, password });
    if (typeof result === "string") {
      setPasswordError(result);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    handleSubmit,
    emailError
  };
};
