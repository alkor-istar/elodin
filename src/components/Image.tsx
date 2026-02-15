import { type ChangeEvent, useRef } from "react";
import type { ImageType } from "../types/image";

type ImageProps = {
    onAddImage: (file: File) => void,
    currentImage?: ImageType
}

const Image = ({ onAddImage, currentImage }: ImageProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        onAddImage(file);
        event.target.value = "";
    };

    return (
        <div className="w-1/3 min-w-[240px]">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            <div
                className="h-full border-2 border-dashed rounded-lg
                  flex items-center justify-center
                  text-slate-500
                  hover:border-blue-400 hover:bg-blue-50
                  transition cursor-pointer"
                onClick={handleClick}
            >
                <span className="text-sm text-center">
                    Drag & drop images here<br />
                    or click to browse
                </span>
                {currentImage && <img src={currentImage?.previewUrl} className="w-full h-full object-cover" />}
            </div>
        </div>
    );

}

export default Image;
