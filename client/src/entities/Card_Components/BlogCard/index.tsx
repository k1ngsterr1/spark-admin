import React, { useState } from "react";
import { useBlogCard } from "@shared/lib/hooks/useBlog";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import useFileUpload from "@shared/lib/hooks/usePreviewPhoto";
import Input from "@shared/ui/Inputs/DefaultInport";
import { TextArea } from "@shared/ui/TextArea/index";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

import photo from "@assets/example.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface IBlogCard {
  editing: boolean;
  blogImage: string | StaticImageData;
  blogTitle: string;
  blogHref: string;
}

export const EditBlogCard: React.FC<IBlogCard> = ({
  editing: initialEditing,
  blogHref,
  blogImage,
  blogTitle,
}) => {
  const { previewUrl, handleFileChange, selectedFile } = useFileUpload();
  const { image, title, setTitle, href, setHref } = useBlogCard();
  const [editing, setEditing] = useState(initialEditing);

  return (
    <form className="flex flex-col justify-center items-center">
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
                  className={styles.container__upload__icon}
                  icon={faImage}
                />
                <p className=" text-2xl ">Attach photo</p>
                <input
                  name="image"
                  id="file-upload"
                  type="file"
                  required
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
          <Button buttonType="regular" text="Delete" margin="mt-6" />
        </>
      )}
    </form>
  );
};
