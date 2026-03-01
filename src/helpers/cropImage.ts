type CropAreaPixels = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CropImageOptions = {
  outputWidth: number;
  outputHeight: number;
  mimeType?: string;
  quality?: number;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image for cropping."));
    image.src = src;
  });

export const cropImage = async (
  src: string,
  cropAreaPixels: CropAreaPixels,
  { outputWidth, outputHeight, mimeType = "image/png", quality = 0.92 }: CropImageOptions,
): Promise<Blob> => {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(outputWidth));
  canvas.height = Math.max(1, Math.round(outputHeight));

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context unavailable.");
  }

  context.drawImage(
    image,
    cropAreaPixels.x,
    cropAreaPixels.y,
    cropAreaPixels.width,
    cropAreaPixels.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mimeType, quality),
  );

  if (!blob) {
    throw new Error("Failed to generate cropped image.");
  }

  return blob;
};

export const resizeImage = async (
  src: string,
  { outputWidth, outputHeight, mimeType = "image/png", quality = 0.92 }: CropImageOptions,
): Promise<Blob> => {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(outputWidth));
  canvas.height = Math.max(1, Math.round(outputHeight));

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context unavailable.");
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mimeType, quality),
  );

  if (!blob) {
    throw new Error("Failed to generate resized image.");
  }

  return blob;
};
