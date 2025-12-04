// src/app/(marketing)/tours/page.tsx
import TourCard from '@/components/tours/TourCard';
import { Filter, MapPin, Calendar, TrendingUp, Mountain, Castle, Sun, Compass, Trees, Church } from 'lucide-react';

const allTours = [
  {
    id: 1,
    title: 'Simien Mountains Trek',
    description: 'Hike through the "Roof of Africa" with endemic wildlife and breathtaking views',
    duration: '3-7 days',
    difficulty: 'Challenging',
    price: 299,
    rating: 4.9,
    category: 'Mountain Trekking',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Wildlife', 'Photography', 'Camping'],
    highlight: 'See the Gelada monkeys and Ethiopian wolves',
    icon: Mountain
  },
  {
    id: 2,
    title: 'Lalibela Rock-Hewn Churches',
    description: 'Explore the incredible underground churches carved from solid rock',
    duration: '2-3 days',
    difficulty: 'Easy',
    price: 185,
    rating: 4.8,
    category: 'Cultural Heritage',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Historical', 'Spiritual', 'Architecture'],
    highlight: 'Visit St. George\'s Church, the masterpiece',
    icon: Castle
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
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Volcano', 'Extreme', 'Unique', 'Geology'],
    highlight: 'See the colorful sulfur springs and lava lake',
    icon: Sun
  },
  {
    id: 4,
    title: 'Omo Valley Cultural Tour',
    description: 'Cultural immersion with indigenous tribes of Southern Ethiopia',
    duration: '5-7 days',
    difficulty: 'Moderate',
    price: 520,
    rating: 4.8,
    category: 'Cultural Heritage',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tribal', 'Cultural', 'Photography', 'Anthropology'],
    highlight: 'Meet the Mursi, Hamer, and Karo tribes',
    icon: Compass
  },
  {
    id: 5,
    title: 'Bale Mountains National Park',
    description: 'Explore Ethiopia\'s largest Afro-alpine habitat with unique wildlife',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 380,
    rating: 4.7,
    category: 'Wildlife',
    region: 'Southeastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    tags: ['Wildlife', 'Hiking', 'Nature', 'Birdwatching'],
    highlight: 'Spot the Ethiopian wolf and mountain nyala',
    icon: Trees
  },
  {
    id: 6,
    title: 'Axum & Tigray Churches',
    description: 'Discover ancient kingdoms and rock-hewn churches of Tigray',
    duration: '3 days',
    difficulty: 'Easy',
    price: 220,
    rating: 4.6,
    category: 'Historical',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    tags: ['Historical', 'Archaeology', 'UNESCO', 'Religious'],
    highlight: 'See the ancient obelisks of Axum',
    icon: Church
  }
];

const categories = [
  { name: 'All Tours', count: 18 },
  { name: 'Cultural Heritage', count: 6 },
  { name: 'Mountain Trekking', count: 4 },
  { name: 'Adventure', count: 3 },
  { name: 'Wildlife', count: 3 },
  { name: 'Historical', count: 2 }
];

const regions = [
  'Northern Ethiopia',
  'Southern Ethiopia', 
  'Eastern Ethiopia',
  'Western Ethiopia',
  'Central Ethiopia'
];

export default function ToursPage() {
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
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search tours by destination, activity, or region..."
                    className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300">
                  <Filter className="w-5 h-5" />
                  Filter
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
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Tours
              </h3>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border border-gray-300 rounded"></div>
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </label>
                  ))}
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
                    <label key={region} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      <span className="text-gray-700">{region}</span>
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
                  {['1-3 days', '4-7 days', '8-14 days', '15+ days'].map((duration) => (
                    <label key={duration} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      <span className="text-gray-700">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Difficulty
                </h4>
                <div className="space-y-2">
                  {[
                    { label: 'Easy', color: 'bg-green-100 text-green-800' },
                    { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' },
                    { label: 'Challenging', color: 'bg-red-100 text-red-800' }
                  ].map((difficulty) => (
                    <label key={difficulty.label} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      <span className="text-gray-700">{difficulty.label}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficulty.color}`}>
                        {difficulty.label}
                      </span>
                    </label>
                  ))}
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
                  <p className="text-gray-600">Showing {allTours.length} of 18 tours</p>
                </div>
                <div className="flex items-center gap-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Sort by: Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl p-8 border border-primary-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Tour?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our Ethiopian experts can create a personalized itinerary tailored to your interests, 
                  timeline, and budget. Contact us for a free consultation.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300"
                >
                  Request Custom Tour
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}