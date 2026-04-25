import { InquiryForm } from "@/components/inquiry-form";
import { SocialIcons } from "@/components/social-icons";
import { getSocialLinks } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { business } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Contact Aashirwad | Textile Store in Bihar Sharif",
  description:
    "Contact Aashirwad in Bihar Sharif for sarees, bridal collection, ladies suits, shirting, and suiting. Call, WhatsApp, or get directions.",
  path: "/contact"
});

export default async function ContactPage() {
  const socialLinks = await getSocialLinks();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="gold-border texture-panel rounded-[2rem] p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Contact</p>
          <h1 className="mt-4 font-serif text-5xl text-brand-ivory">Visit the Bihar Sharif store.</h1>
          <div className="mt-8 space-y-4 text-sm leading-7 text-brand-ivory/76">
            <p>{business.addressLine}</p>
            <p>
              {business.city}, {business.region} {business.postalCode}
            </p>
            <p>Timings: {business.hours}</p>
            <p>WhatsApp: {business.whatsapp}</p>
            <p>Owner Contact: {business.phone}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a href={`tel:${business.phone.replace(/\s+/g, "")}`} className="rounded-full bg-brand-ivory px-5 py-3 font-semibold text-brand-ink">
              Call Now
            </a>
            <a
              href={`https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-gold px-5 py-3 font-semibold text-brand-ink"
            >
              WhatsApp
            </a>
          </div>
          <div className="mt-8">
            <SocialIcons links={socialLinks} />
          </div>
        </div>
        <div className="grid gap-6">
          <InquiryForm page="/contact" />
          <div className="overflow-hidden rounded-[2rem] border border-brand-gold/20">
            <iframe
              title="Aashirwad map"
              src="https://www.google.com/maps?q=Near+SBI+Bazzar+Branch,+Post+Office+Road,+Bihar+Sharif,+Bihar+803101&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
