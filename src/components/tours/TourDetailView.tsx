'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, Star, MapPin, Clock, 
  Users, Calendar, CheckCircle, XCircle, Heart,
  Share2, Bookmark, MessageSquare, Navigation,
  Coffee, Home, Mountain, Camera, Globe, 
  Briefcase, Utensils, Wind, Sun, Moon,
  Award, Shield, Clock3, Wallet
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface TourDetailProps {
  tourId: string;
  isAdmin?: boolean;
}

interface TourDetailData {
  tourId: {
    _id: string;
    title: string;
    slug: string;
    price: number;
    duration: string;
    category: string;
    region: string;
    rating: number;
    image: string;
    description?: string;
  };
  images: Array<{
    url: string;
    caption?: string;
    isMain: boolean;
    order: number;
  }>;
  highlights: string[];
  fullDescription: string;
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    accommodation: string;
    meals: string[];
    activities: string[];
  }>;
  inclusions: Array<{
    category: string;
    items: string[];
  }>;
  exclusions: Array<{
    category: string;
    items: string[];
  }>;
  practicalInfo: Array<{
    title: string;
    content: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  videoUrl?: string;
  mapEmbedUrl?: string;
  gallery: Array<{
    title: string;
    images: string[];
  }>;
  reviews: Array<{
    _id: string;
    rating: number;
    comment: string;
    name: string;
    date: string;
    helpful: number;
  }>;
  averageRating: number;
  reviewCount: number;
}

export default function TourDetailView({ tourId, isAdmin = false }: TourDetailProps) {
  const [data, setData] = useState<TourDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchTourDetails();
  }, [tourId]);

  const fetchTourDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tours/${tourId}/details`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.detail || { tourId: result.basicInfo });
      } else {
        setError('Failed to load tour details');
      }
    } catch (err) {
      setError('Error loading tour details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tour Not Found</h3>
          <p className="text-gray-600 mb-6">The tour details could not be loaded.</p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Browse Other Tours
          </Link>
        </div>
      </div>
    );
  }

  const tour = data.tourId;
  const images = data.images || [];
  const mainImage = images.find(img => img.isMain) || images[0] || { url: tour.image };
  const otherImages = images.filter(img => !img.isMain).slice(0, 5);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${mainImage.url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        {/* Navigation Bar */}
        <nav className="relative z-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/tours"
              className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Tours</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-primary-500 text-primary-500' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-30 h-full flex flex-col justify-end pb-12 px-6 max-w-7xl mx-auto">
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-primary-500/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                {tour.category}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {tour.region}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{tour.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                {renderStars(tour.rating)}
                <span className="text-xl font-semibold">{tour.rating.toFixed(1)}</span>
                <span className="text-gray-300">({data.reviewCount || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-lg">{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{tour.region}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">${tour.price}</span>
                <span className="text-gray-300">/ person</span>
              </div>
              
              <div className="flex gap-3">
                <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Book Now
                </button>
                <button className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                  Contact Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 mb-8">
              <div className="flex space-x-8">
                {['overview', 'itinerary', 'inclusions', 'gallery', 'reviews', 'faq'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                      selectedTab === tab
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Highlights */}
                  {data.highlights && data.highlights.length > 0 && (
                    <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Highlights</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Tour</h2>
                    <div className="prose prose-lg max-w-none text-gray-600">
                      {data.fullDescription || tour.description}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                      <Clock3 className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">{tour.duration}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                      <Users className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Small Group</div>
                      <div className="text-sm text-gray-500">2-12 People</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                      <Wallet className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Best Price</div>
                      <div className="text-sm text-gray-500">Guarantee</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                      <Shield className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Safe Travel</div>
                      <div className="text-sm text-gray-500">COVID Safe</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'itinerary' && data.itinerary && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900">Detailed Itinerary</h2>
                  {data.itinerary.map((day, index) => (
                    <div key={day.day} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-primary-500 to-blue-500 px-6 py-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                          <span className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                            {day.day}
                          </span>
                          Day {day.day}: {day.title}
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4">{day.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          {day.accommodation && (
                            <div className="flex items-start gap-3">
                              <Home className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-gray-900">Accommodation</div>
                                <div className="text-sm text-gray-600">{day.accommodation}</div>
                              </div>
                            </div>
                          )}
                          
                          {day.meals && day.meals.length > 0 && (
                            <div className="flex items-start gap-3">
                              <Utensils className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-gray-900">Meals Included</div>
                                <div className="text-sm text-gray-600">{day.meals.join(', ')}</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {day.activities && day.activities.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                            <div className="flex flex-wrap gap-2">
                              {day.activities.map((activity, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm"
                                >
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Add similar sections for other tabs... */}
            </AnimatePresence>
          </div>

          {/* Right Column - Booking & Info */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">${tour.price}</div>
                <div className="text-gray-500">per person</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{tour.duration}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Group Size</span>
                  <span className="font-semibold">2-12 people</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-semibold">Moderate</span>
                </div>
              </div>

              <button className="w-full mt-6 py-4 bg-gradient-to-r from-primary-500 to-blue-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-blue-600 transition-all duration-300">
                Book This Tour Now
              </button>

              <div className="mt-6 text-center text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure Booking</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Instant Confirmation</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-600">Available: All Year</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-600">Meeting Point: Addis Ababa</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-600">Minimum: 2 persons</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-600">Languages: English</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {otherImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Admin Actions (if applicable) */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex gap-2">
            <Link
              href={`/dashboard/tours/edit/${tourId}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              Edit Details
            </Link>
            <Link
              href={`/dashboard/tours/${tourId}/images`}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2"
            >
              Manage Images
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}