-- Create video_files table
create table public.video_files (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  file_name text not null,
  gcs_path text not null,
  mime_type text not null,
  size bigint not null,
  original_name text not null,
  user_id uuid references auth.users(id) not null,
  status text default 'uploading'::text,
  error_message text
);

-- Create video_analyses table
create table public.video_analyses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  video_uri text not null,
  student_id text not null,
  user_id uuid references auth.users(id) not null,
  status text default 'aguardando_upload'::text,
  procedure_name text not null,
  procedure_id uuid references medical_procedures(id) not null,
  video_file_id uuid references video_files(id) not null,
  checklist_version jsonb not null,
  error_message text,
  gemini_response jsonb
);

-- Create evaluation_prompts table
create table public.evaluation_prompts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  context_template text not null,
  active boolean default true not null
);

-- Enable RLS
alter table public.video_files enable row level security;
alter table public.video_analyses enable row level security;
alter table public.evaluation_prompts enable row level security;

-- Create policies
create policy "Users can view their own videos"
  on public.video_files for select
  using (auth.uid() = user_id);

create policy "Users can upload videos"
  on public.video_files for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own analyses"
  on public.video_analyses for select
  using (auth.uid() = user_id);

create policy "Users can create analyses"
  on public.video_analyses for insert
  with check (auth.uid() = user_id);

create policy "Admins can manage prompts"
  on public.evaluation_prompts for all
  using (auth.uid() in (
    select id from auth.users where metadata->>'role' = 'admin'
  ));

create policy "Everyone can view active prompts"
  on public.evaluation_prompts for select
  using (active = true);
