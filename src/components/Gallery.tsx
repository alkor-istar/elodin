import type { ImageType } from "../types/image";
import { useRef } from "react";
import { type ChangeEvent } from "react";

type GalleryProps = {
    images: ImageType[],
    selected?: number,
    onSelectImage: (index: number) => void
}

const Gallery = ({ images, selected, onSelectImage }: GalleryProps) => {
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
        <aside className="border-r bg-slate-500 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {images.map((img, i) => (
                    <button
                        key={i}
                        className="w-full aspect-square rounded-md overflow-hidden border
                   hover:ring-2 hover:ring-blue-300
                   data-[active=true]:ring-2 data-[active=true]:ring-blue-500"
                        data-active={i === selected}
                        onClick={() => onSelectImage(i)}
                    >
                        <img
                            src={img.previewUrl}
                            className="w-full h-full object-cover"
                        />
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
                <button className="w-full p-2 text-sm text-slate-700 hover:bg-slate-200" onClick={handleClick}>Upload Files</button>
            </div>
        </aside>
    )
}

export default Gallery;
