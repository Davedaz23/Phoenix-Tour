'use client';

import { useEffect, useState } from 'react';
import TourCard from '@/components/tours/TourCard';
import ApplyTourModal from '@/components/modals/ApplyTourModal';
import { ArrowRight, TrendingUp, Sparkles, MapPin, Clock, Users, Star } from 'lucide-react';

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
  description?: string;
  icon?: string;
}

// Fallback static tours data with comprehensive categories
const fallbackTours = [
  {
    _id: 'fallback-1',
    title: 'Simien Mountains Trek',
    slug: 'simien-mountains-trek',
    description: 'Hike through the "Roof of Africa" with endemic wildlife and breathtaking views. Experience one of Africa\'s most spectacular mountain ranges.',
    shortDescription: 'Hike through the "Roof of Africa"',
    duration: '3-7 days',
    difficulty: 'Challenging',
    price: 850,
    rating: 4.9,
    category: 'Nature & Trekking',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Wildlife', 'Photography', 'Hiking'],
    iconName: 'Mountain',
    highlight: 'See the Gelada monkeys and Ethiopian wolves',
    isFeatured: true
  },
  {
    _id: 'fallback-2',
    title: 'Lalibela & Northern Churches',
    slug: 'lalibela-northern-churches',
    description: 'Explore the incredible rock-hewn churches of Lalibela and the ancient kingdom sites of Ethiopia.',
    shortDescription: 'Explore ancient rock-hewn churches',
    duration: '4 days',
    difficulty: 'Easy',
    price: 680,
    rating: 4.8,
    category: 'Historical Tours',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Historical', 'Spiritual', 'Cultural'],
    iconName: 'Castle',
    highlight: 'Visit St. George\'s Church, the masterpiece',
    isFeatured: true
  },
  {
    _id: 'fallback-3',
    title: 'Omo Valley Cultural Journey',
    slug: 'omo-valley-cultural-journey',
    description: 'Cultural immersion with indigenous tribes of Southern Ethiopia. Learn about traditional lifestyles and customs.',
    shortDescription: 'Cultural immersion with indigenous tribes',
    duration: '6 days',
    difficulty: 'Moderate',
    price: 920,
    rating: 4.8,
    category: 'Cultural Tours',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tribal', 'Cultural', 'Photography', 'Indigenous'],
    iconName: 'Compass',
    highlight: 'Meet the Mursi, Hamer, and Karo tribes',
    isFeatured: true
  },
  {
    _id: 'fallback-4',
    title: 'Danakil Depression Adventure',
    slug: 'danakil-depression-adventure',
    description: 'Witness one of Earth\'s most extreme environments with volcanic landscapes, colorful sulfur springs, and salt flats.',
    shortDescription: 'Witness extreme volcanic landscapes',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 720,
    rating: 4.9,
    category: 'Adventure',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Volcano', 'Extreme', 'Unique', 'Geothermal'],
    iconName: 'Sun',
    highlight: 'See the colorful sulfur springs and Erta Ale lava lake',
    isFeatured: true
  },
  {
    _id: 'fallback-5',
    title: 'Addis Ababa Day Tour',
    slug: 'addis-ababa-day-tour',
    description: 'Explore Ethiopia\'s vibrant capital city, visit the National Museum, Merkato, and enjoy traditional coffee ceremony.',
    shortDescription: 'Explore Ethiopia\'s vibrant capital',
    duration: '1 day',
    difficulty: 'Easy',
    price: 65,
    rating: 4.7,
    category: 'Day Trips',
    region: 'Central Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['City Tour', 'Cultural', 'Historical', 'Food'],
    iconName: 'City',
    highlight: 'See Lucy (Australopithecus) at the National Museum',
    isFeatured: true
  },
  {
    _id: 'fallback-6',
    title: 'Classic Ethiopia Highlights',
    slug: 'classic-ethiopia-highlights',
    description: 'The ultimate Ethiopian experience covering Lalibela, Gondar, Simien Mountains, and Axum.',
    shortDescription: 'The ultimate Ethiopian experience',
    duration: '12 days',
    difficulty: 'Moderate',
    price: 1850,
    rating: 4.9,
    category: 'Ethiopia Highlights',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic', 'Comprehensive', 'Best Seller', 'UNESCO'],
    iconName: 'Star',
    highlight: 'All major historical and natural sites in one tour',
    isFeatured: true
  }
];

