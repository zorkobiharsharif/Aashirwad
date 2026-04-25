"use client";

import { useState } from "react";

type SocialLinks = {
  facebook: string;
  instagram: string;
  maps: string;
};

export function SocialLinksForm({ initialLinks }: { initialLinks: SocialLinks }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("saving");

    const payload = {
      facebook: String(formData.get("facebook") || ""),
      instagram: String(formData.get("instagram") || ""),
      maps: String(formData.get("maps") || "")
    };

    const response = await fetch("/api/admin/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-[2rem] border border-brand-gold/20 bg-white/5 p-6">
      <label className="block text-sm text-brand-ivory/70">
        Facebook URL
        <input
          type="url"
          name="facebook"
          defaultValue={initialLinks.facebook}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
        />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Instagram URL
        <input
          type="url"
          name="instagram"
          defaultValue={initialLinks.instagram}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
        />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Google Maps URL
        <input
          type="url"
          name="maps"
          defaultValue={initialLinks.maps}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink"
      >
        {status === "saving" ? "Saving..." : "Save social links"}
      </button>
      {status === "saved" ? (
        <p className="text-sm text-emerald-300">Social links updated on the live website.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-300">Could not save social links. Please try again.</p>
      ) : null}
    </form>
  );
}
