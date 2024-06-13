import React, { useState } from "react";
import { useBlogCard } from "@shared/lib/hooks/useBlog";
import { useUpdateBlogCard } from "@shared/lib/hooks/useUpdateBlogCard";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import useFileUpload from "@shared/lib/hooks/usePreviewPhoto";
import Input from "@shared/ui/Inputs/DefaultInport";
import { TextArea } from "@shared/ui/TextArea/index";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { AttachmentFileInput } from "@shared/ui/Inputs/AttachmentInput";
import { useUpdateBlog } from "@shared/lib/hooks/useUpdateBlog";

import styles from "./styles.module.scss";

interface IBlogCard {
  editing: boolean;
  blogImage: string | StaticImageData;
  blogTitle: string;
  blogHref: string;
  blogId: number;
}

export const EditBlogCard: React.FC<IBlogCard> = ({
  editing: initialEditing,
  blogHref,
  blogImage,
  blogTitle,
}) => {
  const [editing, setEditing] = useState(initialEditing);

  const { image, setImage, title, setTitle, href, setHref, code, setCode } =
    useUpdateBlog();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await useUpdateBlogCard(
      "https://ferla-backend-production.up.railway.app/api/blog/update/blogId",
      updateData
    );
    setEditing(false);
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      {editing ? (
        <div className={styles.container}>
          <div className=" flex flex-col items-center justify-center">
            <AttachmentFileInput
              placeholder="Add image"
              onChange={(e) => setImage(e.target.files[0])}
              name="image"
              margin="mt-12"
            />
            <TextArea
              placeholder="Add name"
              textareaType="blog"
              margin="mt-8"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              inputType="default"
              type="text"
              placeholder="Add url"
              margin="mt-16"
              name="href"
              required
              value={href}
              onChange={(e) => setHref(e.target.value)}
            />
            <Input
              inputType="default"
              type="text"
              placeholder="Add code"
              margin="mt-16"
              name="href"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.container__card}>
          <Image
            src={blogImage}
            alt="Blog card"
            className={styles.container__card__image}
          />
          <span className={`${styles.container__card__title} dark:text-white`}>
            {blogTitle}
          </span>
          <Link className={styles.container__card__href} href={blogHref}>
            Read More
          </Link>
          <Input
            inputType="default"
            type="text"
            placeholder="Add code"
            margin="mt-16"
            name="href"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      )}
      {editing ? (
        <Button buttonType="regular" text="Save" type="submit" margin="mt-8" />
      ) : (
        <>
          <Button
            buttonType="regular"
            text="Edit"
            margin="mt-10"
            onClick={() => setEditing(true)}
          />
        </>
      )}
    </form>
  );
};
