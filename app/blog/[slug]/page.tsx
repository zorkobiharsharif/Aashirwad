import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/seo";
import { blogPostsSeed } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsSeed.find((item) => item.slug === slug);

  if (!post) {
    return buildMetadata({
      title: "Blog | Aashirwad",
      description: "Blog post not found."
    });
  }

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`
  });
}

export async function generateStaticParams() {
  return blogPostsSeed.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsSeed.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">{post.category}</p>
      <h1 className="mt-4 font-serif text-5xl text-brand-ivory">{post.title}</h1>
      <div className="mt-10 space-y-6 text-base leading-8 text-brand-ivory/76">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
