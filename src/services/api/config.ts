export const API_CONFIG = {
  baseUrl: 'https://openrouter.ai/api/v1',
  model: 'meta-llama/llama-3.2-11b-vision-instruct:free',
  maxTokens: 500,
  temperature: 0.7,
  retryDelay: 2000,
  maxRetries: 3
} as const;

export function getApiConfig() {
  return {
    apiKey: localStorage.getItem('openrouter_api_key') || '',
    siteUrl: window.location.origin,
    siteName: 'Prompt Designer'
  };
}