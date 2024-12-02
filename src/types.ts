export interface Category {
  name: string;
  keywords: string[];
  description: string;
}

export interface Theme {
  background: string;
  foreground: string;
  border: string;
  accent: string;
  muted: string;
}

export interface PromptState {
  [key: string]: string;
}