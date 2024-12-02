import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { useApiKey } from '../context/ApiKeyContext';
import { SettingsModal } from './SettingsModal';

export function ApiKeyButton() {
  const { isApiKeySet } = useApiKey();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className={`fixed right-6 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all duration-300 z-[9998] ${
          isApiKeySet 
            ? 'bg-[#1A1A1C]/80 text-blue-400 hover:bg-[#1A1A1C] border border-transparent hover:border-blue-500/50' 
            : 'bg-[#1A1A1C]/80 text-red-400 hover:bg-[#1A1A1C] border border-transparent hover:border-red-500/50 animate-pulse'
        }`}
        title={isApiKeySet ? 'Modifier la clé API' : 'Configurer la clé API'}
      >
        <Key className="w-5 h-5" />
      </button>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}