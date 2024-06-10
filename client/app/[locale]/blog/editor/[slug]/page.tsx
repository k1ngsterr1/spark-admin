"use client";

import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "@features/QuillToolBar";
import "react-quill/dist/quill.snow.css";
import "./styles.scss";

export const Editor = () => {
  const [state, setState] = React.useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };
  return (
    <>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default Editor;
