import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { analyzeBrief } from '../services/briefService';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useApiKey } from '../context/ApiKeyContext';
import { ApiError } from '../services/api/error';

export function BriefAnalyzer() {
  const { apiKey } = useApiKey();
  const [brief, setBrief] = useState('');
  const [result, setResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.trim() || !apiKey) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      const response = await analyzeBrief(brief);
      setResult(response);
    } catch (err) {
      console.error('Error analyzing brief:', err);
      if (err instanceof ApiError && err.status === 429) {
        setError('Trop de requêtes. Veuillez patienter quelques secondes avant de réessayer.');
      } else {
        setError('Une erreur inattendue est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!apiKey) {
    return (
      <div className="w-full max-w-5xl mx-auto glass-effect rounded-2xl p-4 sm:p-6 relative z-10">
        <div className="flex items-start gap-2 text-red-400">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">Veuillez configurer votre clé API OpenRouter pour utiliser cette fonctionnalité. Cliquez sur l'icône de clé à droite pour la configurer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto glass-effect rounded-2xl p-4 sm:p-6 relative z-10">
      <h2 className="text-base sm:text-lg font-medium gradient-text mb-4">
        Analyse de Brief
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Collez votre brief client ici..."
            className="w-full h-36 sm:h-48 p-3 sm:p-4 text-xs sm:text-sm text-white bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl focus:outline-none input-glow resize-none transition-all duration-200"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isAnalyzing || !brief.trim()}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-xl transition-all duration-200 ${
              isAnalyzing || !brief.trim()
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 glow-blue-sm hover:glow-blue'
            }`}
          >
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            {isAnalyzing ? 'Analyse...' : 'Analyser le brief'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <p>{error}</p>
              <p className="mt-1 text-xs sm:text-sm text-red-400/80">
                Si l'analyse échoue, veuillez réessayer. L'IA peut parfois avoir besoin de plusieurs tentatives pour analyser correctement le brief.
              </p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="p-3 sm:p-4 bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl">
            <MarkdownRenderer content={result} />
          </div>
        </div>
      )}
    </div>
  );
}