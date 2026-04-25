import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/cms";

export const metadata = buildMetadata({
  title: "Blog | Aashirwad Bihar Sharif",
  description:
    "Read wedding season content, saree shopping tips, and local textile insights from Aashirwad in Bihar Sharif.",
  path: "/blog"
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Blog</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-ivory">Seasonal content and local shopping insights.</h1>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="gold-border texture-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{post.category}</p>
            <h2 className="mt-4 font-serif text-3xl text-brand-ivory">{post.title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-ivory/72">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
