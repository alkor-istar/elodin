import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { cropImage } from "../helpers/cropImage";
import type { ImageType } from "../types/image";
import Image from "./Image";
import Caption from "./Caption";
import Toolbar from "./Toolbar";

const DEFAULT_CROP_WIDTH = 1024;
const DEFAULT_CROP_HEIGHT = 1024;

type EditorProps = {
  onAddImage: (file: File) => void;
  onReplaceSelectedImage: (file: File) => void;
  selected: number | undefined;
  images: ImageType[];
  onSetCaption: (caption: string) => void;
  handleGenerateCaption: () => void;
  onSelectImage: (index: number) => void;
};

const Editor = ({
  onAddImage,
  onReplaceSelectedImage,
  handleGenerateCaption,
  selected,
  images,
  onSetCaption,
  onSelectImage,
}: EditorProps) => {
  const [isCropMode, setIsCropMode] = useState(false);
  const [isApplyingCrop, setIsApplyingCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropWidth, setCropWidth] = useState(DEFAULT_CROP_WIDTH);
  const [cropHeight, setCropHeight] = useState(DEFAULT_CROP_HEIGHT);
  const [lockCropAspect, setLockCropAspect] = useState(true);
  const [lockedAspectRatio, setLockedAspectRatio] = useState(
    DEFAULT_CROP_WIDTH / DEFAULT_CROP_HEIGHT,
  );
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const currentImage = selected === undefined ? undefined : images[selected];

  const resetCropSession = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, []);

  useEffect(() => {
    setIsCropMode(false);
    setIsApplyingCrop(false);
    resetCropSession();
  }, [currentImage?.id, resetCropSession]);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (isCropMode || selected === undefined || images.length === 0) return;
    event.preventDefault();

    let direction = 0;
    if (event.deltaY > 0) direction = 1;
    if (event.deltaY < 0) direction = -1;
    if (direction === 0) return;

    const nextIndex = Math.min(
      Math.max(selected + direction, 0),
      images.length - 1,
    );

    if (nextIndex !== selected) onSelectImage(nextIndex);
  };

  const handleCropComplete = useCallback(
    (_croppedArea: Area, areaPixels: Area) => {
      setCroppedAreaPixels(areaPixels);
    },
    [],
  );

  const handleEnterCropMode = () => {
    if (!currentImage) return;
    resetCropSession();
    setIsCropMode(true);
  };

  const handleApplyCrop = async () => {
    if (!currentImage || !isCropMode) return;
    try {
      if (!croppedAreaPixels) return;
      setIsApplyingCrop(true);
      const mimeType = currentImage.file.type || "image/png";
      const extension = mimeType.split("/")[1] ?? "png";
      const baseName = currentImage.file.name.replace(/\.[^.]+$/, "");
      const croppedBlob = await cropImage(currentImage.previewUrl, croppedAreaPixels, {
        outputWidth: cropWidth,
        outputHeight: cropHeight,
        mimeType,
      });
      const croppedFile = new File(
        [croppedBlob],
        `${baseName}-cropped.${extension}`,
        { type: mimeType, lastModified: Date.now() },
      );
      onReplaceSelectedImage(croppedFile);
      setIsCropMode(false);
      resetCropSession();
    } catch (error) {
      console.error("Failed to crop image:", error);
    } finally {
      setIsApplyingCrop(false);
    }
  };

  const handleCancelCrop = () => {
    setIsCropMode(false);
    resetCropSession();
  };

  const handleCropWidthChange = (width: number) => {
    setCropWidth(width);
    if (!lockCropAspect) return;
    setCropHeight(Math.max(1, Math.round(width / lockedAspectRatio)));
  };

  const handleCropHeightChange = (height: number) => {
    setCropHeight(height);
    if (!lockCropAspect) return;
    setCropWidth(Math.max(1, Math.round(height * lockedAspectRatio)));
  };

  const handleLockCropAspectChange = (locked: boolean) => {
    setLockCropAspect(locked);
    if (!locked) return;
    setLockedAspectRatio(cropWidth / cropHeight);
  };

  const cropAspect = Math.max(cropWidth / cropHeight, 0.0001);

  return (
    <main className="grid h-full min-h-0 grid-rows-[1fr_auto]">
      <div
        onWheel={handleWheel}
        className="min-h-0 overflow-hidden p-6 flex items-center justify-center"
      >
        {isCropMode && currentImage ? (
          <div className="relative h-full min-h-0 w-full max-w-xl rounded-lg overflow-hidden bg-slate-900">
            <Cropper
              image={currentImage.previewUrl}
              crop={crop}
              zoom={zoom}
              aspect={lockCropAspect ? lockedAspectRatio : cropAspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              showGrid
            />
          </div>
        ) : (
          <Image onAddImage={onAddImage} currentImage={currentImage} />
        )}
      </div>
      <div className="grid grid-cols-[1fr_auto]">
        <Caption
          selected={selected}
          images={images}
          onSetCaption={onSetCaption}
        />
        <Toolbar
          handleGenerateCaption={handleGenerateCaption}
          disabled={currentImage === undefined || isApplyingCrop}
          isCropMode={isCropMode}
          cropWidth={cropWidth}
          cropHeight={cropHeight}
          lockCropAspect={lockCropAspect}
          onEnterCropMode={handleEnterCropMode}
          onApplyCrop={() => {
            void handleApplyCrop();
          }}
          onCancelCrop={handleCancelCrop}
          onCropWidthChange={handleCropWidthChange}
          onCropHeightChange={handleCropHeightChange}
          onLockCropAspectChange={handleLockCropAspectChange}
        />
      </div>
    </main>
  );
};

export default Editor;
