// В этом компоненте находится логика для отправки специального кода, который пользователь получает на электронную почту для подтверждения почты

"use client";

import { useState, FormEvent } from "react";
import { useUserData } from "@shared/lib/hooks/Form/useGetData";
import { useEmailConfirm } from "@shared/lib/hooks/Form/useEmailConfirm";

export default function useSubmitEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const [emailError, setEmailError] = useState("");
  const userData = useUserData();

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...code];
    newInputs[index] = value;
    setCode(newInputs);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await useEmailConfirm({ code });
    if (typeof result === "string") {
      setEmailError(result);
    }
  };

  return { code, handleInputChange, userData, emailError, handleSubmit };
}
