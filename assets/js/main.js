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

  const faqFilters = document.querySelectorAll('.faq-filter');

  if (faqFilters.length) {
    faqFilters.forEach((filter) => {
      filter.addEventListener('click', () => {
        faqFilters.forEach((item) => item.classList.remove('active'));
        filter.classList.add('active');
      });
    });
  }

  const faqAccordion = document.querySelector('[data-faq-accordion]');

  if (faqAccordion) {
    const faqItems = faqAccordion.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');

      if (!question) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach((otherItem) => {
          otherItem.classList.remove('is-open');
          const otherQuestion = otherItem.querySelector('.faq-question');
          if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
});
