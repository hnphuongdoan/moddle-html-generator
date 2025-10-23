import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // mock return
  const output = {
    id,
    html: "<div><h1>Sample HTML Output</h1></div>",
    component: "Tabs",
    theme: "dark",
  };

  if (!output) {
    return NextResponse.json({ error: "Output not found" }, { status: 404 });
  }

  return NextResponse.json(output);
}
