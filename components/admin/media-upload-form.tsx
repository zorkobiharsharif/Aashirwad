"use client";

import { useState } from "react";

import { categories } from "@/lib/site-data";

type UploadState =
  | { status: "idle" }
  | { status: "uploading" }
  | { status: "success"; url: string }
  | { status: "error"; message: string };

export function MediaUploadForm() {
  const [state, setState] = useState<UploadState>({ status: "idle" });

  async function handleSubmit(formData: FormData) {
    const file = formData.get("file");
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!(file instanceof File) || !file.size) {
      setState({ status: "error", message: "Choose an image first." });
      return;
    }

    if (!cloudName || !uploadPreset) {
      setState({
        status: "error",
        message: "Add Cloudinary env values before using live uploads."
      });
      return;
    }

    setState({ status: "uploading" });

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", uploadPreset);

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadData
      }
    );

    if (!uploadResponse.ok) {
      setState({ status: "error", message: "Cloudinary upload failed." });
      return;
    }

    const uploaded = await uploadResponse.json();
    const metadata = {
      image_url: uploaded.secure_url,
      alt_text: String(formData.get("alt_text") || ""),
      title: String(formData.get("title") || ""),
      usage_type: String(formData.get("usage_type") || "gallery"),
      category_slug: String(formData.get("category_slug") || "")
    };

    await fetch("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metadata)
    });

    setState({ status: "success", url: uploaded.secure_url });
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-[2rem] border border-brand-gold/20 bg-white/5 p-6"
    >
      <div>
        <label className="mb-2 block text-sm text-brand-ivory/70">Photo</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          className="block w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-brand-ivory"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-brand-ivory/70">
          Title
          <input
            type="text"
            name="title"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
          />
        </label>
        <label className="block text-sm text-brand-ivory/70">
          Alt text
          <input
            type="text"
            name="alt_text"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-brand-ivory/70">
          Placement
          <select
            name="usage_type"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
          >
            <option value="gallery">Gallery</option>
            <option value="homepage-banner">Homepage banner</option>
            <option value="category-cover">Category cover</option>
            <option value="blog-image">Blog image</option>
          </select>
        </label>
        <label className="block text-sm text-brand-ivory/70">
          Category
          <select
            name="category_slug"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
            defaultValue=""
          >
            <option value="">No specific category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink"
      >
        {state.status === "uploading" ? "Uploading..." : "Upload photo"}
      </button>
      {state.status === "success" ? (
        <p className="text-sm text-emerald-300">Upload completed: {state.url}</p>
      ) : null}
      {state.status === "error" ? (
        <p className="text-sm text-red-300">{state.message}</p>
      ) : null}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-brand-ivory/68">
        Use category selection if you want the image to appear on a category page.
        Choose `Gallery` for homepage and gallery sections, or assign a specific category like
        `Sarees`, `Bridal Collection`, or `Lehengas` to show it on that page.
      </div>
    </form>
  );
}
