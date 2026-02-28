import type { ImageType } from "../types/image";

type CaptionProps = {
  selected: number | undefined;
  images: ImageType[];
  setPrompt: (prompt: string) => void;
};

const Caption = ({ selected, images, setPrompt }: CaptionProps) => {
  const caption = selected !== undefined ? images[selected].caption : "";
  return (
    <section className="h-56 p-4 flex flex-col gap-3 bg-slate-600">
      <textarea
        className="flex-1 resize-none rounded-md border p-3 text-sm bg-slate-500 text-slate-100
             focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={caption}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Image description..."
      />
    </section>
  );
};

export default Caption;
