"use client";
import React from "react";
import SparkLogo from "@assets/spark_product_logo.svg";
import { useRouter } from "next/navigation";

interface ILogo {
  url?: string;
}

export const Logo: React.FC<ILogo> = ({ url }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`${url}`)}>
      <SparkLogo />
    </div>
  );
};
