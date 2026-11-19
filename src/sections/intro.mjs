import { esc, cx, photo } from "../lib/html.mjs";

/**
 * Intro.
 * Fields: lead (blue first paragraph, optional), body (paragraphs[]),
 * image{src,alt} (optional), variant "offset" | "wide", imageAnchor "top", parallax.
 *
 * offset: one paragraph aligned to the right two-thirds (most pages).
 * wide:   left-aligned paragraph below the Home hero.
 * With an image: photo left, lead + body right (Responsibility, Our people).
 */
export default function intro(f, ctx) {
  const paragraphs = f.body || [];
  if (f.image) {
    return `<section class="wrap flex flex-col gap-[35px] py-gap md:grid md:grid-cols-[40.5%_49%] md:gap-[10.5%]" data-section="intro" data-variant="image">
    ${photo(ctx, f.image, { ratio: "aspect-[1140/1340]", className: "w-[80%] md:w-full", parallax: f.parallax !== false, anchor: f.imageAnchor })}
    <div class="space-y-[30px] md:space-y-[45px]">
      ${f.lead ? `<p class="type-intro tracking-normal text-primary">${esc(f.lead)}</p>` : ""}
      ${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("\n      ")}
    </div>
  </section>`;
  }

  if (f.variant === "wide") {
    return `<section class="wrap scroll-mt-[100px] pt-[35px] pb-[68px] md:scroll-mt-[120px] md:pt-[100px] md:pb-[clamp(110px,7.955vw,140px)] xl:pt-[clamp(100px,7.955vw,140px)]" id="intro" data-section="intro" data-variant="wide" aria-label="Introduction">
    ${paragraphs.map((p) => `<p class="max-w-[970px] text-[18px] leading-[1.8] tracking-[-.025em] md:text-intro md:leading-[1.636]">${esc(p)}</p>`).join("\n    ")}
  </section>`;
  }

  return `<section class="wrap py-gap" id="intro" data-section="intro" data-variant="offset" aria-label="Introduction">
    ${paragraphs.map((p) => `<p class="${cx("w-full text-[18px] leading-[1.8] tracking-[-.025em] md:ml-auto md:w-[66%] md:text-intro md:leading-[1.65]")}">${esc(p)}</p>`).join("\n    ")}
  </section>`;
}
