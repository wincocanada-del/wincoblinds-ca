import config from '../../cms/config.json' with {type:'json'};
import { validateSite, imagePaths } from '../../cms/render.mjs';
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export default async request=>{
 if(request.method!=='POST')return reply({error:'Method not allowed'},405);
 if(request.headers.get('origin')!==config.siteUrl)return reply({error:'Origin not allowed'},403);
 const auth=request.headers.get('authorization');
 if(!auth?.startsWith('Bearer '))return reply({error:'Sign in required'},401);
 const rpc=async(name,args={})=>{
  const r=await fetch(config.supabaseUrl+'/rest/v1/rpc/'+name,{method:'POST',headers:{apikey:config.supabaseAnonKey,Authorization:auth,'Content-Type':'application/json'},body:JSON.stringify(args)});
  if(!r.ok)throw new Error(r.status===401||r.status===403?'Not authorized':'Save conflict or service unavailable');
  return r.json();
 };
 try{
  const hook=process.env.WEBSITE_BUILD_HOOK;
  if(!hook||!hook.startsWith('https://api.netlify.com/build_hooks/'))return reply({error:'게시 연결 설정이 아직 완료되지 않았습니다.'},503);
  const input=await request.json();
  const state=await rpc('winco_web_state');
  if(!['owner','publisher'].includes(state.role))return reply({error:'게시 권한이 없습니다.'},403);
  if(!state.draft||input.version!==state.draft.version)return reply({error:'다른 변경이 저장되었습니다. 새로 불러온 뒤 게시해 주세요.'},409);
  const data=structuredClone(state.draft.data);
  const errors=validateSite(data);if(errors.length)return reply({error:errors.join('\n')},400);
  // Strip unpublished pages and unused private uploads from the public build snapshot.
  data.pages=data.pages.filter(p=>p.visible).map(p=>({...p,blocks:p.blocks.filter(b=>!b.hidden)}));
  data.navigation=data.navigation.filter(n=>!n.hidden);
  const files=imagePaths(data).filter(x=>x.startsWith('/media/')).map(x=>x.slice(7));
  data.media=data.media.filter(m=>files.includes(m.path));
  const release=await rpc('winco_web_release',{p_expected:input.version,p_data:data,p_files:files});
  const hookUrl=new URL(hook);hookUrl.searchParams.set('trigger_title','Website content '+release);
  const deployed=await fetch(hookUrl,{method:'POST',body:JSON.stringify({release}),headers:{'Content-Type':'application/json'}});
  if(!deployed.ok)return reply({error:'게시 요청을 저장했지만 배포 시작을 확인하지 못했습니다. 다시 게시해 주세요.',release},502);
  return reply({release,status:'building'});
 }catch(error){return reply({error:error.message==='Not authorized'?'관리자 로그인이 필요합니다.':'게시하지 못했습니다. 로그인과 저장 상태를 확인해 주세요.'},400);}
};
