import { type ChangeEvent, useRef } from "react";
import type { ImageType } from "../types/image";

type ImageProps = {
  onAddImage: (file: File) => void;
  currentImage?: ImageType;
};

const Image = ({ onAddImage, currentImage }: ImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      onAddImage(file);
    }
    event.target.value = "";
  };
  return (
    <div className="w-full max-w-xl h-full min-h-0">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        className="h-full min-h-0 w-full border-2 border-dashed rounded-lg
                  flex items-center justify-center overflow-hidden
                  text-slate-500
                  transition cursor-pointer"
        onClick={handleClick}
      >
        {currentImage ? (
          <img
            src={currentImage.previewUrl}
            alt="Selected"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        ) : (
          <span className="text-sm text-center">
            Drag & drop images here
            <br />
            or click to browse
          </span>
        )}
      </div>
    </div>
  );
};

export default Image;
