import React, { useState } from "react";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import useFileUpload from "@shared/lib/hooks/Misc/usePreviewPhoto";
import Input from "@shared/ui/Inputs/DefaultInport";
import { TextArea } from "@shared/ui/TextArea/index";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
import { useUpdateBlog } from "@shared/lib/hooks/Blogs/useUpdateBlogCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface IBlogCard {
  editing: boolean;
  image: string | StaticImageData;
  blogTitle: string;
  blogHref: string;
  blogId: number;
}

export const EditBlogCard: React.FC<IBlogCard> = ({
  image,
  blogTitle,
  blogHref,
  blogId,
  editing: initialEditing,
}) => {
  const [editing, setEditing] = useState(initialEditing);

  const { previewUrl, handleFileChange, selectedFile } = useFileUpload();
  const [title, setTitle] = useState("");
  const [href, setHref] = useState("");
  const [code, setCode] = useState("");
  const { updateBlog } = useUpdateBlog(blogId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("id", blogId);

    if (title && href && code && selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("href", href);
      formData.append("code", code);
      formData.append("blogId", blogId.toString());

      await updateBlog(formData);
    } else {
      console.log("All fields are required");
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      {editing ? (
        <div className={styles.container}>
          <div className=" flex flex-col items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className={styles.container__previewImage}
              />
            ) : (
              <label htmlFor="file-upload" className={styles.container__upload}>
                <FontAwesomeIcon
                  icon={faImage}
                  className={styles.container__upload__icon}
                />
                <p className="text-xl text-primary-red">Add image</p>
                <input
                  name="pictureName"
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            )}
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
              name="code"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.container__card}>
          <Image
            src={image}
            alt="Blog card"
            className={styles.container__card__image}
            width={200}
            height={200}
            unoptimized={true}
          />
          <span className={`${styles.container__card__title} dark:text-white`}>
            {blogTitle}
          </span>
          <Link
            className={styles.container__card__href}
            href={blogHref}
            target="_blank"
          >
            Read More
          </Link>
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
