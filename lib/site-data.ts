export type Category = {
  slug: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  highlights: string[];
  audience: string;
  metaTitle: string;
  metaDescription: string;
};

export type LocationPage = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  travelCopy: string;
  reasons: string[];
  metaTitle: string;
  metaDescription: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  content: string[];
};

export type Offer = {
  title: string;
  description: string;
  validity: string;
};

export type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const business = {
  name: "Aashirwad",
  tagline: "Since 1999 | A Family Cloth Store",
  type: "Traditional trusted family textile store",
  addressLine: "Near SBI Bazzar Branch, Post Office Road",
  city: "Bihar Sharif",
  region: "Bihar",
  postalCode: "803101",
  country: "India",
  whatsapp: "+91 9162488280",
  phone: "+91 9835052150",
  hours: "10:00 AM to 8:00 PM",
  directionsUrl: "https://maps.app.goo.gl/kuGK1emnLTeYWNpv6",
  facebook: "https://www.facebook.com/profile.php?id=61564740165781",
  instagram: "https://www.instagram.com/aashirwad.biharsharif/",
  logo: "/logo-aashirwad.png",
  description:
    "Aashirwad is a trusted family cloth store in Bihar Sharif offering sarees, lehengas, bridal collection, ladies suits, shirting, and suiting for families across Bihar Sharif and nearby towns."
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/offers", label: "Offers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export const categories: Category[] = [
  {
    slug: "sarees",
    name: "Sarees",
    shortName: "Sarees",
    headline: "Best Saree Shop in Bihar Sharif",
    description:
      "Explore festive sarees, family-function sarees, elegant everyday drapes, and premium occasion wear chosen for local tastes and lasting value.",
    highlights: ["Festive sarees", "Wedding sarees", "Daily wear options", "Elegant gifting picks"],
    audience: "Women and families looking for trusted variety and in-store guidance.",
    metaTitle: "Best Saree Shop in Bihar Sharif | Aashirwad",
    metaDescription:
      "Visit Aashirwad for sarees in Bihar Sharif. Discover festive, wedding, and daily wear sarees at a trusted family textile store since 1999."
  },
  {
    slug: "lehengas",
    name: "Lehengas",
    shortName: "Lehengas",
    headline: "Lehenga Collection in Bihar Sharif",
    description:
      "Find stylish lehengas for weddings, receptions, engagement functions, and festive celebrations with a premium local-store experience.",
    highlights: ["Wedding lehengas", "Reception styles", "Festive sets", "Family occasion looks"],
    audience: "Brides, relatives, and occasion shoppers from Bihar Sharif and nearby areas.",
    metaTitle: "Lehenga Collection in Bihar Sharif | Aashirwad",
    metaDescription:
      "Shop wedding and festive lehengas in Bihar Sharif at Aashirwad. Trusted family cloth store serving bridal and family shoppers since 1999."
  },
  {
    slug: "bridal-collection",
    name: "Bridal Collection",
    shortName: "Bridal",
    headline: "Bridal Collection in Bihar Sharif",
    description:
      "Aashirwad is the in-store destination for bridal shopping, with lehengas, sarees, and family-event outfits curated for wedding season.",
    highlights: ["Bridal lehengas", "Bridal sarees", "Wedding shopping guidance", "Family set coordination"],
    audience: "Brides and families planning wedding shopping in and around Bihar Sharif.",
    metaTitle: "Bridal Collection in Bihar Sharif | Aashirwad",
    metaDescription:
      "Looking for bridal shopping in Bihar Sharif? Visit Aashirwad for bridal lehengas, sarees, and trusted family guidance for wedding purchases."
  },
  {
    slug: "ladies-suits",
    name: "Ladies Suits",
    shortName: "Ladies Suits",
    headline: "Ladies Suit Shop in Bihar Sharif",
    description:
      "Discover modern and traditional ladies suits for daily wear, festive occasions, and family events in a store known for trust and selection.",
    highlights: ["Daily wear suits", "Festive designs", "Elegant fabrics", "Family occasion options"],
    audience: "City women and nearby-town customers shopping for style with trusted value.",
    metaTitle: "Ladies Suit Shop in Bihar Sharif | Aashirwad",
    metaDescription:
      "Visit Aashirwad for ladies suits in Bihar Sharif. Find festive, modern, and family occasion suit options at a trusted family cloth store."
  },
  {
    slug: "shirting-suiting",
    name: "Shirting & Suiting",
    shortName: "Shirting & Suiting",
    headline: "Shirting and Suiting Store in Bihar Sharif",
    description:
      "A reliable local destination for shirting and suiting fabrics for special occasions, family functions, and smart wardrobe essentials.",
    highlights: ["Occasion shirting", "Suiting fabrics", "Reliable quality", "Family shopping value"],
    audience: "Men and families looking for dependable fabric selections in Bihar Sharif.",
    metaTitle: "Shirting and Suiting in Bihar Sharif | Aashirwad",
    metaDescription:
      "Shop shirting and suiting in Bihar Sharif at Aashirwad. Trusted family textile store with quality fabric options for special occasions."
  }
];

export const locationPages: LocationPage[] = [
  {
    slug: "bihar-sharif",
    name: "Bihar Sharif",
    headline: "Trusted Textile Store in Bihar Sharif",
    description:
      "Aashirwad proudly serves Bihar Sharif families with sarees, bridal wear, ladies suits, and shirting-suiting from one trusted store location.",
    travelCopy: "Our store is centrally placed near SBI Bazzar Branch, Post Office Road, making it easy for Bihar Sharif shoppers to visit anytime from 10 AM to 8 PM.",
    reasons: ["Trusted since 1999", "Bridal and family shopping in one stop", "WhatsApp and call support before visit"],
    metaTitle: "Textile Store in Bihar Sharif | Aashirwad",
    metaDescription:
      "Visit Aashirwad, a trusted textile store in Bihar Sharif for sarees, bridal collection, ladies suits, and shirting-suiting since 1999."
  },
  {
    slug: "harnaut",
    name: "Harnaut",
    headline: "Textile Store Near Harnaut",
    description:
      "Many shoppers from Harnaut visit Aashirwad in Bihar Sharif for wedding shopping, sarees, and trusted family guidance.",
    travelCopy: "If you are coming from Harnaut, Aashirwad is a dependable destination for sarees, bridal looks, ladies suits, and occasion fabrics in Bihar Sharif.",
    reasons: ["Popular for wedding shopping", "Trusted family-store experience", "Easy WhatsApp inquiry before travel"],
    metaTitle: "Textile Store Near Harnaut | Aashirwad Bihar Sharif",
    metaDescription:
      "Coming from Harnaut for textile shopping? Visit Aashirwad in Bihar Sharif for sarees, bridal lehengas, ladies suits, and more."
  },
  {
    slug: "barbigha",
    name: "Barbigha",
    headline: "Best Saree and Bridal Store Near Barbigha",
    description:
      "Aashirwad welcomes customers from Barbigha looking for premium family shopping, bridal collection, and trusted textile choices.",
    travelCopy: "Families from Barbigha can plan saree and bridal shopping at Aashirwad and complete multiple category purchases in one store visit.",
    reasons: ["Good for bridal and festive buying", "Known local-store trust", "One store for family shopping"],
    metaTitle: "Bridal and Saree Shop Near Barbigha | Aashirwad",
    metaDescription:
      "Visit Aashirwad near Barbigha for sarees, bridal collection, ladies suits, and family textile shopping in Bihar Sharif."
  },
  {
    slug: "rajgir",
    name: "Rajgir",
    headline: "Bridal and Saree Shopping Near Rajgir",
    description:
      "Customers from Rajgir choose Aashirwad when they want trusted wedding shopping and elegant textile collections in Bihar Sharif.",
    travelCopy: "Aashirwad is a worthwhile textile destination for Rajgir shoppers who want bridal wear, sarees, ladies suits, and dependable in-store support.",
    reasons: ["Wedding-season friendly", "Rich saree options", "Trusted by nearby families"],
    metaTitle: "Bridal Lehenga and Saree Shop Near Rajgir | Aashirwad",
    metaDescription:
      "Looking for bridal lehenga or sarees near Rajgir? Visit Aashirwad in Bihar Sharif for trusted family textile shopping."
  },
  {
    slug: "asthawan",
    name: "Asthawan",
    headline: "Family Cloth Store Near Asthawan",
    description:
      "Aashirwad serves Asthawan shoppers who want a trusted family cloth store for sarees, suits, and bridal shopping in Bihar Sharif.",
    travelCopy: "Shoppers from Asthawan can call or WhatsApp before visiting and then explore multiple collections in one Bihar Sharif store.",
    reasons: ["Simple visit planning", "Good selection across categories", "Trusted old-store image"],
    metaTitle: "Family Cloth Store Near Asthawan | Aashirwad",
    metaDescription:
      "Visit Aashirwad near Asthawan for sarees, ladies suits, bridal collection, and trusted textile shopping in Bihar Sharif."
  },
  {
    slug: "nalanda",
    name: "Nalanda",
    headline: "Textile and Bridal Shopping Near Nalanda",
    description:
      "For shoppers coming from Nalanda, Aashirwad offers wedding shopping, festive drapes, and trusted family textile choices in Bihar Sharif.",
    travelCopy: "If you are travelling from Nalanda, Aashirwad is a trusted store to explore bridal, saree, and family collections in one visit.",
    reasons: ["Strong family-store credibility", "Bridal and festive buying support", "Easy contact before store visit"],
    metaTitle: "Textile Store Near Nalanda | Aashirwad Bihar Sharif",
    metaDescription:
      "Aashirwad serves Nalanda shoppers with sarees, bridal collection, ladies suits, and shirting-suiting in Bihar Sharif."
  },
  {
    slug: "pawapuri",
    name: "Pawapuri",
    headline: "Saree and Textile Store Near Pawapuri",
    description:
      "Pawapuri shoppers looking for trusted saree and family shopping often visit Aashirwad in Bihar Sharif for quality and guidance.",
    travelCopy: "Aashirwad offers Pawapuri customers a dependable local-store experience for sarees, bridal shopping, and ladies suits.",
    reasons: ["Easy store directions", "Reliable festive shopping", "One-stop store for families"],
    metaTitle: "Saree and Textile Store Near Pawapuri | Aashirwad",
    metaDescription:
      "Visit Aashirwad near Pawapuri for sarees, bridal collection, ladies suits, and trusted textile shopping in Bihar Sharif."
  },
  {
    slug: "bhagan-bigha",
    name: "Bhagan Bigha",
    headline: "Trusted Cloth Store Near Bhagan Bigha",
    description:
      "Aashirwad is a trusted Bihar Sharif destination for Bhagan Bigha shoppers searching for sarees, suits, bridal styles, and family textile value.",
    travelCopy: "Customers from Bhagan Bigha can easily reach Aashirwad in Bihar Sharif and shop across multiple textile categories in one place.",
    reasons: ["Nearby access to Bihar Sharif store", "Trusted family-run identity", "Useful for festive and wedding purchases"],
    metaTitle: "Cloth Store Near Bhagan Bigha | Aashirwad Bihar Sharif",
    metaDescription:
      "Visit Aashirwad near Bhagan Bigha for sarees, bridal shopping, ladies suits, and trusted textile selections in Bihar Sharif."
  }
];

export const gallerySlots = [
  { title: "Wedding Season Arrivals", label: "Owner can replace with bridal photos", tone: "from-[#63101b] via-[#9e1325] to-[#cf8d3d]" },
  { title: "Festive Saree Showcase", label: "Perfect slot for saree collection images", tone: "from-[#240d09] via-[#6e0f1f] to-[#c89b3c]" },
  { title: "Ladies Suit Highlights", label: "Upload latest suit designs from admin", tone: "from-[#542f14] via-[#9e1325] to-[#f6efe3]" },
  { title: "Shirting & Suiting", label: "Use for fabric shelves and premium textures", tone: "from-[#2f1710] via-[#5d0d19] to-[#a07a2b]" }
];

export const offersSeed: Offer[] = [
  {
    title: "Wedding Season Visit Offer",
    description: "Feature seasonal bridal highlights and family shopping guidance here once your first wedding offer is ready.",
    validity: "Editable from owner portal"
  },
  {
    title: "Festive Collection Spotlight",
    description: "Use this area to announce new festive arrivals, limited-time highlights, or family shopping updates.",
    validity: "Editable from owner portal"
  }
];

export const reviewsSeed: Review[] = [
  {
    name: "Editable Review Placeholder",
    location: "Bihar Sharif",
    rating: 5,
    text: "Replace this with a real customer review from Bihar Sharif once available."
  },
  {
    name: "Editable Review Placeholder",
    location: "Rajgir",
    rating: 5,
    text: "This section is ready for real wedding or saree shopping testimonials."
  },
  {
    name: "Editable Review Placeholder",
    location: "Harnaut",
    rating: 5,
    text: "Add only real reviews here for best local SEO trust and review schema quality."
  }
];

export const faqsSeed: FaqItem[] = [
  {
    question: "Where is Aashirwad located?",
    answer: "Aashirwad is located near SBI Bazzar Branch, Post Office Road, Bihar Sharif, Bihar 803101."
  },
  {
    question: "What products are available at Aashirwad?",
    answer: "Aashirwad offers sarees, lehengas, bridal collection, ladies suits, shirting, and suiting."
  },
  {
    question: "Do customers come from nearby towns?",
    answer: "Yes. Many customers visit the Bihar Sharif store from nearby places like Harnaut, Barbigha, Rajgir, Asthawan, Nalanda, Pawapuri, and Bhagan Bigha."
  },
  {
    question: "Can I contact the store before visiting?",
    answer: "Yes. You can call the owner or message on WhatsApp before your store visit."
  }
];

export const blogPostsSeed: BlogPost[] = [
  {
    slug: "best-saree-shop-in-bihar-sharif-guide",
    title: "How to Choose the Best Saree Shop in Bihar Sharif",
    excerpt: "What local families really look for in a trusted saree shopping experience.",
    category: "Sarees",
    publishedAt: "2026-04-25",
    seoTitle: "Best Saree Shop in Bihar Sharif Guide | Aashirwad",
    seoDescription:
      "Learn what to look for in a trusted saree shop in Bihar Sharif, from collection quality to family shopping confidence.",
    content: [
      "For most families, saree shopping is about trust as much as style. Customers want variety, personal guidance, and confidence that the store understands festive and family needs.",
      "Aashirwad focuses on that in-store experience by helping shoppers compare options, match occasions, and shop with the comfort of a trusted family cloth store.",
      "If you are planning a family function, bridal event, or festive purchase in Bihar Sharif, a store visit helps you evaluate quality, color, drape, and finish in person."
    ]
  },
  {
    slug: "bridal-shopping-checklist-bihar-sharif",
    title: "Bridal Shopping Checklist for Bihar Sharif Families",
    excerpt: "A practical bridal shopping checklist for families planning wedding purchases.",
    category: "Bridal",
    publishedAt: "2026-04-25",
    seoTitle: "Bridal Shopping Checklist in Bihar Sharif | Aashirwad",
    seoDescription:
      "Use this bridal shopping checklist before visiting Aashirwad in Bihar Sharif for wedding lehengas, sarees, and family shopping.",
    content: [
      "Start with the main bridal outfit, then shortlist supporting shopping items for family functions and ceremonies.",
      "Keep fabric comfort, event timing, and color coordination in mind when planning your bridal shopping trip.",
      "Aashirwad helps families complete multiple categories in one visit, making wedding shopping simpler and more organized."
    ]
  },
  {
    slug: "why-nearby-town-customers-visit-aashirwad",
    title: "Why Nearby Town Customers Visit Aashirwad",
    excerpt: "Why shoppers from nearby areas choose one Bihar Sharif store for family textile shopping.",
    category: "Local",
    publishedAt: "2026-04-25",
    seoTitle: "Why Nearby Town Customers Visit Aashirwad | Bihar Sharif",
    seoDescription:
      "See why families from Harnaut, Rajgir, Barbigha, Nalanda, Pawapuri, and nearby areas visit Aashirwad in Bihar Sharif.",
    content: [
      "Aashirwad has one physical store in Bihar Sharif, but customers often travel from nearby areas for trusted family shopping and wedding purchases.",
      "One reason is convenience. Buyers can explore sarees, bridal wear, ladies suits, and shirting-suiting in one place instead of visiting multiple shops.",
      "The second reason is familiarity. Many local families prefer a textile store with long-standing trust, clear guidance, and a strong reputation built over time."
    ]
  }
];

export const whyChoose = [
  "Trusted family cloth store since 1999",
  "One physical store in Bihar Sharif serving nearby towns",
  "Strong bridal, saree, ladies suit, and fabric categories",
  "Call and WhatsApp support before your visit",
  "Owner-manageable gallery, banners, offers, and reviews"
];
