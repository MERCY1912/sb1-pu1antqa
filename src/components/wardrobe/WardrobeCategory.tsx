import React from 'react';
import { ClothingCategory, ClothingItem } from '../../types';
import { useGame } from '../../context/GameContext';
import { WardrobeItem } from './WardrobeItem';

interface WardrobeCategoryProps {
  category: ClothingCategory;
}

export const WardrobeCategory: React.FC<WardrobeCategoryProps> = ({ category }) => {
  const { wardrobe, addItemToOutfit } = useGame();
  
  // Get items for this category
  const items = wardrobe.filter(item => item.categoryId === category.id);

  return (
    <div className="px-4 py-3 bg-gray-50">
      {category.subcategories.length > 0 ? (
        // Render subcategories
        category.subcategories.map(subcategory => (
          <div key={subcategory.id} className="mb-4">
            <h4 className="text-sm text-gray-500 mb-2">{subcategory.name}</h4>
            <div className="grid grid-cols-3 gap-2">
              {items
                .filter(item => item.subcategoryId === subcategory.id)
                .map(item => (
                  <WardrobeItem 
                    key={item.id} 
                    item={item} 
                    onClick={() => addItemToOutfit(item)}
                  />
                ))
              }
            </div>
          </div>
        ))
      ) : (
        // Render items without subcategories
        <div className="grid grid-cols-3 gap-2">
          {items.map(item => (
            <WardrobeItem 
              key={item.id} 
              item={item} 
              onClick={() => addItemToOutfit(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};