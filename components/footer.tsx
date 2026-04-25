import Link from "next/link";

import { getSocialLinks } from "@/lib/cms";
import { business, categories, locationPages } from "@/lib/site-data";
import { SocialIcons } from "@/components/social-icons";

export async function Footer() {
  const socialLinks = await getSocialLinks();

  return (
    <footer className="border-t border-brand-gold/20 bg-[#120d0c]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          <p className="font-serif text-3xl text-brand-ivory">{business.name}</p>
          <p className="max-w-xl text-sm leading-7 text-brand-ivory/70">
            Trusted family cloth store in Bihar Sharif for sarees, bridal collection, ladies suits,
            shirting, and suiting. Families also visit from Harnaut, Barbigha, Rajgir, Asthawan,
            Nalanda, Pawapuri, and Bhagan Bigha.
          </p>
          <SocialIcons links={socialLinks} />
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Categories
          </p>
          <div className="space-y-2 text-sm text-brand-ivory/75">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="block transition hover:text-brand-gold"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Nearby Areas
          </p>
          <div className="space-y-2 text-sm text-brand-ivory/75">
            {locationPages.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="block transition hover:text-brand-gold"
              >
                {location.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-4 text-center text-xs text-brand-ivory/50">
        {business.name} | {business.tagline}
      </div>
    </footer>
  );
}
