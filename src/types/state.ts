import type { ImageType } from "./image";

export type State = {
  images: ImageType[];
  selected?: number;
  apiKey: string;
  prompt: string;
  status: string;
};
