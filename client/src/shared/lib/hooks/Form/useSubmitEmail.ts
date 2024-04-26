// В этом компоненте находится логика для отправки специального кода, который пользователь получает на электронную почту для подтверждения почты


'use client';

import { useState, FormEvent } from "react";
import { useUserData } from "@shared/lib/hooks/Form/useGetData";
import { useEmailConfirm } from "@shared/lib/hooks/Form/useEmailConfirm";




export default function useSubmitEmail() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [emailError, setEmailError] = useState('');
  const userData = useUserData();




const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const result = await useEmailConfirm({ input1, input2, input3, input4, input5 });
  if (typeof result === 'string') {
    setEmailError(result);
  }
}

return {input1, setInput1, input2, setInput2, input3, setInput3, input4, setInput4, input5, setInput5, userData, emailError,handleSubmit};
}