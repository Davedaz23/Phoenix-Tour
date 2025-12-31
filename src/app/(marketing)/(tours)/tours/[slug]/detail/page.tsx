// src/app/(marketing)/(tours)/tours/[slug]/detail/page.tsx
import TourDetailView from '@/components/tours/TourDetailView';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps) {
  // Try to fetch from API
  let tour = null;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${params.slug}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.tour) {
        tour = data.tour;
      }
    }
  } catch (error) {
    console.error('Error fetching tour for metadata:', error);
  }

  if (!tour) {
    return {
      title: 'Tour Details',
      description: 'Explore detailed information about this Ethiopian tour package.',
    };
  }

  return {
    title: `${tour.title} - Detailed Information | Ethiopia Tours`,
    description: tour.description || 'Explore detailed information about this Ethiopian tour.',
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [tour.image],
      type: 'website',
    },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  // Try to fetch from API on server
  let tour = null;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${params.slug}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.tour) {
        tour = data.tour;
      }
    }
  } catch (error) {
    console.error('Error fetching tour:', error);
  }

  return <TourDetailView initialTour={tour} tourId={params.slug} />;
}