import type { ChangeEvent } from "react";
import RetroButton from "./RetroButton";

type InputButtonProps = {
  label: string;
  disabled?: boolean;
  isCropMode?: boolean;
  onEnterCropMode?: () => void;
  onApplyCrop?: () => void;
  onCancelCrop?: () => void;
  width: number;
  height: number;
  lockAspect: boolean;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onLockAspectChange: (locked: boolean) => void;
};

const InputButton = ({
  label,
  disabled,
  isCropMode,
  onEnterCropMode,
  onApplyCrop,
  onCancelCrop,
  width,
  height,
  lockAspect,
  onWidthChange,
  onHeightChange,
  onLockAspectChange,
}: InputButtonProps) => {
  const parseDimensionValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!Number.isFinite(value)) return 0;
    return Math.max(1, Math.round(value));
  };

  return (
    <div className="flex flex-col gap-2">
      {isCropMode ? (
        <div className="grid grid-cols-2 gap-2">
          <RetroButton label="Apply" disabled={disabled} onClick={onApplyCrop} />
          <RetroButton label="Cancel" disabled={disabled} onClick={onCancelCrop} />
        </div>
      ) : (
        <RetroButton label={label} disabled={disabled} onClick={onEnterCropMode} />
      )}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1 flex-1 text-xs">
          <span>W:</span>
          <input
            type="number"
            className="no-spinner w-full px-1 py-0.5 bg-slate-800 border border-slate-500 rounded text-slate-100"
            min={1}
            value={width}
            onChange={(event) => onWidthChange(parseDimensionValue(event))}
          />
        </label>

        <label className="flex items-center gap-1 flex-1 text-xs">
          <span>H:</span>
          <input
            type="number"
            className="no-spinner w-full px-1 py-0.5 bg-slate-800 border border-slate-500 rounded text-slate-100"
            min={1}
            value={height}
            onChange={(event) => onHeightChange(parseDimensionValue(event))}
          />
        </label>
        <RetroButton
          label="L"
          className="px-2 py-0.5 text-xs leading-none shrink-0"
          pressed={lockAspect}
          onPressedChange={(pressed) => onLockAspectChange(pressed)}
          title="Lock aspect ratio"
          aria-label="Lock aspect ratio"
        />
      </div>
    </div>
  );
};

export default InputButton;
