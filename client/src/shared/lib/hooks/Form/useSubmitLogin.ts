'use client'

import { useState, FormEvent } from "react";
import { useLogin } from "@shared/lib/hooks/Form/useLogin";



export const useSubmitLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 
  
      const result = await useLogin({  email, password });
      if (typeof result === 'string') {
      }
    };

    return {
      email, setEmail,
      password, setPassword,
      passwordError, setPasswordError,
      handleSubmit
    };
}