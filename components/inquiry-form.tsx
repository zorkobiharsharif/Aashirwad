"use client";

import { useState } from "react";

export function InquiryForm({ page }: { page: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("sending");

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      page
    };

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <label className="block text-sm text-brand-ivory/70">
        Name
        <input
          type="text"
          name="name"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
        />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Phone
        <input
          type="tel"
          name="phone"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
        />
      </label>
      <label className="block text-sm text-brand-ivory/70">
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us what you are looking for"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink"
      >
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </button>
      {status === "sent" ? (
        <p className="text-sm text-emerald-300">Inquiry saved. You can also call or WhatsApp for a faster reply.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-300">Something went wrong. Please call or WhatsApp instead.</p>
      ) : null}
    </form>
  );
}
