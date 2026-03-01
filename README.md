# Elodin

Elodin is a frontend only React + Vite app for generating image captions with Google Gemini.

## Test the App

Use the live app here: https://elodin-caption.vercel.app/

## Requirements

- Node.js 18+ (Node.js 20+ recommended)
- npm
- A Gemini API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Gemini API Key

This app expects your API key to be entered in the UI (it is not read from `.env`).

1. Go to Google AI Studio: `https://aistudio.google.com/app/apikey`
2. Sign in and create a new API key.
3. In Elodin, click **Edit config**.
4. Paste your key into the **Gemini API Key** field.
5. (Optional) Adjust the prompt in the same panel.

## How to Use

1. Upload one or more images (or paste an image from clipboard).
2. Select an image and click **Generate Caption**, or click **Generate all captions**.
3. Click **Download ZIP** to export files:
   - `0001.jpg`, `0002.jpg`, ...
   - `0001.txt`, `0002.txt`, ... (matching captions)
