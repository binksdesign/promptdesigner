import { ApiError } from '../api/error';
import { ERROR_MESSAGES } from '../errorMessages';

export async function validateImage(file: File): Promise<void> {
  if (!file.type.startsWith('image/')) {
    throw new ApiError(ERROR_MESSAGES.INVALID_IMAGE_TYPE);
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new ApiError(ERROR_MESSAGES.IMAGE_TOO_LARGE);
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
        reject(new ApiError(ERROR_MESSAGES.INVALID_IMAGE_DATA));
      }
    };
    reader.onerror = () => reject(new ApiError(ERROR_MESSAGES.INVALID_IMAGE_DATA));
    reader.readAsDataURL(file);
  });
}