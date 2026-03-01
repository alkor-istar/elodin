import { useState, useReducer, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ConfigPanel from "./components/ConfigPanel";
import appReducer, { initialState } from "./state/appReducer";

function App() {
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const handleCloseConfigPanel = () => {
    setShowConfigPanel(false);
  };
  const handleEditConfig = () => {
    setShowConfigPanel(!showConfigPanel);
  };

  const [appState, dispatch] = useReducer(appReducer, initialState);
  const handleAddImage = (file: File) =>
    dispatch({ type: "ADD_IMAGE", payload: file });
  const handleSelectImage = (index: number) =>
    dispatch({ type: "SELECT_IMAGE", payload: index });
  const handleSetCaption = (caption: string) =>
    dispatch({ type: "SET_CAPTION", payload: caption });
  const handleSetConfigPrompt = (prompt: string) =>
    dispatch({ type: "SET_CONFIG_PROMPT", payload: prompt });
  const handleSetApiKey = (apiKey: string) =>
    dispatch({ type: "SET_API_KEY", payload: apiKey });
  const handleDownloadZip = () => dispatch({ type: "DOWNLOAD_ZIP" });

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.kind !== "file" || !item.type.startsWith("image/")) continue;
        const file = item.getAsFile();
        if (!file) continue;
        handleAddImage(file);
        event.preventDefault();
        return;
      }
    };

    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleAddImage]);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] bg-zinc-950 text-amber-600">
      <div>
        <Header prompt={appState.prompt} onEditConfig={handleEditConfig} />
        {showConfigPanel && (
          <ConfigPanel
            prompt={appState.prompt}
            apiKey={appState.apiKey}
            onPromptChange={handleSetConfigPrompt}
            onApiKeyChange={handleSetApiKey}
            onClose={handleCloseConfigPanel}
          />
        )}
      </div>
      <Main
        state={appState}
        onAddImage={handleAddImage}
        onSelectImage={handleSelectImage}
        onSetCaption={handleSetCaption}
      />
      <Footer
        onDownloadZip={handleDownloadZip}
        numberOfImages={appState.images.length}
      />
    </div>
  );
}

export default App;
