import { Clock, MapPin, Star, Flag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getIconComponent, difficultyColors } from '@/lib/utils/tour-icons';

interface TourCardProps {
  tour: {
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
     // Add this
  };
    onExploreClick?: () => void;
}

export default function TourCard({ tour, onExploreClick }: TourCardProps) {
  const Icon = getIconComponent(tour.iconName);
  
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-500 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20">
      {/* Ethiopian Flag Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
          <div className="flex">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full mx-0.5"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <span className="text-xs font-semibold text-gray-700 ml-1">ETH</span>
        </div>
      </div>

      {/* Featured Badge */}
      {tour.isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 bg-yellow-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${tour.image})` }}
        />
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-primary-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
            {tour.category}
          </span>
        </div>
        
        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
            {tour.discountPrice ? (
              <>
                <span className="text-sm text-gray-500 line-through mr-2">${tour.price}</span>
                <span className="text-2xl font-bold text-red-600">${tour.discountPrice}</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary-600">${tour.price}</span>
            )}
            <span className="text-gray-600 text-sm">/person</span>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
              {tour.title}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-primary-500 text-primary-500' : 'fill-gray-300 text-gray-300'}`}
                />
              ))}
              <span className="text-gray-600 text-sm ml-1">{tour.rating}</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[tour.difficulty]}`}>
                {tour.difficulty}
              </span>
            </div>
          </div>
          <div className="p-2 bg-primary-500/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary-500" />
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {tour.shortDescription || tour.description}
        </p>

        {/* Highlight */}
        {tour.highlight && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
            <div className="flex items-start gap-2">
              <Flag className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-yellow-800 font-medium">{tour.highlight}</span>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-primary-500" />
            <span className="text-sm">{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-primary-500" />
            <span className="text-sm">{tour.region}</span>
          </div>
        </div>

        {/* Tags */}
        {tour.tags && tour.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tour.tags.slice(0, 4).map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button */}
       <button
        onClick={onExploreClick} // Use the passed handler
        className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-medium rounded-xl hover:from-primary-600 hover:to-orange-600 transition-all duration-300"
      >
        Explore This Tour
      </button>
      </div>
    </div>
  );
}