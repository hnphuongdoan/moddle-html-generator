import { NextResponse } from 'next/server';
import { prisma } from '../lib/prisma';

// Define a type for the expected body in POST/PUT/DELETE
interface HintRequestBody {
  stage: number;
  text?: string;
}

// ========================================================
// GET /api/hint  → Get all hints
// ========================================================
export async function GET() {
  try {
    const hints = await prisma.hint.findMany({
      orderBy: { stage: 'asc' },
    });
    return NextResponse.json(hints);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ========================================================
// POST /api/hint  → Create a new hint
// ========================================================
export async function POST(request: Request) {
  try {
    const data: HintRequestBody = await request.json();
    const newHint = await prisma.hint.create({
      data: {
        stage: data.stage,
        text: data.text || '',
      },
    });
    return NextResponse.json(newHint, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ========================================================
// PUT /api/hint  → Update an existing hint
// ========================================================
export async function PUT(request: Request) {
  try {
    const data: HintRequestBody = await request.json();
    const updatedHint = await prisma.hint.update({
      where: { stage: data.stage },
      data: { text: data.text },
    });
    return NextResponse.json(updatedHint);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ========================================================
// DELETE /api/hint  → Delete a hint
// ========================================================
export async function DELETE(request: Request) {
  try {
    const data: HintRequestBody = await request.json();
    const deletedHint = await prisma.hint.delete({
      where: { stage: data.stage },
    });
    return NextResponse.json(deletedHint);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
