import RetroButton from "./RetroButton";

type FooterProps = {
  onDownloadZip: () => void;
  status: string;
  numberOfImages: number;
  handleGenerateAllCaptions: () => void;
};

const Footer = ({
  onDownloadZip,
  numberOfImages,
  status,
  handleGenerateAllCaptions,
}: FooterProps) => {
  return (
    <footer className="flex items-center justify-between px-4 py-2 border-t border-amber-700 bg-zinc-950">
      <span className="text-amber-600">{status}</span>
      <div className="ml-auto flex items-center gap-2">
        <RetroButton
          label="Generate all captions"
          onClick={handleGenerateAllCaptions}
        />
        <RetroButton
          label="Download ZIP"
          onClick={onDownloadZip}
          disabled={numberOfImages === 0}
        />
      </div>
    </footer>
  );
};

export default Footer;
