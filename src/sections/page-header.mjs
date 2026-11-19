import { esc, cx, photo } from "../lib/html.mjs";

/**
 * Page Header.
 * Fields: title, image{src,alt}, variant "large" | "side", parallax (default false,
 * as in the approved prototype), extra (HTML slot used by the Property template).
 *
 * large: very large title running under the photo (About Us, Portfolio...).
 * side:  smaller title beside the photo (Investment, Our people, Social...).
 */
export default function pageHeader(f, ctx) {
  const parallax = f.parallax === true;
  if (f.variant === "side") {
    return `<section class="relative isolate pt-[160px] pb-[60px] md:pt-[calc(var(--header-offset)+90px)] md:pb-[90px] xl:pt-[calc(var(--header-offset)+clamp(60px,7.955vw,140px))] xl:pb-[clamp(60px,7.955vw,140px)]" data-section="page-header" data-variant="side" aria-labelledby="page-title">
    <div class="absolute top-[115px] right-0 bottom-0 left-1/4 -z-10 bg-surface md:top-header md:left-[51%]" aria-hidden="true"></div>
    <div class="wrap flex flex-col gap-[35px] md:grid md:grid-cols-[34%_66%] md:items-start md:gap-0">
      <div class="w-full min-w-0 md:pr-5 xl:pr-[30px]">
        <h1 class="${cx("type-section text-[clamp(32px,8.8vw,46px)] wrap-anywhere text-balance md:wrap-normal xl:text-[clamp(34px,3.409vw,60px)]", f.extra ? "md:max-w-[6em] md:text-[40px]" : "md:text-[clamp(26px,3.409vw,40px)]")}" id="page-title">${esc(f.title)}</h1>${f.extra || ""}
      </div>
      ${photo(ctx, f.image, { ratio: "aspect-[1860/1120]", className: "ml-auto w-[90%] md:ml-0 md:w-full", reveal: false, parallax, eager: true })}
    </div>
  </section>`;
  }

  const longWord = Math.max(...f.title.split(/\s+/).map((word) => word.length)) >= 12;
  return `<section class="relative isolate pt-header" data-section="page-header" data-variant="large" aria-labelledby="page-title">
    <div class="absolute inset-y-0 right-0 left-1/4 -z-10 bg-surface md:left-[40%]" aria-hidden="true"></div>
    <div class="wrap block md:grid md:grid-cols-[34%_66%]">
      ${photo(ctx, f.image, { ratio: "aspect-[5/3]", className: "ml-auto w-[90%] md:col-start-2 md:ml-0 md:w-full", reveal: false, parallax, eager: true })}
      <h1 class="${cx(
        "relative z-[1] col-span-full mt-5 pb-[25px] text-page-title leading-[1.15] font-medium tracking-[-.045em] text-primary wrap-anywhere",
        "md:mt-3 md:max-w-[6em] md:pb-10 md:leading-[1.23] md:text-balance md:wrap-normal",
        longWord && "max-md:text-[clamp(39px,10.1vw,70px)]",
      )}" id="page-title">${esc(f.title)}</h1>
    </div>
  </section>`;
}
