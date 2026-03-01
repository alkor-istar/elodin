export type AppAction =
  | { type: "SET_CONFIG_PROMPT"; payload: string }
  | { type: "SET_API_KEY"; payload: string }
  | { type: "ADD_IMAGE"; payload: File }
  | { type: "REPLACE_IMAGE_FILE"; payload: { index: number; file: File } }
  | { type: "SET_CAPTION"; payload: { caption: string; index: number } }
  | { type: "SELECT_IMAGE"; payload: number }
  | { type: "DOWNLOAD_ZIP" }
  | { type: "SET_STATUS"; payload: string };
