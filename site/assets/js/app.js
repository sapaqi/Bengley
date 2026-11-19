"use strict";

// McGarrell Reilly — progressive enhancements.
// All content is in the HTML; scripts only add behaviour, so every page reads
// correctly without JavaScript. Hooks are data-* attributes, never styling classes.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* ------------------------------------------------------------------ Header */
function setupHeader() {
  const header = $("#site-header");
  const toggle = $(".menu-toggle", header);
  const nav = $(".primary-nav", header);
  const label = $(".menu-toggle__label", toggle);
  let scheduled = false;

  function setOpen(open, returnFocus = false) {
    header.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    label.textContent = open ? "Close" : "Menu";
    if (!open && returnFocus) toggle.focus();
  }
  function update() {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
    scheduled = false;
  }

  toggle.hidden = false;
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) setOpen(false, true);
  });
  document.addEventListener("click", (event) => { if (!header.contains(event.target)) setOpen(false); });
  header.addEventListener("focusout", (event) => { if (!header.contains(event.relatedTarget)) setOpen(false); });
  window.matchMedia("(max-width: 767px)").addEventListener("change", () => setOpen(false));
  window.addEventListener("scroll", () => {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* ------------------------------------------------------------- Hero slider */
function setupHero(section) {
  const slides = $$(".fade-slide", section);
  const controls = $("[data-slide-controls]", section);
  const status = $("[data-slide-status]", section);
  if (slides.length < 2 || !controls) return;
  let current = 0;
  let requested = 0;

  async function show(index) {
    requested = (index + slides.length) % slides.length;
    const target = requested;
    slides[target].loading = "eager";
    try {
      await slides[target].decode();
    } catch {
      if (target === requested) status.textContent = "This image could not be loaded. Please try another slide.";
      return;
    }
    if (target !== requested) return;
    slides[current].classList.remove("is-active");
    slides[current].setAttribute("aria-hidden", "true");
    slides[target].classList.add("is-active");
    slides[target].removeAttribute("aria-hidden");
    current = target;
    status.textContent = `Slide ${current + 1} of ${slides.length}`;
  }

  controls.hidden = false;
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-direction]");
    if (button) show(requested + Number(button.dataset.direction));
  });
  section.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    show(requested + (event.key === "ArrowRight" ? 1 : -1));
  });
}

/* -------------------------------------------------------- Projects carousel */
function setupProjects(section) {
  const data = JSON.parse($("[data-project-list]", section).textContent);
  const visual = $("[data-projects]", section);
  const dots = $("[data-project-dots]", section);
  const image = $(".photo__img", visual);
  const imageLink = $("[data-project-link]", section);
  const title = $("[data-project-title]", section);
  const category = $("[data-project-category]", section);
  const detailLink = $(".js-project-link", section);
  const status = $("[data-slide-status]", section);
  if (data.length < 2) return;
  let requested = 0;

  async function show(index) {
    requested = (index + data.length) % data.length;
    const target = requested;
    const project = data[target];
    const preload = new Image();
    preload.src = project.image;
    visual.setAttribute("aria-busy", "true");
    image.classList.add("is-loading");
    try {
      await preload.decode();
    } catch {
      if (target === requested) {
        image.classList.remove("is-loading");
        visual.removeAttribute("aria-busy");
        status.textContent = "This project image could not be loaded. Please try another project.";
      }
      return;
    }
    if (target !== requested) return;
    image.src = project.image;
    image.alt = project.alt;
    title.replaceChildren(document.createTextNode(project.title), document.createElement("br"), document.createTextNode(project.address));
    category.textContent = project.label;
    imageLink.href = project.url;
    imageLink.setAttribute("aria-label", `View ${project.title}, ${project.address}`);
    if (detailLink) detailLink.href = project.url;
    $$("button", dots).forEach((button, i) => button.setAttribute("aria-pressed", String(i === target)));
    image.classList.remove("is-loading");
    visual.removeAttribute("aria-busy");
    status.textContent = `Project ${target + 1} of ${data.length}: ${project.title}, ${project.address}`;
  }

  data.forEach((project, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-dot";
    button.setAttribute("aria-label", `Show project ${index + 1}: ${project.title}`);
    button.setAttribute("aria-pressed", String(index === 0));
    button.addEventListener("click", () => show(index));
    dots.append(button);
  });
  dots.hidden = false;
  visual.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    show(requested + (event.key === "ArrowRight" ? 1 : -1));
  });
}

