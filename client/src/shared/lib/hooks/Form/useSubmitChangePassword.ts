'use client'

import { useChangePassword } from "@shared/lib/hooks/Form/useChangePassword";
import { useState , FormEvent} from "react";
import {useUserData} from "@shared/lib/hooks/Form/useGetData";
import { useFieldValidator } from "./useValidate";

export const useSubmitChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [backendError, setBackendError] = useState('');
    const [code, setCode] = useState('');

    const { error: passwordError, validateField: validatePassword } = useFieldValidator();  

    const userData = useUserData()
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 
      let isValid = true;


      if (!validatePassword(newPassword, /.{8,}/, "Пароль должен содержать не менее 8 символов") ||
          !validatePassword(newPassword, /[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву') ||
          !validatePassword(newPassword, /[a-z]/, 'Пароль должен содержать хотя бы одну маленькую букву')
    ) { 
      isValid = false;
    }
  
      const result = await useChangePassword({  code, newPassword });
      if (typeof result === 'string') {
        setBackendError(result)
      }
    };

    return { code, setCode, userData, newPassword, setNewPassword, backendError,handleSubmit , passwordError};
}