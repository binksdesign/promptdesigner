import React, { useState } from 'react';
import { X, Search, Copy, Check } from 'lucide-react';
import { additionalKeywords } from '../data/additionalKeywords';

interface KeywordsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeywordsModal({ isOpen, onClose }: KeywordsModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredKeywords = selectedCategory
    ? {
        [selectedCategory]: additionalKeywords[selectedCategory as keyof typeof additionalKeywords].filter(
          keyword => keyword.toLowerCase().includes(search.toLowerCase())
        )
      }
    : Object.entries(additionalKeywords).reduce((acc, [category, keywords]) => ({
        ...acc,
        [category]: keywords.filter(keyword => 
          keyword.toLowerCase().includes(search.toLowerCase())
        )
      }), {});

  const handleCopyKeyword = async (keyword: string) => {
    await navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="glass-effect rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden relative">
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-xl z-[10000]">
          <h2 className="text-xl font-semibold text-white">
            Mots-clés Additionnels
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-700/50 sticky top-16 bg-black/80 backdrop-blur-xl z-[10000]">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher des mots-clés..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Toutes les catégories</option>
              {Object.keys(additionalKeywords).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-y-auto p-6 space-y-8 max-h-[calc(80vh-8rem)] custom-scrollbar">
          {Object.entries(filteredKeywords).map(([category, keywords]) => (
            keywords.length > 0 && (
              <div key={category}>
                <h3 className="text-lg font-medium text-white mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleCopyKeyword(keyword)}
                      className="group px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 rounded-lg text-sm flex items-center gap-2 transition-all duration-200"
                    >
                      <span>{keyword}</span>
                      {copiedKeyword === keyword ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}