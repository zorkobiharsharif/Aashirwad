"use client";

import { useState } from "react";

export function ReviewsForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("saving");

    const response = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name") || ""),
        location: String(formData.get("location") || ""),
        rating: Number(formData.get("rating") || 5),
        review_text: String(formData.get("review_text") || "")
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
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-brand-ivory/70">
          Customer name
          <input name="name" required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
        <label className="block text-sm text-brand-ivory/70">
          Location
          <input name="location" required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
      </div>
      <label className="block text-sm text-brand-ivory/70">
        Rating
        <select name="rating" defaultValue="5" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory">
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Review text
        <textarea name="review_text" rows={4} required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <button type="submit" className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink">
        {status === "saving" ? "Saving..." : "Add review"}
      </button>
    </form>
  );
}
