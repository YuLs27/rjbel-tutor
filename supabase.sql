-- Run this in Supabase: Project -> SQL Editor -> New query -> Run

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  goal text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS is on by default for new tables in most
-- projects, but this makes sure).
alter table public.bookings enable row level security;

-- Allow anyone (using the public anon key) to INSERT a booking, but not
-- read, update, or delete existing rows. This is what your public contact
-- form needs.
create policy "Anyone can submit a booking"
  on public.bookings
  for insert
  to anon
  with check (true);

-- (No SELECT policy is created, so submitted bookings are only visible to
-- you in the Supabase Table Editor / dashboard, not to site visitors.)
