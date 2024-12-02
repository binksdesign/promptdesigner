import React, { createContext, useContext, useState } from 'react';
import type { PromptState } from '../types';

interface StateContextType {
  mockupState: PromptState;
  setMockupState: (state: PromptState) => void;
  isolatedState: PromptState;
  setIsolatedState: (state: PromptState) => void;
  textureState: PromptState;
  setTextureState: (state: PromptState) => void;
  generalistState: PromptState;
  setGeneralistState: (state: PromptState) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [mockupState, setMockupState] = useState<PromptState>({
    photographicStyle: 'cinematic photography',
    object: 'featuring a blank t-shirt',
    objectColor: 'colored in white',
    model: 'presented by male model',
    scene: 'set in product showcase',
    setting: 'positioned on urban street',
    lighting: 'illuminated by soft light',
    mood: 'maintaining minimal aesthetic',
    resolution: 'produced in high resolution'
  });

  const [isolatedState, setIsolatedState] = useState<PromptState>({
    photographicStyle: 'studio photography',
    subject: 'featuring a male model',
    background: 'isolated on pure white background',
    angle: 'shot in medium shot',
    lighting: 'lit professionally',
    emotion: 'expressing confidence',
    detail: 'capturing fine details',
    technique: 'shot with perfect focus',
    finish: 'finished in high resolution'
  });

  const [textureState, setTextureState] = useState<PromptState>({
    textureType: 'metallic texture',
    color: 'in silver finish',
    detailLevel: 'featuring high detail',
    condition: 'in new condition',
    lighting: 'under studio lighting',
    resolution: 'in 4K resolution'
  });

  const [generalistState, setGeneralistState] = useState<PromptState>({
    technique: 'digital photography',
    style: 'minimalist',
    mainObject: 'a person',
    context: 'urban environment',
    lighting: 'natural daylight',
    cameraAngle: 'eye level shot',
    ambiance: 'peaceful',
    detailLevel: 'highly detailed',
    dominantColors: 'warm colors',
    resolution: '4K resolution'
  });

  return (
    <StateContext.Provider
      value={{
        mockupState,
        setMockupState,
        isolatedState,
        setIsolatedState,
        textureState,
        setTextureState,
        generalistState,
        setGeneralistState
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
}