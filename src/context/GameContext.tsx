import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ClothingCategory, 
  ClothingItem, 
  OutfitItem, 
  SavedOutfit,
  SubCategory 
} from '../types';
import { generateDummyData } from '../data/dummyData';

interface GameContextProps {
  // Categories
  categories: ClothingCategory[];
  
  // Wardrobe
  wardrobe: ClothingItem[];
  
  // Current outfit
  outfitItems: OutfitItem[];
  selectedOutfitItem: OutfitItem | null;
  setSelectedOutfitItem: (item: OutfitItem | null) => void;
  addItemToOutfit: (item: ClothingItem) => void;
  removeItemFromOutfit: (id: string) => void;
  updateItemPosition: (id: string, x: number, y: number) => void;
  updateItemScale: (id: string, scaleDelta: number) => void;
  updateItemRotation: (id: string, rotationDelta: number) => void;
  updateItemColor: (id: string, color: string) => void;
  
  // Backgrounds
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  
  // Saved outfits
  savedOutfits: SavedOutfit[];
  saveCurrentOutfit: () => void;
  loadOutfit: (id: string) => void;
  deleteOutfit: (id: string) => void;
  
  // Features
  generateRandomOutfit: () => void;
  shareOutfit: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load data
  const { categories, items } = generateDummyData();
  
  // State
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>(items);
  const [outfitItems, setOutfitItems] = useState<OutfitItem[]>([]);
  const [selectedOutfitItem, setSelectedOutfitItem] = useState<OutfitItem | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#f9f9f9');
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  
  // Load saved outfits from localStorage on mount
  useEffect(() => {
    try {
      const savedOutfitsJson = localStorage.getItem('savedOutfits');
      if (savedOutfitsJson) {
        setSavedOutfits(JSON.parse(savedOutfitsJson));
      }
    } catch (error) {
      console.error('Error loading saved outfits:', error);
    }
  }, []);

