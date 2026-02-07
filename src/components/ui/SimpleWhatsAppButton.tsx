// src/components/ui/SimpleWhatsAppButton.tsx
'use client';

import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SimpleWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovered, setHovered] = useState(false);

  const whatsappNumber = '+251912345678';
  const message = encodeURIComponent('Hello! I saw your website and have questions about Ethiopian tours.');

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'bottom-6 opacity-100' : 'bottom-0 opacity-0'
        } right-6`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main Button */}
        <div className="relative">
          {/* Pulsing effect */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          
          {/* Button */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-700 shadow-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-110 hover:shadow-3xl group">
            <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            
            {/* Ethiopian flag badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white p-0.5 shadow-md">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-green-500"></div>
                <div className="absolute top-1/3 left-0 w-full h-1/3 bg-yellow-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-red-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          <div className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 ${
            hovered ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-200 pointer-events-none`}>
            <div className="bg-gray-900 text-white text-sm font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </div>
              {/* Arrow */}
              <div className="absolute top-1/2 left-full transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-900"></div>
              </div>
            </div>
          </div>

          {/* Unread indicator */}
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">1</span>
              </div>
            </div>
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </>
  );
}