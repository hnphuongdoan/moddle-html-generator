import { NextResponse } from "next/server";

const hints = {
  1: "Look closely at the sequence 👀",
  2: "Try reversing the logic 🤔",
  3: "The final code is hidden in plain sight 💡",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stage = searchParams.get("stage");

  if (!stage) {
    return NextResponse.json({ error: "Missing stage parameter" }, { status: 400 });
  }

  const hint = hints[Number(stage) as keyof typeof hints] || "No hint available";
  return NextResponse.json({ stage, hint });
}
