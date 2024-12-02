export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | MessageContent[];
}

export interface MessageContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface ApiErrorResponse {
  error?: {
    message: string;
    type: string;
    code: string;
  };
}