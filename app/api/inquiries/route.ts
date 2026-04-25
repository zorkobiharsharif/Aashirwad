import { NextResponse } from "next/server";

import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const payload = await request.json();
  const supabase = getSupabaseClient(true);

  if (!supabase) {
    return NextResponse.json(
      { ok: true, saved: false, message: "Supabase not configured yet." },
      { status: 200 }
    );
  }

  const { error } = await supabase.from("inquiries").insert(payload);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved: true });
}
