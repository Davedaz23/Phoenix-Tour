import { NextRequest, NextResponse } from 'next/server';

const mockTours = [
  {
    id: 1,
    title: 'Simien Mountains Trek',
    category: 'Mountain Trekking',
    price: 299,
    duration: '3-7 days'
  },
  {
    id: 2,
    title: 'Lalibela Rock-Hewn Churches',
    category: 'Cultural Heritage',
    price: 185,
    duration: '2-3 days'
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  
  const filteredTours = category 
    ? mockTours.filter(tour => tour.category === category)
    : mockTours;

  return NextResponse.json({
    success: true,
    data: filteredTours,
    total: filteredTours.length
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Tour created successfully',
      data: { id: Date.now(), ...body }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tour' },
      { status: 500 }
    );
  }
}