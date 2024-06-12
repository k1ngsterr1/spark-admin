"use client";

import React, { useState } from "react";

import Heading from "@shared/ui/Heading/index";
import { EditBlogCard } from "@entities/Card_Components/BlogCard";
import { useGetBlogs } from "@shared/lib/hooks/useGetBlogs";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons/index";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

const AddBlogCard: React.FC = () => {
  const { data } = useGetBlogs();

  console.log("data:", data);

  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className={styles.container}>
        <div className={styles.container__logo}>
          <SparkLogo />
        </div>
        <Heading text="All cards" margin="mt-8" />
      </div>
      <div className={styles.container__cards}>
        {data?.map((blog) => (
          <div className=" ml-8">
            <EditBlogCard
              editing={false}
              blogImage={blog.Blogimage}
              blogTitle={blog.title}
              blogHref={blog.href}
            />
          </div>
        ))}
      </div>
      <ButtonLink
        buttonType="regular"
        text="Back"
        href="/ru/blog/add-card/ferlo"
        margin="mt-8 mb-8"
      />
    </div>
  );
};

export default AddBlogCard;
