import React, { useState } from 'react';
import { Sparkles, FileText, Image, Gauge } from 'lucide-react';
import { AiPromptInput } from '../components/AiPromptInput';
import { BriefAnalyzer } from '../components/BriefAnalyzer';
import { ImageToPrompt } from '../components/ImageToPrompt';
import { DesignAudit } from '../components/DesignAudit';

type Category = 'prompt' | 'brief' | 'image' | 'audit';

export function AiAssistantPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('prompt');

  const categories = [
    {
      id: 'prompt' as const,
      label: 'Prompt IA',
      icon: Sparkles,
      description: 'Améliorez vos prompts avec l\'IA'
    },
    {
      id: 'brief' as const,
      label: 'Analyse de Brief',
      icon: FileText,
      description: 'Analysez et structurez vos briefs clients'
    },
    {
      id: 'image' as const,
      label: 'Image vers Prompt',
      icon: Image,
      description: 'Générez des prompts à partir d\'images'
    },
    {
      id: 'audit' as const,
      label: 'Audit Design',
      icon: Gauge,
      description: 'Analysez et améliorez vos designs'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 mb-6 md:mb-8 relative z-[100]">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`glass-effect rounded-xl p-3 transition-all duration-300 group relative ${
                activeCategory === category.id 
                  ? 'glow-blue' 
                  : 'hover:glow-blue-sm'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Description */}
              <div className="fixed mt-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-[#1A1A1C]/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[110]">
                <p className="text-xs text-gray-300 text-center">
                  {category.description}
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2">
                  <div className={`p-1.5 rounded-lg ${
                    activeCategory === category.id 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'bg-gray-800/50 text-gray-400 group-hover:text-gray-300'
                  }`}>
                    <category.icon className="w-4 h-4" />
                  </div>
                  <h3 className={`text-sm font-medium leading-none ${
                    activeCategory === category.id 
                      ? 'gradient-text' 
                      : 'text-gray-300'
                  }`}>
                    {category.label}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-[90]">
          {activeCategory === 'prompt' && <AiPromptInput />}
          {activeCategory === 'brief' && <BriefAnalyzer />}
          {activeCategory === 'image' && <ImageToPrompt />}
          {activeCategory === 'audit' && <DesignAudit />}
        </div>
      </div>
    </div>
  );
}