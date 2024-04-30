"use client";
import React from "react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyButton } from "@shared/ui/CopyButton";

import styles from "./styles.module.scss";

interface ICodeInterface {
  code: string;
}

export const CodeInterface: React.FC<ICodeInterface> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };
  return (
    <div className={styles.code_interface}>
      <div className="flex w-full items-center justify-center">
        <CopyButton text={code} onCopy={handleCopy} isCopied={isCopied} />
      </div>
      <SyntaxHighlighter language="html" style={tomorrow}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
