import { makeApiRequest } from './api/baseApi';
import { DESIGN_AUDIT_SYSTEM } from './prompts/designAuditSystem';
import { validateImage, convertImageToBase64 } from './utils/imageUtils';
import { ApiError } from './api/error';
import { ERROR_MESSAGES } from './errorMessages';

export async function auditDesign(imageFile: File): Promise<string> {
  try {
    await validateImage(imageFile);
    const base64Image = await convertImageToBase64(imageFile);

    const messages = [
      {
        role: 'system',
        content: DESIGN_AUDIT_SYSTEM.AUDIT_DESIGN
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
    throw error instanceof ApiError ? error : new ApiError(ERROR_MESSAGES.GENERIC_ERROR);
  }
}