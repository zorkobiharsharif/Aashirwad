import { buildMetadata } from "@/lib/seo";
import { getOffers } from "@/lib/cms";

export const metadata = buildMetadata({
  title: "Offers | Aashirwad Bihar Sharif",
  description:
    "See current store offers, seasonal collection highlights, and campaign announcements for Aashirwad in Bihar Sharif.",
  path: "/offers"
});

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Offers</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-ivory">Seasonal highlights and store updates.</h1>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {offers.map((offer) => (
          <article key={offer.title} className="gold-border texture-panel rounded-[2rem] p-7">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{offer.validity}</p>
            <h2 className="mt-4 font-serif text-3xl text-brand-ivory">{offer.title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-ivory/72">{offer.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
