type SocialLinks = {
  facebook: string;
  instagram: string;
  maps: string;
};

export function SocialIcons({
  links,
  className = ""
}: {
  links: SocialLinks;
  className?: string;
}) {
  const items = [
    { label: "Facebook", href: links.facebook, icon: <FacebookIcon /> },
    { label: "Instagram", href: links.instagram, icon: <InstagramIcon /> },
    { label: "Google Maps", href: links.maps, icon: <MapsIcon /> }
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          title={item.label}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/30 bg-white/5 text-brand-gold transition hover:border-brand-gold hover:bg-brand-gold hover:text-brand-ink"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H16V3.8c-.2 0-.9-.1-1.8-.1-2.8 0-4.7 1.7-4.7 4.9V10H7v3h2.5v8h4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8zm8.85 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3z" />
    </svg>
  );
}

function MapsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 2a6.5 6.5 0 0 0-6.5 6.5c0 4.9 6.5 13.5 6.5 13.5s6.5-8.6 6.5-13.5A6.5 6.5 0 0 0 12 2zm0 9.2a2.7 2.7 0 1 1 2.7-2.7 2.7 2.7 0 0 1-2.7 2.7z" />
    </svg>
  );
}
