'use client'

import { useState, FormEvent } from "react";
import { changePassword } from "@shared/lib/hooks/Form/useChangePassword"; 
import { useFieldValidator } from "./useValidate";
import { useUserData } from "./useGetData";

export const useSubmitChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [code, setCode] = useState('');
    const [backendError, setBackendError] = useState('');
    const userData = useUserData(); 
    const { validateField } = useFieldValidator();
    const { error: passwordError, validateField: validatePassword } = useFieldValidator();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        let isValid = true;

        if (!validatePassword(newPassword, /.{8,}/, "Пароль должен содержать не менее 8 символов") ||
            !validatePassword(newPassword, /[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву') ||
            !validatePassword(newPassword, /[a-z]/, 'Пароль должен содержать хотя бы одну маленькую букву')
        ) { 
            isValid = false;
        }

        if (isValid) {
            const result = await changePassword({ code, newPassword });
            if (typeof result === 'string') {
                setBackendError(result);
            }
        }
    };

    return { code, setCode, newPassword, setNewPassword, backendError,userData, handleSubmit, passwordError };
}