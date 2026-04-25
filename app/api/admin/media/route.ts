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
    return NextResponse.json({ ok: true, saved: false, previewOnly: true });
  }

  const { error } = await supabase.from("media_assets").insert({
    title: payload.title,
    image_url: payload.image_url,
    alt_text: payload.alt_text,
    usage_type: payload.usage_type,
    category_slug: payload.category_slug,
    is_active: true
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
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
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing media id" }, { status: 400 });
  }

  const supabase = getSupabaseClient(true);

  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 500 });
  }

  const { error } = await supabase.from("media_assets").update({ is_active: false }).eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deleted: true });
}
