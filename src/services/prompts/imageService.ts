import { makeApiRequest } from '../api/baseApi';
import { SYSTEM_PROMPTS } from './systemPrompts';
import { OpenRouterMessage } from '../types';
import { ApiError } from '../api/error';

export async function validateImage(file: File): Promise<void> {
  if (!file.type.startsWith('image/')) {
    throw new ApiError('Please upload a valid image file');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new ApiError('Image size must not exceed 5MB');
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
        reject(new ApiError('Failed to read image file'));
      }
    };
    reader.onerror = () => reject(new ApiError('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

export async function analyzeImage(imageFile: File): Promise<string> {
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

  return await makeApiRequest(messages);
}