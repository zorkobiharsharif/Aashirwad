import Image from "next/image";

import { getMediaAssets } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { gallerySlots } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Gallery | Aashirwad Bihar Sharif",
  description:
    "Browse the latest arrivals gallery for Aashirwad in Bihar Sharif. Owner can upload product photos, banners, and category highlights from the dashboard.",
  path: "/gallery"
});

export default async function GalleryPage() {
  const galleryImages = await getMediaAssets({ limit: 24 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Gallery</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-ivory">Latest arrivals and visual highlights.</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-brand-ivory/76">
        The gallery is designed for easy owner updates. Upload new photos from the owner portal and
        use them as homepage banners, category covers, gallery cards, or blog visuals.
      </p>
      {galleryImages.length ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryImages.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-[2rem] border border-brand-gold/15 bg-white/5">
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
                <h2 className="font-serif text-3xl text-brand-ivory">{image.title}</h2>
                <p className="mt-3 text-sm text-brand-ivory/70">{image.altText}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {gallerySlots.map((slot) => (
            <div
              key={slot.title}
              className={`min-h-80 rounded-[2rem] border border-brand-gold/15 bg-gradient-to-br ${slot.tone} p-8`}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Photo slot</p>
              <h2 className="mt-5 font-serif text-4xl text-white">{slot.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/75">{slot.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
