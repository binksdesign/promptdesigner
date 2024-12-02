import { getApiConfig } from './api/config';
import { ApiError } from './api/error';
import { ERROR_MESSAGES } from './errorMessages';
import { validateImage, convertImageToBase64 } from './utils/imageUtils';

export async function analyzeImage(imageFile: File): Promise<string> {
  try {
    const config = getApiConfig();
    
    if (!config.apiKey) {
      throw new ApiError(ERROR_MESSAGES.API_KEY_MISSING);
    }

    await validateImage(imageFile);
    const base64Image = await convertImageToBase64(imageFile);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "HTTP-Referer": config.siteUrl,
        "X-Title": config.siteName,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.2-11b-vision-instruct:free",
        "messages": [
          {
            "role": "system",
            "content": `You are an expert at analyzing images and creating perfect prompts for AI image generators. Create a detailed prompt that captures:
- Visual style and technique
- Subject and composition
- Lighting and atmosphere
- Colors and textures
- Technical aspects

Keep the prompt under 80 words, use only commas to separate descriptions, and start with the visual style.
Output only the prompt in English, no explanations.`
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Create a detailed prompt based on this image."
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": `data:${imageFile.type};base64,${base64Image}`
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        throw new ApiError(ERROR_MESSAGES.RATE_LIMIT, response.status);
      }
      throw new ApiError(
        errorData.error?.message || `${ERROR_MESSAGES.REQUEST_FAILED} ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    
    if (!data?.choices?.[0]?.message?.content) {
      throw new ApiError(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error instanceof ApiError ? error : new ApiError(ERROR_MESSAGES.GENERIC_ERROR);
  }
}