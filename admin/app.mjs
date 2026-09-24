import { createClient } from '@supabase/supabase-js';
import config from '../cms/config.json' with {type:'json'};
import seed from '../cms/seed.json' with {type:'json'};
import {esc,fieldsFor,templateLabel,genericTemplates,renderPage,validateSite,imagePaths} from '../cms/render.mjs';

const demo=['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).has('demo');
const api=createClient(config.supabaseUrl,config.supabaseAnonKey,{auth:{storageKey:'winco-website-auth',flowType:'pkce',detectSessionInUrl:true}});
let user=null,role=null,data=null,version=0,dirty=false,tab='dashboard',selected='index',busy=false,history=[],members=[],mediaTarget=null,mediaUrls={},publication=null,poll=null;
const root=document.querySelector('#app');
const clone=x=>structuredClone(x);
const date=x=>new Date(x).toLocaleString('ko-KR');
function toast(message){const el=document.querySelector('#message');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),7000);}
const rpc=async(name,args={})=>{const{data,error}=await api.rpc('winco_web_'+name,args);if(error)throw Error(error.message.includes('EDIT_CONFLICT')?'다른 직원의 변경이 저장되었습니다. 화면을 새로 불러온 뒤 다시 편집해 주세요.':error.message);return data;};
function mark(){dirty=true;document.querySelector('#save-state')?.replaceChildren(document.createTextNode('저장하지 않은 변경'));}
const button=(label,action,attrs='',cls='')=>`<button class="${cls}" data-action="${action}" ${attrs}>${label}</button>`;
const input=(label,value,attrs='',type='text')=>`<label><span>${esc(label)}</span><input type="${type}" value="${esc(value)}" ${attrs}></label>`;
function imageField(label,value,scope,attrs=''){return `<label>${esc(label)}<div class="image-field"><img src="${esc(mediaUrls[value]||('/'+value.replace(/^\//,'')))}" alt="선택한 사진"><div>${button('사진 선택 / 변경','choose-image',`data-scope="${scope}" ${attrs}`)}<small>${esc(value)}</small></div></div></label>`;}
const current=()=>data.pages.find(p=>p.slug===selected)||data.pages[0];
function login(message='초대받은 이메일로 로그인해 주세요. 받은 메일의 로그인 링크를 누르면 이 화면으로 돌아옵니다.'){
 root.innerHTML=`<section class="login"><img src="/assets/images/logo/winco-original.png" alt="Winco"><h1>홈페이지 관리</h1><p>${esc(message)}</p><form id="login-form">${input('관리자 이메일','wincocanada@gmail.com','name="email" required autocomplete="email"','email')}<button class="primary" type="submit">이메일로 로그인 링크 받기</button></form><p class="muted">관리 권한이 있는 직원만 콘텐츠를 편집할 수 있습니다.</p><a href="/">홈페이지로 돌아가기 ↗</a></section>`;
}
async function load(){
 if(demo){user={id:'00000000-0000-4000-8000-000000000000',email:'로컬 화면 테스트'};role='owner';data=clone(seed);render();return;}
 const{data:auth,error}=await api.auth.getUser();if(error||!auth.user){login();return;}user=auth.user;
 try{const state=await rpc('state');role=state.role;data=state.draft?.data||clone(seed);version=state.draft?.version||0;dirty=false;publication=await liveVersion();await refreshMedia();render();}catch{login('로그인은 확인됐지만 홈페이지 관리 권한이 없습니다. 관리 담당자에게 이메일 등록을 요청해 주세요.');root.insertAdjacentHTML('beforeend','<div style="text-align:center">'+button('로그아웃','logout')+'</div>');}
}
async function liveVersion(){try{const r=await fetch('/website-version.json?t='+Date.now(),{cache:'no-store'});return r.ok?await r.json():null;}catch{return null;}}
function render(){
 const nav=[['dashboard','대시보드'],['pages','페이지 편집'],['menus','메뉴 관리'],['gallery','시공 갤러리'],['catalog','제품·원단'],['posts','소식·글'],['settings','매장 정보'],['history','변경 이력'],...(role==='owner'?[['members','직원 관리']]:[])];
 root.innerHTML=`<header class="app-header"><div><img src="/assets/images/logo/winco-original.png" alt="Winco"><div class="identity">${esc(user.email)} · ${esc(role)}</div></div><div class="actions"><span id="save-state" class="status-pill">${demo?'로컬 테스트 · 실제 저장 안 됨':dirty?'저장하지 않은 변경':`저장 버전 ${version}`}</span>${button('초안 저장','save','', 'primary')}${button('미리보기','preview')}${['owner','publisher'].includes(role)?button('게시','publish','','primary'):''}<a href="/" target="_blank" rel="noopener">홈페이지 ↗</a>${button('로그아웃','logout')}</div></header><div class="layout"><aside class="sidebar">${nav.map(([key,label])=>button(label,'tab',`data-tab="${key}"${tab===key?' aria-current="page"':''}`)).join('')}<div class="foot">문의 알림은 Winco Gmail로 전달됩니다.<br><a href="https://app.netlify.com/projects/wincohomepage/forms" target="_blank" rel="noopener">문의함 열기 ↗</a></div></aside><main>${content()}</main></div>`;
}
function content(){
 const top=(title,desc,actions='')=>`<div class="topline"><div><h1>${title}</h1><p class="muted">${desc}</p></div><div class="actions">${actions}</div></div>`;
 if(tab==='dashboard')return top('홈페이지 관리','내용을 수정한 뒤 초안을 저장하고 미리보기로 확인해 주세요.')+`<div class="stats"><div class="card stat"><span>페이지</span><strong>${data.pages.filter(p=>p.kind==='page').length}</strong></div><div class="card stat"><span>시공 사진</span><strong>${data.gallery.length}</strong></div><div class="card stat"><span>소식·글</span><strong>${data.pages.filter(p=>p.kind==='post').length}</strong></div></div><div class="card"><h2>수정에서 게시까지</h2><p>① 내용·사진 수정 → ② 초안 저장 → ③ PC/휴대폰 미리보기 → ④ 게시</p><p>초안은 고객에게 보이지 않습니다. 게시 버튼을 누르면 공개할 내용을 확정하고 홈페이지 갱신을 시작합니다.</p><p id="publish-status">${publication?.release?`현재 공개 버전: ${esc(publication.release.slice(0,8))}`:'현재 홈페이지가 운영 중입니다.'}</p>${button('페이지 편집 시작','tab','data-tab="pages"')}${button('게시 상태 새로 확인','status')}</div><div class="note">고객 문의 양식과 기본 페이지는 보호됩니다. 새 페이지·글은 숨김 상태로 작성할 수 있습니다.</div>`;
 if(tab==='pages'||tab==='posts'){
  const list=data.pages.filter(p=>p.kind===(tab==='posts'?'post':'page'));let p=current();if(!list.includes(p))p=list[0];
  if(!p)return top('소식·글','공지와 새로운 소식을 작성해 보세요.',button('새 글 만들기','add-page','data-kind="post"'));
  selected=p.slug;
  return top(tab==='posts'?'소식·글':'페이지 편집','왼쪽에서 페이지를 고르고 내용 블록을 펼쳐 수정하세요.',button(tab==='posts'?'새 글 만들기':'새 페이지 만들기','add-page',`data-kind="${tab==='posts'?'post':'page'}"`))+`<div class="editor"><div class="page-list">${list.map(x=>button(esc(x.title),'select-page',`data-slug="${esc(x.slug)}"`,x.slug===p.slug?'selected':'')).join('')}</div><div><section class="card"><h2>페이지 정보</h2>${input('페이지 제목',p.title,'data-page-field="title"')}${input('검색 결과 소개',p.description,'data-page-field="description"')}<p class="muted">주소: /${esc(p.slug==='index'?'':p.slug)}</p>${!seed.pages.some(x=>x.slug===p.slug)?`<label><input style="width:auto" type="checkbox" data-page-visible ${p.visible?'checked':''}> 게시에 포함</label>`:''}</section>${p.blocks.map((b,i)=>`<details class="card" ${i===0?'open':''}><summary class="block-header"><strong>${esc(templateLabel(b))}</strong><span class="muted">${b.hidden?'숨김':'내용 블록'}</span></summary><div class="block-actions">${button('↑ 위로','block-up',`data-index="${i}"`)}${button('↓ 아래로','block-down',`data-index="${i}"`)}${button(b.hidden?'표시':'숨기기','block-toggle',`data-index="${i}"`)}${button('삭제','block-remove',`data-index="${i}"`,'danger')}</div><div class="fields">${fieldsFor(b).length?fieldsFor(b).map(f=>fieldEditor(b,f,i)).join(''):`<p>이 목록은 왼쪽의 ${b.template==='gallery'?'시공 갤러리':'제품·원단'}에서 편집합니다.</p>`}</div></details>`).join('')}<section class="card"><h2>내용 블록 추가</h2><div class="actions">${Object.entries(genericTemplates).filter(([key])=>key!=='intro').map(([key,t])=>button(t.label,'add-block',`data-template="${key}"`)).join('')}</div></section></div></div>`;
 }
 if(tab==='menus')return top('메뉴 관리','상위 메뉴와 하위 메뉴를 만들고 표시 순서를 바꿉니다.',button('메뉴 추가','menu-add'))+data.navigation.map((n,i)=>`<section class="card"><div class="menu-row">${input('메뉴 이름',n.label,`data-menu="${i}" data-field="label"`)}${n.children?.length?'<p>하위 메뉴가 있는 묶음</p>':input('연결 주소',n.url,`data-menu="${i}" data-field="url"`)}<div class="actions">${button('↑','menu-up',`data-index="${i}"`)}${button('↓','menu-down',`data-index="${i}"`)}${button('삭제','menu-remove',`data-index="${i}"`,'danger')}</div></div>${(n.children||[]).map(([label,url],j)=>`<div class="child-menu menu-row">${input('하위 메뉴 이름',label,`data-menu="${i}" data-child="${j}" data-slot="0"`)}${input('연결 주소',url,`data-menu="${i}" data-child="${j}" data-slot="1"`)}<div class="actions">${button('↑','child-up',`data-index="${i}" data-child="${j}"`)}${button('↓','child-down',`data-index="${i}" data-child="${j}"`)}${button('삭제','child-remove',`data-index="${i}" data-child="${j}"`,'danger')}</div></div>`).join('')}${button('하위 메뉴 추가','child-add',`data-index="${i}"`)}</section>`).join('')+`<div class="card"><h2>사용 가능한 페이지 주소</h2><p>${data.pages.filter(p=>p.visible).map(p=>`${esc(p.title)}: <code>${esc(p.slug)}.html</code>`).join('<br>')}</p></div>`;
 if(tab==='gallery')return top('시공 갤러리','사진과 제목·공간 분류를 관리합니다.',button('사진 항목 추가','gallery-add'))+`<div class="gallery-admin">${data.gallery.map((g,i)=>`<article class="card">${imageField('시공 사진',g.image,'gallery',`data-index="${i}"`)}${['title','category','alt'].map((key,j)=>input(['제목','공간 분류','사진 설명'][j],g[key],`data-gallery="${i}" data-field="${key}"`)).join('')}<div class="actions">${button('↑','gallery-up',`data-index="${i}"`)}${button('↓','gallery-down',`data-index="${i}"`)}${button('삭제','gallery-remove',`data-index="${i}"`,'danger')}</div></article>`).join('')}</div>`;
 if(tab==='catalog')return top('제품·원단','제품 소개 문구는 페이지 편집에서, 원단 목록은 이곳에서 수정합니다.')+Object.entries(data.catalog).map(([group,items])=>`<section class="card"><div class="topline"><h2>${group==='dualShades'?'Dual shades':'Roller shades'}</h2>${button('원단 추가','fabric-add',`data-group="${group}"`)}</div>${items.map((f,i)=>`<details class="card"><summary>${esc(f.name)}</summary><div class="fields">${['name','type','slug'].map((key,j)=>input(['원단 이름','분류','고유 주소 (영문·숫자·하이픈)'][j],f[key],`data-fabric="${i}" data-group="${group}" data-field="${key}"`)).join('')}${imageField('원단 사진',f.image.startsWith('/')||f.image.startsWith('assets/')?f.image:'assets/images/website/'+f.image,'fabric',`data-group="${group}" data-index="${i}"`)}<div class="actions">${button('↑','fabric-up',`data-group="${group}" data-index="${i}"`)}${button('↓','fabric-down',`data-group="${group}" data-index="${i}"`)}${button('삭제','fabric-remove',`data-group="${group}" data-index="${i}"`,'danger')}</div></div></details>`).join('')}</section>`).join('');
 if(tab==='settings')return top('매장 정보','공통 로고와 연락처·영업시간을 수정합니다.')+`<section class="card">${imageField('로고',data.settings.logo,'logo')}${Object.entries({name:'업체명',phone:'화면에 표시할 전화번호',phoneDigits:'전화 연결 번호 (+1 포함, 숫자만)',email:'공개 연락 이메일',address:'도로명 주소',city:'도시·주·우편번호',weekdayHours:'평일 영업시간',saturdayHours:'토요일 영업시간',sundayHours:'일요일 안내',instagram:'Instagram 주소'}).map(([key,label])=>input(label,data.settings[key],`data-setting="${key}"`)).join('')}<p class="note">공개 연락 이메일을 바꿔도 문의 수신 알림 주소는 자동으로 바뀌지 않습니다. 문의 알림은 Netlify 설정에서 별도로 변경합니다.</p></section>`;
 if(tab==='history')return top('변경 이력','이전 내용을 불러온 뒤 새 초안으로 저장하고 게시할 수 있습니다.')+`<section class="card table-wrap"><table><thead><tr><th>버전</th><th>저장 시각</th><th>게시 요청</th><th></th></tr></thead><tbody>${history.map(h=>`<tr><td>${h.draft_version}</td><td>${date(h.created_at)}</td><td>${h.release_id?esc(h.release_id.slice(0,8)):'초안'}</td><td>${button('초안으로 불러오기','restore',`data-id="${h.id}"`)}</td></tr>`).join('')}</tbody></table></section>`;
 if(tab==='members')return top('직원 관리','등록된 이메일의 직원만 로그인 후 편집할 수 있습니다.')+`<section class="card"><h2>직원 권한 추가</h2><form id="member-form">${input('직원 이메일','','name="email" required','email')}<label><span>권한</span><select name="role"><option value="editor">편집 직원 · 초안 저장만</option><option value="publisher">게시 담당자 · 편집과 게시</option></select></label><button class="primary" type="submit">권한 추가</button></form><p class="muted">등록 후 직원에게 /admin/ 주소를 알려주세요. 직원이 자신의 이메일로 로그인합니다. 이 버튼은 초대 메일을 보내지 않습니다.</p></section><section class="card table-wrap"><table><thead><tr><th>이메일</th><th>권한</th><th>상태</th><th></th></tr></thead><tbody>${members.map(m=>`<tr><td>${esc(m.email)}</td><td>${esc(m.role)}</td><td>${m.active?'활성':'비활성'}</td><td>${m.role==='owner'?'기본 관리자':button(m.active?'접근 해제':'접근 복구','member-toggle',`data-email="${esc(m.email)}" data-role="${m.role}" data-active="${!m.active}"`)}</td></tr>`).join('')}</tbody></table></section>`;
 return '';
}
function fieldEditor(b,f,i){const value=b.values[f.key]||'';const attrs=`data-block="${i}" data-key="${f.key}"`;if(f.kind==='image')return imageField(f.label,value,'block',attrs);if(f.kind==='text')return `<label><span>${esc(f.label)}</span><textarea ${attrs}>${esc(value)}</textarea></label>`;return input(f.label,value,attrs);}
async function save(){
 if(demo){toast('로컬 화면 테스트에서는 실제 저장하지 않습니다.');return false;}
 const errors=validateSite(data);if(errors.length){toast(errors.slice(0,5).join('\n'));return false;}
 const r=await rpc('save',{p_data:data,p_expected:version});version=r.version;dirty=false;render();toast('초안을 저장했습니다. 아직 홈페이지에는 공개되지 않았습니다.');return true;
}
async function refreshMedia(){
 if(demo)return;
 const paths=imagePaths(data).filter(x=>x.startsWith('/media/'));
 await Promise.all(paths.map(async path=>{const r=await api.storage.from('winco-website').createSignedUrl(path.slice(7),3600);if(r.data)mediaUrls[path]=r.data.signedUrl;}));
}
async function showMedia(){
 const items=new Map();
 for(const src of [...imagePaths(seed),...imagePaths(data),...data.media.map(m=>'/media/'+m.path)])items.set(src,src);
 if(!demo)await Promise.all([...items.keys()].filter(x=>x.startsWith('/media/')&&!mediaUrls[x]).map(async path=>{const r=await api.storage.from('winco-website').createSignedUrl(path.slice(7),3600);if(r.data)mediaUrls[path]=r.data.signedUrl;}));
 document.querySelector('#media-grid').innerHTML=[...items].map(([src])=>`<button data-action="pick-image" data-src="${esc(src)}"><img src="${esc(mediaUrls[src]||'/'+src.replace(/^\//,''))}" alt="사진 미리보기">${esc(src.split('/').pop())}</button>`).join('');
 document.querySelector('#media-dialog').showModal();
}
function move(list,i,delta){const j=i+delta;if(j>=0&&j<list.length)[list[i],list[j]]=[list[j],list[i]];}
async function action(el){
 const a=el.dataset.action,i=Number(el.dataset.index),j=Number(el.dataset.child),group=el.dataset.group;
 if(a==='logout'){if(dirty&&!confirm('저장하지 않은 변경이 있습니다. 로그아웃할까요?'))return;await api.auth.signOut({scope:'local'});location.href='/admin/';return;}
 if(a==='tab'){tab=el.dataset.tab;if(tab==='history')history=demo?[]:await rpc('history');if(tab==='members')members=demo?[{email:user.email,role,active:true}]:await rpc('member_list');render();return;}
 if(a==='select-page'){selected=el.dataset.slug;render();return;}
 if(a==='save'){await save();return;}
 if(a==='status'){publication=await liveVersion();render();toast(publication?.release?'공개 버전: '+publication.release:'아직 관리자 게시 이력이 없습니다.');return;}
 if(a==='preview'){
  const errors=validateSite(data);if(errors.length){toast(errors.slice(0,5).join('\n'));return;}
  await refreshMedia();const frame=document.querySelector('#preview-dialog iframe');frame.srcdoc=renderPage(data,current(),{preview:true,mediaUrls});document.querySelector('#preview-dialog').showModal();return;
 }
 if(a==='preview-mobile'||a==='preview-desktop'){document.querySelector('#preview-dialog iframe').style.width=a==='preview-mobile'?'390px':'100%';return;}
 if(a==='close-preview'){document.querySelector('#preview-dialog').close();return;}
 if(a==='close-media'){document.querySelector('#media-dialog').close();return;}
 if(a==='choose-image'){mediaTarget={...el.dataset};await showMedia();return;}
 if(a==='pick-image'){
  const src=el.dataset.src,t=mediaTarget;
  if(t.scope==='logo')data.settings.logo=src;
  if(t.scope==='block')current().blocks[Number(t.block)].values[t.key]=src;
  if(t.scope==='gallery')data.gallery[Number(t.index)].image=src;
  if(t.scope==='fabric')data.catalog[t.group][Number(t.index)].image=src;
  document.querySelector('#media-dialog').close();mark();render();return;
 }
 if(a==='publish'){
  if(demo){toast('로컬 화면 테스트에서는 게시하지 않습니다.');return;}
  if(!confirm('현재 내용을 공개 홈페이지에 게시할까요? 숨김 페이지는 공개되지 않습니다.'))return;
  if(dirty||!version){if(!await save())return;}
  const{data:session}=await api.auth.getSession();
  const r=await fetch('/.netlify/functions/website-publish',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+session.session.access_token},body:JSON.stringify({version})});const result=await r.json();if(!r.ok)throw Error(result.error);
  toast('게시를 시작했습니다. 실제 반영 여부를 확인하고 있습니다.');tab='dashboard';render();document.querySelector('#publish-status').textContent='게시 준비 중 · 잠시 후 실제 홈페이지 반영을 확인합니다.';
  clearInterval(poll);let count=0;poll=setInterval(async()=>{const live=await liveVersion();count++;if(live?.release===result.release){clearInterval(poll);publication=live;document.querySelector('#publish-status')?.replaceChildren(document.createTextNode('게시 완료 · '+date(live.builtAt)));toast('홈페이지 게시가 완료됐습니다.');}else if(count>=60){clearInterval(poll);document.querySelector('#publish-status')?.replaceChildren(document.createTextNode('게시 완료를 아직 확인하지 못했습니다. Netlify 배포 상태를 확인한 뒤 다시 게시할 수 있습니다.'));}},6000);return;
 }
 if(a==='restore'){if(!confirm('선택한 버전의 내용을 편집 화면으로 불러올까요? 현재 저장하지 않은 변경은 대체됩니다.'))return;const old=await rpc('version',{p_id:el.dataset.id});data=old.data;dirty=true;await refreshMedia();tab='pages';selected='index';render();toast('이전 내용을 불러왔습니다. 초안 저장 후 미리보기와 게시를 진행하세요.');return;}
 if(a==='member-toggle'){if(!confirm(el.dataset.email+'의 접근 권한을 변경할까요?'))return;await rpc('member_set',{p_email:el.dataset.email,p_role:el.dataset.role,p_active:el.dataset.active==='true'});members=await rpc('member_list');render();return;}
 if(a==='add-page'){
  const slug=prompt('새 페이지 주소를 입력하세요. 예: summer-news (영문·숫자·하이픈)');if(!slug)return;
  if(!/^[a-z][a-z0-9-]{0,63}$/.test(slug)||['admin','app','assets','media','api','robots','sitemap','netlify'].includes(slug)||data.pages.some(p=>p.slug===slug)){toast('사용할 수 없거나 중복된 주소입니다.');return;}
  data.pages.push({slug,title:'새 페이지',description:'페이지 소개를 입력해 주세요.',kind:el.dataset.kind,visible:false,blocks:[{id:crypto.randomUUID(),template:'intro',hidden:false,values:{eyebrow:'WINCO',title:'새 페이지',body:'내용을 입력해 주세요.'}}]});selected=slug;tab=el.dataset.kind==='post'?'posts':'pages';
 }else if(a==='add-block'){const t=el.dataset.template;current().blocks.push({id:crypto.randomUUID(),template:t,hidden:false,values:Object.fromEntries(genericTemplates[t].fields.map(([key,label,kind])=>[key,kind==='image'?seed.settings.logo:kind==='url'?'contact.html':key==='title'?'새 내용':'']))});}
 else if(a.startsWith('block-')){const list=current().blocks,b=list[i];if(b.template.startsWith('contact-')&&['block-toggle','block-remove'].includes(a)){toast('고객 문의 페이지의 기본 구성은 유지됩니다. 내용과 사진을 수정해 주세요.');return;}if(a==='block-up')move(list,i,-1);if(a==='block-down')move(list,i,1);if(a==='block-toggle')b.hidden=!b.hidden;if(a==='block-remove'){if(!confirm('이 내용 블록을 초안에서 삭제할까요?'))return;list.splice(i,1);}}
 else if(a==='menu-add')data.navigation.push({label:'새 메뉴',url:'index.html'});
 else if(a==='child-add'){const n=data.navigation[i];if(!n.children?.length)n.children=[[n.label,n.url||'index.html']];n.children.push(['새 하위 메뉴','index.html']);delete n.url;}
 else if(a==='child-up')move(data.navigation[i].children,j,-1);
 else if(a==='child-down')move(data.navigation[i].children,j,1);
 else if(a==='child-remove'){data.navigation[i].children.splice(j,1);if(!data.navigation[i].children.length){delete data.navigation[i].children;data.navigation[i].url='index.html';}}
 else if(a==='menu-up')move(data.navigation,i,-1);
 else if(a==='menu-down')move(data.navigation,i,1);
 else if(a==='menu-remove'){if(!confirm('메뉴를 초안에서 삭제할까요? 연결된 페이지는 유지됩니다.'))return;data.navigation.splice(i,1);}
 else if(a==='gallery-add')data.gallery.push({image:seed.gallery[0].image,title:'새 시공 사진',category:'Living spaces',alt:'사진 내용을 설명해 주세요.'});
 else if(a==='gallery-up')move(data.gallery,i,-1);
 else if(a==='gallery-down')move(data.gallery,i,1);
 else if(a==='gallery-remove'){if(!confirm('갤러리에서 이 항목을 삭제할까요? 원본 사진과 과거 기록은 유지됩니다.'))return;data.gallery.splice(i,1);}
 else if(a==='fabric-add')data.catalog[group].push({name:'새 원단',type:'Light Filtering',slug:'fabric-'+Date.now(),image:seed.catalog[group][0].image});
 else if(a==='fabric-up')move(data.catalog[group],i,-1);
 else if(a==='fabric-down')move(data.catalog[group],i,1);
 else if(a==='fabric-remove'){if(!confirm('원단 항목을 초안에서 삭제할까요?'))return;data.catalog[group].splice(i,1);}
 else return;
 mark();render();
}
document.addEventListener('click',async event=>{const el=event.target.closest('[data-action]');if(!el||busy)return;event.preventDefault();busy=true;el.disabled=true;try{await action(el);}catch(error){toast(error.message||'처리하지 못했습니다. 다시 시도해 주세요.');}finally{busy=false;el.disabled=false;}});
document.addEventListener('input',event=>{const el=event.target,d=el.dataset;if(!data)return;
 if(d.pageField)current()[d.pageField]=el.value;
 else if('pageVisible'in d)current().visible=el.checked;
 else if(d.block!==undefined)current().blocks[Number(d.block)].values[d.key]=el.value;
 else if(d.menu!==undefined){const n=data.navigation[Number(d.menu)];if(d.child!==undefined)n.children[Number(d.child)][Number(d.slot)]=el.value;else n[d.field]=el.value;}
 else if(d.gallery!==undefined)data.gallery[Number(d.gallery)][d.field]=el.value;
 else if(d.fabric!==undefined)data.catalog[d.group][Number(d.fabric)][d.field]=el.value;
 else if(d.setting)data.settings[d.setting]=el.value;
 else return;mark();
});
document.addEventListener('submit',async event=>{event.preventDefault();if(busy)return;busy=true;const form=event.target,submit=form.querySelector('button[type=submit]');if(submit)submit.disabled=true;
 try{const values=new FormData(form);if(form.id==='login-form'){const email=String(values.get('email')).trim().toLowerCase();const{error}=await api.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+'/admin/',shouldCreateUser:true}});if(error)throw error;toast('로그인 메일을 보냈습니다. 받은편지함과 스팸함을 확인해 주세요.');}
 if(form.id==='member-form'){if(demo){toast('로컬 테스트에서는 계정을 추가하지 않습니다.');return;}await rpc('member_set',{p_email:values.get('email'),p_role:values.get('role'),p_active:true});members=await rpc('member_list');render();toast('직원 권한을 등록했습니다.');}}
 catch(error){toast(error.message);}finally{busy=false;if(submit)submit.disabled=false;}
});
document.querySelector('#upload-file').addEventListener('change',async event=>{
 const file=event.target.files[0];if(!file)return;if(demo){toast('사진 업로드는 실제 관리자 로그인 후 사용할 수 있습니다.');return;}
 try{
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>20*1024*1024)throw Error('20MB 이하의 JPG, PNG, WebP 사진을 선택해 주세요.');
  toast('사진을 최적화하고 업로드하고 있습니다.');
  const bitmap=await createImageBitmap(file);if(bitmap.width*bitmap.height>45000000){bitmap.close();throw Error('사진 해상도가 너무 큽니다. 작은 파일을 선택해 주세요.');}
  const scale=Math.min(1,1920/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.85));if(!blob||blob.type!=='image/webp'||blob.size>5*1024*1024)throw Error('사진 변환에 실패했습니다. 다른 사진을 선택해 주세요.');
  const path=user.id+'/'+crypto.randomUUID()+'.webp';const{error}=await api.storage.from('winco-website').upload(path,blob,{contentType:'image/webp',upsert:false});if(error)throw error;
  data.media.push({path,name:file.name});mark();await showMedia();toast('사진을 올렸습니다. 목록에서 선택한 뒤 초안을 저장해 주세요.');
 }catch(error){toast(error.message);}finally{event.target.value='';}
});
addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
load();
