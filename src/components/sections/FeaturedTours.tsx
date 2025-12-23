'use client';

import { useEffect, useState } from 'react';
import TourCard from '@/components/tours/TourCard';
import ApplyTourModal from '@/components/modals/ApplyTourModal'; // Adjust path as needed
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

interface Tour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  duration: string;
  difficulty: string;
  price: number;
  discountPrice?: number;
  rating: number;
  category: string;
  region: string;
  image: string;
  tags: string[];
  iconName: string;
  highlight?: string;
  isFeatured?: boolean;
  
}

interface Category {
  name: string;
  count: number;
  active: boolean;
}

export default function FeaturedTours() {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Tours');
  const [categories, setCategories] = useState<Category[]>([
    { name: 'All Tours', count: 0, active: true },
    { name: 'Cultural Heritage', count: 0, active: false },
    { name: 'Mountain Trekking', count: 0, active: false },
    { name: 'Nature & Wildlife', count: 0, active: false },
    { name: 'Adventure', count: 0, active: false },
    { name: 'Historical', count: 0, active: false },
    { name: 'Spiritual', count: 0, active: false }
  ]);

  // Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<{
    id?: string;
    name: string;
    price?: number;
    duration?: string;
    difficulty?: string;
  } | null>(null);

  const fetchFeaturedTours = async (category?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('limit', '6');
      params.append('sort', '-rating');
      
      if (category && category !== 'All Tours') {
        params.append('category', category);
      }

      const response = await fetch(`/api/tours/featured?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setFeaturedTours(data.tours);
        updateCategoryCounts(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch featured tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTourStats = async () => {
    try {
      const response = await fetch('/api/tours/stats');
      const data = await response.json();
      if (data.success) {
        updateCategoryCounts(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch tour stats:', error);
    }
  };

  const updateCategoryCounts = (stats: any) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      count: stats?.categories?.[cat.name] || 0,
      active: cat.name === activeCategory
    })));
  };

  // Handle explore tour click
  const handleExploreTour = (tour: Tour) => {
    setSelectedTour({
      id: tour._id,
      name: tour.title,
      price: tour.price,
      duration: tour.duration,
      difficulty: tour.difficulty
    });
    setIsApplyModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setSelectedTour(null);
  };

  useEffect(() => {
    fetchFeaturedTours(activeCategory);
    fetchTourStats();
  }, [activeCategory]);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setCategories(prev => prev.map(cat => ({
      ...cat,
      active: cat.name === categoryName
    })));
  };

  const ethiopianRegions = [
    { name: 'Northern Historical Route', color: 'bg-green-500', description: 'Ancient kingdoms & rock churches' },
    { name: 'Southern Cultural Circuit', color: 'bg-blue-500', description: 'Tribal cultures & traditions' },
    { name: 'Eastern Desert Adventures', color: 'bg-yellow-500', description: 'Volcanic landscapes & salt flats' },
    { name: 'Western Nature Trails', color: 'bg-red-500', description: 'Rainforests & waterfalls' }
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
              <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                ETHIOPIAN WONDERS
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gray-900">Discover </span>
              <span className="text-primary-500">Ethiopia</span>
              <span className="text-gray-900">'s Treasures</span>
            </h2>
            
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Explore the cradle of humanity with our authentic Ethiopian experiences. 
              From ancient civilizations to breathtaking natural wonders.
            </p>
            
            {/* Ethiopian Motto with Stats */}
            <div className="mt-8 inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-yellow-500/10 to-green-500/10 px-6 py-4 rounded-2xl border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="flex">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-1"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <span className="font-medium text-gray-700">
                  Land of Origins • 13 Months of Sunshine
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary-500" />
                  <span className="font-semibold">{categories.find(c => c.name === 'All Tours')?.count || 0}</span>
                  <span className="text-gray-600">Tours Available</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="text-gray-600">
                  Avg. Rating: <span className="font-semibold">4.8</span>/5
                </div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 border flex items-center gap-2 ${category.active 
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500' 
                  : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
                }`}
              >
                {category.name}
                <span className={`text-xs px-2 py-0.5 rounded-full ${category.active 
                  ? 'bg-primary-600/30 text-white' 
                  : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredTours.length > 0 ? (
            <>
              {/* Tours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredTours.map((tour) => (
                  <TourCard 
                    key={tour._id} 
                    tour={tour}
                    onExploreClick={() => handleExploreTour(tour)} // Pass click handler
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                No tours found in this category
              </div>
              <button
                onClick={() => handleCategoryClick('All Tours')}
                className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600"
              >
                View All Tours
              </button>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300">
              View All Ethiopian Adventures
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Apply Tour Modal */}
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseModal}
        tour={selectedTour || undefined}
      />
    </>
  );
}