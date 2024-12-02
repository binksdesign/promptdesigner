import { makeRequest } from './client';
import { ApiResponse, Message } from './types';
import { OpenAIError, ERROR_MESSAGES } from './errors';
import { SYSTEM_PROMPTS } from './prompts';

export async function enhancePrompt(apiKey: string, prompt: string): Promise<ApiResponse> {
  try {
    const messages: Message[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.ENHANCE_PROMPT
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const response = await makeRequest({ apiKey, messages });
    return { content: response.choices[0].message.content.trim() };
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    if (error instanceof OpenAIError) {
      return { content: '', error: error.message };
    }
    return { content: '', error: ERROR_MESSAGES.GENERIC_ERROR };
  }
}

export async function analyzeBrief(apiKey: string, brief: string): Promise<ApiResponse> {
  try {
    const messages: Message[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.ANALYZE_BRIEF
      },
      {
        role: 'user',
        content: brief
      }
    ];

    const response = await makeRequest({ apiKey, messages });
    return { content: response.choices[0].message.content.trim() };
  } catch (error) {
    console.error('Error analyzing brief:', error);
    if (error instanceof OpenAIError) {
      return { content: '', error: error.message };
    }
    return { content: '', error: ERROR_MESSAGES.GENERIC_ERROR };
  }
}

export async function analyzeImage(apiKey: string, imageUrl: string): Promise<ApiResponse> {
  try {
    const messages: Message[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.ANALYZE_IMAGE
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "Create a prompt based on this image's style and composition."
          },
          {
            type: 'image_url',
            image_url: { url: imageUrl }
          }
        ]
      }
    ];

    const response = await makeRequest({ apiKey, messages });
    return { content: response.choices[0].message.content.trim() };
  } catch (error) {
    console.error('Error analyzing image:', error);
    if (error instanceof OpenAIError) {
      return { content: '', error: error.message };
    }
    return { content: '', error: ERROR_MESSAGES.GENERIC_ERROR };
  }
}