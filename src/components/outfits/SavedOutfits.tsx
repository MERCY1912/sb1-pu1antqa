import React from 'react';
import { useGame } from '../../context/GameContext';
import { Trash2, Eye } from 'lucide-react';

export const SavedOutfits: React.FC = () => {
  const { savedOutfits, loadOutfit, deleteOutfit } = useGame();

  if (savedOutfits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Saved Outfits</h3>
        <p className="text-gray-500 max-w-xs">
          Save your creations to see them here. Your saved outfits will be stored locally on your device.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {savedOutfits.map((outfit) => (
        <div 
          key={outfit.id} 
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="aspect-[3/4] bg-gray-50 relative">
            <div 
              className="h-full w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${outfit.thumbnailUrl})` }}
            />
          </div>
          
          <div className="p-3 border-t border-gray-100">
            <h4 className="font-medium text-gray-800 mb-1 truncate">{outfit.name}</h4>
            <div className="flex justify-between items-center">
              <button 
                onClick={() => loadOutfit(outfit.id)}
                className="text-sm px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors flex items-center"
              >
                <Eye className="w-3 h-3 mr-1" />
                Wear
              </button>
              <button 
                onClick={() => deleteOutfit(outfit.id)}
                className="text-sm px-3 py-1.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors flex items-center"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};