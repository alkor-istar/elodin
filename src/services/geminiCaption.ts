import { GoogleGenerativeAI } from "@google/generative-ai";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result?.toString().split(",")[1] ?? "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateCaptionWithGemini(params: {
  apiKey: string;
  prompt: string;
  file: File;
}): Promise<string> {
  const { apiKey, prompt, file } = params;
  const base64 = await fileToBase64(file); // strip data URL prefix
  const mimeType = file.type || "image/png";
  const ai = new GoogleGenerativeAI(apiKey);
  const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" });
  const res = await model.generateContent([
    {
      inlineData: {
        data: base64,
        mimeType: mimeType,
      },
    },
    {
      text: prompt || "Generate a concise caption for this image.",
    },
  ]);

  if (!res.response.text()) {
    throw new Error("Gemini request failed");
  }
  return res.response.text();
}
