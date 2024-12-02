import React from 'react';
import { Select } from '../components/Select';
import { PromptOutput } from '../components/PromptOutput';
import { KeywordsModal } from '../components/KeywordsModal';
import { categories } from '../data/categories';
import { useStateContext } from '../context/StateContext';

export function MockupPage() {
  const [isKeywordsModalOpen, setIsKeywordsModalOpen] = React.useState(false);
  const { mockupState, setMockupState } = useStateContext();

  const handleRandomize = () => {
    const newPrompt = Object.keys(categories).reduce((acc, key) => {
      const categoryKeywords = categories[key as keyof typeof categories].keywords;
      const randomIndex = Math.floor(Math.random() * categoryKeywords.length);
      return {
        ...acc,
        [key]: categoryKeywords[randomIndex]
      };
    }, {});

    setMockupState(newPrompt);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto glass-effect rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(categories).map(([key, category]) => (
            <Select
              key={key}
              label={category.name}
              options={category.keywords}
              value={mockupState[key]}
              onChange={(value) => 
                setMockupState((prev) => ({ ...prev, [key]: value }))
              }
              description={category.description}
            />
          ))}
        </div>
      </div>

      <PromptOutput
        prompt={mockupState}
        onRandomize={handleRandomize}
      />

      <KeywordsModal
        isOpen={isKeywordsModalOpen}
        onClose={() => setIsKeywordsModalOpen(false)}
      />
    </div>
  );
}