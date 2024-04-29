'use client';

import { useState, FormEvent } from "react";
import { useChangePassword } from "@shared/lib/hooks/Form/useChangePassword"; 
import { useFieldValidator } from "./useValidate";
import { useUserData } from "./useGetData";

export const useSubmitChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [code, setCode] = useState('');
    const [backendError, setBackendError] = useState('');
    const changePassword = useChangePassword();
    const { error: passwordError, validateField: validatePassword } = useFieldValidator();
    const userData = useUserData();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isValid = true;

        // Validate newPassword with specific criteria
        if (!validatePassword(newPassword, /.{8,}/, "Пароль должен содержать не менее 8 символов") ||
            !validatePassword(newPassword, /[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву') ||
            !validatePassword(newPassword, /[a-z]/, 'Пароль должен содержать хотя бы одну маленькую букву')) {
            isValid = false;
        }

        if (isValid) {
            const result = await changePassword({ newPassword, code });
            if (typeof result === 'string') {
                setBackendError(result);
            }
        }
    };

    return { code, setCode, newPassword, setNewPassword, backendError, handleSubmit, passwordError,userData };
};
