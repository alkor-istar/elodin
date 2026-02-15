import type { ImageType } from "../types/image";

import Image from "./Image";
import Caption from "./Caption";

type EditorProps = {
    onAddImage: (file: File) => void,
    selected: number | undefined,
    images: ImageType[],
}

const Editor = ({ onAddImage, selected, images }: EditorProps) => {
    return (
        <main className="flex flex-col h-full">
            <Image onAddImage={onAddImage} currentImage={images[selected]} />
            <Caption />
        </main>
    )
}

export default Editor
