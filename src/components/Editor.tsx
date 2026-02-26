import type { ImageType } from "../types/image";

import Image from "./Image";
import Caption from "./Caption";

type EditorProps = {
  onAddImage: (file: File) => void;
  selected: number | undefined;
  images: ImageType[];
  onSetPrompt: (prompt: string) => void;
};

const Editor = ({ onAddImage, selected, images, onSetPrompt }: EditorProps) => {
  return (
    <main className="grid h-full min-h-0 grid-rows-[1fr_auto]">
      <div className="min-h-0 overflow-hidden p-6 flex items-center justify-center">
        <Image
          onAddImage={onAddImage}
          currentImage={selected !== undefined ? images[selected] : undefined}
        />
      </div>
      <Caption selected={selected} images={images} setPrompt={onSetPrompt} />
    </main>
  );
};

export default Editor;
