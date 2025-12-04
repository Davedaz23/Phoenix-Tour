// src/components/sections/Header/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MapPin, Phone, ChevronDown, Search, User, Globe } from 'lucide-react';
import Navigation from './Navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours', dropdown: [
      { label: 'Adventure Tours', href: '/tours/adventure' },
      { label: 'Cultural Tours', href: '/tours/cultural' },
      { label: 'Nature Walks', href: '/tours/nature' },
      { label: 'Beach Escapes', href: '/tours/beach' }
    ]},
    { label: 'Destinations', href: '/destinations', dropdown: [
      { label: 'Mountain Regions', href: '/destinations/mountains' },
      { label: 'Coastal Areas', href: '/destinations/coastal' },
      { label: 'Historical Sites', href: '/destinations/historical' },
      { label: 'Wildlife Sanctuaries', href: '/destinations/wildlife' }
    ]},
    { label: 'About Us', href: '/about' },
    { label: 'Guides', href: '/guides' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>🔥 Limited Time Offer: Get 20% off on all mountain tours!</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <select className="bg-transparent border-none outline-none text-white">
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
              </select>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary-100' 
          : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Logo Image */}
                <div className="w-14 h-14 relative overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                  {/* Fallback if logo doesn't exist */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">PT</span>
                  </div> */}
                  {/* Real logo - uncomment when you have the image */}
                  <Image
                    src="/images/logos/logo.png"
                    alt="Phoenix Tour Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-primary-500/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-black tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">
                  PHOENIX TOUR
                </span>
                <span className="text-xs font-medium text-primary-500 tracking-widest uppercase">
                  TAKE MEMORIES, LEAVE FOOTPRINTS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-slideIn">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search */}
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* User Account */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
                <User className="w-4 h-4" />
                <span className="font-medium">Account</span>
              </button>
              
              {/* Book Now Button */}
              <Link
                href="/booking"
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-full hover:from-primary-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl animate-slideDown">
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-gray-100 last:border-0">
                    <Link
                      href={item.href}
                      className="block py-4 text-gray-700 hover:text-primary-500 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block py-2 text-gray-500 hover:text-primary-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Actions */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-50 text-gray-700">
                    <Search className="w-4 h-4" />
                    <span>Search Tours</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary-50 text-primary-600">
                    <User className="w-4 h-4" />
                    <span>My Account</span>
                  </button>
                  <Link
                    href="/booking"
                    className="block w-full text-center py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-orange-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}