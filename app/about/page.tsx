import { buildMetadata } from "@/lib/seo";
import { business } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "About Aashirwad | Family Cloth Store in Bihar Sharif Since 1999",
  description:
    "Learn about Aashirwad, a trusted family cloth store in Bihar Sharif serving local families and nearby-town shoppers since 1999.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">About Aashirwad</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-ivory sm:text-6xl">
        A family textile store trusted since 1999.
      </h1>
      <div className="mt-10 space-y-6 text-base leading-8 text-brand-ivory/78">
        <p>
          {business.name} is a traditional trusted family cloth store in Bihar Sharif. For years,
          families have visited the store for sarees, bridal shopping, ladies suits, shirting, and
          suiting with the confidence that comes from local reputation and personal service.
        </p>
        <p>
          The store has one physical location in Bihar Sharif, but many customers come from nearby
          towns and surrounding areas because they know Aashirwad as a dependable place for family
          shopping and wedding season purchases.
        </p>
        <p>
          This website has been structured to carry that same trust online: clear product
          categories, local SEO pages, direct WhatsApp and call actions, and an owner portal for
          updating photos, banners, reviews, offers, and blog content without needing code edits.
        </p>
      </div>
    </div>
  );
}
