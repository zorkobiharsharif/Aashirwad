create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  page text,
  message text,
  created_at timestamptz default now()
);

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  validity text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  rating int default 5,
  review_text text,
  is_approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text,
  seo_title text,
  seo_description text,
  is_published boolean default false,
  published_at date default current_date,
  created_at timestamptz default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  alt_text text,
  usage_type text,
  category_slug text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  is_active boolean default true,
  created_at timestamptz default now()
);
