import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {parseHTML} from 'linkedom';
import seed from '../cms/seed.json' with {type:'json'};
import {renderPage,validateSite,safeLink,safeImage,fieldsFor} from '../cms/render.mjs';
import publish from '../netlify/functions/website-publish.mjs';
const copy=()=>structuredClone(seed);
test('existing 14 pages render, keep one h1 and preserve the exact enquiry fields',()=>{
 assert.deepEqual(validateSite(seed),[]);
 for(const p of seed.pages){const {document}=parseHTML(renderPage(seed,p));assert.equal(document.querySelectorAll('h1').length,1,p.slug);}
 const {document}=parseHTML(renderPage(seed,seed.pages.find(p=>p.slug==='contact')));
 const form=document.querySelector('#enquiry-form');assert.equal(form.getAttribute('data-netlify'),'true');
 assert.deepEqual([...form.querySelectorAll('[name]')].map(x=>x.name),['form-name','bot-field','name','email','phone','product','message']);
});
test('edited text is escaped and links cannot introduce script, external protocols or app paths',()=>{
 const d=copy(),p=d.pages[0],b=p.blocks[0],field=fieldsFor(b).find(f=>f.kind==='text');
 b.values[field.key]='<img src=x onerror=alert(1)>';
 const {document}=parseHTML(renderPage(d,p));assert.equal(document.querySelectorAll('[onerror]').length,0);assert.ok(document.body.textContent.includes('<img src=x onerror=alert(1)>'));
 for(const url of ['javascript:alert(1)','data:text/html,test','//evil.test','/app','admin.html','/../x','https://user:pass@example.com','https:\\evil.test'])assert.equal(safeLink(url),false,url);
 for(const src of ['https://evil.test/x.png','assets/images/../x.png','/media/invalid.svg'])assert.equal(safeImage(src),false,src);
});
test('reserved/duplicate URLs, hidden linked pages and broken internal menus are rejected',()=>{
 const d=copy();d.pages.push({...structuredClone(d.pages[0]),slug:'admin'});assert.ok(validateSite(d).length);
 const e=copy();e.navigation.push({label:'Broken',url:'missing.html'});assert.ok(validateSite(e).some(x=>x.includes('missing.html')));
 const f=copy();f.pages.find(p=>p.slug==='contact').visible=false;assert.ok(validateSite(f).length);
});
test('missing enquiry block cannot be published',()=>{
 const d=copy();d.pages.find(p=>p.slug==='contact').blocks=[];assert.ok(validateSite(d).some(x=>x.includes('문의')));
});
test('new pages, posts and nested menu links become real generated HTML',()=>{
 const d=copy();d.pages.push({slug:'summer-news',title:'Summer news',description:'New collection',visible:true,kind:'post',blocks:[{id:'new',template:'intro',values:{title:'Summer news',eyebrow:'NEWS',body:'Visit our showroom'}}]});d.navigation[0].children.push(['Summer news','summer-news.html']);assert.deepEqual(validateSite(d),[]);assert.match(renderPage(d,d.pages.find(p=>p.slug==='blog')),/summer-news\.html/);
});
test('preview disables enquiry inputs and excludes public indexing',()=>{const {document}=parseHTML(renderPage(seed,seed.pages.find(p=>p.slug==='contact'),{preview:true}));assert.ok(document.querySelector('form fieldset[disabled]'));assert.equal(document.querySelector('meta[name=robots]').content,'noindex,nofollow');});
test('committed app is byte-identical in deploy output, despite dirty local app',()=>{
 for(const file of execFileSync('git',['ls-tree','-r','--name-only','HEAD','app'],{encoding:'utf8'}).trim().split('\n'))assert.deepEqual(readFileSync('dist/'+file),execFileSync('git',['show','HEAD:'+file],{maxBuffer:32*1024*1024}),file);
});
test('publish rejects missing login and cross-site requests before accessing services',async()=>{
 assert.equal((await publish(new Request('https://wincoblinds.ca/.netlify/functions/website-publish',{method:'POST',headers:{Origin:'https://wincoblinds.ca'}}))).status,401);
 assert.equal((await publish(new Request('https://wincoblinds.ca/.netlify/functions/website-publish',{method:'POST',headers:{Origin:'https://evil.test',Authorization:'Bearer test'}}))).status,403);
});
test('publish enforces role/version, strips hidden content, and reports hook failure honestly',async()=>{
 const originalFetch=globalThis.fetch,originalHook=process.env.WEBSITE_BUILD_HOOK;
 process.env.WEBSITE_BUILD_HOOK='https://api.netlify.com/build_hooks/test';
 const d=copy();d.pages.push({slug:'private-draft',title:'Private',description:'Unpublished',kind:'post',visible:false,blocks:[]});d.media.push({path:'private-upload.webp',name:'Private'});
 let role='editor',rev=1,captured=null,hookStatus=200;
 globalThis.fetch=async(url,init)=>{
  if(String(url).includes('winco_web_state'))return Response.json({role,draft:{data:d,version:rev}});
  if(String(url).includes('winco_web_release')){captured=JSON.parse(init.body);return Response.json('release-test');}
  return new Response('{}',{status:hookStatus});
 };
 const request=()=>new Request('https://wincoblinds.ca/.netlify/functions/website-publish',{method:'POST',headers:{Origin:'https://wincoblinds.ca',Authorization:'Bearer test','Content-Type':'application/json'},body:'{"version":1}'});
 try{
  assert.equal((await publish(request())).status,403);role='owner';rev=2;assert.equal((await publish(request())).status,409);rev=1;
  const ok=await publish(request());assert.equal(ok.status,200);assert.equal(captured.p_data.pages.some(p=>p.slug==='private-draft'),false);assert.deepEqual(captured.p_data.media,[]);
  hookStatus=503;assert.equal((await publish(request())).status,502);
 }finally{globalThis.fetch=originalFetch;if(originalHook===undefined)delete process.env.WEBSITE_BUILD_HOOK;else process.env.WEBSITE_BUILD_HOOK=originalHook;}
});
