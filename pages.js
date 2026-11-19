"use strict";

function setupPropertyFilters() {
  const form = document.querySelector(".property-filters");
  if (!form) return;
  const cards = [...document.querySelectorAll(".property-card")];
  const more = document.querySelector(".load-more");
  const empty = document.querySelector(".property-empty");
  const status = document.querySelector("[data-property-status]");
  let limit = 5;

  function render() {
    const category = form.querySelector('[name="category"]:checked').value;
    const statuses = [...form.querySelectorAll('[name="status"]:checked')].map(input => input.value);
    const matches = cards.filter(card => (category === "all" || category === card.dataset.category) && (!statuses.length || statuses.includes(card.dataset.status)));
    cards.forEach(card => { card.hidden = true; });
    matches.slice(0, limit).forEach(card => { card.hidden = false; });
    more.hidden = matches.length <= limit;
    empty.hidden = matches.length > 0;
    status.textContent = `${Math.min(limit, matches.length)} of ${matches.length} properties shown.`;
  }

  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("change", () => { limit = 5; render(); });
  more.addEventListener("click", () => {
    const previousCount = cards.filter(card => !card.hidden).length;
    limit += 5;
    render();
    const firstNewCard = cards.filter(card => !card.hidden)[previousCount];
    if (firstNewCard) firstNewCard.querySelector("a").focus({ preventScroll: true });
  });
  document.querySelector("[data-reset-filters]").addEventListener("click", () => {
    form.reset();
    form.querySelectorAll('[name="status"]').forEach(input => { input.checked = false; });
    limit = 5;
    render();
    form.querySelector('input[name="category"]').focus();
  });
  render();
}

function setupTestimonials() {
  const controls = document.querySelector(".testimonial-controls");
  if (!controls) return;
  const items = [...document.querySelectorAll(".testimonial")];
  const buttons = [...controls.querySelectorAll("button")];
  const status = document.querySelector("[data-testimonial-status]");
  let current = 0;
  function show(index) {
    current = (index + items.length) % items.length;
    items.forEach((item, i) => { item.hidden = i !== current; });
    buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === current)));
    status.textContent = `Testimonial ${current + 1} of ${items.length}`;
  }
  buttons.forEach((button, index) => button.addEventListener("click", () => show(index)));
  controls.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(current + (event.key === "ArrowRight" ? 1 : -1));
      buttons[current].focus();
    }
  });
  controls.hidden = false;
}

setupPropertyFilters();
setupTestimonials();

function setupPropertyGallery() {
  const gallery = document.querySelector(".property-gallery");
  if (!gallery) return;
  const figures = [...gallery.querySelectorAll("figure")];
  const controls = gallery.querySelector(".property-gallery__controls");
  const buttons = [...controls.querySelectorAll("button")];
  const status = gallery.querySelector("[data-gallery-status]");
  let current = 0;
  let request = 0;

  async function show(index) {
    const next = (index + figures.length) % figures.length;
    const token = ++request;
    const photo = figures[next].querySelector("img");
    // Decode the next photograph before hiding the current one.
    photo.loading = "eager";
    try {
      await photo.decode();
    } catch {
      status.textContent = "This photograph could not be loaded. Please try again.";
      return;
    }
    if (token !== request) return;
    current = next;
    figures.forEach((figure, i) => { figure.hidden = i !== current; });
    buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === current)));
    status.textContent = `Photograph ${current + 1} of ${figures.length}`;
  }
  buttons.forEach((button, index) => button.addEventListener("click", () => show(index)));
  controls.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = (current + (event.key === "ArrowRight" ? 1 : -1) + figures.length) % figures.length;
    buttons[next].focus();
    show(next);
  });
  controls.hidden = false;
}

function setupArticleSharing() {
  const link = document.querySelector("[data-share-article]");
  if (!link) return;
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  const local = ["127.0.0.1", "localhost"].includes(url.hostname) || url.protocol === "file:";
  if (local) {
    link.addEventListener("click", event => {
      event.preventDefault();
      document.querySelector("[data-share-status]").textContent = "Article sharing is available on the published website.";
      const notice = document.querySelector("#demo-notice");
      notice.querySelector("p").textContent = "Article sharing is available on the published website.";
      notice.hidden = false;
    });
  } else {
    link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url.href)}`;
  }
}

setupPropertyGallery();
setupArticleSharing();

function setupCollectionLibrary({ rootSelector, filterSelector, cardSelector, statusSelector, attribute, moreSelector, batch = Infinity, noun }) {
  const root = document.querySelector(rootSelector);
  if (!root) return;
  const filter = root.querySelector(filterSelector);
  const cards = [...root.querySelectorAll(cardSelector)];
  const status = root.querySelector(statusSelector);
  const more = moreSelector ? root.querySelector(moreSelector) : null;
  let limit = batch;

  function render() {
    const matching = cards.filter(card => filter.value === "all" || card.getAttribute(attribute) === filter.value);
    const visible = matching.slice(0, limit);
    const visibleSet = new Set(visible);
    cards.forEach(card => { card.hidden = !visibleSet.has(card); });
    if (more) more.hidden = matching.length <= limit;
    status.textContent = `${visible.length} of ${matching.length} ${noun} shown.`;
    return visible;
  }
  filter.addEventListener("change", () => { limit = batch; render(); });
  if (more) more.addEventListener("click", () => {
    const previous = cards.filter(card => !card.hidden).length;
    limit += batch;
    const visible = render();
    visible[previous]?.querySelector("a")?.focus({ preventScroll: true });
  });
  render();
}

function setupCommunityCarousel() {
  const carousel = document.querySelector(".community-carousel");
  if (!carousel) return;
  const figures = [...carousel.querySelectorAll("figure")];
  const stories = [...carousel.querySelectorAll(".community-copy article")];
  const controls = carousel.querySelector(".community-controls");
  const buttons = [...controls.querySelectorAll("button")];
  const status = carousel.querySelector("[data-community-status]");
  let current = 0;
  let requested = 0;
  async function show(index) {
    requested = (index + figures.length) % figures.length;
    const next = requested;
    const img = figures[next].querySelector("img");
    try {
      await img.decode();
    } catch {
      status.textContent = "This photograph could not be loaded. Please try another story.";
      return;
    }
    if (requested !== next) return;
    current = next;
    figures.forEach((item, i) => { item.hidden = i !== current; });
    stories.forEach((item, i) => { item.hidden = i !== current; });
    buttons.forEach((item, i) => item.setAttribute("aria-pressed", String(i === current)));
    status.textContent = `Community story ${current + 1} of ${figures.length}`;
  }
  buttons.forEach((button, i) => button.addEventListener("click", () => show(i)));
  controls.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const next = (requested + (event.key === "ArrowRight" ? 1 : -1) + figures.length) % figures.length;
    buttons[next].focus();
    show(next);
  });
  controls.hidden = false;
}

setupCollectionLibrary({ rootSelector: "[data-publication-library]", filterSelector: "[data-publication-filter]", cardSelector: ".publication-card", statusSelector: "[data-publication-status]", attribute: "data-publication-type", noun: "publications" });
setupCollectionLibrary({ rootSelector: "[data-news-library]", filterSelector: "[data-news-filter]", cardSelector: ".news-library__card", statusSelector: "[data-news-status]", attribute: "data-news-year", moreSelector: ".news-load-more", batch: 9, noun: "news articles" });
setupCommunityCarousel();
