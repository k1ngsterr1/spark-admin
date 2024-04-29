
import { useState } from "react";
import { createErrorHandler, ErrorCodes  } from "./useErrorHnadler"; 


export const useFieldValidator = () => {
  const [error, setError] = useState<Record<string, string>>({});

  const errorHandler = createErrorHandler((field, message) => {
    setError(prevErrors => ({ ...prevErrors, [field]: message }));
  });

  const validateField = (
    field: string,
    value: string,
    regex: RegExp,
    errorCode: ErrorCodes
  ) => {
    if (!regex.test(value)) {
      errorHandler(errorCode); 
      return false;
    }
    setError(prevErrors => ({ ...prevErrors, [field]: '' })); 
    return true;
  };

  return { error, validateField };
};
