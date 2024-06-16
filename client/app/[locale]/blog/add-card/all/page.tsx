"use client";

import React, { useState } from "react";

import Heading from "@shared/ui/Heading/index";
import { EditBlogCard } from "@entities/Card_Components/BlogCard";
import { useGetBlogs } from "@shared/lib/hooks/useGetBlogs";
import { useDeleteBlogs } from "@shared/lib/hooks/useDeleteBlogs";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons/index";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import { useUpdateBlog } from "@shared/lib/hooks/useUpdateBlogCard";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

const AddBlogCard: React.FC = () => {
  const { data } = useGetBlogs();

  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className={styles.container}>
        <div className={styles.container__logo}>
          <SparkLogo />
        </div>
        <Heading text="All cards" margin="mt-8" />
      </div>
      <div className={styles.container__cards}>
        {data?.map((blog, index) => (
          <div
            className=" ml-8 flex flex-col justify-center items-center"
            key={index}
          >
            <EditBlogCard
              blogId={blog.id}
              editing={false}
              image={blog.image}
              blogTitle={blog.title}
              blogHref={blog.href}
              key={index}
            />
            <Button
              buttonType="regular"
              text="Delete"
              margin="mt-6"
              // onClick={() => handleDelete(blog.id)}
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
