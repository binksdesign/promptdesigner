import { makeApiRequest } from './api/baseApi';
import { AI_PROMPT_SYSTEM } from './prompts/aiPromptSystem';
import { ApiError } from './api/error';

export async function enhanceAiPrompt(prompt: string): Promise<string> {
  try {
    const messages = [
      {
        role: 'system',
        content: AI_PROMPT_SYSTEM.ENHANCE_AI_PROMPT
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
    console.error('Error enhancing AI prompt:', error);
    throw error instanceof ApiError ? error : new Error('Failed to enhance prompt');
  }
}