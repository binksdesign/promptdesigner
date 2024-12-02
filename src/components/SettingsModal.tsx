import React, { useState } from 'react';
import { X, Key, Save } from 'lucide-react';
import { useApiKey } from '../context/ApiKeyContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { apiKey: currentApiKey, setApiKey } = useApiKey();
  const [apiKey, setLocalApiKey] = useState(currentApiKey);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(apiKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="glass-effect rounded-2xl w-full max-w-lg overflow-hidden relative">
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">
            Paramètres
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-200">
              Clé API OpenRouter
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl text-white placeholder-gray-400 focus:outline-none input-glow"
                placeholder="sk-or-v1-..."
              />
            </div>
            <p className="text-sm text-gray-400">
              Obtenez votre clé API sur{' '}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                openrouter.ai
              </a>
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl glow-blue-sm hover:glow-blue transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}