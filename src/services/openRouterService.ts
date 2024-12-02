import { PromptState } from '../types';

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | {
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }[];
}

interface OpenRouterResponse {
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

async function makeOpenRouterRequest(messages: OpenRouterMessage[], apiKey: string) {
  if (!apiKey) {
    throw new OpenRouterError('OpenRouter API key is not configured');
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": 'Prompt Designer',
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

export async function enhancePrompt(prompt: string, apiKey: string): Promise<string> {
  try {
    const messages = [
      {
        "role": "system",
        "content": "You are an expert at optimizing prompts for image generators. Your task is to enhance the given prompt. Rules:\n1. Keep it under 60 words\n2. Focus on visual details and style\n3. Use clear, descriptive language\n4. Keep the original intent\n5. Don't include aspect ratios\n6. Output only the enhanced prompt in English, no explanations"
      },
      {
        "role": "user",
        "content": prompt
      }
    ];

    return await makeOpenRouterRequest(messages, apiKey);
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    throw error;
  }
}