// Category mapping for fallback data - Updated to match client's categories
const categoryMappings: Record<string, string[]> = {
  'All Tours': ['Ethiopia Highlights', 'Historical Tours', 'Cultural Tours', 'Nature & Trekking', 'Adventure', 'Day Trips'],
  'Ethiopia Highlights': ['Ethiopia Highlights'],
  'Historical Tours': ['Historical Tours'],
  'Cultural Tours': ['Cultural Tours'],
  'Nature & Trekking': ['Nature & Trekking'],
  'Adventure': ['Adventure'],
  'Day Trips': ['Day Trips']
};

// Client's requested categories with descriptions
const clientCategories = [
  { 
    name: 'Ethiopia Highlights', 
    description: 'Classic routes covering major attractions',
    icon: 'Star'
  },
  { 
    name: 'Historical Tours', 
    description: 'Lalibela, Gondar, Axum - Ancient kingdoms',
    icon: 'Castle'
  },
  { 
    name: 'Cultural Tours', 
    description: 'Omo Valley tribes & traditional experiences',
    icon: 'Users'
  },
  { 
    name: 'Nature & Trekking', 
    description: 'Simien Mountains, Bale Mountains, wildlife',
    icon: 'Mountain'
  },
  { 
    name: 'Adventure', 
    description: 'Rafting, biking, off-road experiences',
    icon: 'Activity'
  },
  { 
    name: 'Day Trips', 
    description: 'Addis Ababa, Debre Libanos, easy excursions',
    icon: 'Clock'
  }
];

