import { NextResponse } from "next/server";

const mockSessions = [
  { id: "1", stage: "Stage 1", description: "Introduction stage" },
  { id: "2", stage: "Stage 2", description: "Logic puzzle stage" },
  { id: "3", stage: "Stage 3", description: "Final escape challenge" },
];

export async function GET() {
  return NextResponse.json({ sessions: mockSessions });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.stage || !body.description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newSession = { id: String(Date.now()), ...body };
  return NextResponse.json({ message: "Session created", session: newSession });
}
