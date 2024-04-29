'use client';

import { useState, FormEvent } from "react";
import { useRegister } from '@shared/lib/hooks/Form/useRegister';
import { useFieldValidator } from "./useValidate";

export const useSubmitRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [backendError, setBackendError] = useState('');

  const { error: passwordError, validateField: validatePassword } = useFieldValidator();
  const { error: confirmPasswordError, validateField: validateConfirmPassword } = useFieldValidator();
  const { error: emailError, validateField: validateEmail } = useFieldValidator();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (!validateEmail(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Неверный формат email")) {
      isValid = false;
    }


    if (!validateConfirmPassword(password, new RegExp(`^${passwordConfirmation}$`), "Пароли не совпадают")) {
      isValid = false;
    }


    if (!validatePassword(password, /^.{8,16}$/, "Пароль должен содержать от 8 до 16 символов") ||
        !validatePassword(password, /[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву") ||
        !validatePassword(password, /[a-z]/, "Пароль должен содержать хотя бы одну маленькую букву") ||
        !validatePassword(password, /[0-9]/, 'Пароль должен содержать хотя бы одну цифру') ||
        !validatePassword(password, /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "Пароль должен содержать хотя бы один специальный символ")) {
      isValid = false;
    }

    if (isValid) {
      const result = await useRegister({ username, email, password, passwordConfirmation });
      if (typeof result === 'string') {
        setBackendError(result);
      }
    }
  };

  return {
    username, setUsername,
    email, setEmail,
    password, setPassword,
    passwordConfirmation, setPasswordConfirmation,
    passwordError, confirmPasswordError,
    handleSubmit, backendError, emailError
  };
};