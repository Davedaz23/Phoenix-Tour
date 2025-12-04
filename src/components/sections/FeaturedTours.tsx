// src/components/sections/FeaturedTours.tsx
import TourCard from '@/components/tours/TourCard';
import { Compass, Mountain, Castle, Coffee, Sun, MapPin, ArrowRight } from 'lucide-react';

const featuredTours = [
  {
    id: 1,
    title: 'Simien Mountains Trek',
    description: 'Hike through the "Roof of Africa" with endemic wildlife and breathtaking views',
    duration: '3-7 days',
    difficulty: 'Challenging',
    price: 299,
    rating: 4.9,
    category: 'Hiking',
    image: 'https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Wildlife', 'Photography'],
    icon: Mountain,
    highlight: 'See the Gelada monkeys and Ethiopian wolves'
  },
  {
    id: 2,
    title: 'Lalibela Rock-Hewn Churches',
    description: 'Explore the incredible underground churches carved from solid rock',
    duration: '2 days',
    difficulty: 'Easy',
    price: 185,
    rating: 4.8,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Historical', 'Spiritual'],
    icon: Castle,
    highlight: 'Visit St. George\'s Church, the masterpiece'
  },
  {
    id: 3,
    title: 'Danakil Depression Expedition',
    description: 'Witness one of Earth\'s most extreme environments with volcanic landscapes',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 450,
    rating: 4.9,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Volcano', 'Extreme', 'Unique'],
    icon: Sun,
    highlight: 'See the colorful sulfur springs and lava lake'
  },
  {
    id: 4,
    title: 'Coffee Origin Tour',
    description: 'Follow the coffee journey from farm to cup in the birthplace of coffee',
    duration: '1 day',
    difficulty: 'Easy',
    price: 75,
    rating: 4.7,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    tags: ['Coffee', 'Food', 'Traditional'],
    icon: Coffee,
    highlight: 'Participate in traditional coffee ceremony'
  },
  {
    id: 5,
    title: 'Omo Valley Tribes',
    description: 'Cultural immersion with indigenous tribes of Southern Ethiopia',
    duration: '5 days',
    difficulty: 'Moderate',
    price: 520,
    rating: 4.8,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tribal', 'Cultural', 'Photography'],
    icon: Compass,
    highlight: 'Meet the Mursi, Hamer, and Karo tribes'
  },
  {
    id: 6,
    title: 'Blue Nile Falls Trek',
    description: 'Hike to the "Smoking Water" - one of Africa\'s most spectacular waterfalls',
    duration: '1 day',
    difficulty: 'Moderate',
    price: 65,
    rating: 4.6,
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    tags: ['Waterfall', 'Hiking', 'Scenic'],
    icon: MapPin,
    highlight: 'Best visited during rainy season (June-September)'
  }
];

const categories = [
  { name: 'All Tours', count: 18, active: true },
  { name: 'Cultural Heritage', count: 6 },
  { name: 'Mountain Trekking', count: 4 },
  { name: 'Nature & Wildlife', count: 4 },
  { name: 'Adventure', count: 3 },
  { name: 'Coffee Tours', count: 1 }
];

export default function FeaturedTours() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
            <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
            ETHIOPIAN WONDERS
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
          
          {/* Ethiopian Motto */}
          <div className="mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-green-500/10 px-6 py-3 rounded-full border border-yellow-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <span className="font-medium text-gray-700">
              Land of Origins • 13 Months of Sunshine
            </span>
          </div>
        </div>

        {/* Category Filters - Ethiopian Regions */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 border ${category.active 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500' 
                : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
              }`}
            >
              {category.name}
              <span className={`ml-2 text-sm px-2 py-0.5 rounded-full ${category.active 
                ? 'bg-primary-600/30 text-white' 
                : 'bg-gray-100 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tours Grid - 3 columns for better layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* View All Button with Ethiopian touch */}
        <div className="text-center mt-16">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Explore more of Ethiopia's diverse regions
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Northern Historical Route
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Southern Cultural Circuit
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Eastern Desert Adventures
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Western Nature Trails
              </span>
            </div>
          </div>
          
          <a
            href="/tours"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-500 to-yellow-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-yellow-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/30"
          >
            <span>Explore All 18 Ethiopian Tours</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <p className="mt-4 text-gray-500 text-sm">
            All tours led by certified Ethiopian guides • Supporting local communities
          </p>
        </div>
      </div>
    </section>
  );
}