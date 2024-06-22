"use client";

import { useState } from "react";
import { useAddBlogCard } from "./useAddBlogCard"; // Import your API interaction function
import { StaticImageData } from "next/image";

// eslint-disable-next-line react-hooks/exhaustive-deps

export const useBlogCard = () => {
  const [image, setImage] = useState<File | null>();
  const [title, setTitle] = useState<string>("");
  const [href, setHref] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      image, // Assuming image is already in the required format (URL or base64)
      title,
      href,
      code,
    };
    try {
      await useAddBlogCard(data);
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

// eslint-disable-next-line react-hooks/exhaustive-deps
