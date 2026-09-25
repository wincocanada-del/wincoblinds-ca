import registry from '../cms/templates.json' with {type:'json'};

export function protectedBlock(block) {
  return block.template === 'intro' || block.template.startsWith('contact-') || /<h1\b/i.test(registry.templates[block.template]?.html || '');
}

export function pageAddressError(slug, pages) {
  if (!/^[a-z][a-z0-9-]{0,63}$/.test(slug)) return '주소는 영문 소문자로 시작하고 영문·숫자·하이픈만 사용할 수 있습니다. (64자 이내)';
  if (['admin','app','assets','media','api','robots','sitemap','netlify'].includes(slug)) return '시스템에서 사용하는 주소입니다. 다른 주소를 입력해 주세요.';
  if (pages.some(p => p.slug === slug)) return '이미 사용 중인 주소입니다. 다른 주소를 입력해 주세요.';
  return '';
}

export function previewSlug(tab, selected) {
  return ({gallery:'gallery',catalog:'dual-shades',menus:'index',settings:'index',dashboard:'index'})[tab] || selected;
}
