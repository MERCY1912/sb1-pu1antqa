import React from 'react';
import { OutfitItem } from '../../types';

interface CharacterProps {
  outfitItems: OutfitItem[];
}

export const Character: React.FC<CharacterProps> = ({ outfitItems }) => {
  // Sort items by their z-index to ensure proper layering
  const sortedItems = [...outfitItems].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="relative h-full max-w-sm mx-auto">
      {/* Base character */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url(/character-base.png)' }}>
          {/* This is a placeholder - in the actual implementation, you would use a real image */}
          <div className="h-full w-full flex items-center justify-center">
            <div className="h-[90%] w-[40%] bg-gradient-to-b from-[#f8e0d8] to-[#f5d0cc] rounded-3xl">
              <div className="relative h-full w-full flex flex-col items-center">
                {/* Head */}
                <div className="w-[70%] h-[15%] rounded-full bg-[#f8e0d8] absolute -top-[7%]"></div>
                
                {/* Body shape */}
                <div className="w-full h-full flex flex-col items-center">
                  {/* Shoulders */}
                  <div className="w-[90%] h-[10%] mt-[10%]"></div>
                  
                  {/* Torso */}
                  <div className="w-[80%] h-[30%]"></div>
                  
                  {/* Waist */}
                  <div className="w-[70%] h-[10%]"></div>
                  
                  {/* Hips */}
                  <div className="w-[85%] h-[15%]"></div>
                  
                  {/* Legs */}
                  <div className="w-[70%] h-[35%] flex justify-between">
                    <div className="w-[45%] h-full bg-[#f8e0d8] rounded-b-2xl"></div>
                    <div className="w-[45%] h-full bg-[#f8e0d8] rounded-b-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clothing items layered on top */}
      {sortedItems.map((item) => (
        <div 
          key={item.id}
          className="absolute"
          style={{
            top: `${item.position.y}%`,
            left: `${item.position.x}%`,
            zIndex: item.zIndex,
            transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
            width: `${item.width}%`,
            height: `${item.height}%`,
          }}
        >
          <div 
            className="h-full w-full bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${item.imageUrl})`,
              filter: item.color ? `hue-rotate(${item.colorAdjustment}deg)` : 'none',
            }}
          />
        </div>
      ))}
    </div>
  );
};