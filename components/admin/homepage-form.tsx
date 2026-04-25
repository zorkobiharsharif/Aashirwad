"use client";

import { useState } from "react";

export function HomepageForm({
  initialValues
}: {
  initialValues: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    legacyTitle: string;
    legacyDescription: string;
  };
}) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("saving");

    const response = await fetch("/api/admin/homepage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heroEyebrow: String(formData.get("heroEyebrow") || ""),
        heroTitle: String(formData.get("heroTitle") || ""),
        heroDescription: String(formData.get("heroDescription") || ""),
        legacyTitle: String(formData.get("legacyTitle") || ""),
        legacyDescription: String(formData.get("legacyDescription") || "")
      })
    });

    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-[2rem] border border-brand-gold/20 bg-white/5 p-6">
      <label className="block text-sm text-brand-ivory/70">
        Hero eyebrow
        <input name="heroEyebrow" defaultValue={initialValues.heroEyebrow} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Hero title
        <textarea name="heroTitle" rows={2} defaultValue={initialValues.heroTitle} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Hero description
        <textarea name="heroDescription" rows={5} defaultValue={initialValues.heroDescription} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Legacy section title
        <input name="legacyTitle" defaultValue={initialValues.legacyTitle} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Legacy section text
        <textarea name="legacyDescription" rows={5} defaultValue={initialValues.legacyDescription} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <button type="submit" className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink">
        {status === "saving" ? "Saving..." : "Save homepage content"}
      </button>
      {status === "saved" ? <p className="text-sm text-emerald-300">Homepage content updated.</p> : null}
    </form>
  );
}
