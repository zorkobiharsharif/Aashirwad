"use client";

import { useState } from "react";

export function BlogForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("saving");

    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: String(formData.get("title") || ""),
        slug: String(formData.get("slug") || ""),
        category: String(formData.get("category") || ""),
        excerpt: String(formData.get("excerpt") || ""),
        content: String(formData.get("content") || ""),
        seo_title: String(formData.get("seo_title") || ""),
        seo_description: String(formData.get("seo_description") || ""),
        is_published: true
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
          Title
          <input name="title" required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
        <label className="block text-sm text-brand-ivory/70">
          Slug
          <input name="slug" required placeholder="new-arrivals-bihar-sharif" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-brand-ivory/70">
          Category
          <input name="category" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
        <label className="block text-sm text-brand-ivory/70">
          Excerpt
          <input name="excerpt" required className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
      </div>
      <label className="block text-sm text-brand-ivory/70">
        Content
        <textarea name="content" rows={8} required placeholder="Use blank lines between paragraphs." className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-brand-ivory/70">
          SEO title
          <input name="seo_title" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
        <label className="block text-sm text-brand-ivory/70">
          SEO description
          <input name="seo_description" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory" />
        </label>
      </div>
      <button type="submit" className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink">
        {status === "saving" ? "Saving..." : "Add blog post"}
      </button>
    </form>
  );
}
