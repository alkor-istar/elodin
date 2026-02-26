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
        <main className="grid h-full min-h-0 grid-rows-[1fr_auto]">
            <div className="min-h-0 overflow-hidden p-6 flex items-center justify-center">
                <Image onAddImage={onAddImage} currentImage={selected !== undefined ? images[selected] : undefined} />
            </div>
            <Caption />
        </main>
    )
}

export default Editor
