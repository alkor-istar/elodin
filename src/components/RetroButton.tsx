import { useState, type ComponentProps, type MouseEvent } from "react";

type RetroButtonProps = {
  label: string;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
} & ComponentProps<"button">;

const RetroButton = ({
  label,
  className,
  pressed,
  defaultPressed,
  onPressedChange,
  onClick,
  disabled,
  ...props
}: RetroButtonProps) => {
  const [internalPressed, setInternalPressed] = useState(defaultPressed ?? false);
  const isToggle =
    pressed !== undefined ||
    defaultPressed !== undefined ||
    onPressedChange !== undefined;
  const isPressed = pressed ?? internalPressed;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isToggle && !disabled) {
      const nextPressed = !isPressed;
      if (pressed === undefined) setInternalPressed(nextPressed);
      onPressedChange?.(nextPressed);
    }
    onClick?.(event);
  };

  return (
    <button
      className={`retro-btn ${className ?? ""}`.trim()}
      aria-pressed={isToggle ? isPressed : undefined}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <span className="inline-block label">{label}</span>
    </button>
  );
};

export default RetroButton;
