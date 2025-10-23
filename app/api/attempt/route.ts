import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { playerId, stage, attemptNo, success } = body;

  if (!playerId || !stage || attemptNo === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  return NextResponse.json({
    message: "Attempt recorded",
    data: { playerId, stage, attemptNo, success },
  });
}
