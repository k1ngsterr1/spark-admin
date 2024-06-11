"use client";

import React, { useState } from "react";
import { useBlogCard } from "@shared/lib/hooks/useBlog";
import useFileUpload from "@shared/lib/hooks/usePreviewPhoto";
import Input from "@shared/ui/Inputs/DefaultInport";
import { TextArea } from "@shared/ui/TextArea/index";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import Heading from "@shared/ui/Heading/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

const AddBlogCard: React.FC = () => {
  const { previewUrl, handleFileChange, selectedFile } = useFileUpload();
  const { image, title, setTitle, href, setHref, handleSubmit } = useBlogCard();

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.container__logo}>
          <SparkLogo />
        </div>
        <Heading text="Adding blog card" margin="mt-8" />
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          inputType="default"
          type="text"
          placeholder="Add url"
          margin="mt-16"
          name="href"
          value={href}
          onChange={(e) => setHref(e.target.value)}
        />
        <Button buttonType="regular" text="Add" type="submit" margin="mt-8" />
      </div>
    </form>
  );
};

export default AddBlogCard;
