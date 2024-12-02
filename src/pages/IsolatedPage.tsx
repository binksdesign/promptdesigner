import React from 'react';
import { Select } from '../components/Select';
import { PromptOutput } from '../components/PromptOutput';
import { isolatedCategories } from '../data/isolatedCategories';
import { useStateContext } from '../context/StateContext';

export function IsolatedPage() {
  const { isolatedState, setIsolatedState } = useStateContext();

  const handleRandomize = () => {
    const newPrompt = Object.keys(isolatedCategories).reduce((acc, key) => {
      const categoryKeywords = isolatedCategories[key as keyof typeof isolatedCategories].keywords;
      const randomIndex = Math.floor(Math.random() * categoryKeywords.length);
      return {
        ...acc,
        [key]: categoryKeywords[randomIndex]
      };
    }, {});

    setIsolatedState(newPrompt);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto glass-effect rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(isolatedCategories).map(([key, category]) => (
            <Select
              key={key}
              label={category.name}
              options={category.keywords}
              value={isolatedState[key]}
              onChange={(value) => 
                setIsolatedState((prev) => ({ ...prev, [key]: value }))
              }
              description={category.description}
            />
          ))}
        </div>
      </div>

      <PromptOutput
        prompt={isolatedState}
        onRandomize={handleRandomize}
      />
    </div>
  );
}