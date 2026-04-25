import Image from "next/image";
import Link from "next/link";

import { business, navLinks } from "@/lib/site-data";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-ink/90 backdrop-blur">
      <div className="bg-brand-red px-4 py-2 text-center text-xs text-white">
        One trusted store in Bihar Sharif, serving families from Bihar Sharif and nearby areas since 1999
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-brand-gold/30 bg-black p-2 shadow-glow">
            <Image
              src={business.logo}
              alt={`${business.name} logo`}
              width={52}
              height={52}
              className="h-12 w-12 rounded-xl object-cover"
            />
          </div>
          <div>
            <div className="font-serif text-2xl text-brand-ivory">{business.name}</div>
            <div className="text-xs uppercase tracking-[0.32em] text-brand-gold">
              Since 1999
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-brand-ivory/80 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-gold">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.phone.replace(/\s+/g, "")}`}
            className="hidden rounded-full border border-brand-gold/40 px-4 py-2 text-sm text-brand-ivory transition hover:border-brand-gold hover:text-white sm:inline-flex"
          >
            Call Now
          </a>
          <a
            href={`https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:scale-[1.02]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
