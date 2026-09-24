-- Homepage-only CMS. No existing app tables or policies are modified.
begin;
create table public.winco_web_members (
 email text primary key check (email = lower(email)),
 role text not null check (role in ('owner','publisher','editor')),
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table public.winco_web_draft (
 id boolean primary key default true check(id),
 data jsonb not null,
 version bigint not null default 1,
 updated_by uuid,
 updated_at timestamptz not null default now()
);
create table public.winco_web_versions (
 id uuid primary key default gen_random_uuid(),
 draft_version bigint not null unique,
 data jsonb not null,
 created_by uuid,
 created_at timestamptz not null default now()
);
create table public.winco_web_releases (
 id uuid primary key default gen_random_uuid(),
 version_id uuid not null unique references public.winco_web_versions(id),
 data jsonb not null,
 files text[] not null default '{}',
 created_by uuid,
 created_at timestamptz not null default now()
);
alter table public.winco_web_members enable row level security;
alter table public.winco_web_draft enable row level security;
alter table public.winco_web_versions enable row level security;
alter table public.winco_web_releases enable row level security;
revoke all on public.winco_web_members,public.winco_web_draft,public.winco_web_versions,public.winco_web_releases from anon,authenticated;

create function public.winco_web_role() returns text language sql stable security definer set search_path='' as $$
 select m.role from public.winco_web_members m
 where auth.uid() is not null and m.email=lower(auth.jwt()->>'email') and m.active;
$$;
create function public.winco_web_state() returns jsonb language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
 if public.winco_web_role() is null then raise exception 'Not authorized' using errcode='42501'; end if;
 select jsonb_build_object('data',d.data,'version',d.version,'updated_at',d.updated_at) into result from public.winco_web_draft d where id;
 return jsonb_build_object('role',public.winco_web_role(),'draft',result);
end; $$;
create function public.winco_web_save(p_data jsonb,p_expected bigint) returns jsonb language plpgsql security definer set search_path='' as $$
declare current_version bigint; new_version bigint;
begin
 if public.winco_web_role() is null then raise exception 'Not authorized' using errcode='42501'; end if;
 if p_data->>'schema'<>'1' or jsonb_typeof(p_data->'pages')<>'array' or octet_length(p_data::text)>2000000 then raise exception 'Invalid document'; end if;
 perform pg_advisory_xact_lock(81274001);
 select version into current_version from public.winco_web_draft where id for update;
 if coalesce(current_version,0)<>p_expected then raise exception 'EDIT_CONFLICT'; end if;
 new_version:=coalesce(current_version,0)+1;
 insert into public.winco_web_draft(id,data,version,updated_by) values(true,p_data,new_version,auth.uid())
 on conflict(id) do update set data=excluded.data,version=excluded.version,updated_by=excluded.updated_by,updated_at=now();
 insert into public.winco_web_versions(draft_version,data,created_by) values(new_version,p_data,auth.uid());
 return jsonb_build_object('version',new_version);
end; $$;
create function public.winco_web_history() returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if public.winco_web_role() is null then raise exception 'Not authorized' using errcode='42501'; end if;
 return coalesce((select jsonb_agg(x) from (select v.id,v.draft_version,v.created_at,v.created_by,r.id release_id from public.winco_web_versions v left join public.winco_web_releases r on r.version_id=v.id order by v.draft_version desc limit 100) x),'[]'::jsonb);
end; $$;
create function public.winco_web_version(p_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if public.winco_web_role() is null then raise exception 'Not authorized' using errcode='42501'; end if;
 return (select jsonb_build_object('id',id,'data',data,'version',draft_version) from public.winco_web_versions where id=p_id);
end; $$;
create function public.winco_web_release(p_expected bigint,p_data jsonb,p_files text[]) returns uuid language plpgsql security definer set search_path='' as $$
declare v_version_id uuid; release_id uuid; current_version bigint;
begin
 if coalesce(public.winco_web_role(),'') not in ('owner','publisher') then raise exception 'Not authorized' using errcode='42501'; end if;
 if p_data->>'schema'<>'1' or octet_length(p_data::text)>2000000 then raise exception 'Invalid document'; end if;
 perform pg_advisory_xact_lock(81274001);
 select version into current_version from public.winco_web_draft where id for update;
 if current_version is distinct from p_expected then raise exception 'EDIT_CONFLICT'; end if;
 select id into v_version_id from public.winco_web_versions where draft_version=p_expected;
 insert into public.winco_web_releases(version_id,data,files,created_by) values(v_version_id,p_data,p_files,auth.uid())
 on conflict(version_id) do nothing returning id into release_id;
 if release_id is null then select r.id into release_id from public.winco_web_releases r where r.version_id=v_version_id; end if;
 return release_id;
end; $$;
-- Only explicitly released, public-facing content is readable without login.
create function public.winco_web_publication() returns jsonb language sql stable security definer set search_path='' as $$
 select jsonb_build_object('id',r.id,'data',r.data,'created_at',r.created_at) from public.winco_web_releases r order by r.created_at desc limit 1;
$$;
create function public.winco_web_public_file(p_path text) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.winco_web_releases r where p_path=any(r.files));
$$;
create function public.winco_web_member_list() returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if public.winco_web_role() is distinct from 'owner' then raise exception 'Not authorized' using errcode='42501'; end if;
 return (select jsonb_agg(x) from (select email,role,active from public.winco_web_members order by created_at) x);
end; $$;
create function public.winco_web_member_set(p_email text,p_role text,p_active boolean) returns void language plpgsql security definer set search_path='' as $$
begin
 if public.winco_web_role() is distinct from 'owner' then raise exception 'Not authorized' using errcode='42501'; end if;
 if lower(trim(p_email))='wincocanada@gmail.com' then raise exception 'Primary owner cannot be changed here'; end if;
 if p_role not in ('editor','publisher') or p_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'Invalid member'; end if;
 insert into public.winco_web_members(email,role,active) values(lower(trim(p_email)),p_role,p_active)
 on conflict(email) do update set role=excluded.role,active=excluded.active;
end; $$;

revoke all on function public.winco_web_role(),public.winco_web_state(),public.winco_web_save(jsonb,bigint),public.winco_web_history(),public.winco_web_version(uuid),public.winco_web_release(bigint,jsonb,text[]),public.winco_web_publication(),public.winco_web_public_file(text),public.winco_web_member_list(),public.winco_web_member_set(text,text,boolean) from public,anon,authenticated;
grant execute on function public.winco_web_role(),public.winco_web_state(),public.winco_web_save(jsonb,bigint),public.winco_web_history(),public.winco_web_version(uuid),public.winco_web_release(bigint,jsonb,text[]),public.winco_web_member_list(),public.winco_web_member_set(text,text,boolean) to authenticated;
grant execute on function public.winco_web_publication(),public.winco_web_public_file(text) to anon,authenticated;
insert into public.winco_web_members(email,role) values('wincocanada@gmail.com','owner');

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('winco-website','winco-website',false,5242880,array['image/webp']);
create policy winco_web_upload on storage.objects for insert to authenticated with check (
 bucket_id='winco-website' and public.winco_web_role() is not null and (storage.foldername(name))[1]=auth.uid()::text and name ~ '^[a-f0-9-]{36}/[a-f0-9-]{36}\.webp$'
);
create policy winco_web_staff_read on storage.objects for select to authenticated using(bucket_id='winco-website' and public.winco_web_role() is not null);
create policy winco_web_released_read on storage.objects for select to anon,authenticated using(bucket_id='winco-website' and public.winco_web_public_file(name));
-- No update/delete policy: immutable uploads preserve rollback and audit history.
commit;
