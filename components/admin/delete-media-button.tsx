"use client";

import { useState } from "react";

export function DeleteMediaButton({ mediaId }: { mediaId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    const response = await fetch(`/api/admin/media?id=${encodeURIComponent(mediaId)}`, {
      method: "DELETE"
    });

    if (response.ok) {
      window.location.reload();
      return;
    }

    setIsDeleting(false);
    window.alert("Could not delete this image. Please try again.");
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-full border border-red-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-200 disabled:opacity-60"
    >
      {isDeleting ? "Deleting" : "Delete"}
    </button>
  );
}
