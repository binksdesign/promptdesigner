export const API_CONFIG = {
  BASE_URL: 'https://openrouter.ai/api/v1',
  MODEL: 'anthropic/claude-3-haiku',  // Changed to a more reliable model
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  RETRY_DELAY: 2000,
  MAX_RETRIES: 3
} as const;

export function getApiConfig() {
  return {
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    siteUrl: import.meta.env.VITE_SITE_URL || window.location.origin,
    siteName: import.meta.env.VITE_SITE_NAME || 'Prompt Designer'
  };
}