import { makeApiRequest } from './api';
import { SYSTEM_PROMPTS } from './constants';
import { OpenRouterMessage } from './types';
import { ImageError, validateImage, convertImageToBase64 } from './imageService';

export async function auditDesign(imageFile: File): Promise<string> {
  try {
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
  } catch (error) {
    console.error('Error auditing design:', error);
    throw error instanceof ImageError ? error : new ImageError('Failed to audit design');
  }
}