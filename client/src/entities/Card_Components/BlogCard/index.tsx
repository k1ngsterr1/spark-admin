import React, { useState } from "react";
import { useBlogCard } from "@shared/lib/hooks/useBlog";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import useFileUpload from "@shared/lib/hooks/usePreviewPhoto";
import Input from "@shared/ui/Inputs/DefaultInport";
import { TextArea } from "@shared/ui/TextArea/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface Props {
  editing: boolean;
}

export const EditBlogCard: React.FC<Props> = ({ editing: initialEditing }) => {
  const { previewUrl, handleFileChange, selectedFile } = useFileUpload();
  const { image, title, setTitle, href, setHref } = useBlogCard();
  const [editing, setEditing] = useState(initialEditing);

  return (
    <form className="flex flex-col justify-center items-center">
      <div className={styles.card}>
        {editing ? (
          <div className={styles.container}>
            <div
              className={`${styles.container__content} flex flex-col items-center justify-center`}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={styles.container__previewImage}
                />
              ) : (
                <label
                  htmlFor="file-upload"
                  className={styles.container__upload}
                >
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
          <>
            {/* <img src={url} alt="product" className={styles.card__image} />
            <span className={styles.card__heading}>{productName}</span>
            <span className={styles.card__paragraph}>{productDescription}</span>
            <span className="mt-4 text-2xl">{productPrice}</span> */}
          </>
        )}
      </div>
      {editing ? (
        <Button buttonType="regular" text="Save" type="submit" />
      ) : (
        <Button
          buttonType="regular"
          text="Edit"
          margin="mt-10"
          onClick={() => setEditing(true)}
        />
      )}
    </form>
  );
};
