"use client";

import { useState, FormEvent } from "react";
import { useLogin } from "@shared/lib/hooks/Form/useLogin";
import { useFieldValidator } from "./useValidate";

/* eslint-disable react-hooks/rules-of-hooks */

export const useSubmitLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { errors, validateField } = useFieldValidator();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (
      !validateField(
        "email",
        email,
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "EMAIL_FORMAT"
      )
    ) {
      isValid = false;
    }

    if (isValid) {
      const result = await useLogin({ email, password });
      if (typeof result === "string") {
        setPasswordError(result);
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordError,
    handleSubmit,
    errors,
  };
};

/* eslint-disable react-hooks/rules-of-hooks */
