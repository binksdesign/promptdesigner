import { OpenAIError } from './errors';
import { ApiConfig, OpenAIResponse, RequestData } from './types';
import { useApiKey } from '../../context/ApiKeyContext';

const config: ApiConfig = {
  baseUrl: 'https://openrouter.ai/api/v1',
  siteUrl: import.meta.env.VITE_SITE_URL || window.location.origin,
  siteName: import.meta.env.VITE_SITE_NAME || 'Prompt Designer'
};

export const DEFAULT_MODEL = "meta-llama/llama-3.2-90b-vision-instruct:free";

export async function makeOpenRouterRequest(data: RequestData): Promise<OpenAIResponse> {
  const { apiKey } = useApiKey();
  
  if (!apiKey) {
    throw new OpenAIError('Veuillez configurer votre clé API OpenRouter');
  }

  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": config.siteUrl,
        "X-Title": config.siteName,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: data.model || DEFAULT_MODEL,
        messages: data.messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new OpenAIError(
        errorData.error?.message || `Erreur ${response.status}`,
        response.status
      );
    }

    const result = await response.json();
    
    if (!result.choices?.[0]?.message?.content) {
      throw new OpenAIError('Format de réponse invalide');
    }

    return result;
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error;
    }
    throw new OpenAIError(error instanceof Error ? error.message : 'Une erreur inattendue est survenue');
  }
}