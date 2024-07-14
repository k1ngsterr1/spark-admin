"use client";

import React, { useState } from "react";
import { TextArea } from "@shared/ui/TextArea/index";
import { Button } from "@shared/ui/Buttons_Components/Buttons/index";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Heading from "@shared/ui/Heading/index";
import Input from "@shared/ui/Inputs/DefaultInport";
import { useAddCard } from "@shared/lib/hooks/Isolated_Components/useAddBlogCard";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

const AddBlogCard: React.FC = () => {

  const { title, setTitle, href, setHref, code, setCode, handleSubmit, previewUrl, handleFileChange,selectedFile} = useAddCard();
 
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.container__logo}>
          <SparkLogo />
        </div>
        <Heading text="Adding blog card" margin="mt-8" />
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
            name="href"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className=" flex flex-col mt-8 gap-4">
          <Button buttonType="regular" text="Add" type="submit" />
          <ButtonLink
            buttonType="regular"
            text="Show all"
            href="/ru/blog/add-card/all"
          />
        </div>
      </div>
    </form>
  );
};

export default AddBlogCard;
