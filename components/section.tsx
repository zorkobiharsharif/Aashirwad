import { ReactNode } from "react";

import clsx from "clsx";

export function Section({
  title,
  eyebrow,
  children,
  className
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-3xl font-serif text-4xl text-brand-ivory sm:text-5xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
