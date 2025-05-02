export interface Position {
  x: number;
  y: number;
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface ClothingCategory {
  id: string;
  name: string;
  subcategories: SubCategory[];
  optional?: boolean;
}

export interface ClothingItem {
  id: string;
  name: string;
  categoryId: string;
  subcategoryId?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  zIndex: number;
  exclusive?: boolean;
  canChangeColor?: boolean;
  defaultColor?: string;
  width?: number;
  height?: number;
}

export interface OutfitItem {
  id: string;
  originalItemId: string;
  imageUrl: string;
  position: Position;
  zIndex: number;
  scale: number;
  rotation: number;
  width: number;
  height: number;
  canChangeColor?: boolean;
  color?: string;
  colorAdjustment: number;
}

export interface SavedOutfit {
  id: string;
  name: string;
  items: OutfitItem[];
  thumbnailUrl: string;
  createdAt: string;
  backgroundColor: string;
}