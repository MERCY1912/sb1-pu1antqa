import React from 'react';
import { useGame } from '../../context/GameContext';
import { Character } from './Character';

export const CharacterDisplay: React.FC = () => {
  const { outfitItems, backgroundColor } = useGame();

  return (
    <div 
      className="h-full w-full flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <div className="relative h-[80%] w-full flex items-center justify-center">
        <Character outfitItems={outfitItems} />
      </div>
    </div>
  );
};