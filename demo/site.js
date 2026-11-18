const header = document.querySelector(".header");
const menuButton = header.querySelector(".mobile");
const navigation = header.querySelector(".nav");
const mobile = window.matchMedia("(max-width: 720px)");

function setMenu(open) {
  navigation.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

header.dataset.menuReady = "";
menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener("click", event => {
  if (!header.contains(event.target)) setMenu(false);
});
mobile.addEventListener("change", () => setMenu(false));
window.addEventListener("pageshow", () => setMenu(false));

// The supplied single-file preview used fragments as page addresses.
const fragmentPages = new Set([
  "index.html", "products.html", "dual-shades.html", "roller-shades.html", "motorized.html",
  "services.html", "about.html", "gallery.html", "guides.html", "faq.html", "contact.html",
]);
function followPreviewFragment() {
  const file = location.hash.slice(1);
  if (fragmentPages.has(file)) location.replace(new URL(file, document.baseURI).href);
}
window.addEventListener("hashchange", followPreviewFragment);
followPreviewFragment();

const form = document.querySelector("#preview-enquiry");
if (form) {
  const button = form.querySelector("button");
  const status = form.querySelector("[role=status]");
  function previewEnquiry(event) {
    event.preventDefault();
    if (form.reportValidity()) status.textContent = "Preview complete. No enquiry was sent.";
  }
  form.addEventListener("submit", previewEnquiry);
  button.addEventListener("click", previewEnquiry);
  form.addEventListener("input", () => { status.textContent = ""; });
  button.disabled = false;
}
