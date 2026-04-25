import { blogPostsSeed, business, offersSeed, reviewsSeed } from "@/lib/site-data";
import { getSupabaseClient } from "@/lib/supabase";

export async function getOffers() {
  const supabase = getSupabaseClient();
  if (!supabase) return offersSeed;

  const { data } = await supabase
    .from("offers")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (!data?.length) return offersSeed;
  return data.map((item) => ({
    title: String(item.title || "Offer"),
    description: String(item.description || ""),
    validity: String(item.validity || "Limited period")
  }));
}

export async function getReviews() {
  const supabase = getSupabaseClient();
  if (!supabase) return reviewsSeed;

  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (!data?.length) return reviewsSeed;
  return data.map((item) => ({
    name: String(item.name || "Customer"),
    location: String(item.location || business.city),
    rating: Number(item.rating || 5),
    text: String(item.review_text || "")
  }));
}

export async function getBlogPosts() {
  const supabase = getSupabaseClient();
  if (!supabase) return blogPostsSeed;

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(12);

  if (!data?.length) return blogPostsSeed;
  return data.map((item) => ({
    slug: String(item.slug || ""),
    title: String(item.title || ""),
    excerpt: String(item.excerpt || ""),
    category: String(item.category || "Update"),
    publishedAt: String(item.published_at || ""),
    seoTitle: String(item.seo_title || item.title || ""),
    seoDescription: String(item.seo_description || item.excerpt || ""),
    content: [String(item.content || "")]
  }));
}

export async function getRecentInquiries() {
  const supabase = getSupabaseClient(true);
  if (!supabase) return [];

  const { data } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  return (data || []).map((item) => ({
    name: String(item.name || "Visitor"),
    phone: String(item.phone || ""),
    page: String(item.page || ""),
    message: String(item.message || ""),
    createdAt: String(item.created_at || "")
  }));
}

export async function getMediaAssets(options?: {
  usageType?: string;
  categorySlug?: string;
  limit?: number;
  includeInactive?: boolean;
  useServiceRole?: boolean;
}) {
  const supabase = getSupabaseClient(options?.useServiceRole);
  if (!supabase) return [];

  let query = supabase.from("media_assets").select("*").order("created_at", { ascending: false });

  if (!options?.includeInactive) {
    query = query.eq("is_active", true);
  }

  if (options?.usageType) {
    query = query.eq("usage_type", options.usageType);
  }

  if (options?.categorySlug) {
    query = query.eq("category_slug", options.categorySlug);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data } = await query;

  return (data || []).map((item) => ({
    id: String(item.id || ""),
    title: String(item.title || "Aashirwad collection image"),
    imageUrl: String(item.image_url || ""),
    altText: String(item.alt_text || "Aashirwad textile collection image"),
    usageType: String(item.usage_type || "gallery"),
    categorySlug: String(item.category_slug || "")
  }));
}

export async function getSocialLinks(options?: { useServiceRole?: boolean }) {
  const supabase = getSupabaseClient(options?.useServiceRole);
  const defaults = {
    facebook: business.facebook,
    instagram: business.instagram,
    maps: business.directionsUrl
  };

  if (!supabase) return defaults;

  const { data } = await supabase
    .from("social_links")
    .select("*")
    .eq("is_active", true);

  if (!data?.length) return defaults;

  return data.reduce(
    (acc, item) => {
      const platform = String(item.platform || "").toLowerCase();
      const url = String(item.url || "");

      if (platform === "facebook" || platform === "instagram" || platform === "maps") {
        acc[platform] = url || acc[platform];
      }

      return acc;
    },
    { ...defaults }
  );
}
