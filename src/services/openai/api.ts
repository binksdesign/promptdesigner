import { DEFAULT_MODEL, makeOpenRouterRequest } from './client';
import { OpenAIError, ERROR_MESSAGES } from './errors';
import { TextPromptRequest, ImageAnalysisRequest, ApiResponse } from './types';
import { SYSTEM_PROMPTS } from './prompts';
import { retryWithExponentialBackoff } from './utils';

export async function enhancePrompt({ prompt, model = DEFAULT_MODEL }: TextPromptRequest): Promise<ApiResponse> {
  try {
    const response = await retryWithExponentialBackoff(async () => {
      const completion = await makeOpenRouterRequest({
        model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPTS.ENHANCE_PROMPT
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      return completion;
    });

    return {
      content: response.choices[0].message.content.trim()
    };
  } catch (error: any) {
    console.error('Error enhancing prompt:', error);
    throw new OpenAIError(
      error instanceof OpenAIError ? error.message : ERROR_MESSAGES.GENERIC_ERROR,
      error.status
    );
  }
}

export async function analyzeBrief({ prompt, model = DEFAULT_MODEL }: TextPromptRequest): Promise<ApiResponse> {
  try {
    const response = await retryWithExponentialBackoff(async () => {
      const completion = await makeOpenRouterRequest({
        model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPTS.ANALYZE_BRIEF
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      return completion;
    });

    return {
      content: response.choices[0].message.content.trim()
    };
  } catch (error: any) {
    console.error('Error analyzing brief:', error);
    throw new OpenAIError(
      error instanceof OpenAIError ? error.message : ERROR_MESSAGES.GENERIC_ERROR,
      error.status
    );
  }
}

export async function analyzeImage({ imageUrl, prompt = "What's in this image?", model = DEFAULT_MODEL }: ImageAnalysisRequest): Promise<ApiResponse> {
  try {
    const response = await retryWithExponentialBackoff(async () => {
      const completion = await makeOpenRouterRequest({
        model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPTS.ANALYZE_IMAGE
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                image_url: { url: imageUrl }
              }
            ]
          }
        ]
      });

      return completion;
    });

    return {
      content: response.choices[0].message.content.trim()
    };
  } catch (error: any) {
    console.error('Error analyzing image:', error);
    throw new OpenAIError(
      error instanceof OpenAIError ? error.message : ERROR_MESSAGES.GENERIC_ERROR,
      error.status
    );
  }
}