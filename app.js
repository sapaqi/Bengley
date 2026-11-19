"use strict";

// Replace these fixtures with WordPress queries at the template boundary.
const demoData = {
  hero: [
    {
      image: "assets/images/McGR-Home-banner.jpg",
      alt: "Charlemont Square's contemporary office buildings illuminated at dusk",
    },
    {
      image: "assets/images/property-page-carousel-A.jpg",
      alt: "A development from the McGarrell Reilly property portfolio",
    },
    {
      image: "assets/images/McGR-Portfolio-Hero.jpg",
      alt: "New homes at Station Road, Lusk, County Dublin",
    },
  ],
  properties: [
    {
      id: "station-road-lusk",
      title: "Station Road, Lusk",
      address: "County Dublin",
      label: "Residential",
      category: "New homes",
      status: "For Sale",
      featured: true,
      image: "assets/images/McGR-Portfolio-Hero.jpg",
      alt: "New homes at Station Road, Lusk, County Dublin",
      url: "portfolio/station-road-lusk/index.html",
    },
    {
      id: "property-b",
      title: "Property Name",
      address: "Address",
      label: "Commercial",
      category: "Commercial",
      status: "To Let",
      featured: false,
      image: "assets/images/property-tile-B.jpg",
      alt: "A commercial development from the property portfolio",
      url: "portfolio/property-2/index.html",
    },
    {
      id: "property-c",
      title: "Property Name",
      address: "Address",
      label: "Residential",
      category: "New homes",
      status: "For Sale",
      featured: false,
      image: "assets/images/property-tile-C.jpg",
      alt: "A residential development from the property portfolio",
      url: "portfolio/property-3/index.html",
    },
    {
      id: "property-d",
      title: "Property Name",
      address: "Address",
      label: "Residential",
      category: "Development pipeline",
      status: "For Sale",
      featured: false,
      image: "assets/images/property-tile-D.jpg",
      alt: "A development from the property portfolio",
      url: "portfolio/property-4/index.html",
    },
  ],
  news: [
    {
      id: "a-new-era-for-dublin-6",
      title: "A new era for Dublin 6. Read about our latest city centre office development.",
      date: "2023-08-16",
      url: "media/news/a-new-era-for-dublin-6/index.html",
    },
    {
      id: "city-centre-office-development",
      title: "A new era for Dublin 6. Read about our latest city centre office development.",
      date: "2023-08-16",
      url: "media/news/city-centre-office-development/index.html",
    },
    {
      id: "latest-development",
      title: "A new era for Dublin 6. Read about our latest city centre office development.",
      date: "2023-08-16",
      url: "media/news/latest-development/index.html",
    },
    {
      id: "archive",
      title: "A new era for Dublin 6. Read about our latest city centre office development.",
      date: "2022-08-16",
      url: "media/news/archive/",
    },
  ],
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setupHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const mobile = window.matchMedia("(max-width: 767px)");
  let scheduled = false;

  function closeMenu(returnFocus = false) {
    header.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    toggle.querySelector(".menu-toggle__label").textContent = "Menu";
    if (returnFocus) toggle.focus();
  }

  function updateHeader() {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
    scheduled = false;
  }

  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    header.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.querySelector(".menu-toggle__label").textContent = open ? "Close" : "Menu";
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  header.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) closeMenu();
  });
  mobile.addEventListener("change", () => closeMenu());
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      window.requestAnimationFrame(updateHeader);
      scheduled = true;
    }
  }, { passive: true });
  updateHeader();
}

function setupHero() {
  const hero = document.querySelector(".hero");
  const images = document.querySelector("#hero-images .image-reveal__content");
  const controls = document.querySelector(".hero__controls");
  const status = document.querySelector("#hero-status");
  let current = 0;
  let requested = 0;
  const slides = [images.querySelector("img")];

  demoData.hero.slice(1).forEach((slide) => {
    const image = document.createElement("img");
    image.className = "hero__image";
    image.src = slide.image;
    image.alt = slide.alt;
    image.width = 1760;
    image.height = 1060;
    image.decoding = "async";
    image.setAttribute("aria-hidden", "true");
    images.append(image);
    slides.push(image);
  });

  async function showSlide(index) {
    requested = (index + slides.length) % slides.length;
    const target = requested;
    try {
      await slides[target].decode();
    } catch {
      if (target === requested) status.textContent = "This development image could not be loaded. Please try another slide.";
      return;
    }
    if (target !== requested) return;
    slides[current].classList.remove("is-active");
    slides[current].setAttribute("aria-hidden", "true");
    slides[target].classList.add("is-active");
    slides[target].removeAttribute("aria-hidden");
    current = target;
    status.textContent = `Development ${current + 1} of ${slides.length}`;
  }

  controls.hidden = slides.length < 2;
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero-direction]");
    if (button) showSlide(requested + Number(button.dataset.heroDirection));
  });
  hero.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(requested + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
}

