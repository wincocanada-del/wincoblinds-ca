const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  navigation?.classList.remove('is-open');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
navigation?.addEventListener('click', event => { if(event.target.closest('a')) closeMenu(); });
window.matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
document.querySelectorAll('.filter-bar').forEach(bar => {
  const section = bar.closest('section');
  const items = [...section.querySelectorAll('[data-category]')];
  bar.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    bar.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    items.forEach(item => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; });
    const count = items.filter(item => !item.hidden).length;
    const noun = section.querySelector('.gallery-grid') ? 'photo' : 'fabric';
    section.querySelector('.filter-status').textContent = `${count} ${noun}${count === 1 ? '' : 's'}`;
  });
});
const dialog = document.querySelector('.photo-dialog');
if (dialog) {
  document.querySelectorAll('.gallery-open').forEach(button => button.addEventListener('click', () => {
    const image = dialog.querySelector('img'); image.src = button.dataset.photo;
    image.alt = button.querySelector('img').alt;
    dialog.querySelector('#photo-caption').textContent = button.dataset.caption;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if(event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }});
}
const form = document.querySelector('#enquiry-form');
if (form) {
  const product = new URLSearchParams(location.search).get('product');
  if (product) {
    const select = form.elements.product;
    if (![...select.options].some(option => option.value === product)) select.add(new Option(product.slice(0,150), product.slice(0,150)));
    select.value = product.slice(0,150);
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const body = `Hello Winco,\r\n\r\nI would like to discuss a window covering project.\r\n\r\nName: ${data.get('name')}\r\nEmail: ${data.get('email')}\r\nPhone: ${data.get('phone') || 'Not provided'}\r\nInterested in: ${data.get('product')}\r\n\r\n${data.get('message') || ''}`;
    const mailto = `mailto:wincocanada@gmail.com?subject=${encodeURIComponent('Window covering enquiry - '+data.get('product'))}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector('#enquiry-status');
    status.textContent = 'Your message is ready. Send it from your email app. If it did not open, ';
    const retry = document.createElement('a'); retry.href = mailto; retry.textContent = 'open your prepared email';
    status.append(retry, ' or contact wincocanada@gmail.com directly.');
    window.location.href = mailto;
  });
}
