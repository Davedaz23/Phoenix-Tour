'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  MapPin,
  Phone,
  ChevronDown,
  Search,
  Camera,
  Globe,
  BookOpen,
  Building,
  Mountain,
  Compass,
  Sun,
  Trees
} from 'lucide-react';
import ApplyTourModal from '@/components/modals/ApplyTourModal';
import Logo from '@/components/ui/logo';

// Define the type for nav items
interface NavItem {
  label: string;
  href: string;
  dropdown?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Refs for dropdown containers
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

  // Define navItems with Destinations dropdown
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'Destinations',
      href: '/destinations',
      dropdown: [
        { label: 'Addis Ababa', href: '/destinations/addis-ababa', icon: <Building className="w-3 h-3" /> },
        { label: 'Northern Circuit', href: '/destinations/northern-circuit', icon: <Mountain className="w-3 h-3" /> },
        { label: 'Southern Circuit', href: '/destinations/southern-circuit', icon: <Compass className="w-3 h-3" /> },
        { label: 'Eastern (Harar)', href: '/destinations/eastern-harar', icon: <Sun className="w-3 h-3" /> },
        { label: 'Western (Gambella)', href: '/destinations/western-gambella', icon: <Trees className="w-3 h-3" /> }
      ]
    },
    {
      label: 'Tours',
      href: '/tours',
      dropdown: [
        { label: 'Ethiopia Highlights', href: '/tours?category=Ethiopia Highlights' },
        { label: 'Historical Tours', href: '/tours?category=Historical Tours' },
        { label: 'Cultural Tours', href: '/tours?category=Cultural Tours' },
        { label: 'Nature & Trekking', href: '/tours?category=Nature & Trekking' },
        { label: 'Adventure', href: '/tours?category=Adventure' },
        { label: 'Day Trips', href: '/tours?category=Day Trips' }
      ]
    },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    {
      label: 'Blog',
      href: '/blog',
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
      timeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  // Handle mouse leave for parent menu item
  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  // Handle dropdown mouse enter
  const handleDropdownMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Handle dropdown mouse leave
  const handleDropdownMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside any dropdown
      const isOutside = Object.values(dropdownRefs.current).every(ref => {
        return ref && !ref.contains(event.target as Node);
      });

      // Check if click is outside any nav item with dropdown
      const isOutsideNavItems = Object.values(navItemRefs.current).every(ref => {
        return ref && !ref.contains(event.target as Node);
      });
      
      if (isOutside && isOutsideNavItems) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Refs for dropdown containers
  const setDropdownRef = useCallback((label: string) => (el: HTMLDivElement | null) => {
    dropdownRefs.current[label] = el;
  }, []);

  // Refs for nav items
  const setNavItemRef = useCallback((label: string) => (el: HTMLDivElement | null) => {
    navItemRefs.current[label] = el;
  }, []);

  // Handle nav item click (for mobile/tablet)
  const handleNavItemClick = useCallback((label: string) => {
    if (window.innerWidth < 1024) {
      setActiveDropdown(activeDropdown === label ? null : label);
    }
  }, [activeDropdown]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-orange-600 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>📸 New Gallery: Explore Ethiopia&apos;s Beauty in Pictures & Videos!</span>
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
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative group"
                  ref={setNavItemRef(item.label)}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
                  >
                    {item.label === 'Blog' && <BookOpen className="w-4 h-4 mr-1" />}
                    {item.label === 'Destinations' && <MapPin className="w-4 h-4 mr-1" />}
                    {item.label}
                    {item.dropdown && item.dropdown.length > 0 && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
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
                          {subItem.icon && subItem.icon}
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
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              
              <Link
                href="/gallery"
                className="px-4 py-2 bg-purple-50 text-purple-700 font-medium rounded-full hover:bg-purple-100 transition-colors flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Gallery
              </Link>
              
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
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 py-4 text-gray-700 hover:text-primary-500 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label === 'Blog' && <BookOpen className="w-4 h-4" />}
                        {item.label === 'Destinations' && <MapPin className="w-4 h-4" />}
                        {item.label}
                      </Link>
                      {item.dropdown && item.dropdown.length > 0 && (
                        <button
                          onClick={() => handleNavItemClick(item.label)}
                          className="p-2"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`} />
                        </button>
                      )}
                    </div>
                    
                    {/* Mobile Dropdown */}
                    {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.label && (
                      <div className="pl-4 pb-2 space-y-1 animate-slideDown">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="flex items-center gap-2 py-2 text-gray-500 hover:text-primary-500 pl-4 border-l-2 border-gray-200"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.icon && subItem.icon}
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
                  
                  <Link
                    href="/gallery"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-purple-50 text-purple-700 font-medium rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Camera className="w-4 h-4" />
                    Explore Gallery
                  </Link>
                  
                  <Link
                    href="/destinations"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-50 text-blue-700 font-medium rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MapPin className="w-4 h-4" />
                    Browse Destinations
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

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
}