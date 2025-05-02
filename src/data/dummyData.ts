import { ClothingCategory, ClothingItem, SubCategory } from '../types';

export const generateDummyData = () => {
  // Define categories
  const categories: ClothingCategory[] = [
    {
      id: 'underwear',
      name: 'Underwear',
      subcategories: [
        { id: 'panties', name: 'Panties' },
        { id: 'bras', name: 'Bras' },
        { id: 'stockings', name: 'Stockings & Hosiery' },
        { id: 'lingerie-sets', name: 'Lingerie Sets' }
      ]
    },
    {
      id: 'tops',
      name: 'Tops',
      subcategories: [
        { id: 'blouses', name: 'Blouses & Shirts' },
        { id: 't-shirts', name: 'T-shirts' },
        { id: 'sweaters', name: 'Sweaters & Cardigans' },
        { id: 'crop-tops', name: 'Crop Tops' }
      ]
    },
    {
      id: 'bottoms',
      name: 'Bottoms',
      subcategories: [
        { id: 'skirts', name: 'Skirts' },
        { id: 'pants', name: 'Pants' },
        { id: 'shorts', name: 'Shorts' },
        { id: 'jeans', name: 'Jeans' }
      ]
    },
    {
      id: 'dresses',
      name: 'Dresses',
      subcategories: [
        { id: 'casual-dresses', name: 'Casual Dresses' },
        { id: 'formal-dresses', name: 'Formal Dresses' },
        { id: 'mini-dresses', name: 'Mini Dresses' },
        { id: 'maxi-dresses', name: 'Maxi Dresses' }
      ]
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      subcategories: [
        { id: 'jackets', name: 'Jackets' },
        { id: 'coats', name: 'Coats' },
        { id: 'cardigans', name: 'Cardigans' }
      ],
      optional: true
    },
    {
      id: 'shoes',
      name: 'Shoes',
      subcategories: [
        { id: 'heels', name: 'Heels' },
        { id: 'flats', name: 'Flats' },
        { id: 'boots', name: 'Boots' },
        { id: 'sneakers', name: 'Sneakers' }
      ]
    },
    {
      id: 'accessories',
      name: 'Accessories',
      subcategories: [
        { id: 'jewelry', name: 'Jewelry' },
        { id: 'bags', name: 'Bags' },
        { id: 'hats', name: 'Hats' },
        { id: 'glasses', name: 'Glasses' }
      ],
      optional: true
    },
    {
      id: 'hair',
      name: 'Hair & Makeup',
      subcategories: [
        { id: 'hairstyles', name: 'Hairstyles' },
        { id: 'makeup', name: 'Makeup' }
      ],
      optional: true
    }
  ];
  
  // Create dummy items for each category
  const items: ClothingItem[] = [];
  
  // Helper to create placeholder URLs
  const getPlaceholderImageUrl = (category: string, subcategory: string, variant: number) => {
    // In a real app, these would be real image URLs
    return `/placeholders/${category}/${subcategory}-${variant}.png`;
  };
  
  // Generate items for each category and subcategory
  categories.forEach((category) => {
    const categoryZIndex = getCategoryZIndex(category.id);
    
    category.subcategories.forEach((subcategory) => {
      // Generate 3-5 items per subcategory
      const itemCount = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 1; i <= itemCount; i++) {
        items.push({
          id: `${category.id}-${subcategory.id}-${i}`,
          name: `${subcategory.name} ${i}`,
          categoryId: category.id,
          subcategoryId: subcategory.id,
          imageUrl: getPlaceholderImageUrl(category.id, subcategory.id, i),
          zIndex: categoryZIndex,
          exclusive: ['underwear', 'bottoms', 'dresses', 'shoes', 'hair'].includes(category.id),
          canChangeColor: !['hair', 'makeup'].includes(subcategory.id),
          defaultColor: '#ffffff',
          width: getItemWidth(category.id),
          height: getItemHeight(category.id)
        });
      }
    });
  });
  
  return { categories, items };
};

// Helper functions for item properties
const getCategoryZIndex = (categoryId: string): number => {
  // Define z-index values for proper layering
  const zIndexMap: Record<string, number> = {
    'underwear': 10,
    'bottoms': 20,
    'tops': 30,
    'dresses': 25,
    'outerwear': 40,
    'shoes': 5,
    'accessories': 50,
    'hair': 60
  };
  
  return zIndexMap[categoryId] || 1;
};

const getItemWidth = (categoryId: string): number => {
  // Define widths as percentage of character
  const widthMap: Record<string, number> = {
    'underwear': 40,
    'bottoms': 50,
    'tops': 55,
    'dresses': 55,
    'outerwear': 60,
    'shoes': 30,
    'accessories': 20,
    'hair': 45
  };
  
  return widthMap[categoryId] || 50;
};

const getItemHeight = (categoryId: string): number => {
  // Define heights as percentage of character
  const heightMap: Record<string, number> = {
    'underwear': 30,
    'bottoms': 40,
    'tops': 35,
    'dresses': 65,
    'outerwear': 45,
    'shoes': 15,
    'accessories': 15,
    'hair': 25
  };
  
  return heightMap[categoryId] || 40;
};