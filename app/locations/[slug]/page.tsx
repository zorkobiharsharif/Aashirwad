import Link from "next/link";
import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo";
import { categories, locationPages } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationPages.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const location = locationPages.find((item) => item.slug === slug);

  if (!location) {
    return buildMetadata({ title: "Location | Aashirwad", description: "Location page not found." });
  }

  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = locationPages.find((item) => item.slug === slug);

  if (!location) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{location.name}</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-ivory">{location.headline}</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-brand-ivory/76">{location.description}</p>
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="gold-border texture-panel rounded-[2rem] p-8">
          <h2 className="font-serif text-3xl text-brand-ivory">Why shoppers from {location.name} visit Aashirwad</h2>
          <p className="mt-4 text-base leading-8 text-brand-ivory/74">{location.travelCopy}</p>
          <div className="mt-6 space-y-4">
            {location.reasons.map((reason) => (
              <div key={reason} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-brand-ivory/80">
                {reason}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-brand-gold/15 bg-gradient-to-br from-[#2a100d] via-[#68111f] to-[#c89b3c]/35 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">Popular categories for nearby-town visitors</p>
          <div className="mt-6 grid gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-sm text-white/80"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
