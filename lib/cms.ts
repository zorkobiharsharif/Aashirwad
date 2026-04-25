import { blogPostsSeed, business, offersSeed, reviewsSeed } from "@/lib/site-data";
import { getSupabaseClient } from "@/lib/supabase";

const homepageDefaults = {
  heroEyebrow: "Since 1999 | One trusted store in Bihar Sharif",
  heroTitle: "A premium family textile store for Bihar Sharif and nearby towns.",
  heroDescription:
    "Aashirwad brings sarees, bridal collection, ladies suits, shirting, and suiting together in one trusted store. Families visit from Bihar Sharif, Harnaut, Barbigha, Rajgir, Asthawan, Nalanda, Pawapuri, and nearby areas for dependable shopping and a warm in-store experience.",
  legacyTitle: "A trusted store in Bihar Sharif.",
  legacyDescription:
    "Aashirwad has one physical store in Bihar Sharif, but customers come from many areas for wedding shopping, festive sarees, ladies suits, and dependable family service. That local trust is the real brand advantage, and this website is designed to turn it into more store visits and inquiries."
};

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

export async function getBlogPostBySlug(slug: string) {
  const supabase = getSupabaseClient();
  if (!supabase) return blogPostsSeed.find((post) => post.slug === slug) || null;

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) {
    return blogPostsSeed.find((post) => post.slug === slug) || null;
  }

  return {
    slug: String(data.slug || ""),
    title: String(data.title || ""),
    excerpt: String(data.excerpt || ""),
    category: String(data.category || "Update"),
    publishedAt: String(data.published_at || ""),
    seoTitle: String(data.seo_title || data.title || ""),
    seoDescription: String(data.seo_description || data.excerpt || ""),
    content: String(data.content || "")
      .split("\n\n")
      .filter(Boolean)
  };
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

export async function getHomepageSettings(options?: { useServiceRole?: boolean }) {
  const supabase = getSupabaseClient(options?.useServiceRole);
  if (!supabase) return homepageDefaults;

  const { data } = await supabase
    .from("social_links")
    .select("*")
    .in("platform", [
      "homepage_hero_eyebrow",
      "homepage_hero_title",
      "homepage_hero_description",
      "homepage_legacy_title",
      "homepage_legacy_description"
    ])
    .eq("is_active", true);

  if (!data?.length) return homepageDefaults;

  const map = new Map(data.map((item) => [String(item.platform), String(item.url || "")]));

  return {
    heroEyebrow: map.get("homepage_hero_eyebrow") || homepageDefaults.heroEyebrow,
    heroTitle: map.get("homepage_hero_title") || homepageDefaults.heroTitle,
    heroDescription:
      map.get("homepage_hero_description") || homepageDefaults.heroDescription,
    legacyTitle: map.get("homepage_legacy_title") || homepageDefaults.legacyTitle,
    legacyDescription:
      map.get("homepage_legacy_description") || homepageDefaults.legacyDescription
  };
}

export async function getAdminOffers() {
  const supabase = getSupabaseClient(true);
  if (!supabase) return offersSeed.map((offer, index) => ({ id: `seed-offer-${index}`, ...offer }));

  const { data } = await supabase
    .from("offers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  return (data || []).map((item) => ({
    id: String(item.id || ""),
    title: String(item.title || ""),
    description: String(item.description || ""),
    validity: String(item.validity || ""),
    isActive: Boolean(item.is_active ?? true)
  }));
}

export async function getAdminReviews() {
  const supabase = getSupabaseClient(true);
  if (!supabase) {
    return reviewsSeed.map((review, index) => ({ id: `seed-review-${index}`, ...review, isApproved: true }));
  }

  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  return (data || []).map((item) => ({
    id: String(item.id || ""),
    name: String(item.name || ""),
    location: String(item.location || ""),
    rating: Number(item.rating || 5),
    text: String(item.review_text || ""),
    isApproved: Boolean(item.is_approved ?? true)
  }));
}

export async function getAdminBlogPosts() {
  const supabase = getSupabaseClient(true);
  if (!supabase) {
    return blogPostsSeed.map((post) => ({ ...post, id: post.slug, isPublished: true }));
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  return (data || []).map((item) => ({
    id: String(item.id || ""),
    slug: String(item.slug || ""),
    title: String(item.title || ""),
    excerpt: String(item.excerpt || ""),
    category: String(item.category || ""),
    seoTitle: String(item.seo_title || ""),
    seoDescription: String(item.seo_description || ""),
    content: String(item.content || ""),
    isPublished: Boolean(item.is_published ?? false)
  }));
}
