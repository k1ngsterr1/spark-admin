"use client";

import React, { useState } from "react";
import Heading from "@shared/ui/Heading/index";
import { EditBlogCard } from "@entities/Card_Components/BlogCard";
import { useGetBlogs } from "@shared/lib/hooks/useGetBlogs";
import { useDeleteBlog } from "@shared/lib/hooks/useDeleteBlogs";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons/index";
import Input from "@shared/ui/Inputs/DefaultInport";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import SparkLogo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";

interface IBlogCard {
  blogId: number;
}

const AddBlogCard: React.FC<IBlogCard> = ({ blogId }) => {
  const { data } = useGetBlogs();
  const { deleteBlog } = useDeleteBlog(blogId);
  const [code, setCode] = useState("");

  const handleDelete = async (blogId: string) => {
    console.log("id", blogId);

    if (code) {
      const formData = new FormData();
      formData.append("code", code);
      formData.append("blogId", blogId);
      await deleteBlog(formData);
    } else {
      console.log("All fields are required");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={styles.container}>
        <div className={styles.container__logo}>
          <SparkLogo />
        </div>
        <Heading text="All cards" margin="mt-8" />
      </div>
      <div className={styles.container__cards}>
        {data?.map((blog) => (
          <div
            key={blog.id}
            className="ml-8 flex flex-col justify-center items-center"
            key={index}
          >
            <EditBlogCard
              blogId={blog.id}
              editing={false}
              image={blog.image}
              blogTitle={blog.title}
              blogHref={blog.href}
            />
            <Button
              buttonType="regular"
              text="Delete"
              margin="mt-6"
              onClick={() => handleDelete(blog.id)}
            />
            <Input
              inputType="default"
              type="text"
              placeholder="Add code for all deletes"
              margin="mt-20"
              name="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
