export class OpenAIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export const ERROR_MESSAGES = {
  RATE_LIMIT: 'Trop de requêtes. Veuillez patienter quelques secondes.',
  INVALID_API_KEY: 'Clé API invalide ou manquante.',
  NETWORK_ERROR: 'Erreur réseau. Veuillez réessayer.',
  INVALID_RESPONSE: 'Réponse invalide du serveur.',
  GENERIC_ERROR: 'Une erreur est survenue. Veuillez réessayer.',
  INVALID_IMAGE: "Format d'image invalide.",
  IMAGE_TOO_LARGE: 'Image trop volumineuse (max 5MB).',
  CLIPBOARD_ERROR: 'Impossible de copier dans le presse-papiers.',
  API_KEY_REQUIRED: 'Une clé API OpenRouter est requise. Configurez-la dans les paramètres.',
};