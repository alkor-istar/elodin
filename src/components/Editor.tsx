import type { ImageType } from "../types/image";

import Image from "./Image";
import Caption from "./Caption";
import Toolbar from "./Toolbar";

type EditorProps = {
  onAddImage: (file: File) => void;
  selected: number | undefined;
  images: ImageType[];
  onSetCaption: (caption: string) => void;
  onSelectImage: (index: number) => void;
};

const Editor = ({
  onAddImage,
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
        <Toolbar />
      </div>
    </main>
  );
};

export default Editor;
