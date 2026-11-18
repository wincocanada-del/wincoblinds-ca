function isPlainClick(event) {
  return event.button === 0 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey;
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", String(menuButton.getAttribute("aria-expanded") !== "true"));
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true" && !document.querySelector("dialog[open]")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
  }
});

const searchPanel = document.createElement("dialog");
searchPanel.className = "search-panel";
searchPanel.setAttribute("aria-labelledby", "search-label");
searchPanel.innerHTML = `
  <form method="dialog" class="dialog-toolbar"><button class="close-button" aria-label="Close search">Close ×</button></form>
  <label id="search-label" for="site-query">Search the site</label>
  <input id="site-query" type="search" autocomplete="off" placeholder="Search for products, services, or help">
  <ul class="search-results" aria-label="Matching pages"></ul>
  <p class="no-results" role="status" hidden>No matching pages.</p>`;
document.body.append(searchPanel);
const searchField = searchPanel.querySelector("input");
const searchResults = searchPanel.querySelector("ul");
const keywords = {
  home: "home edmonton window coverings",
  products: "dual shades roller shades motorized blinds collection remote fabric",
  services: "consultation measurement installation ordering",
  about: "winco showroom company edmonton",
  gallery: "installations photos projects rooms inspiration",
  guides: "choosing fabric light privacy blackout windows",
  faq: "care warranty five years delivery questions business days",
  contact: "quote enquiry appointment address directions phone opening hours"
};
const pages = [...navigation.querySelectorAll("a")];
function filterPages() {
  const terms = searchField.value.trim().toLowerCase().split(/\s+/);
  const matches = pages.filter(link => {
    const label = link.textContent.trim().toLowerCase();
    const text = label + " " + (keywords[label] || "");
    return terms.every(term => text.includes(term));
  });
  searchResults.replaceChildren(...matches.map(link => {
    const item = document.createElement("li");
    const result = document.createElement("a");
    result.href = link.getAttribute("href");
    result.textContent = link.textContent;
    item.append(result);
    return item;
  }));
  searchPanel.querySelector(".no-results").hidden = matches.length > 0;
}
document.querySelector(".search-opener").addEventListener("click", () => {
  searchField.value = "";
  filterPages();
  searchPanel.showModal();
  searchField.focus();
});
searchField.addEventListener("input", filterPages);

const productDialog = document.querySelector("#product-dialog");
if (typeof productDialog?.showModal === "function") {
  const detailPhoto = productDialog.querySelector("img");
  const detailTitle = productDialog.querySelector("#product-title");
  const detailSummary = productDialog.querySelector("#product-summary");
  const enquiryLink = productDialog.querySelector("a");

  for (const card of document.querySelectorAll(".product-card")) {
    card.addEventListener("click", event => {
      if (!isPlainClick(event)) return;
      event.preventDefault();
      const cardPhoto = card.querySelector("img");
      detailPhoto.src = card.dataset.detailSrc || cardPhoto.src;
      detailPhoto.alt = card.dataset.detailAlt || cardPhoto.alt;
      detailTitle.textContent = card.dataset.product;
      detailSummary.textContent = card.dataset.summary;
      enquiryLink.href = card.href;
      productDialog.showModal();
    });
  }
}

const galleryDialog = document.querySelector("#photo-dialog");
if (typeof galleryDialog?.showModal === "function") {
  const links = [...document.querySelectorAll(".gallery-photo")];
  const photo = galleryDialog.querySelector("img");
  const caption = galleryDialog.querySelector("#photo-caption");
  const count = galleryDialog.querySelector("#photo-count");
  let activePhoto = 0;

  function showPhoto(index) {
    activePhoto = (index + links.length) % links.length;
    const link = links[activePhoto];
    photo.src = link.href;
    photo.alt = link.querySelector("img").alt;
    caption.textContent = photo.alt;
    count.textContent = `${activePhoto + 1} / ${links.length}`;
  }

  links.forEach((link, index) => {
    link.addEventListener("click", event => {
      if (!isPlainClick(event)) return;
      event.preventDefault();
      showPhoto(index);
      galleryDialog.showModal();
    });
  });
  for (const button of galleryDialog.querySelectorAll("[data-photo-step]")) {
    button.addEventListener("click", () => showPhoto(activePhoto + Number(button.dataset.photoStep)));
  }
  galleryDialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(activePhoto + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
}

const quoteForm = document.querySelector("#quote-form");
if (quoteForm) {
  const product = quoteForm.elements.product;
  const selectedProduct = new URLSearchParams(location.search).get("product");
  if ([...product.options].some(option => option.value === selectedProduct)) {
    product.value = selectedProduct;
  }

  quoteForm.addEventListener("submit", event => {
    event.preventDefault();
    const result = quoteForm.querySelector("#form-result");
    result.hidden = false;
    result.textContent = "Your enquiry preview is complete. No message was sent.";
  });
  quoteForm.querySelector("button[type=submit]").disabled = false;
}
