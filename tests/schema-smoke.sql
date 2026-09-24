-- Run in Supabase SQL Editor. All test records roll back; no app tables are used.
begin;
do $$
declare v bigint; result jsonb; released uuid;
begin
 perform set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000000001","email":"cms-test@example.invalid","role":"authenticated"}',true);
 if public.winco_web_role() is not null then raise exception 'Unregistered user has a role'; end if;
 begin perform public.winco_web_state(); raise exception 'Unregistered read allowed'; exception when insufficient_privilege then null; end;
 insert into public.winco_web_members(email,role) values('cms-test@example.invalid','editor');
 result:=public.winco_web_state();v:=coalesce((result->'draft'->>'version')::bigint,0);
 result:=public.winco_web_save('{"schema":1,"pages":[]}'::jsonb,v);v:=(result->>'version')::bigint;
 if public.winco_web_history()->0->>'draft_version' <> v::text then raise exception 'History missing';end if;
 begin perform public.winco_web_release(v,'{"schema":1,"pages":[]}'::jsonb,'{}');raise exception 'Editor publish allowed'; exception when insufficient_privilege then null;end;
 begin perform public.winco_web_member_list();raise exception 'Editor member list allowed';exception when insufficient_privilege then null;end;
 begin perform public.winco_web_save('{"schema":1,"pages":[]}'::jsonb,v-1);raise exception 'Conflict not detected';exception when raise_exception then if sqlerrm<>'EDIT_CONFLICT' then raise;end if;end;
 perform set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000000002","email":"wincocanada@gmail.com","role":"authenticated"}',true);
 if public.winco_web_role()<>'owner' then raise exception 'Owner role missing';end if;
 released:=public.winco_web_release(v,'{"schema":1,"pages":[]}'::jsonb,'{}');
 if released is null then raise exception 'Release missing';end if;
 if public.winco_web_release(v,'{"schema":1,"pages":[]}'::jsonb,'{}')<>released then raise exception 'Release not idempotent';end if;
 perform public.winco_web_member_list();
end $$;
rollback;
select 'PASS: unregistered access, editor save, publish denial, member denial, version conflict, owner publish and idempotence; all test writes rolled back' as cms_checks;
