import { business } from "@/lib/site-data";

export function FloatingActions() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex max-w-md gap-3 px-4 sm:hidden">
      <a
        href={`tel:${business.phone.replace(/\s+/g, "")}`}
        className="flex-1 rounded-full bg-brand-ink px-4 py-3 text-center text-sm font-semibold text-white shadow-glow"
      >
        Call
      </a>
      <a
        href={`https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="flex-1 rounded-full bg-brand-gold px-4 py-3 text-center text-sm font-semibold text-brand-ink shadow-glow"
      >
        WhatsApp
      </a>
    </div>
  );
}
