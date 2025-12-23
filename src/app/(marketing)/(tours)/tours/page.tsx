'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import TourCard from '@/components/tours/TourCard';
import { Filter, MapPin, Calendar, TrendingUp, Search, X } from 'lucide-react';
import { categories, regions, difficulties } from '@/lib/utils/tour-icons';
import ApplyTourModal from '@/components/modals/ApplyTourModal';

interface Tour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  difficulty: string;
  price: number;
  rating: number;
  category: string;
  region: string;
  image: string;
  tags: string[];
  iconName: string;
  highlight?: string;
}

interface Filters {
  category: string;
  region: string;
  difficulty: string;
  duration: string;
  search: string;
}

export default function ToursPage() {
  const [allTours, setAllTours] = useState<Tour[]>([]); // Store ALL tours here
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]); // Tours after filtering
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    category: '',
    region: '',
    difficulty: '',
    duration: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 1,
    hasNext: false,
    hasPrev: false
  });

  // Add state for category counts
  const [categoryCounts, setCategoryCounts] = useState<{[key: string]: number}>({});
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<{
    id?: string;
    name: string;
    price?: number;
    duration?: string;
    difficulty?: string;
  } | null>(null);

  // Fetch ALL tours on component mount
  useEffect(() => {
    const fetchAllTours = async () => {
      setLoading(true);
      try {
        console.log('Fetching ALL tours...');
        const response = await fetch('/api/tours?limit=100'); // Get all tours
        const data = await response.json();
        console.log("All tours received:", data.tours?.length);
        
        if (data.success) {
          setAllTours(data.tours || []);
          setFilteredTours(data.tours || []); // Initially show all tours
          setPagination({
            page: 1,
            total: data.tours?.length || 0,
            pages: Math.ceil((data.tours?.length || 0) / 6),
            hasNext: (data.tours?.length || 0) > 6,
            hasPrev: false
          });
        }
      } catch (error) {
        console.error('Failed to fetch tours:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTours();
  }, []);

  // Fetch category counts on component mount
  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await fetch('/api/tours/category-counts');
        const data = await response.json();
        if (data.success) {
          setCategoryCounts(data.counts);
        }
      } catch (error) {
        console.error('Failed to fetch category counts:', error);
      }
    };
    fetchCategoryCounts();
  }, []);

  // Function to filter tours locally
  const filterToursLocally = useCallback(() => {
    if (allTours.length === 0) return [];
    
    console.log('Filtering tours locally with filters:', filters);
    
    return allTours.filter(tour => {
      // Category filter
      if (filters.category && filters.category !== 'All Tours') {
        if (tour.category !== filters.category) {
          console.log(`Tour ${tour.title} filtered out by category: ${tour.category} !== ${filters.category}`);
          return false;
        }
      }
      
      // Region filter
      if (filters.region) {
        if (tour.region !== filters.region) {
          console.log(`Tour ${tour.title} filtered out by region: ${tour.region} !== ${filters.region}`);
          return false;
        }
      }
      
      // Difficulty filter
      if (filters.difficulty) {
        if (tour.difficulty !== filters.difficulty) {
          console.log(`Tour ${tour.title} filtered out by difficulty: ${tour.difficulty} !== ${filters.difficulty}`);
          return false;
        }
      }
      
      // Duration filter
      if (filters.duration) {
        // Extract number of days from duration string (e.g., "3-7 days" -> get min days 3)
        const durationMatch = tour.duration.match(/\d+/);
        const tourDays = durationMatch ? parseInt(durationMatch[0]) : 0;
        
        let passesDurationFilter = false;
        switch (filters.duration) {
          case '1-3 days':
            passesDurationFilter = tourDays >= 1 && tourDays <= 3;
            break;
          case '4-7 days':
            passesDurationFilter = tourDays >= 4 && tourDays <= 7;
            break;
          case '8-14 days':
            passesDurationFilter = tourDays >= 8 && tourDays <= 14;
            break;
          case '15+ days':
            passesDurationFilter = tourDays >= 15;
            break;
        }
        
        if (!passesDurationFilter) {
          console.log(`Tour ${tour.title} filtered out by duration: ${tour.duration}`);
          return false;
        }
      }
      
      // Search filter
      if (filters.search.trim()) {
        const searchLower = filters.search.toLowerCase();
        const searchInTitle = tour.title.toLowerCase().includes(searchLower);
        const searchInDescription = tour.description.toLowerCase().includes(searchLower);
        const searchInTags = tour.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const searchInCategory = tour.category.toLowerCase().includes(searchLower);
        const searchInRegion = tour.region.toLowerCase().includes(searchLower);
        
        if (!searchInTitle && !searchInDescription && !searchInTags && !searchInCategory && !searchInRegion) {
          console.log(`Tour ${tour.title} filtered out by search: ${filters.search}`);
          return false;
        }
      }
      
      return true;
    });
  }, [allTours, filters]);

  // Apply filters whenever filters change
  useEffect(() => {
    if (allTours.length > 0) {
      console.log('Applying filters...');
      const filtered = filterToursLocally();
      console.log(`Found ${filtered.length} tours after filtering`);
      
      setFilteredTours(filtered);
      setPagination({
        page: 1,
        total: filtered.length,
        pages: Math.ceil(filtered.length / 6),
        hasNext: filtered.length > 6,
        hasPrev: false
      });
    }
  }, [filters, allTours, filterToursLocally]);

  // Get paginated tours for current page
  const paginatedTours = useMemo(() => {
    const startIndex = (pagination.page - 1) * 6;
    return filteredTours.slice(startIndex, startIndex + 6);
  }, [filteredTours, pagination.page]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    console.log(`Filter changed: ${key} = ${value}`);
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      console.log('New filters state:', newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    console.log('Clearing filters');
    setFilters({
      category: '',
      region: '',
      difficulty: '',
      duration: '',
      search: ''
    });
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleCustomTourRequest = () => {
    setSelectedTour({
      name: "Custom Tour Request",
      duration: "Custom",
      difficulty: "Customizable"
    });
    setIsApplyModalOpen(true);
  };

  // Helper function to display active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category && filters.category !== 'All Tours') count++;
    if (filters.region) count++;
    if (filters.difficulty) count++;
    if (filters.duration) count++;
    if (filters.search.trim()) count++;
    return count;
  };

  // Calculate category counts from all tours
  const calculatedCategoryCounts = useMemo(() => {
    const counts: {[key: string]: number} = {};
    
    // Initialize all categories with 0
    ['All Tours', ...categories].forEach(category => {
      counts[category] = 0;
    });
    
    // Count tours by category
    allTours.forEach(tour => {
      if (counts[tour.category] !== undefined) {
        counts[tour.category]++;
      }
      counts['All Tours']++; // Always increment "All Tours"
    });
    
    return counts;
  }, [allTours, categories]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-primary-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Ethiopian Adventures
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover authentic experiences across Ethiopia's diverse regions with expert local guides
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-2">
                <div className="flex-1 flex items-center">
                  <Search className="w-5 h-5 text-white/60 ml-4 absolute" />
                  <input
                    type="text"
                    placeholder="Search tours by destination, activity, or region..."
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => handleFilterChange('search', filters.search)} // Just trigger re-filter
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <Filter className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter Tours
                  {getActiveFilterCount() > 0 && (
                    <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                      {getActiveFilterCount()} active
                    </span>
                  )}
                </h3>
                {getActiveFilterCount() > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
                <div className="space-y-2">
                  {['All Tours', ...categories].map((category) => {
                    const isSelected = category === 'All Tours' 
                      ? !filters.category 
                      : filters.category === category;
                    
                    return (
                      <label 
                        key={category} 
                        className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="category"
                            checked={isSelected}
                            onChange={() => handleFilterChange('category', category === 'All Tours' ? '' : category)}
                            className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                          />
                          <span className={`text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                            {category}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                          {calculatedCategoryCounts[category] || 0}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Regions */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Regions
                </h4>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <label 
                      key={region} 
                      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                        filters.region === region ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="region"
                        checked={filters.region === region}
                        onChange={() => handleFilterChange('region', filters.region === region ? '' : region)}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                      />
                      <span className={`text-gray-700 ${filters.region === region ? 'font-medium' : ''}`}>
                        {region}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Duration
                </h4>
                <div className="space-y-2">
                  {['', '1-3 days', '4-7 days', '8-14 days', '15+ days'].map((duration) => {
                    const displayText = duration === '' ? 'Any Duration' : duration;
                    const isSelected = filters.duration === duration;
                    
                    return (
                      <label 
                        key={duration || 'any'} 
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="duration"
                          checked={isSelected}
                          onChange={() => handleFilterChange('duration', duration)}
                          className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                        />
                        <span className={`text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                          {displayText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Difficulty
                </h4>
                <div className="space-y-2">
                  {['', ...difficulties].map((difficulty) => {
                    const displayText = difficulty === '' ? 'Any Difficulty' : difficulty;
                    const isSelected = filters.difficulty === difficulty;
                    
                    return (
                      <label 
                        key={difficulty || 'any'} 
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                          isSelected ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="difficulty"
                          checked={isSelected}
                          onChange={() => handleFilterChange('difficulty', difficulty)}
                          className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                        />
                        <span className={`text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                          {displayText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Ethiopian Tours</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-gray-600">
                      {loading ? 'Loading tours...' : `Showing ${paginatedTours.length} of ${filteredTours.length} tours (${allTours.length} total)`}
                    </p>
                    {!loading && getActiveFilterCount() > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <span className="text-primary-600 text-sm font-medium">
                          Filtered ({getActiveFilterCount()})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Active Filters Display */}
                {getActiveFilterCount() > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                      if (!value || value === '') return null;
                      
                      let displayValue = value;
                      let displayKey = key;
                      
                      // Format display names
                      if (key === 'search') {
                        displayKey = 'Search';
                      } else {
                        displayKey = key.charAt(0).toUpperCase() + key.slice(1);
                      }
                      
                      return (
                        <div 
                          key={key} 
                          className="inline-flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-800 rounded-full text-sm"
                        >
                          <span className="font-medium">{displayKey}:</span>
                          <span>{displayValue}</span>
                          <button
                            onClick={() => handleFilterChange(key as keyof Filters, '')}
                            className="ml-1 hover:text-primary-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedTours.map((tour) => (
                    <TourCard 
                      key={tour._id} 
                      tour={tour}
                      onExploreClick={() => handleExploreTour(tour)}
                    />
                  ))}
                </div>

                {/* No Results */}
                {paginatedTours.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">No tours found matching your filters</div>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={!pagination.hasPrev}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {[...Array(pagination.pages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 border rounded-lg ${pagination.page === i + 1 ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={!pagination.hasNext}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl p-8 border border-primary-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Tour?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our Ethiopian experts can create a personalized itinerary tailored to your interests, 
                  timeline, and budget. Contact us for a free consultation.
                </p>
                <button
                  onClick={handleCustomTourRequest}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300"
                >
                  Request Custom Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Tour Modal */}
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseModal}
        tour={selectedTour || undefined}
      />
    </div>
  );
}