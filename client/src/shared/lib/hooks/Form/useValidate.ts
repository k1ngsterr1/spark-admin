'use client'

import { useState } from "react";
import { createErrorHandler, ErrorCodes } from "./useErrorHnadler"; 

export const useFieldValidator = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const errorHandler = createErrorHandler((field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  });

  const validateField = (field: string, value: string, regex: RegExp, errorCode: ErrorCodes) => {
    if (!regex.test(value)) {
      errorHandler(field, errorCode);
      return false;
    }
    setErrors(prev => ({ ...prev, [field]: '' })); 
    return true;
  };

  return { errors, validateField };
};
