import React from 'react';
import { Palette, Move, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { ColorPicker } from './ColorPicker';

export const ToolBar: React.FC = () => {
  const { 
    selectedOutfitItem, 
    setSelectedOutfitItem,
    backgroundColor,
    setBackgroundColor,
    updateItemPosition,
    updateItemScale,
    updateItemRotation,
    updateItemColor
  } = useGame();

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex">
        <button 
          className="p-2 hover:bg-gray-100 text-gray-600 first:rounded-l-lg"
          title="Background Color"
          onClick={() => {
            // Toggle through background color options
            const colors = ['#f9f9f9', '#fff1f2', '#fdf4ff', '#f0f9ff', '#f0fdf4'];
            const currentIndex = colors.indexOf(backgroundColor);
            const nextIndex = (currentIndex + 1) % colors.length;
            setBackgroundColor(colors[nextIndex]);
          }}
        >
          <Palette className="w-5 h-5" />
        </button>
        
        <div className="h-8 my-auto w-px bg-gray-200"></div>

        <button 
          className={`p-2 hover:bg-gray-100 text-gray-600 ${selectedOutfitItem ? 'bg-pink-50 text-pink-600' : ''}`}
          title="Move Item"
          disabled={!selectedOutfitItem}
        >
          <Move className="w-5 h-5" />
        </button>

        <button 
          className="p-2 hover:bg-gray-100 text-gray-600"
          title="Zoom In"
          disabled={!selectedOutfitItem}
          onClick={() => {
            if (selectedOutfitItem) {
              updateItemScale(selectedOutfitItem.id, 0.1);
            }
          }}
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        <button 
          className="p-2 hover:bg-gray-100 text-gray-600"
          title="Zoom Out"
          disabled={!selectedOutfitItem}
          onClick={() => {
            if (selectedOutfitItem) {
              updateItemScale(selectedOutfitItem.id, -0.1);
            }
          }}
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        <button 
          className="p-2 hover:bg-gray-100 text-gray-600 last:rounded-r-lg"
          title="Rotate"
          disabled={!selectedOutfitItem}
          onClick={() => {
            if (selectedOutfitItem) {
              updateItemRotation(selectedOutfitItem.id, 15);
            }
          }}
        >
          <RotateCw className="w-5 h-5" />
        </button>
      </div>

      {selectedOutfitItem && selectedOutfitItem.canChangeColor && (
        <ColorPicker 
          color={selectedOutfitItem.color || '#ffffff'}
          onChange={(color) => {
            if (selectedOutfitItem) {
              updateItemColor(selectedOutfitItem.id, color);
            }
          }}
        />
      )}
    </div>
  );
};