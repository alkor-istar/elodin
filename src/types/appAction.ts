export type AppAction =
  | { type: "SET_CONFIG_PROMPT"; payload: string }
  | { type: "SET_API_KEY"; payload: string }
  | { type: "ADD_IMAGE"; payload: File }
  | { type: "SET_CAPTION"; payload: string }
  | { type: "SELECT_IMAGE"; payload: number }
  | { type: "DOWNLOAD_ZIP" };
