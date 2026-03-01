import { useState, useReducer, useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ConfigPanel from "./components/ConfigPanel";
import appReducer, { initialState } from "./state/appReducer";
import { generateCaptionWithGemini } from "./services/geminiCaption";

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
    dispatch({
      type: "SET_CAPTION",
      payload: { caption, index: appState.selected ?? 0 },
    });
  const handleSetConfigPrompt = (prompt: string) =>
    dispatch({ type: "SET_CONFIG_PROMPT", payload: prompt });
  const handleSetApiKey = (apiKey: string) =>
    dispatch({ type: "SET_API_KEY", payload: apiKey });
  const handleDownloadZip = () => dispatch({ type: "DOWNLOAD_ZIP" });
  const handleGenerateCaption = async () => {
    dispatch({ type: "SET_STATUS", payload: "Generating caption..." });
    const caption = await generateCaptionWithGemini({
      apiKey: appState.apiKey,
      prompt: appState.prompt,
      file: appState.images[appState.selected ?? 0]?.file,
    });
    dispatch({ type: "SET_STATUS", payload: "Caption generated" });
    dispatch({
      type: "SET_CAPTION",
      payload: { caption, index: appState.selected ?? 0 },
    });
  };
  const handleGenerateAllCaptions = async () => {
    const totalImages = appState.images.length;
    for (let index = 0; index < totalImages; index++) {
      const image = appState.images[index];
      dispatch({
        type: "SET_STATUS",
        payload: `Generating caption for image ${index + 1} of ${totalImages}`,
      });
      const caption = await generateCaptionWithGemini({
        apiKey: appState.apiKey,
        prompt: appState.prompt,
        file: image.file,
      });
      dispatch({
        type: "SET_CAPTION",
        payload: { caption, index: index },
      });
    }
    dispatch({ type: "SET_STATUS", payload: "All captions generated" });
  };
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
        handleGenerateCaption={handleGenerateCaption}
        onAddImage={handleAddImage}
        onSelectImage={handleSelectImage}
        onSetCaption={handleSetCaption}
      />
      <Footer
        onDownloadZip={handleDownloadZip}
        handleGenerateAllCaptions={handleGenerateAllCaptions}
        status={appState.status}
        numberOfImages={appState.images.length}
      />
    </div>
  );
}

export default App;
