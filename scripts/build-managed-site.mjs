import { readFileSync,writeFileSync,mkdirSync,readdirSync,rmSync } from 'node:fs';
import { resolve,join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';
import seed from '../cms/seed.json' with {type:'json'};
import config from '../cms/config.json' with {type:'json'};
import {validateSite,renderPage,imagePaths} from '../cms/render.mjs';
const root=resolve(import.meta.dirname,'..'),out=resolve(root,'dist');
function copy(source,target){mkdirSync(resolve(target,'..'),{recursive:true});writeFileSync(target,readFileSync(source));}
function copyTree(source,target){mkdirSync(target,{recursive:true});for(const entry of readdirSync(source,{withFileTypes:true})){if(entry.isDirectory())copyTree(join(source,entry.name),join(target,entry.name));else if(entry.isFile())copy(join(source,entry.name),join(target,entry.name));}}
if(out!==join(root,'dist'))throw Error('Unexpected output path');
let data=structuredClone(seed),release=null;
if(process.env.NETLIFY==='true'||process.env.CMS_REMOTE==='1'){
 const response=await fetch(config.supabaseUrl+'/rest/v1/rpc/winco_web_publication',{method:'POST',headers:{apikey:config.supabaseAnonKey,'Content-Type':'application/json'},body:'{}',signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error('CMS publication unavailable. Keeping the previous production deploy.');
 const publication=await response.json();if(publication){data=publication.data;release=publication.id;}
}
const errors=validateSite(data);if(errors.length)throw Error(errors.join('\n'));
rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});
copyTree(join(root,'assets'),join(out,'assets'));
// Freeze released images into each deployment so photos roll back with the pages.
for(const path of imagePaths(data).filter(p=>p.startsWith('/media/'))){
 const response=await fetch(config.supabaseUrl+'/storage/v1/object/authenticated/winco-website/'+path.slice(7),{headers:{apikey:config.supabaseAnonKey,Authorization:'Bearer '+config.supabaseAnonKey},signal:AbortSignal.timeout(20000)});
 if(!response.ok||!response.headers.get('content-type')?.includes('image/webp'))throw Error('A published photo could not be loaded. Keeping the previous deploy.');
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.length>5*1024*1024||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw Error('Invalid published photo');
 const target=join(out,path.slice(1));mkdirSync(resolve(target,'..'),{recursive:true});writeFileSync(target,bytes);
}
copy(join(root,'admin/index.html'),join(out,'admin/index.html'));
copy(join(root,'admin/style.css'),join(out,'admin/style.css'));
await build({entryPoints:[join(root,'admin/app.mjs')],outfile:join(out,'admin/app.js'),bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,logLevel:'warning'});
for(const page of data.pages.filter(p=>p.visible))writeFileSync(join(out,page.slug+'.html'),renderPage(data,page));
// Publish exactly the committed staff app; local uncommitted app files must not leak into website deployments.
const appFiles=execFileSync('git',['ls-tree','-r','--name-only','HEAD','app'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
for(const file of appFiles){const target=join(out,file);mkdirSync(resolve(target,'..'),{recursive:true});writeFileSync(target,execFileSync('git',['show',`HEAD:${file}`],{cwd:root,maxBuffer:32*1024*1024}));}
copy(join(root,'_redirects'),join(out,'_redirects'));
writeFileSync(join(out,'robots.txt'),'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://wincoblinds.ca/sitemap.xml\n');
writeFileSync(join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${data.pages.filter(p=>p.visible).map(p=>`<url><loc>https://wincoblinds.ca/${p.slug==='index'?'':p.slug}</loc></url>`).join('')}</urlset>`);
writeFileSync(join(out,'website-version.json'),JSON.stringify({release,builtAt:new Date().toISOString()}));
writeFileSync(join(out,'_headers'),`/admin/*\n  X-Robots-Tag: noindex, nofollow\n  Cache-Control: no-store\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: same-origin\n/website-version.json\n  Cache-Control: no-store\n`);
console.log(`Built ${data.pages.filter(p=>p.visible).length} homepage pages, admin and ${appFiles.length} unchanged committed app files. Release: ${release||'initial'}`);
