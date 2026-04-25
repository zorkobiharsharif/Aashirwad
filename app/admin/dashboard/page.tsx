import Image from "next/image";
import { redirect } from "next/navigation";

import { DeleteMediaButton } from "@/components/admin/delete-media-button";
import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { SocialLinksForm } from "@/components/admin/social-links-form";
import { getMediaAssets, getRecentInquiries, getSocialLinks } from "@/lib/cms";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const inquiries = await getRecentInquiries();
  const mediaItems = await getMediaAssets({ limit: 12, useServiceRole: true });
  const socialLinks = await getSocialLinks({ useServiceRole: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Owner Dashboard</p>
          <h1 className="mt-4 font-serif text-5xl text-brand-ivory">Manage photos, content, and growth assets.</h1>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="rounded-full border border-brand-gold/40 px-5 py-3 text-sm font-semibold text-brand-ivory">
            Logout
          </button>
        </form>
      </div>

      <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="gold-border texture-panel rounded-[2rem] p-7">
            <h2 className="font-serif text-3xl text-brand-ivory">Media uploads</h2>
            <p className="mt-3 text-sm leading-7 text-brand-ivory/74">
              Upload new product photos, homepage banners, gallery images, and category covers.
              Cloudinary stores the image, while Supabase stores the metadata once connected.
            </p>
            <div className="mt-6">
              <MediaUploadForm />
            </div>
          </div>

          <div className="gold-border texture-panel rounded-[2rem] p-7">
            <h2 className="font-serif text-3xl text-brand-ivory">Uploaded media</h2>
            <p className="mt-3 text-sm leading-7 text-brand-ivory/74">
              Delete test images here before sharing the review link. This removes them from the
              live website by marking them inactive.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {mediaItems.length ? (
                mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/20"
                  >
                    <div className="relative h-52">
                      <Image
                        src={item.imageUrl}
                        alt={item.altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="space-y-3 p-4">
                      <p className="font-semibold text-brand-ivory">{item.title}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-gold">
                        {item.usageType}
                        {item.categorySlug ? ` | ${item.categorySlug}` : ""}
                      </p>
                      <DeleteMediaButton mediaId={item.id} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-ivory/60">No uploaded media yet.</p>
              )}
            </div>
          </div>

          <div className="gold-border texture-panel rounded-[2rem] p-7">
            <h2 className="font-serif text-3xl text-brand-ivory">Social links</h2>
            <p className="mt-3 text-sm leading-7 text-brand-ivory/74">
              Update the Instagram, Facebook, and Google Maps URLs used across the live website.
            </p>
            <div className="mt-6">
              <SocialLinksForm initialLinks={socialLinks} />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              ["Homepage", "Homepage text editing is the next owner-portal upgrade."],
              ["Offers", "Offer management form is the next owner-portal upgrade."],
              ["Reviews", "Review management form is the next owner-portal upgrade."],
              ["Blog", "Blog management form is the next owner-portal upgrade."],
              ["Categories", "Category text and cover-image editing is the next owner-portal upgrade."],
              ["Inquiries", "Recent customer inquiries are already visible on the right side."]
            ].map(([title, description]) => (
              <div key={title} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
                <h3 className="font-serif text-2xl text-brand-ivory">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-ivory/72">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="gold-border texture-panel rounded-[2rem] p-7">
            <h2 className="font-serif text-3xl text-brand-ivory">Setup notes</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-brand-ivory/74">
              <li>Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` for dashboard access.</li>
              <li>Add Cloudinary cloud name and upload preset for photo uploads.</li>
              <li>Connect Supabase keys to store photo metadata, inquiries, blog posts, offers, and reviews.</li>
              <li>Run the SQL file in `supabase/schema.sql` before enabling the content APIs.</li>
            </ul>
          </div>
          <div className="gold-border texture-panel rounded-[2rem] p-7">
            <h2 className="font-serif text-3xl text-brand-ivory">Inquiry visibility</h2>
            <p className="mt-4 text-sm leading-7 text-brand-ivory/74">
              Customer forms can store inquiry submissions in Supabase. Pair this with WhatsApp and
              call-click tracking in GA4 for a clear view of what brings store visits.
            </p>
            <div className="mt-6 space-y-4">
              {inquiries.length ? (
                inquiries.map((inquiry) => (
                  <div key={`${inquiry.phone}-${inquiry.createdAt}`} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold text-brand-ivory">{inquiry.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-gold">
                      {inquiry.page || "site inquiry"}
                    </p>
                    <p className="mt-2 text-sm text-brand-ivory/72">{inquiry.phone}</p>
                    <p className="mt-2 text-sm leading-6 text-brand-ivory/72">{inquiry.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-brand-ivory/60">
                  Recent inquiries will appear here after Supabase is connected and contact forms are used.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
