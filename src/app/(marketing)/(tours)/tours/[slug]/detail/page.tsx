import TourDetailView from '@/components/tours/TourDetailView';
import { getTourBySlug } from '@/lib/actions/tour.actions';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps) {
  const tour = await getTourBySlug(params.slug);
  
  if (!tour) {
    return {
      title: 'Tour Not Found',
      description: 'The requested tour could not be found.',
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
  const tour = await getTourBySlug(params.slug);
  
  if (!tour) {
    notFound();
  }

  return <TourDetailView tourId={tour._id} />;
}