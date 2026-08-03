const GEMINI_API_KEY_PLACEHOLDER = 'YOUR_GEMINI_KEY';

export const GEMINI_API_KEY: string = 'AQ.Ab8RN6Lp7sMEvtMyQs3MGKmSsjaNyHNARJk30cVlItWUcVAsDg';

export const GEMINI_MODEL = 'gemini-3.5-flash';

export function isGeminiConfigured(): boolean {
  return (
    GEMINI_API_KEY.length > 0 && GEMINI_API_KEY !== GEMINI_API_KEY_PLACEHOLDER
  );
}
