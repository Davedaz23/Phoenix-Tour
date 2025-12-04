import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: 1,
        tourId: 1,
        customerName: 'John Doe',
        status: 'confirmed',
        date: '2024-03-15'
      }
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Booking created',
      bookingId: Date.now(),
      data: body
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Booking failed' },
      { status: 400 }
    );
  }
}