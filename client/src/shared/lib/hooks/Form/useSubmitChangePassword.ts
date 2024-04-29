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

        if (!validatePassword(newPassword, /^.{8,16}$/, "Пароль должен содержать от 8 до 16 символов") ||
            !validatePassword(newPassword, /[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву') ||
            !validatePassword(newPassword, /[a-z]/, 'Пароль должен содержать хотя бы одну маленькую букву') ||
            !validatePassword(newPassword, /[0-9]/, 'Пароль должен содержать хотя бы одну цифру') ||
            !validatePassword(newPassword, /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "Пароль должен содержать хотя бы один специальный символ")) {
            isValid = false;
        }

        if (isValid) {
            const result = await changePassword({ newPassword, code });
            if (typeof result === 'string') {
                setBackendError(result);
            }
        }
    };

    return { code, setCode, newPassword, setNewPassword, backendError, handleSubmit, passwordError, userData };
};
