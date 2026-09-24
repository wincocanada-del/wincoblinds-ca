import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain'};
createServer(async (req,res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    if(pathname === '/') pathname = '/index.html';
    if(!/^\/(?:[a-z-]+\.html|assets\/(?:css|js|images)\/[^\0]+|sitemap\.xml|robots\.txt)$/.test(pathname)) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const file = resolve(root,'.'+pathname);
    if(!file.startsWith(root+sep) || !(await stat(file)).isFile()) throw Error('Not found');
    const content = await readFile(file);
    res.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(5500,'127.0.0.1',()=>console.log('Website preview: http://127.0.0.1:5500'));
