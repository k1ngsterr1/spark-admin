import React from "react";

interface IAttachmentFileInput
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const AttachmentFileInput: React.FC<IAttachmentFileInput> = ({
  ...rest
}) => {
  return <input />;
};
