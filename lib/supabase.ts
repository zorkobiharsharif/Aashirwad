import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      inquiries: { Row: Record<string, Json>; Insert: Record<string, Json> };
      offers: { Row: Record<string, Json>; Insert: Record<string, Json> };
      reviews: { Row: Record<string, Json>; Insert: Record<string, Json> };
      blog_posts: { Row: Record<string, Json>; Insert: Record<string, Json> };
      media_assets: { Row: Record<string, Json>; Insert: Record<string, Json> };
      social_links: { Row: Record<string, Json>; Insert: Record<string, Json> };
    };
  };
};

export function getSupabaseClient(useServiceRole = false): SupabaseClient<Database> | null {
  const url = process.env.SUPABASE_URL;
  const key = useServiceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
