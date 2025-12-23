// src/components/sections/Footer.tsx
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Shield, 
  Award, 
  Coffee,
  Heart,
  Calendar,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Brand & Contact */}
          <div className="space-y-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold">Phoenix Ethiopia Tour</h3>
                  <p className="text-gray-400 text-sm">Authentic Ethiopian Adventures Since 2010</p>
                </div>
              </div>
              <p className="text-gray-300 max-w-md">
                We create transformative travel experiences that connect you with Ethiopia's rich 
                heritage, breathtaking landscapes, and vibrant cultures.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-500" />
                Contact Our Local Team
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>Bole Road, Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>+251 11 123 4567 (Office)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MessageCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>+251 91 234 5678 (WhatsApp)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>tours@phoenixtourethiopia.et</span>
                </div>
              </div>
            </div>

            {/* Trust Badges - Secondary Tasks */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-3">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">Award Winning</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm">100% Safe</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-3">
                <Globe className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Local Experts</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-3">
                <Coffee className="w-5 h-5 text-orange-500" />
                <span className="text-sm">Ethiopian Owned</span>
              </div>
            </div>
          </div>

          {/* Right Column: Navigation & Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Quick Links - Doormat Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-500">Quick Links</h4>
              <ul className="space-y-3">
                {[ 'Tours', 'Blog', 'About Us', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-300 hover:text-primary-500 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tour Categories - Sitemap Lite */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary-500">Tour Types</h4>
              <ul className="space-y-3">
                {['Cultural Heritage', 'Mountain Trekking', 'Historical Routes', 'Wildlife Safari', 'Festival Tours', 'Custom Tours'].map((category) => (
                  <li key={category}>
                    <div 
                    //   href={`/tours?category=${category.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-300 hover:text-primary-500 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {category}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social - Customer Engagement */}
            <div className="space-y-6">
              {/* <div>
                <h4 className="text-lg font-semibold mb-4 text-primary-500">Stay Updated</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Get exclusive deals and Ethiopia travel tips
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Subscribe
                  </button>
                </form>
              </div> */}

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-primary-500">Connect With Us</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
                    { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
                    { icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-400' },
                    { icon: Youtube, label: 'YouTube', color: 'hover:bg-red-600' }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300 ${social.color} transition-colors`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Bar: Legal & Utility Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright & Legal */}
          <div className="text-gray-400 text-sm">
            <p>© {currentYear} Phoenix Ethiopia Tour. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/privacy-policy" className="hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-500 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/cookies" className="hover:text-primary-500 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-primary-500 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>

          {/* Ethiopian Elements */}
          <div className="flex flex-wrap items-center gap-6">
            
            {/* Region/Language Selector */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <select className="bg-transparent text-gray-300 text-sm border-none focus:outline-none">
                <option>English</option>
                <option>Amharic (አማርኛ)</option>
              </select>
            </div>

            {/* Ethiopian Calendar */}
            <div className="flex items-center gap-2 bg-primary-500/20 px-3 py-1.5 rounded-lg">
              <Calendar className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-gray-300">Ethiopian Calendar: 2017</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-400">We Accept:</div>
              <div className="flex gap-2">
                {['Visa', 'MasterCard', 'PayPal'].map((method) => (
                  <div key={method} className="px-2 py-1 bg-gray-800 rounded text-xs">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Association Badges */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center mb-4">Proud Member Of:</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[
              'Ethiopian Tourism Association',
              'Sustainable Travel Ethiopia',
              'UNESCO Heritage Partners',
              'African Tourism Board'
            ].map((org) => (
              <div key={org} className="px-4 py-2 bg-gray-800/50 rounded-lg text-sm">
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}