import type { ComponentProps } from "react";

type RetroButtonProps = {
  label: string;
} & ComponentProps<"button">;

const RetroButton = ({ label, className, ...props }: RetroButtonProps) => {
  return (
    <button className={`retro-btn ${className ?? ""}`.trim()} {...props}>
      <span className="inline-block label">{label}</span>
    </button>
  );
};

export default RetroButton;
