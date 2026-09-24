const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  navigation?.classList.remove('is-open');
  navigation?.querySelectorAll('.nav-group[open]').forEach(group => group.open = false);
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
  let submitting = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting) return;
    const status = document.querySelector('#enquiry-status');
    const button = form.querySelector('button[type="submit"]');
    if (['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) {
      status.textContent = 'This is a local preview. Please use wincoblinds.ca/contact to send your enquiry.';
      status.focus();
      return;
    }
    const data = new FormData(form);
    if (!String(data.get('name') || '').trim()) {
      status.textContent = 'Please enter your name.';
      form.elements.name.focus();
      return;
    }
    submitting = true;
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your enquiry…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Enquiry submission failed');
      status.textContent = 'Thank you. Your enquiry has been received. Our team will get back to you.';
      button.textContent = 'Enquiry sent ✓';
      form.reset();
    } catch {
      const email = form.dataset.contactEmail || document.querySelector('.contact-email')?.textContent.trim();
      const phone = form.dataset.contactPhone || document.querySelector('.contact-phone')?.textContent.trim();
      status.textContent = 'We could not confirm receipt. Your details are still here. Please try again' + (email ? ', or email ' + email : '') + (phone ? ' or call ' + phone : '') + '.';
      button.disabled = false;
      button.textContent = 'Try sending again ↗';
      submitting = false;
    } finally {
      clearTimeout(timeout);
      form.removeAttribute('aria-busy');
      status.focus();
    }
  });
}

// Native details works without JavaScript; these enhancements keep one dropdown open.
const navGroups = [...document.querySelectorAll('.nav-group')];
navGroups.forEach(group => group.addEventListener('toggle', () => {
  if (group.open) navGroups.filter(other => other !== group).forEach(other => other.open = false);
}));
document.addEventListener('keydown', event => {
  if(event.key === 'Escape') {
    const openGroup = navGroups.find(group => group.open);
    if(openGroup) { openGroup.open = false; openGroup.querySelector('summary').focus(); }
  }
});
