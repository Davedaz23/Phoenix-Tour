// src/components/sections/Hero/Hero.tsx
'use client';

import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('');

  const heroImages = [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w-1200&q=80',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w-1200&q=80'
  ];

  const stats = [
    { label: 'Destinations', value: '50+', icon: MapPin },
    { label: 'Tours Completed', value: '2,500+', icon: Calendar },
    { label: 'Happy Travelers', value: '10,000+', icon: Users }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImages[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 animate-pulse-slow" />

      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-slide-in">
          <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
          <span className="text-white text-sm font-medium">#1 Rated Tour Agency in the Region</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6">
          <span className="text-white">Discover </span>
          <span className="text-primary-500 animate-pulse">Adventures</span>
          <span className="text-white"> That Last Forever</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
          Immerse yourself in breathtaking landscapes, rich cultures, and unforgettable experiences with our expert local guides
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Where do you want to explore?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/30"
            >
              Explore Tours
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-primary-500 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="p-3 bg-primary-500/20 rounded-full">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}