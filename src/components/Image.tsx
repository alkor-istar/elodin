import { type ChangeEvent, useEffect, useRef, useState } from "react";
import type { ImageType } from "../types/image";

type ImageProps = {
  onAddImage: (file: File) => void;
  currentImage?: ImageType;
};

const FADE_MS = 180;

const Image = ({ onAddImage, currentImage }: ImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // image currently rendered on screen
  const [displayedImage, setDisplayedImage] = useState<ImageType | undefined>(
    currentImage,
  );
  // controls opacity class
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isSameImage =
      displayedImage?.id === currentImage?.id &&
      displayedImage?.previewUrl === currentImage?.previewUrl;
    if (isSameImage) return;

    // Trigger fade-out asynchronously to avoid synchronous setState in effect.
    const fadeOutTimer = globalThis.setTimeout(() => {
      setVisible(false);
    }, 0);

    const swapTimer = globalThis.setTimeout(() => {
      // swap source, then fade in
      setDisplayedImage(currentImage);
      setVisible(true);
    }, FADE_MS);

    return () => {
      globalThis.clearTimeout(fadeOutTimer);
      globalThis.clearTimeout(swapTimer);
    };
  }, [
    currentImage?.id,
    currentImage?.previewUrl,
    displayedImage?.id,
    displayedImage?.previewUrl,
    currentImage,
  ]);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    for (const file of Array.from(files)) onAddImage(file);
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
                   flex items-center justify-center overflow-hidden text-slate-500
                   cursor-pointer"
        onClick={handleClick}
      >
        {displayedImage ? (
          <img
            src={displayedImage.previewUrl}
            alt="Selected"
            className={`w-full h-full object-contain rounded-lg
                        transition-opacity duration-200 ease-in-out
                        ${visible ? "opacity-100" : "opacity-0"}`}
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
