import { makeApiRequest } from './api/baseApi';
import { SYSTEM_PROMPTS } from './constants';
import { ApiError } from './api/error';

export async function analyzeBrief(brief: string): Promise<string> {
  try {
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.ANALYZE_BRIEF
      },
      {
        role: 'user',
        content: brief
      }
    ];

    const result = await makeApiRequest(messages);
    return result.trim();
  } catch (error) {
    console.error('Error analyzing brief:', error);
    throw error instanceof ApiError ? error : new Error('Failed to analyze brief');
  }
}