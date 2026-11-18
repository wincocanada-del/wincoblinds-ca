import legacySeed from './seed.json' with {type:'json'};

export const installationProducts = {
  'dual-shades': 'Dual Shades',
  'roller-shades': 'Roller Shades',
  'motorized-blinds': 'Motorized Blinds',
};

const motorImage = 'assets/images/website/motor-control.webp';
const motorAlt = 'Illustration of a remote control for motorized shades';
const legacyBlocks = new Map(legacySeed.pages.flatMap(page => page.blocks.map(block => [block.template, block.values])));
const stockPhotoProducts = new Map(legacySeed.gallery.map(photo => [
  photo.image, /roller shade/i.test(photo.alt) ? 'roller-shades' : 'dual-shades',
]));

const field = (key,label,kind='text') => ({key,label,kind});
const imageFields = (prefix='',label='') => [
  field(prefix+'image',label+'사진','image'), field(prefix+'alt',label+'사진 설명','alt'),
];
const buttonFields = [field('action','버튼 문구'),field('url','버튼 연결','url')];
const imageMarkup = (prefix='',priority=false) => `<img data-cms-image="${prefix}image" data-cms-alt="${prefix}alt" ${priority?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
const arrow = '<span aria-hidden="true">↗</span>';
const actionMarkup = `<a class="button" data-cms-text="action" data-cms-url="url">${arrow}</a>`;
const productCardNames=['dual','roller','motor'];
function cardTemplate(home) {
  const heading = home ? 'h3' : 'h2';
  const fields = productCardNames.flatMap((prefix,i) => {
    const label = Object.values(installationProducts)[i]+' · ';
    return [
      field(prefix+'name',label+'제품 이름'), ...imageFields(prefix,label), field(prefix+'url',label+'제품 링크','url'),
    ];
  });
  if (home) fields.unshift(field('title','섹션 제목'));
  const cards = productCardNames.map(prefix => `
    <a class="cover-card" data-cms-url="${prefix}url">
      <div class="cover-card-image">${imageMarkup(prefix)}</div>
      <${heading} data-cms-text="${prefix}name">${arrow}</${heading}>
    </a>`).join('');
  return {
    label:'제품 대표 사진과 이름', fields,
    html:`<section id="collections" class="wrap cover-products">
      ${home?'<h2 data-cms-text="title"></h2>':''}
      <div class="cover-card-grid">${cards}</div>
    </section>`,
  };
}

export const collectionTemplates = {
  'cover-home':{
    label:'메인 사진 및 제목',
    fields:[field('title','큰 제목'),...imageFields(),...buttonFields],
    html:`<section class="cover-hero"><div class="cover-copy"><h1 data-cms-text="title"></h1>${actionMarkup}</div><figure class="cover-image">${imageMarkup('',true)}</figure></section>`,
  },
  'cover-products-title': {
    label:'제품 제목', fields:[field('title','큰 제목')],
    html:'<section class="wrap collection-intro"><h1 data-cms-text="title"></h1></section>',
  },
  'cover-product-cards':cardTemplate(true),
  'cover-product-overview':cardTemplate(false),
  'cover-product-detail':{
    label:'제품 사진과 소개',
    fields:[field('title','제품 이름'),field('body','제품 소개'),...imageFields(),...buttonFields],
    html:`<section class="wrap cover-product-detail"><div class="product-detail-copy"><h1 data-cms-text="title"></h1><p data-cms-text="body"></p>${actionMarkup}</div><figure class="product-detail-image">${imageMarkup('',true)}</figure></section>`,
  },
  'installation-photos':{
    label:'제품별 시공 사진',fields:[field('title','갤러리 제목')],html:'',
  },
};

function installGalleryBlock(product, hidden) {
  return {id:'installation-'+product,template:'installation-photos',hidden:Boolean(hidden),values:{product,title:'Installation gallery'}};
}

export function setInstallationImage(item, image) {
  if (item.image === image) return;
  item.image = image;
  item.product = '';
}

export function renderInstallationGallery(block,data,escape) {
  const product=block.values.product;
  const overview=product==='all';
  const photos=overview?data.gallery:data.gallery.filter(photo=>photo.product===product);
  if(!photos.length)return '';
  const categories=Object.entries(installationProducts).filter(([key])=>photos.some(photo=>photo.product===key));
  const filter=overview&&categories.length ? `<div class="filter-bar" role="group" aria-label="Filter installations"><button class="filter-button" data-filter="all" aria-pressed="true">All</button>${categories.map(([key,label])=>`<button class="filter-button" data-filter="${key}" aria-pressed="false">${label}</button>`).join('')}</div><p class="filter-status" role="status">${photos.length} photos</p>` : '';
  const photoMarkup=photo=>`<button type="button" class="installation-photo gallery-open" data-category="${escape(photo.product||'')}" data-photo="${escape(photo.image)}" data-caption="${escape(photo.title)}" aria-label="Enlarge photo: ${escape(photo.alt)}"><img src="${escape(photo.image)}" alt="${escape(photo.alt)}" loading="lazy" decoding="async"></button>`;
  const grid=items=>`<div class="installation-grid">${items.map(photoMarkup).join('')}</div>`;
  const showMore=!overview&&photos.length>3;
  return `<section id="installations" class="wrap installation-section"><h2>${escape(block.values.title)}</h2>${filter}${grid(showMore?photos.slice(0,3):photos)}${showMore?`<details class="installation-more"><summary>More photos (${photos.length-3})</summary>${grid(photos.slice(3))}</details>`:''}<dialog class="photo-dialog" aria-label="Installation photo"><button class="dialog-close" aria-label="Close photo">Close ×</button><img alt=""><p class="installation-caption"></p></dialog></section>`;
}

// Replace known stock copy only. Existing photos, links and staff-written titles stay editable.
function value(block,key,fallback) {
  const current=block.values[key];
  if(current===undefined || current===legacyBlocks.get(block.template)?.[key])return fallback;
  return current;
}
// Keep the entire original section when the redesign has no matching slot for
// a staff edit. Hidden draft sections likewise stay available in the editor.
function replaceBlock(block,template,values,carriedKeys) {
  const original = legacyBlocks.get(block.template);
  if (block.hidden || Object.keys(block.values).some(key =>
    !carriedKeys.includes(key) && block.values[key] !== original[key]
  )) return block;
  return {...block,template,values};
}
function productCards(block,home) {
  const names=home?['f4','f7','f10']:['f1','f4','f7'];
  const images=home?['f12','f14','f16']:['f9','f11','f13'];
  const alts=home?['f13','f15','f17']:['f10','f12','f14'];
  const links=home?['f18','f19','f20']:['f15','f16','f17'];
  const values=home?{title:value(block,'f1','Our products')}:{};
  Object.entries(installationProducts).forEach(([slug,name],i)=>{
    const prefix=productCardNames[i];
    values[prefix+'name']=value(block,names[i],name);
    values[prefix+'image']=i===2?value(block,images[i],motorImage):block.values[images[i]];
    values[prefix+'alt']=i===2?value(block,alts[i],motorAlt):block.values[alts[i]];
    values[prefix+'url']=block.values[links[i]]||slug+'.html';
  });
  const carriedKeys=[...names,...images,...alts,...links];
  if(home)carriedKeys.push('f1');
  return replaceBlock(block,home?'cover-product-cards':'cover-product-overview',values,carriedKeys);
}
const productDescriptions={
  'dual-shades':'Alternating sheer and opaque bands let you adjust light and privacy.',
  'roller-shades':'One continuous panel in light-filtering, sunscreen or blackout fabric.',
  'motorized-blinds':'Raise and lower compatible shades by remote. We’ll help you choose a motor for your windows.',
};

function adaptBlock(block,slug) {
  if(block.template==='index-0'){
    return replaceBlock(block,'cover-home',{title:value(block,'f1','Custom blinds & shades in Edmonton'),image:block.values.f10,alt:block.values.f11,action:value(block,'f3','Request a Free Quote'),url:value(block,'f12','contact.html')},['f1','f3','f10','f11','f12']);
  }
  if(block.template==='products-0'){
    return replaceBlock(block,'cover-products-title',{title:value(block,'f1','Products')},['f1']);
  }
  if(block.template==='index-2')return productCards(block,true);
  if(block.template==='products-1')return [productCards(block,false),installGalleryBlock('all',block.hidden)];
  if(installationProducts[slug] && block.template===slug+'-0'){
    const motor=slug==='motorized-blinds';
    const lead=replaceBlock(block,'cover-product-detail',{
      title:value(block,'f1',installationProducts[slug]),body:value(block,'f2',productDescriptions[slug]),
      image:motor?value(block,'f6',motorImage):block.values.f8,
      alt:motor?value(block,'f7',motorAlt):block.values.f9,
      action:value(block,'f3','Request a Free Quote'),url:block.values[motor?'f8':'f10'],
    },['f1','f2','f3',...(motor?['f6','f7','f8']:['f8','f9','f10'])]);
    return [lead,installGalleryBlock(slug,block.hidden)];
  }
  const original=legacyBlocks.get(block.template);
  const ordinaryStock=!block.hidden && original && block.template.startsWith(slug+'-') &&
    Object.entries(block.values).every(([key,val])=>original[key]===val) &&
    Object.keys(original).length===Object.keys(block.values).length;
  return ordinaryStock?[]:block;
}

export function upgradeCollections(data) {
  for(const item of data.gallery) {
    if(item.product===undefined)item.product=stockPhotoProducts.get(item.image)||'';
  }
  const pages=new Set(['index','products',...Object.keys(installationProducts)]);
  for(const page of data.pages) {
    if(!pages.has(page.slug)||page.blocks.some(block=>block.template.startsWith('cover-')||block.template==='installation-photos'))continue;
    page.blocks=page.blocks.flatMap(block=>adaptBlock(block,page.slug));
  }
}
