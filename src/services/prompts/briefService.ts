import { makeApiRequest } from '../api/baseApi';
import { SYSTEM_PROMPTS } from './systemPrompts';

export async function analyzeBrief(brief: string): Promise<string> {
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

  return await makeApiRequest(messages);
}