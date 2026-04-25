import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Owner Login | Aashirwad",
  description: "Secure owner login for the Aashirwad content dashboard.",
  path: "/admin/login"
});

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-24 sm:px-6 lg:px-8">
      <div className="gold-border texture-panel rounded-[2rem] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Owner Portal</p>
        <h1 className="mt-4 font-serif text-4xl text-brand-ivory">Secure dashboard login</h1>
        <p className="mt-4 text-sm leading-7 text-brand-ivory/74">
          Use the owner username and password configured in environment variables.
        </p>
        <form action="/api/admin/login" method="POST" className="mt-8 space-y-4">
          <label className="block text-sm text-brand-ivory/70">
            Username
            <input
              type="text"
              name="username"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
            />
          </label>
          <label className="block text-sm text-brand-ivory/70">
            Password
            <input
              type="password"
              name="password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-brand-ivory"
            />
          </label>
          <button type="submit" className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink">
            Login
          </button>
          {error ? <p className="text-sm text-red-300">Login failed. Check your credentials.</p> : null}
        </form>
      </div>
    </div>
  );
}
