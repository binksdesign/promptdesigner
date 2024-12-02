export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Veuillez configurer votre clé API OpenRouter pour utiliser cette fonctionnalité',
  INVALID_RESPONSE: 'Réponse invalide du serveur',
  NETWORK_ERROR: 'Erreur réseau',
  IMAGE_TOO_LARGE: "La taille de l'image ne doit pas dépasser 5MB",
  INVALID_IMAGE_TYPE: 'Veuillez sélectionner une image valide',
  CLIPBOARD_ERROR: 'Impossible de copier dans le presse-papiers',
  GENERIC_ERROR: 'Une erreur inattendue est survenue',
  RATE_LIMIT: 'Trop de requêtes. Veuillez patienter quelques secondes.',
  REQUEST_FAILED: 'La requête a échoué avec le statut',
  MAX_RETRIES_EXCEEDED: 'Nombre maximum de tentatives atteint',
  INVALID_IMAGE_DATA: "Impossible de traiter l'image",
  UNAUTHORIZED: 'Accès non autorisé',
  BAD_REQUEST: 'Requête invalide'
} as const;