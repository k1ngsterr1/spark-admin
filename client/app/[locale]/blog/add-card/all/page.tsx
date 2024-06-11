"use client";

import React, { useState } from "react";

import Heading from "@shared/ui/Heading/index";
import { EditBlogCard } from "@entities/Card_Components/BlogCard";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

const AddBlogCard: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__logo}>
          <SparkLogo />
        </div>
        <Heading text="All cards" margin="mt-8" />
      </div>
      <EditBlogCard editing={false} />
    </>
  );
};

export default AddBlogCard;
