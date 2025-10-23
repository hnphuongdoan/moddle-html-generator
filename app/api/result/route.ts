import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { playerName, stage, score, result } = body;

  if (!playerName || stage === undefined || score === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "Result saved successfully",
    data: { playerName, stage, score, result },
  });
}
