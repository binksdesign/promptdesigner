export const PROMPT_TYPES = {
  GENERAL: 'general',
  TEXTURE: 'texture',
  MOCKUP: 'mockup',
  ISOLATED: 'isolated'
} as const;

export type PromptType = typeof PROMPT_TYPES[keyof typeof PROMPT_TYPES];