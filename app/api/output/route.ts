import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { html, component, theme } = body;

  if (!html || !component) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const saved = {
    id: "out_" + Date.now(),
    html,
    component,
    theme: theme || "light",
  };

  return NextResponse.json({ saved: true, data: saved });
}
