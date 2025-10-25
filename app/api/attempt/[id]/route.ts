import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const record = await prisma.attempt.findUnique({ where: { id } });
  return NextResponse.json(record);
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const data = await request.json();
  const updated = await prisma.attempt.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const deleted = await prisma.attempt.delete({ where: { id } });
  return NextResponse.json(deleted);
}
