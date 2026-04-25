"use client";

import { useState } from "react";

export function OffersForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("saving");

    const response = await fetch("/api/admin/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: String(formData.get("title") || ""),
        description: String(formData.get("description") || ""),
        validity: String(formData.get("validity") || "")
      })
    });

    if (response.ok) {
      setStatus("saved");
      window.location.reload();
      return;
    }

    setStatus("error");
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-[2rem] border border-brand-gold/20 bg-white/5 p-6">
      <label className="block text-sm text-brand-ivory/70">
        Offer title
        <input name="title" required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Validity label
        <input name="validity" placeholder="Wedding Season 2026" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Description
        <textarea name="description" rows={4} required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <button type="submit" className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink">
        {status === "saving" ? "Saving..." : "Add offer"}
      </button>
    </form>
  );
}
