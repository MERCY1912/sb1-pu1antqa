import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import type { ClothingItem } from '../../types';

export const AdminPanel: React.FC = () => {
  const { categories } = useGame();
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    categoryId: categories[0]?.id || '',
    subcategoryId: categories[0]?.subcategories[0]?.id || '',
    imageUrl: '',
    zIndex: 1,
    exclusive: false,
    canChangeColor: true,
    defaultColor: '#ffffff',
    width: 50,
    height: 50
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const { data, error } = await supabase
      .from('clothing_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading items:', error);
      return;
    }

    setItems(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('clothing_items')
      .insert([newItem]);

    if (error) {
      console.error('Error adding item:', error);
      return;
    }

    setNewItem({
      name: '',
      categoryId: categories[0]?.id || '',
      subcategoryId: categories[0]?.subcategories[0]?.id || '',
      imageUrl: '',
      zIndex: 1,
      exclusive: false,
      canChangeColor: true,
      defaultColor: '#ffffff',
      width: 50,
      height: 50
    });

    loadItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const { error } = await supabase
      .from('clothing_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting item:', error);
      return;
    }

    loadItems();
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Clothing Items Management</h2>

      {/* Add new item form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Item</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={newItem.imageUrl}
              onChange={e => setNewItem({ ...newItem, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={newItem.categoryId}
              onChange={e => {
                const category = categories.find(c => c.id === e.target.value);
                setNewItem({
                  ...newItem,
                  categoryId: e.target.value,
                  subcategoryId: category?.subcategories[0]?.id || ''
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              value={newItem.subcategoryId}
              onChange={e => setNewItem({ ...newItem, subcategoryId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              {categories
                .find(c => c.id === newItem.categoryId)
                ?.subcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Z-Index
            </label>
            <input
              type="number"
              value={newItem.zIndex}
              onChange={e => setNewItem({ ...newItem, zIndex: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newItem.exclusive}
                onChange={e => setNewItem({ ...newItem, exclusive: e.target.checked })}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="ml-2 text-sm text-gray-700">Exclusive</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newItem.canChangeColor}
                onChange={e => setNewItem({ ...newItem, canChangeColor: e.target.checked })}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="ml-2 text-sm text-gray-700">Can change color</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </button>
      </form>

      {/* Items list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Existing Items</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items
            .filter(item => !selectedCategory || item.categoryId === selectedCategory)
            .map(item => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="aspect-square bg-gray-50 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {categories.find(c => c.id === item.categoryId)?.name} -{' '}
                    {categories
                      .find(c => c.id === item.categoryId)
                      ?.subcategories.find(s => s.id === item.subcategoryId)?.name}
                  </p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-2 inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};