/* ------------------------------------------- Dot carousels (shared pattern) */
// Testimonials, Image Band carousel and the property gallery.
function setupCarousel(root) {
  const slides = $$("[data-slide]", root);
  const texts = $$("[data-slide-text]", root);
  const dots = $("[data-dots]", root);
  const status = $("[data-slide-status]", root);
  if (slides.length < 2 || !dots) return;
  const buttons = $$("button", dots);
  let current = 0;
  let requested = 0;

  async function show(index) {
    requested = (index + slides.length) % slides.length;
    const target = requested;
    const img = $("img", slides[target]);
    if (img) {
      img.loading = "eager";
      try { await img.decode(); } catch {
        if (status) status.textContent = "This image could not be loaded. Please try again.";
        return;
      }
    }
    if (target !== requested) return;
    current = target;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    texts.forEach((text, i) => { text.hidden = i !== current; });
    buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === current)));
    if (status) status.textContent = `Item ${current + 1} of ${slides.length}`;
  }

  buttons.forEach((button, i) => button.addEventListener("click", () => show(i)));
  dots.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = (requested + (event.key === "ArrowRight" ? 1 : -1) + slides.length) % slides.length;
    buttons[next].focus();
    show(next);
  });
  dots.hidden = false;
}

/* ------------------------------------------------------------ Property list */
function setupPropertyList(section) {
  const form = $("[data-property-filters]", section);
  const cards = $$("[data-items] > li", section);
  const more = $("[data-more]", section);
  const empty = $("[data-empty]", section);
  const status = $("[data-list-status]", section);
  const batch = Number(section.dataset.batch) || 5;
  let limit = batch;

  function render() {
    const category = $('[name="category"]:checked', form).value;
    const statuses = $$('[name="status"]:checked', form).map((input) => input.value);
    const matches = cards.filter((card) => (category === "all" || category === card.dataset.category)
      && (!statuses.length || statuses.includes(card.dataset.status)));
    cards.forEach((card) => { card.hidden = true; });
    matches.slice(0, limit).forEach((card) => { card.hidden = false; });
    more.hidden = matches.length <= limit;
    empty.hidden = matches.length > 0;
    status.textContent = `${Math.min(limit, matches.length)} of ${matches.length} properties shown.`;
  }

  form.addEventListener("submit", (event) => event.preventDefault());
  form.addEventListener("change", () => { limit = batch; render(); });
  more.addEventListener("click", () => {
    const previous = cards.filter((card) => !card.hidden).length;
    limit += batch;
    render();
    cards.filter((card) => !card.hidden)[previous]?.querySelector("a")?.focus({ preventScroll: true });
  });
  $("[data-reset]", section).addEventListener("click", () => {
    form.reset();
    $$('[name="status"]', form).forEach((input) => { input.checked = false; });
    limit = batch;
    render();
    $('input[name="category"]', form).focus();
  });
  render();
}

/* ------------------------------------------ News and publication libraries */
function setupLibrary(section, { attribute, noun }) {
  const filter = $("[data-filter]", section);
  const cards = $$("[data-items] > article", section);
  const status = $("[data-list-status]", section);
  const more = $("[data-more]", section);
  const batch = Number(section.dataset.batch) || Infinity;
  let limit = batch;

  function render() {
    const matching = cards.filter((card) => filter.value === "all" || card.getAttribute(attribute) === filter.value);
    const visible = new Set(matching.slice(0, limit));
    cards.forEach((card) => { card.hidden = !visible.has(card); });
    if (more) more.hidden = matching.length <= limit;
    status.textContent = `${visible.size} of ${matching.length} ${noun} shown.`;
    return [...visible];
  }
  filter.addEventListener("change", () => { limit = batch; render(); });
  more?.addEventListener("click", () => {
    const previous = cards.filter((card) => !card.hidden).length;
    limit += batch;
    render()[previous]?.querySelector("a")?.focus({ preventScroll: true });
  });
  render();
}

/* ----------------------------------------------------------- Image reveals */
function setupReveals() {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
  const elements = $$("[data-reveal]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  elements.forEach((element) => {
    element.classList.add("reveal-ready");
    observer.observe(element);
  });
  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    elements.forEach((element) => element.classList.add("is-visible"));
    observer.disconnect();
  });
}

