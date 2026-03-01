import RetroButton from "./RetroButton";
import InputButton from "./InputButton";

type ToolbarProps = {
  disabled?: boolean;
  handleGenerateCaption?: () => void;
  isCropMode?: boolean;
  cropWidth: number;
  cropHeight: number;
  lockCropAspect: boolean;
  onEnterCropMode?: () => void;
  onApplyCrop?: () => void;
  onCancelCrop?: () => void;
  onCropWidthChange: (width: number) => void;
  onCropHeightChange: (height: number) => void;
  onLockCropAspectChange: (locked: boolean) => void;
};

const Toolbar = ({
  disabled,
  handleGenerateCaption,
  isCropMode,
  cropWidth,
  cropHeight,
  lockCropAspect,
  onEnterCropMode,
  onApplyCrop,
  onCancelCrop,
  onCropWidthChange,
  onCropHeightChange,
  onLockCropAspectChange,
}: ToolbarProps) => {
  return (
    <aside className="w-64 h-56 p-3 bg-slate-700 border-l border-slate-500 flex flex-col gap-2">
      <InputButton
        label="Crop"
        disabled={disabled}
        isCropMode={isCropMode}
        onEnterCropMode={onEnterCropMode}
        onApplyCrop={onApplyCrop}
        onCancelCrop={onCancelCrop}
        width={cropWidth}
        height={cropHeight}
        lockAspect={lockCropAspect}
        onWidthChange={onCropWidthChange}
        onHeightChange={onCropHeightChange}
        onLockAspectChange={onLockCropAspectChange}
      />
      <RetroButton label="Resize" disabled={disabled} />
      <RetroButton
        label="Auto Caption"
        disabled={disabled}
        onClick={handleGenerateCaption}
      />
    </aside>
  );
};

export default Toolbar;
