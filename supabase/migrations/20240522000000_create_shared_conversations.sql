create table public.shared_conversations (
  id uuid default gen_random_uuid() primary key,
  users jsonb not null,
  location jsonb not null,
  conversation text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
