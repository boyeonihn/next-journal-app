create table entries (
    id uuid not null primary key default uuid_generate_v4(),
    content text,
    emotion smallint
);

alter table entries add column created_ts TIMESTAMP WITH TIME ZONE default now();
alter table entries enable row level security;
create policy "Can view own entry data." on entries for select using (auth.uid() = user_id);
create policy "Can update own entry data." on entries for update using (auth.uid() = user_id);
create policy "Can insert own entry." on entries for insert with check (auth.uid() = user_id);
create policy "Can delete own entry." on entries for delete using (auth.uid() = user_id);


create table accounts (
  id uuid not null primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null
);

alter table accounts enable row level security;
create policy "Can view own user data." on accounts for select using (auth.uid() = user_id);
create policy "Can update own user data." on accounts for update using (auth.uid() = user_id);


create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.accounts (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


alter table entries add column user_id uuid references auth.users not null