import { Message } from './types';
import { ApiError } from './error';
import { ERROR_MESSAGES } from '../errorMessages';
import { API_CONFIG, getApiConfig } from './config';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function makeApiRequest(messages: Message[]): Promise<string> {
  const config = getApiConfig();

  if (!config.apiKey) {
    throw new ApiError(ERROR_MESSAGES.API_KEY_MISSING);
  }

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < API_CONFIG.maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        await delay(API_CONFIG.retryDelay * Math.pow(2, attempt - 1));
      }

      const response = await fetch(`${API_CONFIG.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'HTTP-Referer': config.siteUrl,
          'X-Title': config.siteName,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: API_CONFIG.model,
          messages,
          temperature: API_CONFIG.temperature,
          max_tokens: API_CONFIG.maxTokens,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          lastError = new ApiError(ERROR_MESSAGES.RATE_LIMIT, response.status);
          continue;
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
      console.error('API Request Error:', error);
      lastError = error instanceof Error ? error : new Error(ERROR_MESSAGES.GENERIC_ERROR);
      if (error instanceof ApiError && error.status !== 429) {
        throw error;
      }
    }
  }

  throw lastError || new ApiError(ERROR_MESSAGES.MAX_RETRIES_EXCEEDED);
}