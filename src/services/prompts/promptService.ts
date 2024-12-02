import { makeApiRequest } from '../api/baseApi';
import { PROMPT_SYSTEMS } from './promptSystems';
import { PromptType, PROMPT_TYPES } from './promptTypes';
import { ApiError } from '../api/error';

export async function enhancePrompt(prompt: string, type: PromptType = PROMPT_TYPES.GENERAL): Promise<string> {
  try {
    const messages = [
      {
        role: 'system',
        content: PROMPT_SYSTEMS[type]
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const result = await makeApiRequest(messages);
    return result
      .replace(/[^a-zA-Z0-9\s,]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    throw error instanceof ApiError ? error : new Error('Failed to enhance prompt');
  }
}