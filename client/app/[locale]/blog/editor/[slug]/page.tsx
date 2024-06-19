"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@features/QuillToolBar";
import { Button, ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import Heading from "@shared/ui/Heading/index";

import SparkLogo from "@assets/spark_product_logo.svg";

import "react-quill/dist/quill.snow.css";
import "./styles.scss";
import { useParams } from "next/navigation";
import { Header } from "@features/Header";
import { useTranslations } from "next-intl";

export const Editor = () => {
  const { locale } = useParams();
  const t = useTranslations("Editor");
  const [state, setState] = React.useState({ value: null });
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const handleFullscreen = () => {
    setFullscreen(!isFullscreen);
  };

  const handleChange = (value) => {
    setState({ value });
  };

  return (
    <section className="flex items-center flex-col mb-10">
      <Header />
      <div className="logo">
        <SparkLogo />
      </div>
      <Heading text={t("editor")} margin="mt-8" />
      <div className="w-[80%] mt-12">
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={state.value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          text="Publish"
          buttonType="regular"
          margin="mt-8"
          type="submit"
        />
        <ButtonLink
          text="Go Back"
          buttonType="regular"
          href={`/${locale}/websites`}
          margin="mt-8"
        />
      </div>
    </section>
  );
};

export default Editor;
