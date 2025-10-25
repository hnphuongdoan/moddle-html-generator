import { NextResponse } from 'next/server';
import { prisma } from '../lib/prisma';
import { logEvent } from '@/app/lib/logger';

// ✅ GET all sessions
export async function GET() {
  const sessions = await prisma.session.findMany();
  return NextResponse.json(sessions);
}

// ✅ POST a new session (with instrumentation)
export async function POST(req: Request) {
  const data = await req.json();

  // Add instrumentation log
  logEvent("New session created", data);

  const newSession = await prisma.session.create({
    data: {
      name: data.name,
      stage: data.stage,
      description: data.description,
      questions: data.questions,
    },
  });

  return NextResponse.json(newSession);
}
