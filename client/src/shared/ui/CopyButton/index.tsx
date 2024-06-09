"use client";

import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ICopyButtonProps {
  text: string;
  onCopy: () => void;
  isCopied: boolean;
}

export const CopyButton: React.FC<ICopyButtonProps> = ({
  text,
  onCopy,
  isCopied,
}) => {
  return (
    <>
      <CopyToClipboard text={text} onCopy={onCopy}>
        <button className=" transition-all hover:text-primary dark: text-dark-text">
          <FontAwesomeIcon
            icon={isCopied ? faCheck : faCopy}
            className="mr-2"
          />
          {isCopied ? "Скопированно!" : "Скопировать код"}
        </button>
      </CopyToClipboard>
    </>
  );
};
