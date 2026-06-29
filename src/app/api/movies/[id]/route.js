import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Only update provided fields (status or rating)
    const updateData = {};
    if (body.status) updateData.status = body.status;
    if (body.rating) updateData.rating = parseInt(body.rating);

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedMovie);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update movie' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.movie.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}
