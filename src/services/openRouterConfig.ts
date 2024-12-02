const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const SITE_NAME = import.meta.env.VITE_SITE_NAME;

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | {
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }[];
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class OpenRouterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenRouterError';
  }
}

export async function makeOpenRouterRequest(messages: OpenRouterMessage[]): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new OpenRouterError('OpenRouter API key is not configured');
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL || window.location.origin,
        "X-Title": SITE_NAME || 'Prompt Designer',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.2-11b-vision-instruct:free",
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new OpenRouterError(
        errorData.error?.message || 
        `API request failed with status ${response.status}`
      );
    }

    const data: OpenRouterResponse = await response.json();
    
    if (!data?.choices?.[0]?.message?.content) {
      throw new OpenRouterError('Invalid response format from API');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    if (error instanceof OpenRouterError) {
      throw error;
    }
    console.error('OpenRouter API Error:', error);
    throw new OpenRouterError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}