import React, { useState } from 'react';
import { CharacterDisplay } from './character/CharacterDisplay';
import { WardrobePanel } from './wardrobe/WardrobePanel';
import { SavedOutfits } from './outfits/SavedOutfits';
import { ToolBar } from './toolbar/ToolBar';
import { useGame } from '../context/GameContext';
import { Share, Sparkles, Save } from 'lucide-react';

export const GameScreen: React.FC = () => {
  const { generateRandomOutfit, saveCurrentOutfit, shareOutfit } = useGame();
  const [activePanel, setActivePanel] = useState<'wardrobe' | 'saved'>('wardrobe');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-14rem)]">
        {/* Character preview area */}
        <div className="w-full lg:w-2/3 bg-gradient-to-b from-purple-100/50 to-pink-100/50 p-4 flex items-center justify-center">
          <CharacterDisplay />
        </div>

        {/* Right panel with tabs */}
        <div className="w-full lg:w-1/3 border-l border-gray-100">
          {/* Tab navigation */}
          <div className="flex border-b border-gray-100">
            <button
              className={`flex-1 py-3 px-4 text-center transition-colors ${
                activePanel === 'wardrobe' 
                  ? 'bg-pink-50 text-pink-600 font-medium' 
                  : 'bg-white text-gray-500 hover:bg-purple-50 hover:text-purple-600'
              }`}
              onClick={() => setActivePanel('wardrobe')}
            >
              Wardrobe
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center transition-colors ${
                activePanel === 'saved' 
                  ? 'bg-purple-50 text-purple-600 font-medium' 
                  : 'bg-white text-gray-500 hover:bg-pink-50 hover:text-pink-600'
              }`}
              onClick={() => setActivePanel('saved')}
            >
              Saved Outfits
            </button>
          </div>

          {/* Tab content */}
          <div className="h-[calc(100%-3rem)] overflow-y-auto">
            {activePanel === 'wardrobe' ? (
              <WardrobePanel />
            ) : (
              <SavedOutfits />
            )}
          </div>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="bg-gray-50 border-t border-gray-100 p-3 flex justify-between items-center">
        <div>
          <button 
            onClick={generateRandomOutfit}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Random Look
          </button>
        </div>
        <ToolBar />
        <div className="flex gap-2">
          <button 
            onClick={saveCurrentOutfit}
            className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Outfit
          </button>
          <button 
            onClick={shareOutfit}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};