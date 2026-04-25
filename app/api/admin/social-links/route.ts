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

  const values = [
    { platform: "facebook", url: payload.facebook, is_active: true },
    { platform: "instagram", url: payload.instagram, is_active: true },
    { platform: "maps", url: payload.maps, is_active: true }
  ];

  const deleteResult = await (supabase as never)
    .from("social_links")
    .delete()
    .in("platform", ["facebook", "instagram", "maps"]);

  if (deleteResult.error) {
    return NextResponse.json({ ok: false, error: deleteResult.error.message }, { status: 500 });
  }

  const insertResult = await (supabase as never).from("social_links").insert(values);

  if (insertResult.error) {
    return NextResponse.json({ ok: false, error: insertResult.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved: true });
}