/* ---------------------------------------------------------------- Parallax */
// Frames opt in with data-parallax. <html data-parallax="off"> disables it
// site-wide; prefers-reduced-motion disables it for the visitor.
function setupParallax() {
  if (document.documentElement.dataset.parallax === "off") return;
  const frames = $$("[data-parallax]").map((element) => ({
    element,
    hero: Boolean(element.closest('[data-section="hero"]')),
    topAnchored: element.dataset.parallaxAnchor === "top",
    offset: 0,
  }));
  if (!frames.length) return;
  let animationFrame = 0;
  let lastTimestamp = 0;

  function draw(timestamp) {
    animationFrame = 0;
    const viewportHeight = window.innerHeight;
    const elapsed = Math.min(timestamp - lastTimestamp || 16, 32);
    const smoothing = 1 - Math.exp(-elapsed / 130);
    lastTimestamp = timestamp;
    // Read all geometry before writing.
    const positions = frames.map((frame) => ({ frame, bounds: frame.element.getBoundingClientRect(), height: frame.element.clientHeight }));
    let moving = false;

    positions.forEach(({ frame, bounds, height }) => {
      let target = 0;
      if (frame.topAnchored) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
        frame.element.style.setProperty("--parallax-scale", (1.16 + progress * 0.2).toFixed(3));
      } else if (frame.hero) {
        target = Math.max(0, Math.min(height * 0.19, -bounds.top * 0.3));
      } else {
        const distanceFromCenter = viewportHeight * 0.5 - (bounds.top + bounds.height * 0.5);
        target = Math.max(-height * 0.16, Math.min(height * 0.16, distanceFromCenter * 0.38));
      }
      const visible = bounds.bottom > 0 && bounds.top < viewportHeight;
      frame.offset = visible ? frame.offset + (target - frame.offset) * smoothing : target;
      // Hero: never uncover the top edge while returning quickly to the top.
      if (frame.hero) frame.offset = Math.min(frame.offset, Math.max(0, -bounds.top));
      if (Math.abs(target - frame.offset) > 0.1) moving = true;
      frame.element.style.setProperty("--parallax-y", `${frame.offset.toFixed(2)}px`);
    });
    if (moving) animationFrame = window.requestAnimationFrame(draw);
  }

  function schedule() {
    if (!reducedMotion.matches && !animationFrame) animationFrame = window.requestAnimationFrame(draw);
  }
  function sync() {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    lastTimestamp = 0;
    frames.forEach((frame) => {
      frame.element.classList.toggle("has-parallax", !reducedMotion.matches);
      frame.element.style.removeProperty("--parallax-y");
      frame.element.style.removeProperty("--parallax-scale");
      frame.offset = 0;
    });
    schedule();
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("load", schedule, { once: true });
  reducedMotion.addEventListener("change", sync);
  sync();
}

/* -------------------------------------------- Placeholder links and sharing */
// Links marked data-demo-message point at content that has not been supplied
// (PDFs, contact cards). Remove with #demo-notice once the files exist.
function showNotice(message) {
  const notice = $("#demo-notice");
  if (!notice) return;
  $("p", notice).textContent = message;
  notice.hidden = false;
  window.clearTimeout(showNotice.timer);
  showNotice.timer = window.setTimeout(() => { notice.hidden = true; }, 6500);
}

function setupNotices() {
  const notice = $("#demo-notice");
  if (!notice) return;
  $("button", notice).addEventListener("click", () => { notice.hidden = true; });
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-demo-message]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showNotice(link.dataset.demoMessage);
  });
}

function setupShare() {
  const link = $("[data-share]");
  if (!link) return;
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  if (["127.0.0.1", "localhost"].includes(url.hostname) || url.protocol === "file:") {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showNotice("Article sharing is available on the published website.");
    });
  } else {
    link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url.href)}`;
  }
}

/* -------------------------------------------------------------------- Init */
setupHeader();
$$('[data-section="hero"]').forEach(setupHero);
$$('[data-section="projects-carousel"]').forEach(setupProjects);
$$("[data-carousel]").forEach(setupCarousel);
$$('[data-section="property-list"]').forEach(setupPropertyList);
$$('[data-section="news-list"][data-variant="library"]').forEach((section) => setupLibrary(section, { attribute: "data-year", noun: "news articles" }));
$$('[data-section="publication-library"]').forEach((section) => setupLibrary(section, { attribute: "data-type", noun: "publications" }));
setupReveals();
setupParallax();
setupNotices();
setupShare();
