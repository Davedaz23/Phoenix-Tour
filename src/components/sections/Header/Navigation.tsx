// src/components/sections/Header/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Map, Users, Info, Phone } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Compass },
  { label: 'Tours', href: '/tours', icon: Map },
  // { label: 'Guides', href: '/guides', icon: Users },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Phone },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || 
          (item.href !== '/' && pathname?.startsWith(item.href));
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-lg shadow-primary-500/30'
                : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}