import type { ImageType } from "../types/image";

import Image from "./Image";
import Caption from "./Caption";
import Toolbar from "./Toolbar";

type EditorProps = {
  onAddImage: (file: File) => void;
  selected: number | undefined;
  images: ImageType[];
  onSetCaption: (caption: string) => void;
  handleGenerateCaption: () => void;
  onSelectImage: (index: number) => void;
};

const Editor = ({
  onAddImage,
  handleGenerateCaption,
  selected,
  images,
  onSetCaption,
  onSelectImage,
}: EditorProps) => {
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (selected === undefined || images.length === 0) return;
    event.preventDefault();

    const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
    if (direction === 0) return;

    const nextIndex = Math.min(
      Math.max(selected + direction, 0),
      images.length - 1,
    );

    if (nextIndex !== selected) onSelectImage(nextIndex);
  };

  const handlePasteFromClipboard = async () => {
    if (!navigator.clipboard?.read) {
      console.warn("Clipboard read API not supported in this browser.");
      return;
    }

    try {
      const items = await navigator.clipboard.read();

      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith("image/"));
        if (!imageType) continue;

        const blob = await item.getType(imageType);
        const ext = imageType.split("/")[1] ?? "png";
        const file = new File([blob], `clipboard-${Date.now()}.${ext}`, {
          type: imageType,
        });

        onAddImage(file); // reducer will add + auto-select it
        return; // stop after first image
      }

      console.info("Clipboard has no image.");
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };

  return (
    <main className="grid h-full min-h-0 grid-rows-[1fr_auto]">
      <div
        onWheel={handleWheel}
        className="min-h-0 overflow-hidden p-6 flex items-center justify-center"
      >
        <Image
          onAddImage={onAddImage}
          currentImage={selected !== undefined ? images[selected] : undefined}
        />
      </div>
      <div className="grid grid-cols-[1fr_auto]">
        <Caption
          selected={selected}
          images={images}
          onSetCaption={onSetCaption}
        />
        <Toolbar
          onPasteFromClipboard={handlePasteFromClipboard}
          handleGenerateCaption={handleGenerateCaption}
        />
      </div>
    </main>
  );
};

export default Editor;
