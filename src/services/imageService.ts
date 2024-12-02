import { makeApiRequest } from './api';
import { SYSTEM_PROMPTS } from './constants';
import { OpenRouterMessage } from './types';

export class ImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageError';
  }
}

export async function validateImage(file: File): Promise<void> {
  if (!file.type.startsWith('image/')) {
    throw new ImageError('Please upload a valid image file');
  }
}

export async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new ImageError('Failed to read image file'));
      }
    };
    reader.onerror = () => reject(new ImageError('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

export async function analyzeImage(imageFile: File): Promise<string> {
  try {
    await validateImage(imageFile);
    const base64Image = await convertImageToBase64(imageFile);

    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.ANALYZE_IMAGE
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Create a prompt for this image.'
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

    const result = await makeApiRequest(messages);
    // Clean the response to ensure it's just the prompt
    return result
      .replace(/[^a-zA-Z0-9\s,]/g, '') // Remove any special characters except commas
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error instanceof ImageError ? error : new ImageError('Failed to analyze image');
  }
}