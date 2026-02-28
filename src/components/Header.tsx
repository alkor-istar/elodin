import RetroButton from "./RetroButton";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-orange-500 bg-zinc-950">
      <h1 className="text-lg font-semibold text-amber-600">
        Elodin - Image Caption Tool
      </h1>

      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 truncate max-w-[240px]">
          Prompt: concise caption
        </span>

        <RetroButton label="Edit config" />
      </div>
    </header>
  );
};

export default Header;
