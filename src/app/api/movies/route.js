import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, genre, posterUrl, status, rating } = body;

    const movie = await prisma.movie.create({
      data: {
        title,
        genre,
        posterUrl,
        status,
        rating: parseInt(rating),
      },
    });
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}
