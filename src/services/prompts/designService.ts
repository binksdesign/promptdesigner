import { makeApiRequest } from '../api/baseApi';
import { SYSTEM_PROMPTS } from './systemPrompts';
import { OpenRouterMessage } from '../types';
import { validateImage, convertImageToBase64 } from './imageService';

export async function auditDesign(imageFile: File): Promise<string> {
  await validateImage(imageFile);
  const base64Image = await convertImageToBase64(imageFile);

  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPTS.AUDIT_DESIGN
    },
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Analyze this design and provide a detailed audit.'
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:${imageFile.type};base64,${base64Image}`
          }
        }
      ]
    }
  ];

  return await makeApiRequest(messages);
}