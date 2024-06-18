"use client";

import axios from "axios";
import { useState } from "react";

export function useAddArticle() {
  const [articleData, setArticleData] = useState<any>();

  const addArticle = async (content: string, code: string) => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('code', code);

      const response = await axios.post(
        "https://ferla-backend-production.up.railway.app/api/articles/add",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("Response data:", response.data);
      setArticleData(response.data);
    //   window.location.reload(); 
    } catch (error) {
      console.error("There was an error with adding the article:", error);
    }
  };

  return { articleData, addArticle };
}
