import Editor from "./Editor";
import Gallery from "./Gallery";
import type { State } from "../types/state";

type MainProps = {
  state: State;
  onAddImage: (file: File) => void;
  onSelectImage: (index: number) => void;
  onSetPrompt: (prompt: string) => void;
};

const Main = ({ state, onAddImage, onSelectImage, onSetPrompt }: MainProps) => {
  const images = state.images;
  const selected = state.selected;

  return (
    <div className="grid grid-cols-[240px_1fr] h-full min-h-0">
      <Gallery
        images={images}
        onAddImage={onAddImage}
        onSelectImage={onSelectImage}
        selected={selected}
      />
      <Editor
        onAddImage={onAddImage}
        selected={selected}
        images={images}
        onSetPrompt={onSetPrompt}
      />
    </div>
  );
};

export default Main;
