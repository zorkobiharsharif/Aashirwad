import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

type TableShape = {
  Row: Record<string, Json>;
  Insert: Record<string, Json>;
  Update: Record<string, Json>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      inquiries: TableShape;
      offers: TableShape;
      reviews: TableShape;
      blog_posts: TableShape;
      media_assets: TableShape;
      social_links: TableShape;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
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
