// Small helpers shared by every section template.
// Each helper maps to something the WordPress theme will provide later
// (esc_html, wp_get_attachment_image, get_permalink...).

export const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

export const cx = (...parts) => parts.flat().filter(Boolean).join(" ");

export const attrs = (map) => Object.entries(map)
  .filter(([, value]) => value !== false && value !== null && value !== undefined)
  .map(([key, value]) => (value === true ? key : `${key}="${esc(value)}"`))
  .join(" ");

/**
 * Build-time context for one page. Routes in content are site-relative
 * ("about-us/our-people/"); they are written as relative links so the
 * prototype works from any host, a sub-folder or straight from disk.
 */
export function createContext({ route, site, dimensions = () => ({}) }) {
  const depth = route ? route.replace(/\/$/, "").split("/").length : 0;
  const prefix = "../".repeat(depth);
  return {
    route,
    site,
    prefix,
    dimensions,
    url(target = "") {
      if (/^(https?:|mailto:|tel:|#)/.test(target)) return target;
      const [path, hash = ""] = target.split("#");
      const file = path === "" || path.endsWith("/") ? `${path}index.html` : path;
      return prefix + file + (hash ? `#${hash}` : "");
    },
    asset(path) {
      return `${prefix}assets/${path.split("/").map(encodeURIComponent).join("/")}`;
    },
    image(name) {
      return this.asset(`images/${name}`);
    },
    icon(name) {
      return this.asset(`icons/${name}.svg`);
    },
  };
}

/**
 * Photo frame with optional reveal and parallax.
 * - ratio: a literal Tailwind aspect class, e.g. "aspect-[1140/1340]".
 * - reveal: image slides in once when scrolled into view.
 * - parallax: section-level switch; the site-wide switch is <html data-parallax>.
 * - anchor: "top" keeps the top edge fixed (faces stay in frame).
 */
export function photo(ctx, image, { className = "", ratio = "", reveal = true, parallax = true, anchor = "", eager = false } = {}) {
  if (!image) return "";
  const size = ctx.dimensions(image.src);
  return `<div ${attrs({
    class: cx("photo", ratio, className),
    "data-reveal": reveal,
    "data-parallax": parallax,
    "data-parallax-anchor": anchor || false,
  })}><div class="image-reveal"><div class="image-reveal__content"><img ${attrs({
    class: "photo__img",
    src: ctx.image(image.src),
    alt: image.alt ?? "",
    width: size.width,
    height: size.height,
    loading: eager ? "eager" : "lazy",
    decoding: "async",
  })}></div></div></div>`;
}

export function link(ctx, item, { className = "text-link", arrow = true } = {}) {
  if (!item || !item.label) return "";
  const missing = !item.url;
  return `<a ${attrs({
    class: className,
    href: missing ? ctx.url(item.placeholder || "#") : ctx.url(item.url),
    target: item.external ? "_blank" : false,
    rel: item.external ? "noopener noreferrer" : false,
    "data-demo-message": item.message || false,
  })}>${esc(item.label)}${arrow ? '<span class="text-link__arrow" aria-hidden="true"></span>' : ""}</a>`;
}

export function roundLink(ctx, item) {
  if (!item || !item.url) return "";
  return `<a class="round-link" href="${esc(ctx.url(item.url))}" aria-label="${esc(item.label)}"><img src="${ctx.icon("McGR banner Right Arrow DEFAULT")}" width="45" height="45" alt=""></a>`;
}

export function dots(count, { label, noun, className = "" }) {
  if (count < 2) return "";
  return `<div class="${cx("flex", className)}" data-dots aria-label="${esc(label)}" hidden>${Array.from({ length: count }, (_, i) =>
    `<button type="button" class="carousel-dot" aria-label="Show ${esc(noun)} ${i + 1}" aria-pressed="${i === 0}"></button>`).join("")}</div>`;
}

/** Format an ISO date as the design's dd.mm.yy. */
export function shortDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y.slice(-2)}`;
}

export const headingId = (text) => esc(String(text).toLowerCase().replace(/&amp;|&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
