"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@features/QuillToolBar";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";
import SparkLogo from "@assets/spark_product_logo.svg";
import "react-quill/dist/quill.snow.css";
import "./styles.scss";

import { useArticle } from "@shared/lib/hooks/Isolated_Components/useAddArticle";

export const Editor = () => {

  const { content, handleChange, handleSubmit } = useArticle();
  
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
