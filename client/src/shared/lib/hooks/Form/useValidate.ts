'use client'

import { useState } from "react";



export const useFieldValidator = () => {
    const [error, setError] = useState<string>('');
  
    const validateField = (value:string, regex:RegExp, errorMessage:string) => {
      if (!regex.test(value)) {
        setError(errorMessage);
        return false;
      }
      setError('');
      return true;
    };
  
    return { error, validateField };
  };
  

