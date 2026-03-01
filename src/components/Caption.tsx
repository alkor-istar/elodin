import type { ImageType } from "../types/image";

type CaptionProps = {
  selected: number | undefined;
  images: ImageType[];
  onSetCaption: (caption: string) => void;
};

const Caption = ({ selected, images, onSetCaption }: CaptionProps) => {
  const caption = selected !== undefined ? images[selected].caption : "";
  return (
    <section className="h-56 p-4 flex flex-col gap-3 bg-zinc-700">
      <textarea
        className="retro-scrollbar flex-1 resize-none rounded-md border p-3 text-sm bg-zinc-900 text-amber-500
             focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={caption}
        onChange={(e) => onSetCaption(e.target.value)}
        placeholder="Image description..."
      />
    </section>
  );
};

export default Caption;
