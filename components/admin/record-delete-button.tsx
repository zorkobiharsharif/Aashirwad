"use client";

import { useState } from "react";

export function RecordDeleteButton({
  endpoint,
  id,
  label = "Delete"
}: {
  endpoint: string;
  id: string;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    setBusy(true);
    const response = await fetch(`${endpoint}?id=${encodeURIComponent(id)}`, {
      method: "DELETE"
    });

    if (response.ok) {
      window.location.reload();
      return;
    }

    setBusy(false);
    window.alert("Could not delete this item. Please try again.");
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      className="rounded-full border border-red-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-200 disabled:opacity-60"
    >
      {busy ? "Deleting" : label}
    </button>
  );
}
