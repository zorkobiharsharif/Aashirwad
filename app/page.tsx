import Link from "next/link";
import Image from "next/image";

import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { getBlogPosts, getMediaAssets, getOffers, getReviews } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/seo";
import {
  business,
  categories,
  faqsSeed,
  gallerySlots,
  locationPages,
  whyChoose
} from "@/lib/site-data";

export default async function HomePage() {
  const [offers, reviews, posts, galleryImages] = await Promise.all([
    getOffers(),
    getReviews(),
    getBlogPosts(),
    getMediaAssets({ limit: 4 })
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", item: "/" }])} />

      <section className="relative overflow-hidden border-b border-brand-gold/15 bg-hero-radial">
        <div className="absolute inset-0 bg-gold-mesh opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-brand-gold">
              Since 1999 | One trusted store in Bihar Sharif
            </p>
            <h1 className="font-serif text-5xl leading-tight text-brand-ivory sm:text-6xl">
              A premium family textile store for Bihar Sharif and nearby towns.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-ivory/78">
              Aashirwad brings sarees, bridal collection, ladies suits, shirting, and suiting
              together in one trusted store. Families visit from Bihar Sharif, Harnaut, Barbigha,
              Rajgir, Asthawan, Nalanda, Pawapuri, and nearby areas for dependable shopping and a
              warm in-store experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={business.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-ink"
              >
                Visit Our Store
              </a>
              <a
                href={`https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-gold/50 px-6 py-3 text-sm font-semibold text-brand-ivory"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Address", "Near SBI Bazzar Branch, Post Office Road"],
                ["Timings", business.hours],
                ["Nearby Reach", "Families come from many surrounding areas"]
              ].map(([label, value]) => (
                <div key={label} className="gold-border texture-panel rounded-[1.75rem] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{label}</p>
                  <p className="mt-3 text-sm leading-6 text-brand-ivory/80">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="gold-border texture-panel relative rounded-[2rem] p-6 sm:p-8">
            <div className="rounded-[2rem] border border-brand-gold/20 bg-gradient-to-br from-[#220d10] via-[#721120] to-[#c89b3c]/30 p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-brand-gold">Aashirwad</p>
              <div className="mt-6 grid gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="rounded-[1.4rem] border border-white/8 bg-black/25 px-5 py-4 text-sm text-brand-ivory/85 hover:border-brand-gold/30 hover:bg-black/40"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-brand-ivory/70">
                One showroom. Many trusted categories. Built for family shopping, wedding season,
                festive occasions, and nearby-town customers who want confidence before they buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="Collections chosen for families, brides, and nearby-town shoppers"
        eyebrow="Category Focus"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="gold-border texture-panel rounded-[2rem] p-6"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">
                {category.shortName}
              </p>
              <h2 className="mt-4 font-serif text-3xl text-brand-ivory">{category.name}</h2>
              <p className="mt-4 text-sm leading-7 text-brand-ivory/70">{category.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="A legacy store built on trust, quality, and repeat family visits"
        eyebrow="Since 1999"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="gold-border texture-panel rounded-[2rem] p-8">
            <p className="font-serif text-4xl text-brand-ivory">A trusted store in Bihar Sharif.</p>
            <p className="mt-4 text-base leading-8 text-brand-ivory/75">
              Aashirwad has one physical store in Bihar Sharif, but customers come from many areas
              for wedding shopping, festive sarees, ladies suits, and dependable family service.
              That local trust is the real brand advantage, and this website is designed to turn
              it into more store visits and inquiries.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item} className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                <p className="text-base leading-7 text-brand-ivory/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Latest arrivals gallery, ready for owner uploads" eyebrow="Photo Gallery">
        {galleryImages.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {galleryImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-[2rem] border border-brand-gold/15 bg-white/5">
                <div className="relative h-80">
                  <Image
                    src={image.imageUrl}
                    alt={image.altText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Latest Arrival</p>
                  <h3 className="mt-3 font-serif text-3xl text-brand-ivory">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {gallerySlots.map((slot) => (
              <div
                key={slot.title}
                className={`min-h-72 rounded-[2rem] border border-brand-gold/15 bg-gradient-to-br ${slot.tone} p-8`}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">Media Slot</p>
                <h3 className="mt-5 font-serif text-4xl text-white">{slot.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/75">{slot.label}</p>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section
        title="Offers and campaigns that can be updated from the owner portal"
        eyebrow="Current Highlights"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.title} className="gold-border texture-panel rounded-[2rem] p-7">
              <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">
                {offer.validity}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-brand-ivory">{offer.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-ivory/72">{offer.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Why nearby-town customers choose one trusted Bihar Sharif destination"
        eyebrow="Nearby Areas"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {locationPages.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 hover:border-brand-gold/30"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{location.name}</p>
              <h3 className="mt-3 font-serif text-2xl text-brand-ivory">{location.headline}</h3>
              <p className="mt-3 text-sm leading-7 text-brand-ivory/70">{location.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Editable testimonials section for real customer reviews"
        eyebrow="Trust Signals"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={`${review.name}-${review.location}`}
              className="gold-border texture-panel rounded-[2rem] p-6"
            >
              <p className="text-brand-gold">{"*".repeat(review.rating)}</p>
              <p className="mt-4 text-sm leading-7 text-brand-ivory/75">{review.text}</p>
              <p className="mt-6 text-sm font-semibold text-brand-ivory">
                {review.name} | {review.location}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Fresh content for wedding season, local discovery, and social sharing"
        eyebrow="Blog"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="gold-border texture-panel rounded-[2rem] p-6"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">
                {post.category}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-brand-ivory">{post.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-ivory/72">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Frequently asked questions before visiting the store" eyebrow="FAQs">
        <div className="grid gap-4 lg:grid-cols-2">
          {faqsSeed.map((faq) => (
            <div
              key={faq.question}
              className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6"
            >
              <h3 className="font-serif text-2xl text-brand-ivory">{faq.question}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-ivory/72">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Plan your store visit" eyebrow="Contact and Visit">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="gold-border texture-panel rounded-[2rem] p-8">
            <p className="font-serif text-4xl text-brand-ivory">Visit Aashirwad today.</p>
            <p className="mt-4 text-base leading-8 text-brand-ivory/75">
              Near SBI Bazzar Branch, Post Office Road, Bihar Sharif, Bihar 803101. Open daily from
              {` ${business.hours}`}. Call or WhatsApp before coming if you want to check bridal,
              saree, or fresh arrivals.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`tel:${business.phone.replace(/\s+/g, "")}`}
                className="rounded-full bg-brand-ivory px-5 py-3 text-sm font-semibold text-brand-ink"
              >
                Call Owner
              </a>
              <a
                href={business.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-brand-gold/50 px-5 py-3 text-sm font-semibold text-brand-ivory"
              >
                Get Directions
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-brand-gold/20">
            <iframe
              title="Aashirwad store location map"
              src="https://www.google.com/maps?q=Near+SBI+Bazzar+Branch,+Post+Office+Road,+Bihar+Sharif,+Bihar+803101&output=embed"
              className="h-[380px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
