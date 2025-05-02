import React, { useState } from 'react';
import { ClothingCategory } from '../../types';
import { useGame } from '../../context/GameContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WardrobeCategory } from './WardrobeCategory';

export const WardrobePanel: React.FC = () => {
  const { categories } = useGame();
  const [expandedCategory, setExpandedCategory] = useState<ClothingCategory | null>(categories[0] || null);

  const toggleCategory = (category: ClothingCategory) => {
    if (expandedCategory?.id === category.id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  return (
    <div className="py-2">
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <button
            className={`w-full px-4 py-3 flex justify-between items-center text-left transition-colors ${
              expandedCategory?.id === category.id 
                ? 'bg-pink-50 text-pink-800' 
                : 'hover:bg-purple-50 text-gray-700'
            }`}
            onClick={() => toggleCategory(category)}
          >
            <span className="font-medium">{category.name}</span>
            {expandedCategory?.id === category.id ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedCategory?.id === category.id && (
            <WardrobeCategory category={category} />
          )}
        </div>
      ))}
    </div>
  );
};