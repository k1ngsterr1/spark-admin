import React from "react";
import { Development } from "@widgets/Screens/Development";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Access | Spark Admin",
    description: "Your Access",
  };
}
``;
const Access = () => {
  return (
    <>
      <Development />
    </>
  );
};

export default Access;
