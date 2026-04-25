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

  const keys = [
    "homepage_hero_eyebrow",
    "homepage_hero_title",
    "homepage_hero_description",
    "homepage_legacy_title",
    "homepage_legacy_description"
  ];

  const deleteResult = await (supabase as never).from("social_links").delete().in("platform", keys);
  if (deleteResult.error) {
    return NextResponse.json({ ok: false, error: deleteResult.error.message }, { status: 500 });
  }

  const values = [
    { platform: "homepage_hero_eyebrow", url: payload.heroEyebrow, is_active: true },
    { platform: "homepage_hero_title", url: payload.heroTitle, is_active: true },
    { platform: "homepage_hero_description", url: payload.heroDescription, is_active: true },
    { platform: "homepage_legacy_title", url: payload.legacyTitle, is_active: true },
    { platform: "homepage_legacy_description", url: payload.legacyDescription, is_active: true }
  ];

  const insertResult = await (supabase as never).from("social_links").insert(values);
  if (insertResult.error) {
    return NextResponse.json({ ok: false, error: insertResult.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved: true });
}
