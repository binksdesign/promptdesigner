import React from 'react';
import { Select } from '../components/Select';
import { PromptOutput } from '../components/PromptOutput';
import { textureCategories } from '../data/textureCategories';
import { useStateContext } from '../context/StateContext';

export function TexturePage() {
  const { textureState, setTextureState } = useStateContext();

  const handleRandomize = () => {
    const newPrompt = Object.keys(textureCategories).reduce((acc, key) => {
      const categoryKeywords = textureCategories[key as keyof typeof textureCategories].keywords;
      const randomIndex = Math.floor(Math.random() * categoryKeywords.length);
      return {
        ...acc,
        [key]: categoryKeywords[randomIndex]
      };
    }, {});

    setTextureState(newPrompt);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto glass-effect rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(textureCategories).map(([key, category]) => (
            <Select
              key={key}
              label={category.name}
              options={category.keywords}
              value={textureState[key]}
              onChange={(value) => 
                setTextureState((prev) => ({ ...prev, [key]: value }))
              }
              description={category.description}
            />
          ))}
        </div>
      </div>

      <PromptOutput
        prompt={textureState}
        onRandomize={handleRandomize}
      />
    </div>
  );
}