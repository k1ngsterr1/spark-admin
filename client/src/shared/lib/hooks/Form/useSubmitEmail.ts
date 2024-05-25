// В этом компоненте находится логика для отправки специального кода, который пользователь получает на электронную почту для подтверждения почты
/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { useState, FormEvent } from "react";
import { useUserData } from "@shared/lib/hooks/Form/useGetData";
import { useEmailConfirm } from "@shared/lib/hooks/Form/useEmailConfirm";

export default function useSubmitEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const [emailError, setEmailError] = useState("");
  const userData = useUserData();

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(0, 1); // Assuming you want only the first character
    setCode(newCode);
    console.log("Updated code array:", newCode);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Concatenate the array into a single string without any separator
    let concatenatedCode = code.join("");

    concatenatedCode = concatenatedCode.toUpperCase();
    console.log("Submitting concatenated code:", concatenatedCode);

    // Pass the concatenated code as a string
    const result = await useEmailConfirm({ code: concatenatedCode });
    if (typeof result === "string") {
      setEmailError(result);
    } else {
      console.log("Confirmation successful");
    }
  };

  return { code, handleInputChange, userData, emailError, handleSubmit };
}
/* eslint-disable react-hooks/rules-of-hooks */
