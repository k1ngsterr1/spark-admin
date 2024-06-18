'use client';

import React, { useState } from "react";
import Heading from "@shared/ui/Heading/index";
import { EditBlogCard } from "@entities/Card_Components/BlogCard";
import { useGetBlogs } from "@shared/lib/hooks/useGetBlogs";
import { useDeleteBlogCard } from "@shared/lib/hooks/useDeleteBlogs"; // Update import path as necessary
import { ButtonLink, Button } from "@shared/ui/Buttons_Components/Buttons/index";
import Input from "@shared/ui/Inputs/DefaultInport";
import SparkLogo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";

const AddBlogCard = () => {
  const { data } = useGetBlogs();
  const { deleteBlog } = useDeleteBlogCard();
  const [code, setCode] = useState(""); 

  const handleDeleteBlog = (blogId: number) => {
    if (code) {
      deleteBlog({ blogId, code });
      console.log(blogId);
    } else {
      console.error("Special code is required", blogId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={styles.container}>
        <div className={styles.container__logo}><SparkLogo /></div>
        <Heading text="All cards" margin="mt-8" />
      </div>
      <div className={styles.container__cards}>
        {data?.map((blog) => (
          <div key={blog.id} className="ml-8 flex flex-col justify-center items-center">
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
              onClick={() => handleDeleteBlog(blog.id)}
            />
            <Input
        inputType="default"
          type="text"
          placeholder="Enter special code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          margin="mt-4"
        />
          </div>
        ))}
      </div>
      <ButtonLink buttonType="regular" text="Back" href="/ru/blog/add-card/ferlo" margin="mt-8 mb-8" />
    </div>
  );
};

export default AddBlogCard;
