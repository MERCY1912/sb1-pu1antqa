import React from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const colors = [
    '#ffffff', // White
    '#fecaca', // Light red
    '#fed7aa', // Light orange
    '#fef08a', // Light yellow
    '#d9f99d', // Light lime
    '#bbf7d0', // Light green
    '#a5f3fc', // Light cyan
    '#bae6fd', // Light blue
    '#c7d2fe', // Light indigo
    '#ddd6fe', // Light purple
    '#f5d0fe', // Light fuchsia
    '#fbcfe8', // Light pink
    
    '#ef4444', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#84cc16', // Lime
    '#22c55e', // Green
    '#06b6d4', // Cyan
    '#0ea5e9', // Blue
    '#6366f1', // Indigo
    '#8b5cf6', // Purple
    '#d946ef', // Fuchsia
    '#ec4899'  // Pink
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex gap-1">
      {colors.map((c) => (
        <button
          key={c}
          className={`w-5 h-5 rounded-full ${c === color ? 'ring-2 ring-offset-1 ring-pink-500' : 'hover:scale-110 transition-transform'}`}
          style={{ backgroundColor: c }}
          onClick={() => onChange(c)}
        />
      ))}
    </div>
  );
};