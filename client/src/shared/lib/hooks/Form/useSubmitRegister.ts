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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (!validateConfirmPassword(password, new RegExp(`^${passwordConfirmation}$`), "Пароли не совпадают")) {
      isValid = false;
    }

    if (!validatePassword(password, /.{8,}/, "Пароль должен содержать не менее 8 символов")) {
      isValid = false;
    }

    if (!validatePassword(password, /[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву") ||
        !validatePassword(password, /[a-z]/, "Пароль должен содержать хотя бы одну маленькую букву") ||
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
    handleSubmit, backendError
  };
};
