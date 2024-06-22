import React from "react";
import { Development } from "@widgets/Screens/Development";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Analytics | Spark Admin",
    description: "Your Analytics",
  };
}

const Analytics = () => {
  return (
    <>
      <Development />
    </>
  );
};

export default Analytics;
