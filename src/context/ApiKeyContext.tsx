import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isApiKeySet: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);

  const handleSetApiKey = (key: string) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    setIsApiKeySet(!!trimmedKey);
    
    if (trimmedKey) {
      localStorage.setItem('openrouter_api_key', trimmedKey);
    } else {
      localStorage.removeItem('openrouter_api_key');
    }
  };

  return (
    <ApiKeyContext.Provider value={{ 
      apiKey, 
      setApiKey: handleSetApiKey, 
      isApiKeySet 
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}