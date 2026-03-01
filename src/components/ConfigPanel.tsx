type ConfigPanelProps = {
  prompt: string;
  apiKey: string;
  onPromptChange: (value: string) => void;
  onApiKeyChange: (value: string) => void;
  onClose: () => void;
};

const ConfigPanel = ({
  prompt,
  apiKey,
  onPromptChange,
  onApiKeyChange,
  onClose,
}: ConfigPanelProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <section className="w-full max-w-2xl border border-orange-500 bg-zinc-900 p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-amber-500">Configuration</h2>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            Close
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-amber-500">Prompt</span>
            <textarea
              className="min-h-24 resize-y border border-slate-500 bg-slate-700 p-2 text-slate-100"
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Describe how Gemini should caption images..."
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-amber-500">Gemini API Key</span>
            <input
              type="password"
              className="border border-slate-500 bg-slate-700 p-2 text-slate-100"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="AIza..."
            />
          </label>
        </div>
      </section>
    </div>
  );
};

export default ConfigPanel;
