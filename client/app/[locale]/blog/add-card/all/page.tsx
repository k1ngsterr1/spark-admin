"use client";

import React from "react";
import Heading from "@shared/ui/Heading/index";
import { EditBlogCard } from "@entities/Card_Components/BlogCard";
import { useGetBlogs } from "@shared/lib/hooks/Blogs/useGetBlogs";
import { useDeleteBlogCard } from "@shared/lib/hooks/Blogs/useDeleteBlogs";
import {
  ButtonLink,
  Button,
} from "@shared/ui/Buttons_Components/Buttons/index";
import SparkLogo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";

interface IBlogCard {
  blogId: number;
}

const AddBlogCard: React.FC<IBlogCard> = () => {
  const { data } = useGetBlogs();
  const t = useTranslations("");
  const { deleteBlog } = useDeleteBlogCard();

  const handleDeleteBlog = (blogId: string) => {
    deleteBlog(blogId);
  };

  return (
    <div className="flex flex-col items-center justify-center m-auto">
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
              onClick={() => handleDeleteBlog(blog.id)}
            />
            <ButtonLink
              buttonType="regular"
              text="Back"
              href="/ru/blog/add-card/ferla"
              margin="mt-16"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlogCard;
