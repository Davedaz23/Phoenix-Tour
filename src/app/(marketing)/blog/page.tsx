// src/app/blog/page.tsx - Blog Listing Page
'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ApplyTourModal from '@/components/modals/ApplyTourModal';
import BlogCategories from '@/components/blog/BlogCategories';
import { 
  Calendar, 
  Eye, 
  Heart, 
  TrendingUp, 
  Coffee, 
  Clock, 
  MapPin, 
  User, 
  Share2, 
  Bookmark, 
  Tag,
  ArrowLeft 
} from 'lucide-react';

// Since we're making this a client component, you'll need to handle metadata differently
// You can wrap this with a server component or use generateMetadata in a layout

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tourDetails = {
    id: 'coffee-culture-001',
    name: 'Coffee Ceremony Cultural Immersion Tour',
    price: 89,
    duration: '3-4 hours',
    difficulty: 'Easy',
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
              alt="Ethiopian Coffee Ceremony"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-8 left-8 z-20">
            <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full">
              <Coffee className="w-4 h-4" />
              <span className="text-sm font-semibold">FEATURED BLOG</span>
            </div>
          </div>

          {/* Article Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-8">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                Coffee Ceremony: Ethiopia's Soul in a Cup
              </h1>
              
              {/* Author & Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Selam Mekonnen</div>
                    <div className="text-xs opacity-80">Local Guide & Cultural Expert</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-3 h-3" />
                    <span>Nov 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>Addis Ababa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Left Column - Categories & Featured */}
              <div className="lg:col-span-1">
                <BlogCategories />
                
                {/* Featured Post */}
                <div className="bg-gradient-to-br from-primary-50 to-yellow-50 rounded-2xl p-6 border border-primary-100 mb-8">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                    Trending Now
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="text-sm font-medium text-primary-600">Cultural Insights</div>
                      <div className="font-semibold text-gray-900 text-sm mt-1">Coffee Ceremony: Ethiopia's Soul in a Cup</div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                        <Eye className="w-3 h-3" /> 2.5K views
                      </div>
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg">
                      <div className="text-sm font-medium text-primary-600">Travel Tips</div>
                      <div className="font-semibold text-gray-900 text-sm mt-1">Best Time to Visit Lalibela</div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                        <Heart className="w-3 h-3" /> 156 likes
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Blog Content */}
              <div className="lg:col-span-3">
                {/* Stats Bar */}
                <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group">
                      <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:scale-110 transition-all" />
                      <span className="font-semibold">2.5K</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <Eye className="w-5 h-5" />
                      <span className="font-semibold">15.7K</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">Tags:</span>
                    <div className="flex gap-2">
                      {['Coffee Culture', 'Ethiopian Traditions', 'Cultural Rituals', 'Local Experience'].map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <article className="prose prose-lg max-w-none">
                  {/* Introduction */}
                  <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                    In Ethiopia, coffee is more than just a beverage—it's a spiritual journey, a social ritual, 
                    and a timeless tradition that connects generations. The coffee ceremony, or <em>Bunna</em>, 
                    is the heartbeat of Ethiopian culture, inviting you to slow down, connect, and savor the moment.
                  </p>
                  
                  <div className="relative my-8 p-6 bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl border-l-4 border-primary-500">
                    <Coffee className="absolute -top-3 -left-3 w-6 h-6 text-primary-500 bg-white p-1 rounded-lg" />
                    <blockquote className="text-lg italic text-gray-800 pl-4">
                      "When coffee is poured from the <em>jebena</em>, it's not just a drink being served—it's 
                      hospitality, respect, and community being shared one cup at a time."
                    </blockquote>
                  </div>

                  {/* Section 1 */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      The Three-Round Ritual: A Journey of Transformation
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {[
                        {
                          title: 'Abol (First Round)',
                          desc: 'Strongest brew, representing life\'s challenges',
                          color: 'bg-yellow-500'
                        },
                        {
                          title: 'Tona (Second Round)',
                          desc: 'Milder taste, symbolizing reconciliation',
                          color: 'bg-orange-500'
                        },
                        {
                          title: 'Baraka (Third Round)',
                          desc: 'Lightest round, bringing blessings',
                          color: 'bg-amber-800'
                        }
                      ].map((round, index) => (
                        <div key={round.title} className="relative">
                          <div className={`${round.color} h-2 rounded-t-lg`}></div>
                          <div className="p-4 bg-white rounded-b-lg border border-gray-200 shadow-sm">
                            <div className="text-xl font-bold text-gray-900 mb-1">{round.title}</div>
                            <p className="text-gray-600 text-sm">{round.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Image Gallery */}
                  <div className="mb-8 grid grid-cols-2 gap-4">
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=800&q=80"
                        alt="Coffee roasting process"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80"
                        alt="Pouring coffee from jebena"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Section 2 */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">The Art of Preparation</h2>
                    
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Traditional Tools</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { name: 'Jebena', desc: 'Clay coffee pot with spherical base' },
                          { name: 'Mukecha & Zenezena', desc: 'Mortar and pestle for grinding' },
                          { name: 'Sini', desc: 'Small handleless cups' },
                          { name: 'Medeb', desc: 'Incense burner for frankincense' }
                        ].map((tool) => (
                          <div key={tool.name} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Coffee className="w-3 h-3 text-primary-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm">{tool.name}</div>
                              <div className="text-xs text-gray-600">{tool.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Cultural Significance */}
                  <section className="mb-8 bg-gradient-to-br from-primary-500 to-yellow-500 rounded-xl p-6 text-white">
                    <h2 className="text-2xl font-heading font-bold mb-4">Cultural Significance</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Social Bonds</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Resolving conflicts and building community
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Celebrating important life events
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Daily social interaction and hospitality
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Spiritual Meaning</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Offering prayers and blessings
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Connecting with ancestors
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Purification and renewal
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Tips for Visitors */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Experience It Yourself</h2>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Coffee className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Visitor Etiquette Tips</h3>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">✓</div>
                              <p className="text-gray-700 text-sm">Always accept coffee when offered—it's considered rude to refuse</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">✓</div>
                              <p className="text-gray-700 text-sm">Receive the cup with your right hand, palm facing up</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">✓</div>
                              <p className="text-gray-700 text-sm">Sip slowly and savor each round—the ceremony can last 1-2 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </article>

                {/* CTA Section */}
                <div className="mt-12 p-8 bg-gradient-to-r from-primary-500 to-yellow-500 rounded-2xl text-white text-center">
                  <h2 className="text-2xl font-heading font-bold mb-3">
                    Ready to Experience the Real Ethiopia?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Join our cultural immersion tours and experience the coffee ceremony firsthand with local families.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Apply To Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <ApplyTourModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tour={tourDetails}
      />
    </>
  );
}