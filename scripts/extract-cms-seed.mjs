// One-time migration of the existing public pages into trusted templates and editable fields.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { parseHTML } from 'linkedom';
const names=['index','products','dual-shades','roller-shades','motorized-blinds','about','services','gallery','guides','faq','reviews','blog','care','contact'];
const templates={};
const pages=[];
let shell;
for(const slug of names){
 const {document}=parseHTML(readFileSync(`${slug}.html`,'utf8'));
 if(!shell) shell={header:document.querySelector('.skip-link').outerHTML+document.querySelector('.announcement').outerHTML+document.querySelector('.site-header').outerHTML,footer:document.querySelector('footer').outerHTML};
 const page={slug,title:document.title.replace(' | Winco Blinds',''),description:document.querySelector('meta[name=description]').content,visible:true,kind:'page',blocks:[]};
 [...document.querySelector('main').children].forEach((section,index)=>{
  if(section.querySelector('.gallery-grid')){page.blocks.push({id:`${slug}-${index}`,template:'gallery',values:{},hidden:false});return;}
  if(section.querySelector('.fabric-grid')){page.blocks.push({id:`${slug}-${index}`,template:slug==='dual-shades'?'catalog-dual':'catalog-roller',values:{},hidden:false});return;}
  const key=`${slug}-${index}`,fields=[],values={};let serial=0;
  const add=(el,kind,value,label,attr)=>{const field=`f${serial++}`;el.setAttribute(attr,field);fields.push({key:field,kind,label});values[field]=value;};
  for(const el of section.querySelectorAll('h1,h2,h3,p,figcaption,li,dt,dd,summary,span,a,strong,label')){
   if(el.closest('form,dialog,[data-cms-text]') || el.getAttribute('aria-hidden')==='true')continue;
   if([...el.children].some(c=>c.tagName!=='BR' && c.getAttribute('aria-hidden')!=='true'))continue;
   let value=[...el.childNodes].map(n=>n.nodeType===3?n.textContent:n.nodeType===1&&n.tagName==='BR'?'\n':'').join('').trim();
   if(!value)continue;
   add(el,'text',value,`${el.tagName.toLowerCase()} · ${value.slice(0,52)}`,'data-cms-text');
  }
  for(const el of section.querySelectorAll('img')) if(!el.closest('form,dialog')){
   add(el,'image',el.getAttribute('src'),'사진 · '+el.getAttribute('alt'),'data-cms-image');
   add(el,'alt',el.getAttribute('alt')||'','사진 설명','data-cms-alt');
  }
  for(const el of section.querySelectorAll('a[href]')) if(!el.closest('form,dialog')) add(el,'url',el.getAttribute('href'),'연결 · '+el.textContent.trim().slice(0,45),'data-cms-url');
  templates[key]={html:section.outerHTML,fields,label:section.querySelector('h1,h2,h3')?.textContent.replace(/\s+/g,' ').slice(0,70)||section.className||'내용'};
  page.blocks.push({id:key,template:key,values,hidden:false});
 });
 pages.push(page);
}
const read=file=>JSON.parse(readFileSync(file,'utf8'));
const seed={schema:1,settings:{name:'Winco Blinds & Window Fashion',logo:'assets/images/logo/winco-original.png',phone:'(780) 809-2292',phoneDigits:'+17808092292',email:'wincocanada@gmail.com',address:'9790 51 Ave NW',city:'Edmonton, AB T6E 0A6',weekdayHours:'9:00 am – 5:00 pm',saturdayHours:'10:30 am – 2:30 pm',sundayHours:'By appointment',instagram:'https://www.instagram.com/wincoblindsyeg/'},navigation:read('assets/data/navigation.json'),gallery:read('assets/data/gallery.json').map(([image,category,title,alt])=>({image:'assets/images/website/'+image,category,title,alt})),catalog:read('assets/data/catalog.json'),pages,media:[]};
mkdirSync('cms',{recursive:true});
writeFileSync('cms/templates.json',JSON.stringify({templates,shell},null,2));
writeFileSync('cms/seed.json',JSON.stringify(seed,null,2));
console.log(`Extracted ${pages.length} pages, ${Object.keys(templates).length} content blocks.`);
