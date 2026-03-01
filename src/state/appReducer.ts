import type { State } from "../types/state";
import type { AppAction } from "../types/appAction";
import { downloadImagesAndCaptionsZip } from "../helpers/downloadZip";
import { generateCaptionWithGemini } from "../services/geminiCaption";

export const initialState: State = {
  images: [],
  selected: undefined,
  apiKey: "",
  prompt: "",
  status: "Ready",
};

function appReducer(state: State, action: AppAction): State {
  switch (action.type) {
    case "SET_CONFIG_PROMPT":
      return { ...state, prompt: action.payload };

    case "SET_API_KEY":
      return { ...state, apiKey: action.payload };

    case "ADD_IMAGE": {
      const newImage = {
        id: crypto.randomUUID(),
        file: action.payload,
        previewUrl: URL.createObjectURL(action.payload),
        caption: "",
        status: "idle" as const,
        error: "",
      };
      return {
        ...state,
        images: [...state.images, newImage],
        selected: state.images.length,
      };
    }

    case "SET_CAPTION":
      return {
        ...state,
        images: state.images.map((img, i) =>
          i === state.selected ? { ...img, caption: action.payload } : img,
        ),
      };

    case "SELECT_IMAGE":
      return { ...state, selected: action.payload };

    case "DOWNLOAD_ZIP":
      downloadImagesAndCaptionsZip(state.images);
      return state;

    case "SET_STATUS":
      return { ...state, status: action.payload };

    default:
      return state;
  }
}

export default appReducer;