function setupProjects() {
  const projects = [...demoData.properties].sort((a, b) => Number(b.featured) - Number(a.featured));
  const visual = document.querySelector(".projects__visual");
  const controls = document.querySelector("#project-controls");
  const image = document.querySelector("#project-image");
  const link = document.querySelector("#project-link");
  const title = document.querySelector("#project-title");
  const category = document.querySelector("#project-category");
  const status = document.querySelector("#project-status");
  let requested = 0;

  async function showProject(index) {
    requested = (index + projects.length) % projects.length;
    const target = requested;
    const project = projects[target];
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
    link.href = project.url;
    const detailLink = document.querySelector("[data-project-detail]");
    if (detailLink) detailLink.href = project.url;
    link.setAttribute("aria-label", `View ${project.title}, ${project.address}`);
    controls.querySelectorAll("button").forEach((button, i) => button.setAttribute("aria-pressed", String(i === target)));
    image.classList.remove("is-loading");
    visual.removeAttribute("aria-busy");
    status.textContent = `Project ${target + 1} of ${projects.length}: ${project.title}, ${project.address}`;
  }

  projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-dot";
    button.setAttribute("aria-label", `Show project ${index + 1}: ${project.title}`);
    button.setAttribute("aria-pressed", String(index === 0));
    button.addEventListener("click", () => showProject(index));
    controls.append(button);
  });
  controls.hidden = projects.length < 2;
  showProject(0);
  visual.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      showProject(requested + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
}

function renderNews() {
  const items = document.querySelector("#news-items");
  const news = [...demoData.news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const fragment = document.createDocumentFragment();
  news.forEach((post) => {
    const item = document.createElement("li");
    item.className = "news__item";
    const link = document.createElement("a");
    link.className = "news__link";
    link.href = post.url;
    const time = document.createElement("time");
    time.dateTime = post.date;
    const [year, month, day] = post.date.split("-");
    time.textContent = `${day}.${month}.${year.slice(-2)}`;
    const heading = document.createElement("h3");
    heading.textContent = post.title;
    const arrow = document.createElement("span");
    arrow.className = "news__arrow";
    arrow.setAttribute("aria-hidden", "true");
    link.append(time, heading, arrow);
    item.append(link);
    fragment.append(item);
  });
  items.replaceChildren(fragment);
}

function setupReveals() {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
  const elements = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  elements.forEach((element) => {
    element.classList.add("reveal-ready");
    observer.observe(element);
  });
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      observer.disconnect();
    }
  });
}

function setupParallax() {
  const frames = [...document.querySelectorAll(".hero__images, .projects__image-frame, .feature__image-frame, [data-parallax]")].map((element) => ({
    element,
    hero: element.classList.contains("hero__images"),
    topAnchored: element.dataset.parallaxAnchor === "top",
    offset: 0,
  }));
  let animationFrame = 0;
  let lastTimestamp = 0;

  function draw(timestamp) {
    animationFrame = 0;
    const viewportHeight = window.innerHeight;
    const elapsed = Math.min(timestamp - lastTimestamp || 16, 32);
    const smoothing = 1 - Math.exp(-elapsed / 130);
    lastTimestamp = timestamp;

    // Read all geometry before updating the image transforms.
    const positions = frames.map((frame) => ({
      frame,
      bounds: frame.element.getBoundingClientRect(),
      height: frame.element.clientHeight,
    }));
    let moving = false;

    positions.forEach(({ frame, bounds, height }) => {
      const distanceFromCenter = viewportHeight * .5 - (bounds.top + bounds.height * .5);
      let target = 0;
      if (frame.topAnchored) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)));
        frame.element.style.setProperty("--parallax-scale", (1.16 + progress * .2).toFixed(3));
      } else if (frame.hero) {
        target = Math.max(0, Math.min(height * .19, -bounds.top * .3));
      } else {
        target = Math.max(-height * .16, Math.min(height * .16, distanceFromCenter * .38));
      }
      const visible = bounds.bottom > 0 && bounds.top < viewportHeight;

      frame.offset = visible ? frame.offset + (target - frame.offset) * smoothing : target;
      if (frame.hero) {
        // Keep the full draft crop and place any uncovered area above the viewport.
        frame.offset = Math.min(frame.offset, Math.max(0, -bounds.top));
      }
      if (Math.abs(target - frame.offset) > .1) moving = true;
      frame.element.style.setProperty("--parallax-y", `${frame.offset.toFixed(2)}px`);
    });

    if (moving) animationFrame = window.requestAnimationFrame(draw);
  }

  function schedule() {
    if (!reducedMotion.matches && !animationFrame) {
      animationFrame = window.requestAnimationFrame(draw);
    }
  }

  function syncMotion() {
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
  reducedMotion.addEventListener("change", syncMotion);
  syncMotion();
}

// Only explicitly marked, unsupplied content receives an availability message.
// Normal navigation must work even when the optional route manifest is unavailable.
function setupDemoLinks() {
  const notice = document.querySelector("#demo-notice");
  if (!notice) return;
  let timer;
  notice.querySelector("button").addEventListener("click", () => {
    notice.hidden = true;
    window.clearTimeout(timer);
  });
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-demo-message]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href === "./" || link.origin !== window.location.origin || !["http:", "https:", "file:"].includes(link.protocol)) return;
    event.preventDefault();
    notice.querySelector("p").textContent = link.dataset.demoMessage;
    notice.hidden = false;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { notice.hidden = true; }, 6500);
  });
}

setupHeader();
if (document.querySelector("#hero-images")) setupHero();
if (document.querySelector("#project-controls")) setupProjects();
if (document.querySelector("#news-items")) renderNews();
setupReveals();
setupParallax();
setupDemoLinks();
