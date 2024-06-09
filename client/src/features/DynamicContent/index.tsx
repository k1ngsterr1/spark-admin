import React from "react";
import { useEffect } from "react";

export const DynamicContent = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