export default function FeaturedTours({ id }: { id?: string }) {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Tours');
  const [categories, setCategories] = useState<Category[]>([
    { name: 'All Tours', count: 0, active: true },
    { name: 'Ethiopia Highlights', count: 0, active: false },
    { name: 'Historical Tours', count: 0, active: false },
    { name: 'Cultural Tours', count: 0, active: false },
    { name: 'Nature & Trekking', count: 0, active: false },
    { name: 'Adventure', count: 0, active: false },
    { name: 'Day Trips', count: 0, active: false }
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

  // Filter fallback tours by category
  const filterFallbackTours = (categoryName: string): Tour[] => {
    if (categoryName === 'All Tours') {
      return fallbackTours;
    }
    
    const mappedCategories = categoryMappings[categoryName] || [];
    return fallbackTours.filter(tour => 
      mappedCategories.includes(tour.category)
    );
  };

  // Update category counts for fallback data
  const updateFallbackCategoryCounts = () => {
    const counts: Record<string, number> = {};
    
    // Count tours in each mapped category
    Object.keys(categoryMappings).forEach(catName => {
      if (catName === 'All Tours') {
        counts[catName] = fallbackTours.length;
      } else {
        counts[catName] = filterFallbackTours(catName).length;
      }
    });
    
    setCategories(prev => prev.map(cat => ({
      ...cat,
      count: counts[cat.name] || 0,
      active: cat.name === activeCategory
    })));
  };

  const fetchFeaturedTours = async (category?: string) => {
    setLoading(true);
    setUseFallback(false);
    
    try {
      const params = new URLSearchParams();
      params.append('limit', '6');
      params.append('sort', '-rating');
      
      if (category && category !== 'All Tours') {
        params.append('category', category);
      }

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`/api/tours/featured?${params}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.tours && data.tours.length > 0) {
        setFeaturedTours(data.tours);
        updateCategoryCounts(data.stats);
      } else {
        // If API returns empty array or no success flag
        setUseFallback(true);
        const filteredFallback = filterFallbackTours(category || 'All Tours');
        setFeaturedTours(filteredFallback);
        updateFallbackCategoryCounts();
      }
    } catch (error) {
      console.error('Failed to fetch featured tours:', error);
      // Use fallback on any error
      setUseFallback(true);
      const filteredFallback = filterFallbackTours(activeCategory);
      setFeaturedTours(filteredFallback);
      updateFallbackCategoryCounts();
    } finally {
      setLoading(false);
    }
  };

  const fetchTourStats = async () => {
    if (useFallback) return;
    
    try {
      const response = await fetch('/api/tours/stats');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          updateCategoryCounts(data.stats);
        }
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
    if (!useFallback) {
      fetchTourStats();
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    
    if (useFallback) {
      // Filter fallback tours for the selected category
      const filteredTours = filterFallbackTours(categoryName);
      setFeaturedTours(filteredTours);
      
      // Update active state and counts
      setCategories(prev => prev.map(cat => ({
        ...cat,
        active: cat.name === categoryName
      })));
    } else {
      // For live data, fetch from API
      fetchFeaturedTours(categoryName);
      setCategories(prev => prev.map(cat => ({
        ...cat,
        active: cat.name === categoryName
      })));
    }
  };

  // Initialize with fallback if needed
  useEffect(() => {
    if (!loading && featuredTours.length === 0 && !useFallback) {
      setUseFallback(true);
      const filteredFallback = filterFallbackTours(activeCategory);
      setFeaturedTours(filteredFallback);
      updateFallbackCategoryCounts();
    }
  }, [loading, featuredTours, useFallback, activeCategory]);

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50" id={id}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
              <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                ETHIOPIAN TOURS & ADVENTURES
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gray-900">Your Gateway to </span>
              <span className="text-primary-500">Authentic Ethiopia</span>
            </h2>
            
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Experience Ethiopia through expertly crafted tours that showcase our rich history, 
              diverse cultures, and breathtaking natural wonders.
            </p>
            
            {/* Client's Tour Categories Overview */}
            {/* <div className="mt-12 bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl p-8 border border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Explore Our Main Tour Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientCategories.map((category) => (
                  <div 
                    key={category.name} 
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        {category.name === 'Ethiopia Highlights' && <Star className="w-5 h-5 text-primary-600" />}
                        {category.name === 'Historical Tours' && <MapPin className="w-5 h-5 text-primary-600" />}
                        {category.name === 'Cultural Tours' && <Users className="w-5 h-5 text-primary-600" />}
                        {category.name === 'Nature & Trekking' && <Sparkles className="w-5 h-5 text-primary-600" />}
                        {category.name === 'Adventure' && <TrendingUp className="w-5 h-5 text-primary-600" />}
                        {category.name === 'Day Trips' && <Clock className="w-5 h-5 text-primary-600" />}
                      </div>
                      <h4 className="font-bold text-gray-900">{category.name}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                    <div className="mt-4">
                      <a 
                        href={`/tours?category=${encodeURIComponent(category.name)}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
                      >
                        Browse tours
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            
            {/* Stats & Ethopian Motto */}
            <div className="mt-8 inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-yellow-500/10 to-green-500/10 px-6 py-4 rounded-2xl border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="flex">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-1"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <span className="font-medium text-gray-700">
                  Complete Itineraries • Detailed Pricing • Professional Photos
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary-500" />
                  <span className="font-semibold">{categories.find(c => c.name === 'All Tours')?.count || 0}</span>
                  <span className="text-gray-600">Curated Tours</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="text-gray-600">
                  Every tour includes: <span className="font-semibold">Day-by-day itinerary</span>
                </div>
              </div>
            </div>
            
            {/* Fallback warning */}
            {useFallback && (
              <div className="mt-4 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Showing sample tours. Live data will load when available.</span>
              </div>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 border flex items-center gap-2 ${
                  category.active 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500' 
                    : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
                }`}
              >
                {category.name}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  category.active 
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
                    onExploreClick={() => handleExploreTour(tour)}
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

          {/* What's Included in Each Tour */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What You Get With Every Tour
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Detailed Itinerary</h4>
                <p className="text-gray-600 text-sm">Day-by-day breakdown of activities, accommodations, and transfers</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Clear Pricing</h4>
                <p className="text-gray-600 text-sm">What's included & excluded, with transparent breakdown of costs</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">High-Quality Photos</h4>
                <p className="text-gray-600 text-sm">Professional images of destinations, accommodations, and experiences</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Local Expertise</h4>
                <p className="text-gray-600 text-sm">Ethiopian guides with deep cultural & historical knowledge</p>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/tours"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
            >
              Explore All Ethiopian Tours
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            {useFallback && (
              <p className="mt-4 text-sm text-gray-500">
                Full tour catalogue with detailed itineraries available when connected
              </p>
            )}
            <p className="mt-6 text-gray-500 text-sm">
              Each tour page includes: Complete itinerary • Price details • What's included • Photo gallery
            </p>
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