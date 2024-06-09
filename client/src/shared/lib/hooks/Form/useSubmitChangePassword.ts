"use client";

import { useState, FormEvent } from "react";
import { useChangePassword } from "@shared/lib/hooks/Form/useChangePassword";
import { useFieldValidator } from "./useValidate";
import { useUserData } from "./useGetData";

export const useSubmitChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [backendError, setBackendError] = useState("");
  const changePassword = useChangePassword();
  const userData = useUserData();

  const { errors, validateField } = useFieldValidator();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (
      !validateField(
        "newPassword",
        newPassword,
        /^.{8,16}$/,
        "AMOUNT_OF_SYMBOLS"
      ) ||
      !validateField("newPassword", newPassword, /[A-Z]/, "CAPITAL_LETTER") ||
      !validateField("newPassword", newPassword, /[a-z]/, "SMALL_LETTER") ||
      !validateField("newPassword", newPassword, /[0-9]/, "ONE_NUMBER") ||
      !validateField(
        "newPassword",
        newPassword,
        /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        "ONE_SPECIAL_SYMBOL"
      )
    ) {
      isValid = false;
    }

    if (isValid) {
      const result = await changePassword({ newPassword, code });
      if (typeof result === "string") {
        setBackendError(result);
      }
    }
  };

  return {
    code,
    setCode,
    newPassword,
    setNewPassword,
    backendError,
    handleSubmit,
    errors,
    userData,
  };
};
