import React from 'react';
import { Select } from '../components/Select';
import { PromptOutput } from '../components/PromptOutput';
import { generalistCategories } from '../data/generalistCategories';
import { useStateContext } from '../context/StateContext';

export function GeneralistPage() {
  const { generalistState, setGeneralistState } = useStateContext();

  const handleRandomize = () => {
    const newPrompt = Object.keys(generalistCategories).reduce((acc, key) => {
      const categoryKeywords = generalistCategories[key as keyof typeof generalistCategories].keywords;
      const randomIndex = Math.floor(Math.random() * categoryKeywords.length);
      return {
        ...acc,
        [key]: categoryKeywords[randomIndex]
      };
    }, {});

    setGeneralistState(newPrompt);
  };

  const formatPrompt = (prompt: PromptState): string => {
    const parts = [
      prompt.technique,
      prompt.style,
      `featuring ${prompt.mainObject}`,
      `placed in ${prompt.context}`,
      `under ${prompt.lighting}`,
      `captured in ${prompt.cameraAngle}`,
      `with an ${prompt.ambiance} atmosphere`,
      `using ${prompt.detailLevel}`,
      `with dominant colors of ${prompt.dominantColors}`,
      `produced in ${prompt.resolution}`
    ].filter(part => !part.includes('no '));

    return parts.join(', ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto glass-effect rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(generalistCategories).map(([key, category]) => (
            <Select
              key={key}
              label={category.name}
              options={category.keywords}
              value={generalistState[key]}
              onChange={(value) => 
                setGeneralistState((prev) => ({ ...prev, [key]: value }))
              }
              description={category.description}
            />
          ))}
        </div>
      </div>

      <PromptOutput
        prompt={generalistState}
        onRandomize={handleRandomize}
        formatPrompt={formatPrompt}
      />
    </div>
  );
}