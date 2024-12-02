export class OpenAIError extends Error {
  constructor(
    message: string,
    public status?: number
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
  GENERIC_ERROR: 'Une erreur est survenue. Veuillez réessayer.'
};