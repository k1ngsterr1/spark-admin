"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@features/QuillToolBar";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";
import SparkLogo from "@assets/spark_product_logo.svg";
import "react-quill/dist/quill.snow.css";
import "./styles.scss";
import { useAddArticle } from "@shared/lib/hooks/useAddArticle"; 

export const Editor = () => {
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

  return (
    <section className="flex items-center flex-col">
      <div className="logo">
        <SparkLogo />
      </div>
      <Heading text="Text editor" margin="mt-8" />
      <div className="w-[80%] mt-12">
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
      <Button
        text="Publish"
        buttonType="regular"
        margin="mt-8 mb-8"
        type="submit"
        onClick={handleSubmit}
      />
    </section>
  );
};

export default Editor;
