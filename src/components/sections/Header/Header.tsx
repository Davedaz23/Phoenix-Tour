// src/components/sections/Header/Header.tsx (Fixed Version)
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  ChevronDown, 
  Search, 
  User, 
  Globe, 
  BookOpen,
  Camera 
} from 'lucide-react';
import Navigation from './Navigation';
import ApplyTourModal from '@/components/modals/ApplyTourModal';

// Define the type for nav items
interface NavItem {
  label: string;
  href: string;
  dropdown?: Array<{
    label: string;
    href: string;
  }>;
}

interface DropdownItem {
  label: string;
  href: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownHover, setDropdownHover] = useState(false);
  
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // Refs for dropdown containers
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isApplyModalOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isApplyModalOpen]);

  // Define navItems with proper typing
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { 
      label: 'Tours', 
      href: '/tours',
      dropdown: [] // Empty array for now, you can add items later
    },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { 
      label: 'Blog', 
      href: '/blog',
      dropdown: [] // Empty array for now, you can add items later
    }
  ];

  const handleTravelClick = () => {
    setIsApplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
  };

  // Handle mouse enter for parent menu item
  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(label);
    setDropdownHover(true);
  }, []);

  // Handle mouse leave for parent menu item
  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (!dropdownHover) {
        setActiveDropdown(null);
      }
    }, 200); // 200ms delay
  }, [dropdownHover]);

  // Handle dropdown mouse enter
  const handleDropdownMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownHover(true);
  }, []);

  // Handle dropdown mouse leave
  const handleDropdownMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDropdownHover(false);
      setActiveDropdown(null);
    }, 200);
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // FIX: Proper ref callback function for TypeScript
  const setDropdownRef = useCallback((label: string) => (el: HTMLDivElement | null) => {
    dropdownRefs.current[label] = el;
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>📸 New Gallery: Explore Ethiopia's Beauty in Pictures & Videos!</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <select className="bg-transparent border-none outline-none text-white">
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
                <option value="am">አማርኛ</option>
              </select>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+251 (912) 345-6789</span>
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
                <div className="w-14 h-14 relative overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/logos/logo.png"
                    alt="Phoenix Ethiopia Tour Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute -inset-2 bg-primary-500/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-black tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">
                  PHOENIX ETHIOPIA TOUR
                </span>
                <span className="text-xs font-medium text-primary-500 tracking-widest uppercase">
                  DISCOVER ETHIOPIA'S STORIES
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
                  >
                    {item.label === 'Blog' && <BookOpen className="w-4 h-4 mr-1" />}
                    {item.label === 'Gallery' && <Camera className="w-4 h-4 mr-1" />}
                    {item.label}
                    {/* Only show chevron if dropdown exists AND has items */}
                    {item.dropdown && item.dropdown.length > 0 && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown Menu - only render if dropdown exists and has items */}
                  {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.label && (
                    <div 
                      ref={setDropdownRef(item.label)}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      {/* Triangle pointer */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
                      
                      {/* Dropdown items */}
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {subItem.label === 'All Articles' && <BookOpen className="w-3 h-3" />}
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
              
              {/* Gallery Quick Access */}
              <Link
                href="/gallery"
                className="px-4 py-2 bg-purple-50 text-purple-700 font-medium rounded-full hover:bg-purple-100 transition-colors flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Gallery
              </Link>
              
              {/* Blog Quick Access */}
              <Link
                href="/blog"
                className="px-4 py-2 bg-primary-50 text-primary-700 font-medium rounded-full hover:bg-primary-100 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Latest Posts
              </Link>
              
              {/* Travel Button */}
              <button
                onClick={handleTravelClick}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-full hover:from-primary-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30"
              >
                Travel
              </button>
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
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl z-50">
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-gray-100 last:border-0">
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 py-4 text-gray-700 hover:text-primary-500 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label === 'Blog' && <BookOpen className="w-4 h-4" />}
                      {item.label === 'Gallery' && <Camera className="w-4 h-4" />}
                      {item.label}
                    </Link>
                    {item.dropdown && item.dropdown.length > 0 && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="flex items-center gap-2 py-2 text-gray-500 hover:text-primary-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label === 'All Articles' && <BookOpen className="w-3 h-3" />}
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
                  
                  {/* Gallery Mobile Button */}
                  <Link
                    href="/gallery"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-purple-50 text-purple-700 font-medium rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Camera className="w-4 h-4" />
                    Explore Gallery
                  </Link>
                  
                  {/* Blog Mobile Button */}
                  <Link
                    href="/blog"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary-50 text-primary-700 font-medium rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen className="w-4 h-4" />
                    Latest Blog Posts
                  </Link>
                  
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsApplyModalOpen(true);
                    }}
                    className="block w-full text-center py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-orange-600 transition-colors"
                  >
                    Travel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Apply Tour Modal for Header */}
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseModal}
        tour={{
          name: "General Inquiry",
          duration: "Customizable",
          difficulty: "All Levels"
        }}
      />
    </>
  );
}