import RetroButton from "./RetroButton";

type ToolbarProps = {
  disabled?: boolean;
  onPasteFromClipboard?: () => void;
  onGenerate?: () => void;
  onCopy?: () => void;
  onClear?: () => void;
};

const Toolbar = ({
  disabled,
  onPasteFromClipboard,
  onCopy,
  onClear,
}: ToolbarProps) => {
  return (
    <aside className="w-40 h-56 p-3 bg-slate-700 border-l border-slate-500 flex flex-col gap-2">
      <RetroButton
        label="Paste from Clipboard"
        disabled={disabled}
        onClick={onPasteFromClipboard}
      />
      <RetroButton label="Crop" disabled={disabled} onClick={onCopy} />
      <RetroButton label="Resize" disabled={disabled} onClick={onClear} />
      <RetroButton label="Auto Caption" disabled={disabled} onClick={onClear} />
    </aside>
  );
};

export default Toolbar;
