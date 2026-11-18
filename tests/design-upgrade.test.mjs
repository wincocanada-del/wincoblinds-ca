import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import seed from '../cms/seed.json' with {type:'json'};
import {upgradeSite} from '../cms/design-upgrade.mjs';
import {renderPage, validateSite} from '../cms/render.mjs';
import {setInstallationImage} from '../cms/collections.mjs';
import {protectedBlock} from '../admin/editor-helpers.mjs';

const cloneSeed=()=>structuredClone(seed);
const page=(data,slug)=>data.pages.find(item=>item.slug===slug);
const output=(data,slug)=>parseHTML(renderPage(data,page(data,slug))).document;

test('published and restored stock documents upgrade to four links and fourteen valid editable pages',()=>{
  const data=upgradeSite(cloneSeed());
  assert.deepEqual(validateSite(data),[]);
  assert.deepEqual(data.pages.map(item=>item.slug),seed.pages.map(item=>item.slug));
  assert.equal(data.pages.length,14);
  const nav=['Products','Services','About','Contact'];
  for(const item of data.pages) {
    const doc=output(data,item.slug);
    assert.deepEqual([...doc.querySelectorAll('#site-nav a')].map(a=>a.textContent.trim()),nav,item.slug);
    assert.equal(doc.querySelectorAll('h1').length,1,item.slug);
    assert.ok(item.blocks.some(protectedBlock),item.slug);
  }
  const home=output(data,'index');
  assert.equal(home.querySelector('.cover-image img').getAttribute('src'),page(seed,'index').blocks[0].values.f10);
  assert.equal(home.querySelector('.cover-copy a').getAttribute('href'),'contact.html');
  assert.equal(home.querySelectorAll('.cover-card').length,3);
  const productDoc=output(data,'products');
  assert.deepEqual([...productDoc.querySelectorAll('.cover-card')].map(el=>el.getAttribute('href')),['dual-shades.html','roller-shades.html','motorized-blinds.html']);
  assert.equal(productDoc.querySelectorAll('.installation-photo').length,20);
  for(const slug of ['dual-shades','roller-shades','motorized-blinds']){
    assert.match(output(data,slug).querySelector('.product-detail-copy a').getAttribute('href'),/^contact\.html\?product=/);
  }
  assert.ok(output(data,'roller-shades').getElementById('fabrics'));
  assert.ok(output(data,'contact').querySelector('#enquiry-form'));
  const once=structuredClone(data);
  assert.deepEqual(upgradeSite(data),once);
});

test('editor-authored drafts preserve mapped photos, custom copy, unpublished blocks and navigation',()=>{
  const data=cloneSeed();
  const originalMenu=structuredClone(data.navigation);
  originalMenu[0].label='Shades';
  data.navigation=structuredClone(originalMenu);
  const customHero=page(data,'index').blocks[0];
  customHero.values.f2='Staff have written a new introduction.';
  const customPhoto='assets/images/website/gallery-10.webp';
  const cards=page(data,'index').blocks[2];
  cards.values.f12=customPhoto;
  const hiddenHome=page(data,'index').blocks[5];
  hiddenHome.hidden=true;
  hiddenHome.values.f2='A photo feature for next month.';
  page(data,'products').blocks[1].hidden=true;
  upgradeSite(data);
  assert.deepEqual(data.navigation,originalMenu);
  assert.equal(page(data,'index').blocks[0].values.f2,customHero.values.f2);
  assert.equal(page(data,'index').blocks.find(b=>b.template==='cover-product-cards').values.dualimage,customPhoto);
  assert.ok(page(data,'index').blocks.find(b=>b.id===hiddenHome.id).hidden);
  const home=output(data,'index');
  assert.match(home.body.textContent,/Staff have written a new introduction/);
  assert.doesNotMatch(home.body.textContent,/photo feature for next month/);
  assert.equal(home.querySelectorAll('h1').length,1);
  assert.equal(output(data,'products').querySelectorAll('.installation-photo').length,0);
  assert.deepEqual(validateSite(data),[]);
});

test('gallery follows manual product selection and order and clears stale tags on image replacement',()=>{
  const data=cloneSeed();
  const upload={image:'assets/images/website/original-hero.jpg',title:'An installation',alt:'Window installation',category:'Living spaces'};
  data.gallery.unshift(upload);
  upgradeSite(data);
  assert.equal(upload.product,'');
  assert.equal(output(data,'dual-shades').querySelectorAll('.installation-photo').length,15);
  assert.equal(output(data,'roller-shades').querySelectorAll('.installation-photo').length,5);
  assert.equal(output(data,'motorized-blinds').querySelectorAll('.installation-photo').length,0);
  upload.product='motorized-blinds';
  assert.equal(output(data,'motorized-blinds').querySelectorAll('.installation-photo').length,1);
  const overview=output(data,'products');
  assert.equal(overview.querySelector('.installation-photo').dataset.photo,upload.image);
  assert.equal(overview.querySelector('[data-filter="motorized-blinds"]').textContent,'Motorized Blinds');
  setInstallationImage(upload,upload.image);
  assert.equal(upload.product,'motorized-blinds');
  setInstallationImage(upload,'assets/images/website/gallery-02.webp');
  assert.equal(upload.product,'');
  assert.equal(output(data,'motorized-blinds').querySelectorAll('.installation-photo').length,0);
  assert.equal(output(data,'products').querySelectorAll('.installation-photo').length,data.gallery.length);
});
