import test from 'node:test';
import assert from 'node:assert/strict';
import seed from '../cms/seed.json' with {type:'json'};
import {protectedBlock,pageAddressError,previewSlug} from '../admin/editor-helpers.mjs';

test('required headings and enquiry blocks are protected, ordinary content stays editable',()=>{
  for(const page of seed.pages)assert.ok(page.blocks.some(protectedBlock),page.slug);
  for(const b of seed.pages.find(p=>p.slug==='contact').blocks.filter(b=>b.template.startsWith('contact-')))assert.ok(protectedBlock(b));
  assert.equal(protectedBlock({template:'intro'}),true);
  assert.equal(protectedBlock({template:'image-text'}),false);
  assert.equal(protectedBlock({template:'text'}),false);
});

test('new page addresses reject system routes, duplicates and unsafe characters',()=>{
  for(const slug of ['app','admin','gallery','Uppercase','has space','../escape','a'.repeat(65)])assert.ok(pageAddressError(slug,seed.pages));
  assert.equal(pageAddressError('summer-2026',seed.pages),'');
});

test('preview follows the active content area instead of a previously selected page',()=>{
  assert.equal(previewSlug('gallery','contact'),'gallery');
  assert.equal(previewSlug('catalog','contact'),'dual-shades');
  assert.equal(previewSlug('pages','contact'),'contact');
  assert.equal(previewSlug('posts','summer-news'),'summer-news');
});
