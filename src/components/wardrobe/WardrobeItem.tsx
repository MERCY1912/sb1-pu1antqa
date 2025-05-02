import React from 'react';
import { ClothingItem } from '../../types';

interface WardrobeItemProps {
  item: ClothingItem;
  onClick: () => void;
}

export const WardrobeItem: React.FC<WardrobeItemProps> = ({ item, onClick }) => {
  return (
    <button 
      className="aspect-square p-2 bg-white rounded-lg border border-gray-200 hover:border-pink-300 hover:shadow-sm transition-all overflow-hidden flex items-center justify-center"
      onClick={onClick}
    >
      <div 
        className="h-full w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${item.thumbnailUrl || item.imageUrl})` }}
      />
    </button>
  );
};