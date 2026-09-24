import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=readdirSync(root).filter(f=>f.endsWith('.html'));
const errors=[];
let checked=0;
for(const file of pages){
  const html=readFileSync(resolve(root,file),'utf8');
  if((html.match(/<h1\b/g)||[]).length!==1) errors.push(`${file}: expected one h1`);
  if(!html.includes('name="description"') || !html.includes('rel="canonical"')) errors.push(`${file}: missing SEO metadata`);
  for(const tag of html.matchAll(/<img\b[^>]+>/g)) if(!/\balt=/.test(tag[0])) errors.push(`${file}: missing image alt`);
  for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(/^(https?:|mailto:|tel:|data:)/.test(url) || url.startsWith('/app')) continue;
    const [location,hash]=url.split('#');
    const target=location.split('?')[0] || file;
    const path=resolve(root,target.replace(/^\//,''));
    checked++;
    if(!existsSync(path)) errors.push(`${file}: missing ${url}`);
    else if(hash && target.endsWith('.html') && !readFileSync(path,'utf8').includes(`id="${hash}"`)) errors.push(`${file}: missing anchor ${url}`);
  }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`${pages.length} pages: ${checked} local links/assets checked, headings, image alternatives and SEO metadata OK.`);
