import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getMediaAssets } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { categories } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return buildMetadata({ title: "Category | Aashirwad", description: "Category page not found." });
  }

  return buildMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/categories/${category.slug}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) notFound();

  const categoryImages = await getMediaAssets({
    categorySlug: category.slug,
    limit: 6
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{category.name}</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-ivory">{category.headline}</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-brand-ivory/76">{category.description}</p>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-brand-gold/15 bg-gradient-to-br from-[#65101c] via-[#9e1325] to-[#d4a44a]/30 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">Why this category matters</p>
          <div className="mt-6 grid gap-4">
            {category.highlights.map((highlight) => (
              <div key={highlight} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-sm text-white/80">
                {highlight}
              </div>
            ))}
          </div>
        </div>
        <div className="gold-border texture-panel rounded-[2rem] p-8">
          <h2 className="font-serif text-3xl text-brand-ivory">Who this is for</h2>
          <p className="mt-4 text-base leading-8 text-brand-ivory/74">{category.audience}</p>
          <p className="mt-6 text-base leading-8 text-brand-ivory/74">
            Aashirwad has one store in Bihar Sharif and welcomes shoppers from nearby areas who want
            trusted quality and family-friendly guidance before purchasing.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink">
              Visit Store
            </Link>
            <a
              href="https://wa.me/919162488280"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-brand-gold/50 px-5 py-3 text-sm font-semibold text-brand-ivory"
            >
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Category Gallery</p>
            <h2 className="mt-3 font-serif text-3xl text-brand-ivory">
              Latest {category.name.toLowerCase()} uploads
            </h2>
          </div>
        </div>

        {categoryImages.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categoryImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-[2rem] border border-brand-gold/15 bg-white/5"
              >
                <div className="relative h-80">
                  <Image
                    src={image.imageUrl}
                    alt={image.altText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">From Owner Portal</p>
                  <h3 className="mt-3 font-serif text-2xl text-brand-ivory">{image.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-ivory/70">{image.altText}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-brand-gold/30 bg-white/5 p-8">
            <p className="text-base leading-8 text-brand-ivory/72">
              No {category.name.toLowerCase()} photos are assigned yet. Upload an image from the
              owner dashboard and set the category field to <span className="font-semibold text-brand-gold">{category.slug}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
