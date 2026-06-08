import { NextResponse } from "next/server";

/** Optional server-side progress backup when QTC_PROGRESS_STORE is configured */
const store = new Map<string, string>();

export async function POST(request: Request) {
  if (!process.env.QTC_PROGRESS_STORE) {
    return NextResponse.json(
      { error: "Server sync disabled. Use export/import sync code in Academy." },
      { status: 501 },
    );
  }

  const body = (await request.json()) as { code?: string; data?: string };
  if (!body.code || !body.data) {
    return NextResponse.json({ error: "code and data required" }, { status: 400 });
  }
  store.set(body.code, body.data);
  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  if (!process.env.QTC_PROGRESS_STORE) {
    return NextResponse.json(
      { error: "Server sync disabled. Use export/import sync code in Academy." },
      { status: 501 },
    );
  }

  const code = new URL(request.url).searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "code query required" }, { status: 400 });
  }
  const data = store.get(code);
  if (!data) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ data });
}
