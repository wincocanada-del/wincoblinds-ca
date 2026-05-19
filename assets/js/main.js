document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const galleryFilters = document.querySelectorAll('[data-gallery-filter]');
  const galleryCards = document.querySelectorAll('[data-gallery-category]');

  if (galleryFilters.length && galleryCards.length) {
    galleryFilters.forEach((filter) => {
      filter.addEventListener('click', () => {
        const selected = filter.dataset.galleryFilter;

        galleryFilters.forEach((item) => item.classList.remove('active'));
        filter.classList.add('active');

        galleryCards.forEach((card) => {
          const categories = card.dataset.galleryCategory.split(' ');
          const shouldShow = selected === 'all' || categories.includes(selected);
          card.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });
  }
});
