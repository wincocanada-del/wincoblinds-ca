import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..',process.argv[2]||'.');
const pages=readdirSync(root).filter(f=>f.endsWith('.html'));
const errors=[];
if(!pages.length)errors.push('No generated HTML pages found');
let checked=0;
for(const file of pages){
 const {document}=parseHTML(readFileSync(resolve(root,file),'utf8'));
 if(document.querySelectorAll('h1').length!==1)errors.push(`${file}: expected one h1`);
 if(!document.querySelector('meta[name="description"]')||!document.querySelector('link[rel="canonical"]'))errors.push(`${file}: missing SEO metadata`);
 for(const img of document.querySelectorAll('img'))if(!img.hasAttribute('alt'))errors.push(`${file}: missing image alt`);
 for(const el of document.querySelectorAll('[href],[src]')){
  const value=el.getAttribute('href')??el.getAttribute('src');
  const url=new URL(value,'https://wincoblinds.ca/'+file);
  if(url.origin!=='https://wincoblinds.ca'||url.pathname.startsWith('/app/'))continue;
  let target=decodeURIComponent(url.pathname).replace(/^\//,'');
  if(!target||target.endsWith('/'))target+='index.html';
  else if(!extname(target))target+='.html';
  const path=resolve(root,target);checked++;
  if(!path.startsWith(root+sep)||!existsSync(path)||!statSync(path).isFile()){errors.push(`${file}: missing ${value}`);continue;}
  if(url.hash&&target.endsWith('.html')){
   const targetDocument=parseHTML(readFileSync(path,'utf8')).document;
   if(!targetDocument.getElementById(decodeURIComponent(url.hash.slice(1))))errors.push(`${file}: missing anchor ${value}`);
  }
 }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`${pages.length} pages: ${checked} local links/assets checked, headings, image alternatives and SEO metadata OK.`);
