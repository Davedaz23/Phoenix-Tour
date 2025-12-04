// src/app/(marketing)/page.tsx
import Hero from '@/components/sections/Hero/Hero';
import FeaturedTours from '@/components/sections/FeaturedTours';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedTours />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </main>
  );
}