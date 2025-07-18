import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  const data = await req.json();

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
    console.error(await res.text());
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok' });
}
