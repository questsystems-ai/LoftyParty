import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Received RSVP:", data);

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rsvps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({
      ...data,
      submitted_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Supabase insert failed:", error);
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok' });
}
