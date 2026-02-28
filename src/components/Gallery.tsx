import type { ImageType } from "../types/image";
import { useRef } from "react";
import { type ChangeEvent } from "react";
import RetroButton from "./RetroButton";

type GalleryProps = {
  images: ImageType[];
  selected?: number;
  onAddImage: (file: File) => void;
  onSelectImage: (index: number) => void;
};

const Gallery = ({
  images,
  selected,
  onAddImage,
  onSelectImage,
}: GalleryProps) => {
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
    <aside className="border-r bg-slate-600 flex min-h-0 flex-col h-full">
      <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-2">
        {images.map((img, i) => (
          <button
            key={i}
            className="w-full aspect-square rounded-md  overflow-hidden border
                   hover:ring-2 hover:ring-blue-300
                   data-[active=true]:ring-2 data-[active=true]:ring-blue-500"
            data-active={i === selected}
            onClick={() => onSelectImage(i)}
          >
            <img src={img.previewUrl} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <div border-t>
        <RetroButton
          label="Upload Files"
          className="w-full p-2"
          onClick={handleClick}
        />
      </div>
    </aside>
  );
};

export default Gallery;
