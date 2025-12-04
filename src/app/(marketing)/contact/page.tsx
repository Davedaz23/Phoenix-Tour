// src/app/(marketing)/contact/page.tsx
'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, MessageCircle, Coffee } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    tourInterest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            GET IN TOUCH
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            <span className="text-gray-900">Contact </span>
            <span className="text-primary-500">Phoenix Tour</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ready to explore Ethiopia? Our Ethiopian team is here to help plan your perfect adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-1 space-y-8">
            {/* Ethiopian Office Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Addis Ababa Office</h3>
                  <p className="text-gray-600">
                    Bole Road, Addis Ababa<br />
                    Ethiopia
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone (Ethiopia)</div>
                    <div className="font-semibold text-gray-900">+251 11 123 4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold text-gray-900">contact@phoenixtour.et</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">WhatsApp</div>
                    <div className="font-semibold text-gray-900">+251 91 234 5678</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Business Hours (EAT)</div>
                    <div className="font-semibold text-gray-900">Mon-Sun: 8AM - 8PM</div>
                  </div>
                </div>
              </div>

              {/* Ethiopian Calendar Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">13-Month Calendar</div>
                    <div className="text-xs text-gray-600">We follow Ethiopia's unique calendar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">24/7 Tour Emergency</h3>
              <p className="mb-6 text-white/90">For urgent assistance during tours anywhere in Ethiopia</p>
              <div className="text-2xl font-bold mb-2">+251 90 111 2233</div>
              <p className="text-sm opacity-90">Available anytime, anywhere in Ethiopia</p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Plan Your Ethiopian Adventure</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
                      placeholder="+251 ___ ___ ___"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Tour Interest *
                    </label>
                    <select
                      name="tourInterest"
                      value={formData.tourInterest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
                    >
                      <option value="">Select a tour type</option>
                      <option value="cultural">Cultural & Historical Tours</option>
                      <option value="adventure">Adventure Expeditions</option>
                      <option value="mountain">Mountain Trekking (Simien/Bale)</option>
                      <option value="danakil">Danakil Depression</option>
                      <option value="omo">Omo Valley Tribal Tours</option>
                      <option value="photography">Photography Tours</option>
                      <option value="custom">Custom Itinerary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
                    placeholder="How can we help you plan your Ethiopian journey?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition resize-none"
                    placeholder="Tell us about your Ethiopian adventure dreams, travel dates, group size, and any special requests..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-orange-600 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message & Start Planning
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Typically respond within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Free consultation included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}