import Heading from "@shared/ui/Heading";
import React from "react";

interface WebsiteInnerProps {
  websiteName: string;
}

export const WebsiteInner: React.FC<WebsiteInnerProps> = ({ websiteName }) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto">
        <Heading text="Example" />
      </div>
      <section className=""></section>
    </div>
  );
};
