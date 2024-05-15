import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface IAttachmentFileInput
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  margin: string;
}

export const AttachmentFileInput: React.FC<IAttachmentFileInput> = ({
  onChange,
  margin,
  ...rest
}) => {
  const [fileName, setFileName] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // Обновляем состояние, устанавливаем имя выбранного файла
    }
    onChange(event); // Передаем событие наверх для обработки
  };

  return (
    <div className={`${styles.customFileInput} ${margin}`}>
      <input
        id="htmlTemplate"
        name="htmlTemplate"
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        required
        className={styles.input}
      />
      <label
        htmlFor="htmlTemplate"
        className={`${styles.customFileInputLabel} dark:border-primary dark:text-dark-text`}
      >
        <FontAwesomeIcon className="mr-2" icon={faPaperclip} />
        {fileName || "Ваш шаблон"}{" "}
      </label>
    </div>
  );
};