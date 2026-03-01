import RetroButton from "./RetroButton";
import type { State } from "../types/state";

type FooterProps = {
  onDownloadZip: () => void;
  status: string;
  numberOfImages: number;
};

const Footer = ({ onDownloadZip, numberOfImages, status }: FooterProps) => {
  return (
    <footer className="flex items-center justify-between px-4 py-2 border-t border-amber-700 bg-zinc-950">
      <span className="text-amber-600">{status}</span>

      <RetroButton
        label="Download ZIP"
        onClick={onDownloadZip}
        disabled={numberOfImages === 0}
      />
    </footer>
  );
};

export default Footer;
