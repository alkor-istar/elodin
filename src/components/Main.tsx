import Editor from "./Editor";
import Gallery from "./Gallery";
import type { State } from "../types/state";

type MainProps = {
  state: State;
  onAddImage: (file: File) => void;
  onSelectImage: (index: number) => void;
  onSetCaption: (caption: string) => void;
  handleGenerateCaption: () => void;
};

const Main = ({
  state,
  onAddImage,
  onSelectImage,
  onSetCaption,
  handleGenerateCaption,
}: MainProps) => {
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
        handleGenerateCaption={handleGenerateCaption}
        onSelectImage={onSelectImage}
        selected={selected}
        images={images}
        onSetCaption={onSetCaption}
      />
    </div>
  );
};

export default Main;
