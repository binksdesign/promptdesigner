import React, { useState } from 'react';
import { KeywordsModal } from './components/KeywordsModal';
import { MockupPage } from './pages/MockupPage';
import { IsolatedPage } from './pages/IsolatedPage';
import { TexturePage } from './pages/TexturePage';
import { GeneralistPage } from './pages/GeneralistPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StateProvider } from './context/StateContext';
import { ApiKeyProvider } from './context/ApiKeyContext';
import { ApiKeyButton } from './components/ApiKeyButton';

export function App() {
  const [isKeywordsModalOpen, setIsKeywordsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'mockup' | 'isolated' | 'texture' | 'generalist' | 'assistant'>('home');

  return (
    <ApiKeyProvider>
      <StateProvider>
        <div className="min-h-screen">
          <KeywordsModal
            isOpen={isKeywordsModalOpen}
            onClose={() => setIsKeywordsModalOpen(false)}
          />
          
          <Header
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onShowKeywords={() => setIsKeywordsModalOpen(true)}
          />

          <div className="container mx-auto px-4 pt-24 pb-8">
            {currentPage === 'home' ? (
              <HomePage onNavigate={setCurrentPage} />
            ) : currentPage === 'mockup' ? (
              <MockupPage />
            ) : currentPage === 'isolated' ? (
              <IsolatedPage />
            ) : currentPage === 'texture' ? (
              <TexturePage />
            ) : currentPage === 'assistant' ? (
              <AiAssistantPage />
            ) : (
              <GeneralistPage />
            )}
            <Footer />
          </div>

          <ApiKeyButton />
        </div>
      </StateProvider>
    </ApiKeyProvider>
  );
}