import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { enhanceAiPrompt } from '../services/aiPromptService';
import { useApiKey } from '../context/ApiKeyContext';
import { ApiError } from '../services/api/error';

export function AiPromptInput() {
  const { apiKey } = useApiKey();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !apiKey) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const enhancedPrompt = await enhanceAiPrompt(prompt);
      setResult(enhancedPrompt);
    } catch (err) {
      console.error('Error enhancing prompt:', err);
      if (err instanceof ApiError && err.status === 429) {
        setError('Trop de requêtes. Veuillez patienter quelques secondes avant de réessayer.');
      } else {
        setError('Une erreur inattendue est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="w-full max-w-5xl mx-auto glass-effect rounded-2xl p-6 relative z-10">
        <div className="flex items-start gap-2 text-red-400">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p>Veuillez configurer votre clé API OpenRouter pour utiliser cette fonctionnalité. Cliquez sur l'icône de clé à droite pour la configurer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto glass-effect rounded-2xl p-6 relative z-10">
      <h2 className="text-lg font-medium gradient-text mb-4">
        Assistant IA
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Décrivez ce que vous souhaitez créer..."
            className="w-full h-32 p-4 text-white bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl focus:outline-none input-glow resize-none transition-all duration-200"
          />
          <p className="mt-2 text-sm text-gray-400">
            Décrivez votre image en détail. L'IA optimisera votre description en un prompt parfait pour les générateurs d'images.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-all duration-200 ${
              isLoading || !prompt.trim()
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 glow-blue-sm hover:glow-blue'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {isLoading ? 'Génération...' : 'Générer le prompt'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="p-4 bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl text-white whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}