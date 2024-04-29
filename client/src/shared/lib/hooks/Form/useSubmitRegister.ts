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

  const { errors, validateField } = useFieldValidator();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (!validateField('email', email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'EMAIL_FORMAT')) {
      isValid = false;
    }

    if (!validateField('passwordConfirmation', passwordConfirmation, new RegExp(`^${password}$`), 'PASSWORDS_NOT_MATCH')) {
      isValid = false;
    }

    if (!validateField('password',password, /^.{8,16}$/, 'AMOUNT_OF_SYMBOLS') ||
        !validateField('password',password, /[A-Z]/, 'CAPITAL_LETTER') ||
        !validateField('password',password, /[a-z]/, 'SMALL_LETTER') ||
        !validateField('password',password, /[0-9]/, 'ONE_NUMBER') ||
        !validateField('password',password, /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, 'ONE_SPECIAL_SYMBOL')) {
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
    handleSubmit,
    errors,
    backendError
  };
};
