import { NextResponse } from 'next/server';
import { prisma } from '../lib/prisma';

// GET all attempts
export async function GET() {
  const attempts = await prisma.attempt.findMany();
  return NextResponse.json(attempts);
}

// POST a new attempt
export async function POST(req: Request) {
  const data = await req.json();
  const newAttempt = await prisma.attempt.create({
    data: {
      stage: data.stage,
      tries: data.tries,
      success: data.success,
    },
  });
  return NextResponse.json(newAttempt);
}
