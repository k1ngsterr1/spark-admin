import { useState } from "react";
import { useBlogCard } from "@shared/lib/hooks/useBlog";

const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { image, setImage } = useBlogCard();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target[0]) {
      const file = event.target[0];
      setSelectedFile(file);
      const filePreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(filePreviewUrl);
      setImage(file);
    }
  };

  const clearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  return { selectedFile, previewUrl, handleFileChange, clearPreview };
};

export default useFileUpload;
