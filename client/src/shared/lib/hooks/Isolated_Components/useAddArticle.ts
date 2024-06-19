"use client";

import { useState } from "react"; 
import { useAddArticle } from "@shared/lib/hooks/useAddArticle"; 


export const useArticle = () => {
    const [content, setContent] = useState("");
  const { addArticle } = useAddArticle();
  const predefinedCode = "SPARK-STUDIO-85209af2e07011fafd442671ef8ae84b647be17c7f517ea5942075dda6fbeeb7"; 

  const handleChange = (value: any) => {
    setContent(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addArticle(content, predefinedCode);
  };

  return { content, handleChange, handleSubmit };
}