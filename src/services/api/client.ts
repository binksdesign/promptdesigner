import { ApiConfig, OpenAIResponse, RequestOptions } from './types';
import { OpenAIError, ERROR_MESSAGES } from './errors';

const config: ApiConfig = {
  baseUrl: 'https://openrouter.ai/api/v1',
  defaultModel: 'meta-llama/llama-3.2-90b-vision-instruct:free'
};

export async function makeRequest(options: RequestOptions): Promise<OpenAIResponse> {
  const { apiKey, messages, model } = options;
  
  if (!apiKey) {
    throw new OpenAIError(ERROR_MESSAGES.INVALID_API_KEY);
  }

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Prompt Designer'
      },
      body: JSON.stringify({
        model: model || config.defaultModel,
        messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new OpenAIError(ERROR_MESSAGES.RATE_LIMIT, response.status);
      }
      const error = await response.json().catch(() => ({}));
      throw new OpenAIError(
        error.error?.message || ERROR_MESSAGES.NETWORK_ERROR,
        response.status
      );
    }

    const data = await response.json();
    
    if (!data?.choices?.[0]?.message?.content) {
      throw new OpenAIError(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    return data;
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error;
    }
    console.error('API Request Error:', error);
    throw new OpenAIError(ERROR_MESSAGES.GENERIC_ERROR);
  }
}