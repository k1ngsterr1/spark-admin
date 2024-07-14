"use client";

import { useState } from "react";
import { useUpdateBlogCard } from "./useUpdateBlogCard"; // Import your API interaction function
import { StaticImageData } from "next/image";

export const useUpdateBlog = () => {
  const [image, setImage] = useState<File | null>();
  const [title, setTitle] = useState<string>("");
  const [href, setHref] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateData = {
      image, // Assuming image is already in the required format (URL or base64)
      title,
      href,
      code,
    };
    try {
      await useUpdateBlog(updateData);
      // You might want to clear the form here or handle navigation if needed
    } catch (error) {
      console.error("Error submitting blog card:", error);
    }
  };

  return {
    image,
    setImage,
    title,
    setTitle,
    href,
    setHref,
    handleSubmit,
    code,
    setCode,
  };
};