  // Save outfits to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
    } catch (error) {
      console.error('Error saving outfits:', error);
    }
  }, [savedOutfits]);

  const addItemToOutfit = (item: ClothingItem) => {
    // Check if an item of this type already exists in the outfit
    // For exclusive categories (e.g., underwear), remove existing items
    if (item.exclusive) {
      const category = categories.find(c => c.id === item.categoryId);
      if (category) {
        setOutfitItems(prev => 
          prev.filter(existingItem => {
            const existingItemOriginal = wardrobe.find(w => w.id === existingItem.originalItemId);
            return !existingItemOriginal || existingItemOriginal.categoryId !== item.categoryId;
          })
        );
      }
    }

    // Add the new item
    const newOutfitItem: OutfitItem = {
      id: `outfit-${Date.now()}`,
      originalItemId: item.id,
      imageUrl: item.imageUrl,
      position: { x: 50, y: 50 }, // Center position
      zIndex: item.zIndex,
      scale: 1,
      rotation: 0,
      width: item.width || 50,
      height: item.height || 50,
      canChangeColor: item.canChangeColor,
      color: item.defaultColor,
      colorAdjustment: 0
    };

    setOutfitItems(prev => [...prev, newOutfitItem]);
    setSelectedOutfitItem(newOutfitItem);
  };

  const removeItemFromOutfit = (id: string) => {
    setOutfitItems(prev => prev.filter(item => item.id !== id));
    if (selectedOutfitItem?.id === id) {
      setSelectedOutfitItem(null);
    }
  };

  const updateItemPosition = (id: string, x: number, y: number) => {
    setOutfitItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, position: { x, y } } 
          : item
      )
    );
  };

  const updateItemScale = (id: string, scaleDelta: number) => {
    setOutfitItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, scale: Math.max(0.5, Math.min(2, item.scale + scaleDelta)) } 
          : item
      )
    );
  };

  const updateItemRotation = (id: string, rotationDelta: number) => {
    setOutfitItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, rotation: (item.rotation + rotationDelta) % 360 } 
          : item
      )
    );
  };

  const updateItemColor = (id: string, color: string) => {
    setOutfitItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          // Calculate a crude hue rotation value based on the color
          // This is a simplified approach - a real implementation would use HSL conversion
          const colorMap: Record<string, number> = {
            '#ffffff': 0,      // White - no adjustment
            '#fecaca': 0,      // Light red
            '#fed7aa': 30,     // Light orange
            '#fef08a': 60,     // Light yellow
            '#d9f99d': 90,     // Light lime
            '#bbf7d0': 120,    // Light green
            '#a5f3fc': 180,    // Light cyan
            '#bae6fd': 210,    // Light blue
            '#c7d2fe': 240,    // Light indigo
            '#ddd6fe': 270,    // Light purple
            '#f5d0fe': 300,    // Light fuchsia
            '#fbcfe8': 330,    // Light pink
            
            '#ef4444': 0,      // Red
            '#f97316': 30,     // Orange
            '#eab308': 60,     // Yellow
            '#84cc16': 90,     // Lime
            '#22c55e': 120,    // Green
            '#06b6d4': 180,    // Cyan
            '#0ea5e9': 210,    // Blue
            '#6366f1': 240,    // Indigo
            '#8b5cf6': 270,    // Purple
            '#d946ef': 300,    // Fuchsia
            '#ec4899': 330     // Pink
          };

          return { 
            ...item, 
            color, 
            colorAdjustment: colorMap[color] || 0
          };
        }
        return item;
      })
    );
  };

  const saveCurrentOutfit = () => {
    if (outfitItems.length === 0) {
      alert('Please add some items to your outfit before saving.');
      return;
    }

    const outfitName = prompt('Enter a name for this outfit:', `Outfit ${savedOutfits.length + 1}`);
    if (!outfitName) return;

    // In a real application, we would generate an actual thumbnail here
    // For this demo, we'll just use a placeholder
    const thumbnailUrl = '/outfit-placeholder.png';

    const newOutfit: SavedOutfit = {
      id: `saved-${Date.now()}`,
      name: outfitName,
      items: [...outfitItems],
      thumbnailUrl,
      createdAt: new Date().toISOString(),
      backgroundColor
    };

    setSavedOutfits(prev => [...prev, newOutfit]);
  };

  const loadOutfit = (id: string) => {
    const outfit = savedOutfits.find(o => o.id === id);
    if (outfit) {
      setOutfitItems(outfit.items);
      setBackgroundColor(outfit.backgroundColor);
    }
  };

  const deleteOutfit = (id: string) => {
    if (confirm('Are you sure you want to delete this outfit?')) {
      setSavedOutfits(prev => prev.filter(outfit => outfit.id !== id));
    }
  };

  const generateRandomOutfit = () => {
    // Clear current outfit
    setOutfitItems([]);

    // Select one random item from each main category
    const randomOutfit: OutfitItem[] = [];
    
    categories.forEach(category => {
      // Skip categories with a 20% chance to create variety
      if (Math.random() < 0.2 && category.optional) {
        return;
      }

      // Get all items in this category
      const categoryItems = wardrobe.filter(item => item.categoryId === category.id);
      
      if (categoryItems.length > 0) {
        // Select a random item
        const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
        
        // Add to outfit
        const newOutfitItem: OutfitItem = {
          id: `outfit-${Date.now()}-${randomItem.id}`,
          originalItemId: randomItem.id,
          imageUrl: randomItem.imageUrl,
          position: { x: 50, y: 50 }, // Center position
          zIndex: randomItem.zIndex,
          scale: 1,
          rotation: 0,
          width: randomItem.width || 50,
          height: randomItem.height || 50,
          canChangeColor: randomItem.canChangeColor,
          color: randomItem.defaultColor,
          colorAdjustment: 0
        };

        randomOutfit.push(newOutfitItem);
      }
    });

    setOutfitItems(randomOutfit);
  };

  const shareOutfit = () => {
    if (outfitItems.length === 0) {
      alert('Please add some items to your outfit before sharing.');
      return;
    }

    // In a real implementation, this would generate an image or a shareable link
    alert('Sharing functionality would generate an image of your current outfit that you could save or share on social media.');
  };

  return (
    <GameContext.Provider
      value={{
        categories,
        wardrobe,
        outfitItems,
        selectedOutfitItem,
        setSelectedOutfitItem,
        addItemToOutfit,
        removeItemFromOutfit,
        updateItemPosition,
        updateItemScale,
        updateItemRotation,
        updateItemColor,
        backgroundColor,
        setBackgroundColor,
        savedOutfits,
        saveCurrentOutfit,
        loadOutfit,
        deleteOutfit,
        generateRandomOutfit,
        shareOutfit
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};