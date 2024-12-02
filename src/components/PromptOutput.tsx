import React, { useState, useRef } from 'react';
import { Copy, Wand2, Sparkles, AlertCircle } from 'lucide-react';
import type { PromptState } from '../types';
import { enhancePrompt } from '../services/promptService';
import { ApiError } from '../services/api/error';
import { useApiKey } from '../context/ApiKeyContext';

interface PromptOutputProps {
  prompt: PromptState;
  onRandomize: () => void;
  formatPrompt?: (prompt: PromptState) => string;
  type?: 'general' | 'texture' | 'mockup' | 'isolated';
}

export function PromptOutput({ prompt, onRandomize, formatPrompt, type = 'general' }: PromptOutputProps) {
  const { apiKey } = useApiKey();
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generatePrompt = () => {
    if (formatPrompt) {
      return formatPrompt(prompt);
    }
    
    const parts = Object.entries(prompt)
      .filter(([_, value]) => !value.startsWith('no '))
      .map(([_, value]) => value);
    
    return parts.join(', ');
  };

  const handleCopy = async () => {
    const textToCopy = isEditing ? editedPrompt : generatePrompt();
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      setError('Impossible de copier dans le presse-papiers');
    }
  };

  const handleEdit = () => {
    if (!isEditing) {
      setEditedPrompt(generatePrompt());
    }
    setIsEditing(!isEditing);
  };

  const handleEnhance = async () => {
    if (!apiKey) {
      setError('Veuillez configurer votre clé API OpenRouter pour utiliser cette fonctionnalité. Cliquez sur l\'icône de clé à droite pour la configurer.');
      return;
    }

    setIsEnhancing(true);
    setError(null);
    try {
      const currentPrompt = isEditing ? editedPrompt : generatePrompt();
      const enhancedPrompt = await enhancePrompt(currentPrompt, type);
      setEditedPrompt(enhancedPrompt);
      setIsEditing(true);
    } catch (err) {
      console.error('Error enhancing prompt:', err);
      if (err instanceof ApiError && err.status === 429) {
        setError('Trop de requêtes. Veuillez patienter quelques secondes avant de réessayer.');
      } else {
        setError('Une erreur inattendue est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-8 glass-effect rounded-2xl p-4 sm:p-6 relative z-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2 mb-4">
        <h2 className="text-base sm:text-lg font-medium text-white">
          Prompt Généré
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleEdit}
            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-200 glass-button rounded-xl hover-glow-blue"
          >
            {isEditing ? 'Terminer' : 'Éditer'}
          </button>
          <button
            onClick={handleEnhance}
            disabled={isEnhancing}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-200 glass-button rounded-xl hover-glow-blue ${
              isEnhancing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            {isEnhancing ? 'Amélioration...' : 'Améliorer'}
          </button>
          <button
            onClick={onRandomize}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl glow-blue-sm hover:glow-blue transition-all duration-200"
          >
            <Wand2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            Aléatoire
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-200 glass-button rounded-xl hover-glow-blue"
          >
            <Copy className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-3 sm:px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p>{error}</p>
            {error.includes('API') ? null : (
              <p className="mt-1 text-xs sm:text-sm text-red-400/80">
                Si l'amélioration échoue, veuillez réessayer. L'IA peut parfois avoir besoin de plusieurs tentatives pour améliorer correctement le prompt.
              </p>
            )}
          </div>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={isEditing ? editedPrompt : generatePrompt()}
        onChange={(e) => isEditing && setEditedPrompt(e.target.value)}
        readOnly={!isEditing}
        className="w-full h-24 sm:h-32 p-3 sm:p-4 text-xs sm:text-sm text-white bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl focus:outline-none input-glow resize-none transition-all duration-200"
      />
    </div>
  );
}