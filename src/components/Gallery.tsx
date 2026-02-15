import type { ImageType } from "../types/image";

type GalleryProps = {
    images: ImageType[],
    selected?: number,
    onSelectImage: (index: number) => void
}

const Gallery = ({ images, selected, onSelectImage }: GalleryProps) => {
    return (
        <aside className="border-r bg-slate-500 overflow-y-auto">
            <div className="p-2 space-y-2">
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
        </aside>
    )
}

export default Gallery;
