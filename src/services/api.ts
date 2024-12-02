import { OpenRouterMessage } from './types';
import { ERROR_MESSAGES } from './errorMessages';

const API_CONFIG = {
  BASE_URL: 'https://openrouter.ai/api/v1',
  MODEL: 'meta-llama/llama-3.2-11b-vision-instruct:free',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  RETRY_DELAY: 2000, // 2 seconds
  MAX_RETRIES: 3
};

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function makeApiRequest(messages: OpenRouterMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
  const siteName = import.meta.env.VITE_SITE_NAME || 'Prompt Designer';

  if (!apiKey) {
    throw new ApiError(ERROR_MESSAGES.API_KEY_MISSING);
  }

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < API_CONFIG.MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        await delay(API_CONFIG.RETRY_DELAY * attempt); // Exponential backoff
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': siteUrl,
          'X-Title': siteName,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: API_CONFIG.MODEL,
          messages,
          temperature: API_CONFIG.TEMPERATURE,
          max_tokens: API_CONFIG.MAX_TOKENS,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          lastError = new ApiError(ERROR_MESSAGES.RATE_LIMIT, response.status);
          continue; // Try again after delay
        }
        throw new ApiError(
          errorData.error?.message || `${ERROR_MESSAGES.REQUEST_FAILED} ${response.status}`,
          response.status
        );
      }

      const data = await response.json();
      
      if (!data?.choices?.[0]?.message?.content) {
        throw new ApiError(ERROR_MESSAGES.INVALID_RESPONSE);
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
      if (error instanceof ApiError && error.status !== 429) {
        throw error; // Don't retry if it's not a rate limit error
      }
    }
  }

  throw lastError || new ApiError(ERROR_MESSAGES.MAX_RETRIES_EXCEEDED);
}