import { parseHTML } from 'linkedom';
import registry from './templates.json' with { type:'json' };

export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const plain=value=>String(value??'').split('\n').map(esc).join('<br>');
export const builtins=['index','products','dual-shades','roller-shades','motorized-blinds','about','services','gallery','guides','faq','reviews','blog','care','contact'];
export const genericTemplates={
 'intro':{label:'페이지 제목',fields:[['eyebrow','작은 제목'],['title','큰 제목'],['body','소개 내용']]},
 'text':{label:'제목과 본문',fields:[['title','제목'],['body','본문']]},
 'image-text':{label:'사진과 글',fields:[['title','제목'],['body','본문'],['image','사진','image'],['alt','사진 설명','alt'],['button','버튼 문구'],['url','연결 주소','url']]},
 'callout':{label:'안내와 버튼',fields:[['title','제목'],['body','내용'],['button','버튼 문구'],['url','연결 주소','url']]},
 'faq':{label:'질문과 답변',fields:[['title','질문'],['body','답변']]}
};
export function fieldsFor(block){return registry.templates[block.template]?.fields || (genericTemplates[block.template]?.fields||[]).map(([key,label,kind='text'])=>({key,label,kind}));}
export const templateLabel=block=>registry.templates[block.template]?.label||genericTemplates[block.template]?.label||({'gallery':'시공 갤러리','catalog-dual':'듀얼 원단 목록','catalog-roller':'롤러 원단 목록'}[block.template])||block.template;
export function safeImage(value){return typeof value==='string' && /^(?:\/?assets\/images\/[a-zA-Z0-9_./ -]+\.(?:png|jpe?g|webp|svg)|\/media\/[a-f0-9-]{36}\/[a-f0-9-]{36}\.webp)$/.test(value) && !value.includes('..');}
export function safeLink(value){
 if(typeof value!=='string'||value.length>1200||/[\x00-\x20\\<>"']/.test(value))return false;
 if(value==='/')return true;
 if(/^https:\/\//.test(value)){try{return !new URL(value).username&&!new URL(value).password;}catch{return false;}}
 if(/^mailto:[a-zA-Z0-9_.+%-]+@[a-zA-Z0-9.-]+(?:\?[^\s]*)?$/.test(value)||/^tel:\+?[0-9()-]+$/.test(value))return true;
 if(value.startsWith('//')||value.includes('..')||value.includes('%'))return /^contact(?:\.html)?\?product=[a-zA-Z0-9%_-]+$/.test(value);
 return /^(?:\/?[a-z0-9-]+(?:\.html)?)?(?:\?[a-zA-Z0-9=&_-]+)?(?:#[a-zA-Z0-9_-]+)?$/.test(value) && !/^\/?(?:app|admin|assets|media|api)(?:[/?#.]|$)/.test(value);
}
const link=(label,url)=>`<a class="text-link" href="${esc(url)}">${esc(label)}<span aria-hidden="true">↗</span></a>`;
const photo=(src,alt)=>`<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
function gallery(data){return `<section class="wrap gallery-section"><div class="filter-bar" role="group" aria-label="Filter gallery">${['all',...new Set(data.gallery.map(x=>x.category))].map((c,i)=>`<button class="filter-button" data-filter="${esc(c)}" aria-pressed="${i===0}">${i===0?'All spaces':esc(c)}</button>`).join('')}</div><p class="filter-status" role="status">${data.gallery.length} photos</p><div class="gallery-grid">${data.gallery.map(g=>`<figure class="gallery-item" data-category="${esc(g.category)}"><button class="gallery-open" data-photo="${esc(g.image)}" data-caption="${esc(g.title)}" aria-label="Enlarge: ${esc(g.title)}">${photo(g.image,g.alt)}<span aria-hidden="true">+</span></button><figcaption><span>${esc(g.category)}</span><h2>${esc(g.title)}</h2></figcaption></figure>`).join('')}</div><dialog class="photo-dialog" aria-labelledby="photo-caption"><button class="dialog-close" aria-label="Close photo">Close ×</button><img src="${esc(data.gallery[0]?.image||data.settings.logo)}" alt="" id="dialog-photo"><p id="photo-caption"></p></dialog></section>`;}
function catalog(data,group){const items=data.catalog[group];return `<section class="section wrap" id="fabrics"><div class="section-heading"><div><p class="eyebrow">EXPLORE THE FABRICS</p><h2>Find your finish.</h2></div><p>Compare colour and texture in person at our showroom.</p></div><div class="filter-bar" role="group" aria-label="Filter fabrics">${['all',...new Set(items.map(x=>x.type))].map((c,i)=>`<button class="filter-button" data-filter="${esc(c)}" aria-pressed="${i===0}">${i===0?'All fabrics':esc(c)}</button>`).join('')}</div><p class="filter-status" role="status">${items.length} fabrics</p><div class="fabric-grid">${items.map(x=>`<article class="fabric-card" id="${esc(x.slug)}" data-category="${esc(x.type)}">${photo(x.image.startsWith('/')||x.image.startsWith('assets/')?x.image:'assets/images/website/'+x.image,x.name+' fabric sample')}<div><span class="eyebrow">${esc(x.type)}</span><h3>${esc(x.name)}</h3>${link('Ask about this fabric','contact.html?product='+encodeURIComponent(x.name))}</div></article>`).join('')}</div><p class="fine-print">Colours vary by screen. Fabric availability, finished sizes and operation options are confirmed with your quote.</p></section>`;}
function blockHtml(block,data){
 if(block.hidden)return '';
 if(block.template==='gallery')return gallery(data);
 if(block.template.startsWith('catalog-'))return catalog(data,block.template==='catalog-dual'?'dualShades':'rollerShades');
 const v=block.values;
 if(genericTemplates[block.template]){
  if(block.template==='intro')return `<section class="page-intro wrap"><p class="eyebrow">${esc(v.eyebrow)}</p><h1>${plain(v.title)}</h1><p class="lead">${plain(v.body)}</p></section>`;
  if(block.template==='image-text')return `<section class="section wrap story-grid"><figure>${photo(v.image,v.alt)}</figure><div><h2>${plain(v.title)}</h2><p>${plain(v.body)}</p>${v.button&&v.url?link(v.button,v.url):''}</div></section>`;
  if(block.template==='faq')return `<section class="wrap narrow"><div class="faq-list"><details><summary>${esc(v.title)}<span aria-hidden="true">+</span></summary><p>${plain(v.body)}</p></details></div></section>`;
  return `<section class="section wrap${block.template==='callout'?' tinted':''}"><div class="narrow"><h2>${plain(v.title)}</h2><p style="margin-top:24px;white-space:normal">${plain(v.body)}</p>${v.button&&v.url?link(v.button,v.url):''}</div></section>`;
 }
 const template=registry.templates[block.template];
 const {document}=parseHTML(`<html><body>${template.html}</body></html>`);
 for(const field of template.fields){
  const attr={'text':'text','image':'image','alt':'alt','url':'url'}[field.kind];
  const el=document.querySelector(`[data-cms-${attr}="${field.key}"]`);if(!el)continue;
  const value=v[field.key]??'';
  if(field.kind==='text'){
   const decorative=[...el.children].filter(c=>c.getAttribute('aria-hidden')==='true').map(c=>c.outerHTML).join('');
   el.innerHTML=plain(value)+decorative;
  }else el.setAttribute({image:'src',alt:'alt',url:'href'}[field.kind],value);
 }
 for(const el of document.querySelectorAll('[data-cms-text],[data-cms-image],[data-cms-alt],[data-cms-url]'))for(const a of [...el.attributes])if(a.name.startsWith('data-cms-'))el.removeAttribute(a.name);
 const form=document.querySelector('#enquiry-form');
 if(form){form.setAttribute('data-contact-email',data.settings.email);form.setAttribute('data-contact-phone',data.settings.phone);}
 for(const a of document.querySelectorAll('a[href]'))if(a.getAttribute('href')==='https://www.google.com/maps/search/?api=1&query=Winco%20Blinds%209790%2051%20Ave%20NW%20Edmonton')a.setAttribute('href','https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(data.settings.name+' '+data.settings.address+' '+data.settings.city));
 return document.body.innerHTML;
}
function shared(html,data){
 const defaults={logo:'assets/images/logo/winco-original.png',phone:'(780) 809-2292',phoneDigits:'+17808092292',email:'wincocanada@gmail.com',address:'9790 51 Ave NW',city:'Edmonton, AB T6E 0A6',weekdayHours:'9:00 am – 5:00 pm',saturdayHours:'10:30 am – 2:30 pm',sundayHours:'By appointment',instagram:'https://www.instagram.com/wincoblindsyeg/'};
 for(const [key,old] of Object.entries(defaults))html=html.split(old).join(esc(data.settings[key]));
 html=html.replace(/Winco Blinds(?: &amp; Window Fashion| & Window Fashion)?/g,()=>esc(data.settings.name));
 return html;
}
function header(data,slug){
 const {document}=parseHTML(`<html><body>${shared(registry.shell.header,data)}</body></html>`);
 const nav=document.querySelector('#site-nav'),cta=nav.querySelector('.nav-cta').outerHTML;
 const active=url=>!url.startsWith('https:')&&(url.split(/[?#]/)[0].replace(/^\//,'').replace(/\.html$/,'')||'index')===slug;
 const one=(label,url)=>`<a href="${esc(url)}"${active(url)?' aria-current="page"':''}>${esc(label)}</a>`;
 nav.innerHTML=data.navigation.filter(x=>!x.hidden).map(item=>item.children?.length?`<details class="nav-group"${item.children.some(([,url])=>active(url))?' data-current="true"':''}><summary>${esc(item.label)}<span aria-hidden="true">⌄</span></summary><div class="nav-dropdown">${item.children.map(([label,url])=>one(label,url)).join('')}</div></details>`:one(item.label,item.url)).join('')+cta;
 return document.body.innerHTML;
}
export function renderPage(data,page,{preview=false,mediaUrls={}}={}){
 let body=page.blocks.map(b=>blockHtml(b,data)).join('');
 if(page.slug==='blog'){
  const posts=data.pages.filter(p=>p.kind==='post'&&p.visible);
  if(posts.length)body+=`<section class="section wrap"><h2>Latest from Winco</h2><div class="choice-grid">${posts.map(p=>`<article><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>${link('Read more',p.slug+'.html')}</article>`).join('')}</div></section>`;
 }
 body=shared(body,data);
 const canonical=`https://wincoblinds.ca/${page.slug==='index'?'':page.slug}`;
 const structured=JSON.stringify({'@context':'https://schema.org','@type':'HomeGoodsStore',name:data.settings.name,url:'https://wincoblinds.ca/',telephone:data.settings.phoneDigits,email:data.settings.email,address:{'@type':'PostalAddress',streetAddress:data.settings.address,addressLocality:data.settings.city,addressCountry:'CA'}}).replaceAll('<','\\u003c');
 let html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)} | ${esc(data.settings.name)}</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="#302b27"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:image" content="https://wincoblinds.ca/assets/images/website/original-hero.jpg"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><link rel="icon" href="/assets/images/logo/favicon.svg"><link rel="stylesheet" href="/assets/css/style.css">${preview?'<meta name="robots" content="noindex,nofollow"><base href="/">':''}<script type="application/ld+json">${structured}</script><script defer src="/assets/js/main.js"></script></head><body>${header(data,page.slug)}<main id="main">${body}</main>${shared(registry.shell.footer,data)}</body></html>`;
 if(preview){
  for(const [path,url] of Object.entries(mediaUrls))html=html.split(esc(path)).join(esc(url));
  html=html.replace(/<form\b[^>]*>/g,'<form onsubmit="return false"><fieldset disabled style="border:0;padding:0;margin:0">').replaceAll('</form>','</fieldset></form>');
 }
 return html;
}
export function imagePaths(data){
 const result=new Set([data.settings.logo,...data.gallery.map(g=>g.image),...Object.values(data.catalog).flat().map(x=>x.image.startsWith('/')||x.image.startsWith('assets/')?x.image:'assets/images/website/'+x.image)]);
 for(const p of data.pages)for(const b of p.blocks)for(const f of fieldsFor(b))if(f.kind==='image'&&b.values[f.key])result.add(b.values[f.key]);
 return [...result];
}
export function validateSite(data){
 const errors=[];const fail=msg=>errors.push(msg);
 if(!data||data.schema!==1||!Array.isArray(data.pages)||!data.settings||!Array.isArray(data.navigation)||!Array.isArray(data.gallery)||!data.catalog||!Array.isArray(data.media))return ['홈페이지 데이터 형식이 올바르지 않습니다.'];
 if(JSON.stringify(data).length>1800000)fail('홈페이지 데이터가 너무 큽니다.');
 if(data.pages.length>100||data.navigation.length>8||data.gallery.length>200)fail('페이지 100개, 상위 메뉴 8개, 갤러리 200장 이내로 구성해 주세요.');
 const slugs=new Set();
 for(const p of data.pages){
  if(!/^[a-z][a-z0-9-]{0,63}$/.test(p.slug)||/^(admin|app|assets|media|api|robots|sitemap|netlify)$/.test(p.slug)||slugs.has(p.slug))fail('페이지 주소가 중복되거나 사용할 수 없습니다: '+p.slug);
  slugs.add(p.slug);
  if(!p.title?.trim()||!p.description?.trim()||!Array.isArray(p.blocks)||p.blocks.length>70)fail('페이지 제목·설명·내용을 확인해 주세요: '+p.slug);
  for(const b of p.blocks||[]){
   if(!registry.templates[b.template]&&!genericTemplates[b.template]&&!['gallery','catalog-dual','catalog-roller'].includes(b.template)){fail('알 수 없는 내용 블록입니다.');continue;}
   if(!b.values||typeof b.values!=='object'){fail('내용 블록 값이 없습니다.');continue;}
   for(const f of fieldsFor(b)){
    const value=b.values[f.key]??'';
    if(typeof value!=='string'||value.length>12000)fail('너무 긴 내용이 있습니다.');
    if(f.kind==='url'&&value&&!safeLink(value))fail('올바른 연결 주소를 입력해 주세요: '+f.label);
    if(f.kind==='url'&&!value&&(registry.templates[b.template]||b.values.button))fail('버튼의 연결 주소를 입력해 주세요: '+f.label);
    if(f.kind==='image'&&!safeImage(value))fail('사진을 선택해 주세요: '+f.label);
   }
  }
 }
 for(const slug of builtins)if(!data.pages.some(p=>p.slug===slug&&p.visible))fail('기본 페이지는 유지해야 합니다: '+slug);
 if(!data.pages.find(p=>p.slug==='contact')?.blocks.some(b=>!b.hidden&&registry.templates[b.template]?.html.includes('id="enquiry-form"')))fail('고객 문의 양식은 유지해야 합니다.');
 const checkLink=url=>{
  if(!url){fail('메뉴의 연결 주소를 입력해 주세요.');return;}
  if(!safeLink(url)){fail('올바르지 않은 메뉴/버튼 주소: '+url);return;}
  if(!/^(https:|mailto:|tel:|#)/.test(url)&&url){const slug=url.replace(/^\//,'').split(/[?#]/)[0].replace(/\.html$/,'')||'index';if(!data.pages.some(p=>p.slug===slug&&p.visible))fail('공개되지 않은 페이지로 연결됩니다: '+url);}
 };
 for(const n of data.navigation.filter(n=>!n.hidden)){if(!n.label?.trim())fail('메뉴 이름을 입력해 주세요.');if(n.children?.length){if(n.children.length>15)fail('하위 메뉴는 15개 이하로 구성해 주세요.');for(const child of n.children){if(!Array.isArray(child)||!child[0]?.trim())fail('하위 메뉴 이름을 입력해 주세요.');else checkLink(child[1]);}}else checkLink(n.url);}
 for(const p of data.pages.filter(p=>p.visible))for(const b of p.blocks.filter(b=>!b.hidden))for(const f of fieldsFor(b))if(f.kind==='url'&&b.values[f.key])checkLink(b.values[f.key]);
 for(const x of data.gallery)if(!x.title?.trim()||!x.alt?.trim()||!x.category?.trim()||!safeImage(x.image))fail('갤러리의 사진·설명·분류를 입력해 주세요.');
 for(const key of ['dualShades','rollerShades']){if(!Array.isArray(data.catalog[key])||data.catalog[key].length>150){fail('원단 목록을 확인해 주세요.');continue;}const ids=new Set();for(const x of data.catalog[key]){if(!x.name?.trim()||!x.type?.trim()||!/^[a-z0-9-]+$/.test(x.slug)||ids.has(x.slug))fail('원단 이름·분류·고유 주소를 확인해 주세요.');ids.add(x.slug);if(!safeImage(x.image?.startsWith('/')||x.image?.startsWith('assets/')?x.image:'assets/images/website/'+x.image))fail('원단 사진을 확인해 주세요.');}}
 for(const key of ['name','phone','phoneDigits','email','address','city','weekdayHours','saturdayHours','sundayHours'])if(typeof data.settings[key]!=='string'||!data.settings[key].trim()||data.settings[key].length>200)fail('매장 정보를 확인해 주세요: '+key);
 if(!safeImage(data.settings.logo)||!/^\+[0-9]{8,15}$/.test(data.settings.phoneDigits)||!/^\S+@\S+\.\S+$/.test(data.settings.email)||!safeLink(data.settings.instagram))fail('로고·전화·이메일·SNS 주소를 확인해 주세요.');
 if(!errors.length){
  const documents=new Map(data.pages.filter(p=>p.visible).map(p=>[p.slug,parseHTML(renderPage(data,p)).document]));
  for(const [slug,document] of documents){
   if(document.querySelectorAll('h1').length!==1)fail(slug+': 큰 제목 블록은 1개여야 합니다.');
   const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);
   if(new Set(ids).size!==ids.length)fail(slug+': 동일한 내용 블록 또는 위치 이름이 중복되었습니다.');
   for(const a of document.querySelectorAll('a[href]')){
    const url=new URL(a.getAttribute('href'),'https://wincoblinds.ca/'+(slug==='index'?'':slug));
    if(url.origin!=='https://wincoblinds.ca'||url.pathname.startsWith('/app/'))continue;
    const target=documents.get(url.pathname.replace(/^\//,'').replace(/\.html$/,'')||'index');
    if(!target)fail(slug+': 연결할 공개 페이지가 없습니다: '+url.pathname);
    else if(url.hash&&!target.getElementById(decodeURIComponent(url.hash.slice(1))))fail(slug+': 연결된 페이지 위치를 찾을 수 없습니다: '+url.pathname+url.hash);
   }
  }
 }
 return [...new Set(errors)];
}
