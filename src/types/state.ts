import type { ImageType } from "./image";

export type State = {
    images: ImageType[],
    selected?: number,
    prompt: string
    apiKey: string,

}