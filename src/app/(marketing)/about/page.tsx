// src/app/(marketing)/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
              <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
              OUR ETHIOPIAN STORY
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gray-900">About </span>
              <span className="text-primary-500">Phoenix Tour</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your trusted partner for authentic Ethiopian travel experiences since 2010
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=1200&q=80)'
              }}></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white z-20">
                <h2 className="text-2xl font-bold">Land of Origins • 13 Months of Sunshine</h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-gray-700 mb-4">
                    At Phoenix Tour, we believe in creating meaningful connections between travelers 
                    and Ethiopia's rich cultural heritage. We're not just tour guides; we're storytellers, 
                    cultural ambassadors, and passionate advocates for sustainable tourism.
                  </p>
                  <p className="text-gray-700">
                    Our motto <strong>"Take Memories, Leave Footprints"</strong> reflects our commitment to responsible 
                    tourism that benefits local communities while providing unforgettable experiences.
                  </p>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">100% Ethiopian guides with deep local knowledge</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Sustainable tourism supporting local communities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Authentic cultural experiences beyond tourist trails</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                  <p className="text-gray-700 mb-4">
                    Founded in 2010 by a group of passionate Ethiopian guides, Phoenix Tour began with 
                    a simple mission: to share the true beauty of Ethiopia with the world.
                  </p>
                  <p className="text-gray-700 mb-4">
                    What started as small group tours to the Simien Mountains has grown into one of 
                    Ethiopia's most respected tour operators, offering experiences across all major regions.
                  </p>
                  <p className="text-gray-700">
                    Today, we're proud to have introduced thousands of travelers to Ethiopia's wonders 
                    while directly supporting over 50 local communities through our tourism initiatives.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">By the Numbers</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold mb-1">14+</div>
                      <div className="text-sm opacity-90">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">10,000+</div>
                      <div className="text-sm opacity-90">Travelers Served</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">50+</div>
                      <div className="text-sm opacity-90">Local Guides</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">98%</div>
                      <div className="text-sm opacity-90">Satisfaction Rate</div>
                    </div>
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