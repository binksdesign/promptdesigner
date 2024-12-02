export interface ApiConfig {
  baseUrl: string;
  siteUrl: string;
  siteName: string;
}

export interface Message {
  role: string;
  content: string | MessageContent[];
}

export interface MessageContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface RequestData {
  model?: string;
  messages: Message[];
}

export interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface ApiResponse {
  content: string;
  error?: string;
}

export interface TextPromptRequest {
  prompt: string;
  model?: string;
}

export interface ImageAnalysisRequest {
  imageUrl: string;
  prompt?: string;
  model?: string;
}