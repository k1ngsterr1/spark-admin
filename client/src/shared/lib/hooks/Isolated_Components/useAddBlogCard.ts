'use client';

import { useState } from "react";
import { useAddBlogCard } from "@shared/lib/hooks/useAddBlogCard";
import useFileUpload from "@shared/lib/hooks/usePreviewPhoto";



export const useAddCard = () => {
    const { previewUrl, handleFileChange, selectedFile } = useFileUpload();
    const [title, setTitle] = useState("");
    const [href, setHref] = useState("");
    const [code, setCode] = useState("");
    const { addBlog } = useAddBlogCard();
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      if (title && href && code && selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("title", title);
        formData.append("href", href);
        formData.append("code", code);
  
        await addBlog(formData);
      } else {
        console.log("All fields are required");
      }
    };
  return { title, setTitle, href, setHref, code, setCode, handleSubmit, previewUrl, handleFileChange,selectedFile}
}