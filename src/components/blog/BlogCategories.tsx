// src/components/blog/BlogCategories.tsx - Category Filter
'use client';

import { useState } from 'react';
import { 
  Mountain, 
  Coffee, 
  Church, 
  Users, 
  Map, 
  Camera,
  Globe,
  Flame
} from 'lucide-react';

const categories = [
  { 
    name: 'All Categories', 
    icon: Globe, 
    count: 156,
    color: 'from-primary-500 to-blue-500'
  },
  { 
    name: 'Cultural Insights', 
    icon: Users, 
    count: 42,
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    name: 'Mountain Trekking', 
    icon: Mountain, 
    count: 28,
    color: 'from-emerald-500 to-green-500'
  },
  { 
    name: 'Coffee Culture', 
    icon: Coffee, 
    count: 19,
    color: 'from-brown-500 to-amber-900'
  },
  { 
    name: 'Historical Sites', 
    icon: Church, 
    count: 35,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Travel Photography', 
    icon: Camera, 
    count: 22,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'Adventure Travel', 
    icon: Flame, 
    count: 18,
    color: 'from-red-500 to-orange-500'
  },
  { 
    name: 'Hidden Gems', 
    icon: Map, 
    count: 32,
    color: 'from-gray-500 to-gray-700'
  },
];

export default function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState('All Categories');

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    // Here you would filter blog posts based on category
    // This would be implemented in the parent component
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
      <h3 className="font-semibold text-gray-900 text-lg mb-6">Explore Categories</h3>
      <div className="space-y-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.name;
          
          return (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-50 to-yellow-50 border border-primary-200' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`font-medium ${
                  isActive ? 'text-primary-700' : 'text-gray-700'
                }`}>
                  {category.name}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                isActive 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}