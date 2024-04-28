"use client";

import { useChangePassword } from "@shared/lib/hooks/Form/useChangePassword";
import { useState, FormEvent } from "react";
import { useUserData } from "@shared/lib/hooks/Form/useGetData";

export const useSubmitChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [code, setCode] = useState("");

  const userData = useUserData();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await useChangePassword({ code, newPassword });
    if (typeof result === "string") {
      setPasswordError(result);
    }
  };

  return {
    code,
    setCode,
    userData,
    newPassword,
    setNewPassword,
    passwordError,
    handleSubmit,
  };
};
