import { esc, cx, photo, roundLink, link, dots } from "../lib/html.mjs";

/**
 * Image Band — a photo with a text box over it.
 *
 * Fields
 *   slides[{ heading, body, image{src,alt}, link{label,url} }]
 *   width   "full" (edge to edge, default) | "contained" (inside the page margins)
 *   colour  "navy" (default) | "pale"
 *   imageAnchor "top", parallax (default true)
 *
 * One slide = static band. Two or more slides = carousel with dots
 * (Social: "McGarrell Reilly in the community").
 */
export default function imageBand(f, ctx, meta = {}) {
  const slides = f.slides || [];
  const parallax = f.parallax !== false;
  const spacing = meta.isLast ? "mb-0" : "mb-gap";

  if (slides.length > 1) return carousel(f, ctx, spacing);

  const s = slides[0];
  const pale = f.colour === "pale";

  if (f.width === "contained") {
    return `<section class="${cx("relative w-full md:wrap", spacing)}" data-section="image-band" data-width="contained" aria-labelledby="${meta.id}">
    ${photo(ctx, s.image, { ratio: "aspect-[4/3] md:aspect-[2/1]", className: "min-h-[330px] md:min-h-[580px] xl:min-h-[650px]", parallax, anchor: f.imageAnchor })}
    <div class="${cx(
      "relative mx-auto -mt-[45px] flex w-[88%] flex-col justify-center p-[35px]",
      "md:absolute md:inset-y-[10%] md:left-[5%] md:m-0 md:w-[43%] xl:left-[10%] xl:w-[36%] xl:p-[55px]",
      pale ? "bg-surface-strong text-black" : "bg-primary text-white",
    )}">
      <h2 class="${cx("type-section text-balance", pale ? "text-heading-alt" : "text-white")}" id="${meta.id}">${esc(s.heading)}</h2>
      ${s.body ? `<p class="my-[35px]">${esc(s.body)}</p>` : ""}
      ${roundLink(ctx, s.link)}
    </div>
  </section>`;
  }

  return `<section class="${cx("relative", spacing)}" data-section="image-band" data-width="full" aria-labelledby="${meta.id}">
    ${photo(ctx, s.image, { ratio: "aspect-[4/3] md:aspect-[3520/1740]", className: "min-h-[300px] md:min-h-[650px] xl:min-h-[700px]", parallax, anchor: f.imageAnchor })}
    <div class="${cx(
      "relative mx-auto -mt-[45px] flex w-[88%] flex-col justify-center p-[35px]",
      "md:absolute md:inset-y-[10%] md:left-[6%] md:m-0 md:w-[38%] xl:left-[10%] xl:w-[32%] xl:p-[55px]",
      pale ? "bg-surface-strong text-black" : "bg-primary text-white",
    )}">
      <h2 class="${cx("max-w-[9em] text-[35px] leading-[1.3] font-normal tracking-[-.025em] text-balance md:text-section", pale && "text-heading-alt")}" id="${meta.id}">${esc(s.heading)}</h2>
      ${s.body ? `<p class="mt-[25px] md:mt-10">${esc(s.body)}</p>` : ""}
      ${s.link ? `<div class="mt-[30px]">${link(ctx, s.link, { className: cx("text-link", !pale && "text-link--light") })}</div>` : ""}
    </div>
  </section>`;
}

function carousel(f, ctx, spacing) {
  const slides = f.slides;
  return `<section class="${cx("relative w-full md:aspect-[3520/1740] md:min-h-[700px] xl:min-h-[720px]", spacing)}" data-section="image-band" data-width="full" data-carousel aria-roledescription="carousel" aria-label="${esc(f.label || slides[0].heading)}">
    <div class="relative h-[330px] md:absolute md:inset-0 md:h-auto">
      ${slides.map((s, i) => `<figure class="absolute inset-0 m-0" data-slide ${i ? "hidden" : ""}>${photo(ctx, s.image, { className: "absolute inset-0 h-full", reveal: false, parallax: false })}</figure>`).join("\n      ")}
    </div>
    <div class="relative mx-auto -mt-[45px] flex min-h-[450px] w-[88%] items-center bg-primary/88 px-[35px] pt-[35px] pb-[100px] text-white md:absolute md:inset-y-[10%] md:left-0 md:m-0 md:min-h-0 md:w-[45%] md:pt-[35px] md:pr-[35px] md:pb-[95px] md:pl-[6vw] xl:w-[42.3%] xl:pt-[50px] xl:pr-[55px] xl:pb-[100px] xl:pl-[min(10vw,230px)]">
      <div>
        ${slides.map((s, i) => `<article data-slide-text ${i ? "hidden" : ""}><h2 class="max-w-[10em] text-[30px] leading-[1.3] font-normal tracking-[-.025em] text-balance md:text-[32px] xl:text-[clamp(30px,2.614vw,46px)]">${esc(s.heading)}</h2><p class="mt-[25px] leading-[1.9] xl:mt-[35px]">${esc(s.body)}</p></article>`).join("\n        ")}
      </div>
      ${dots(slides.length, { label: "Choose a story", noun: "story", className: "absolute bottom-[25px] left-1/2 -translate-x-1/2 [--dot-active:var(--color-accent)] md:bottom-[35px]" })}
      <p class="sr-only" data-slide-status aria-live="polite"></p>
    </div>
  </section>`;
}
