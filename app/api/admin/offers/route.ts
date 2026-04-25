import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { adminCookieName, verifySessionToken } from "@/lib/auth";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const supabase = getSupabaseClient(true);
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  }

  const result = await (supabase as never).from("offers").insert({
    title: payload.title,
    description: payload.description,
    validity: payload.validity,
    is_active: true
  });

  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved: true });
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  const supabase = getSupabaseClient(true);
  if (!supabase || !id) {
    return NextResponse.json({ ok: false, error: "Missing data" }, { status: 400 });
  }

  const result = await (supabase as never).from("offers").delete().eq("id", id);
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deleted: true });
}
