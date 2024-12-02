import { makeApiRequest } from './api/baseApi';
import { IMAGE_ANALYSIS_SYSTEM } from './prompts/imageAnalysisSystem';
import { validateImage, convertImageToBase64 } from './utils/imageUtils';
import { ApiError } from './api/error';

export async function analyzeImage(imageFile: File): Promise<string> {
  try {
    await validateImage(imageFile);
    const base64Image = await convertImageToBase64(imageFile);

    const messages = [
      {
        role: 'system',
        content: IMAGE_ANALYSIS_SYSTEM.ANALYZE_IMAGE
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Create a prompt based on this image.'
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
    return result
      .replace(/[^a-zA-Z0-9\s,]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error instanceof ApiError ? error : new ApiError(ERROR_MESSAGES.GENERIC_ERROR);
  }
}