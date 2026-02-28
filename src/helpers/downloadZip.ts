import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { ImageType } from "../types/image";

const toJpegBlob = (file: File, quality = 0.92): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Could not get canvas context"));

      // Fill white so transparent PNGs don't become black in JPEG
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("JPEG conversion failed"));
          resolve(blob);
        },
        "image/jpeg",
        quality,
      );
    };
    img.onerror = () =>
      reject(new Error(`Could not decode image: ${file.name}`));
    img.src = URL.createObjectURL(file);
  });

export async function downloadImagesAndCaptionsZip(images: ImageType[]) {
  if (!images.length) return;

  const zip = new JSZip();

  for (let i = 0; i < images.length; i++) {
    const seq = String(i + 1).padStart(4, "0");
    const { file, caption } = images[i];

    const jpgBlob = await toJpegBlob(file);
    zip.file(`${seq}.jpg`, jpgBlob);
    zip.file(`${seq}.txt`, caption ?? "");
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "captions.zip");
}
