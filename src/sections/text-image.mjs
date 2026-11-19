import { esc, cx, photo, link } from "../lib/html.mjs";

/**
 * Text + Image — one component for every text/photo pairing on the site.
 *
 * Fields
 *   heading, subheading (optional), body, link {label,url}, image {src,alt}
 *   imagePosition  "right" (default) | "left"
 *   style          "panel" (light-blue panel)   | "outline" (thin frame, landscape photo)
 *                  "navy"  (full-width navy)    | "block" (Home: solid green block)
 *                  "offset" (Home: photo left, panel starts lower right)
 *   size           "large" (top-level pages: big blue heading)
 *                  "standard" (sub-pages: smaller grey heading)
 *   imageAnchor    "top" keeps the top edge of the photo fixed (faces)
 *   parallax       true by default
 */
export default function textImage(f, ctx, meta = {}) {
  const style = f.style || "panel";
  if (style === "block" || style === "offset") return homeVariant(f, ctx, style);

  const left = f.imagePosition === "left";
  const standard = f.size === "standard";
  const navy = style === "navy";
  const flush = navy && (meta.isLast || meta.next?.type === "image-band");

  const decor = {
    panel: left
      ? cx("absolute inset-y-0 right-[6%] left-0 -z-10 bg-surface-strong md:right-[10%]", standard ? "md:left-[37%]" : "md:left-[40%]")
      : cx("absolute inset-y-0 right-0 left-[6%] -z-10 bg-surface md:right-auto md:left-[10%]", standard ? "md:w-[53%]" : "md:w-[48%]"),
    outline: left
      ? cx("absolute inset-y-0 right-[6%] left-[6%] -z-10 border border-outline md:right-[10%]", standard ? "md:left-[37%]" : "md:left-[40%]")
      : cx("absolute inset-y-0 right-[6%] left-[6%] -z-10 border border-outline md:left-[10%]", standard ? "md:right-[37%]" : "md:right-[40%]"),
    navy: "",
  }[style];

  const columns = standard
    ? cx(left ? "md:grid-cols-[40.5%_49%]" : "md:grid-cols-[49%_40.5%]", "md:gap-[10.5%]")
    : "md:grid-cols-2 md:gap-[8%] xl:gap-[10%]";

  const contentPad = {
    panel: left
      ? "px-[6%] md:px-0 md:pr-[30px] xl:pr-[60px]"
      : cx("px-[6%] md:px-0", standard ? "md:pl-[clamp(40px,6.818vw,120px)]" : "md:pl-10 xl:pl-[90px]"),
    outline: standard
      ? (left ? "px-[6%] md:px-0 md:pr-[clamp(20px,3.409vw,60px)] md:pl-[clamp(25px,5.114vw,90px)]" : "px-[6%] md:px-0 md:pr-[clamp(25px,5.114vw,90px)] md:pl-[clamp(20px,3.409vw,60px)]")
      : (left ? "px-[6%] md:px-0 md:pr-5 xl:pr-[70px]" : "px-[6%] md:px-0 md:pl-5 xl:pl-[70px]"),
    navy: standard ? "md:max-w-[570px]" : "",
  }[style];

  const photoClass = {
    panel: "md:-my-[15px]",
    outline: standard
      ? (left ? "md:-ml-[31%] md:w-[152%]" : "md:w-[152%] md:-mr-[52%]")
      : (left ? "md:-ml-[28%] md:w-[135%]" : "md:w-[135%] md:-mr-[35%]"),
    navy: "",
  }[style];

  const ratio = style === "outline"
    ? "aspect-[1730/1130]"
    : navy && !standard ? "aspect-[1/1.18]" : "aspect-[1140/1340]";

  const headingClass = standard
    ? cx("type-section max-w-[11em] text-[32px] text-balance", navy ? "md:text-section text-white" : "md:text-subheading text-heading-alt")
    : cx("type-section text-balance", navy && "text-white");

  const content = `<div class="${cx("w-full min-w-0", contentPad)}">
        <h2 class="${headingClass}">${esc(f.heading)}</h2>
        ${f.subheading ? `<h3 class="mt-10 max-w-[15em] text-[28px] leading-[1.3] font-normal tracking-[-.025em] text-balance md:mt-[55px] md:text-project xl:mt-[110px]">${esc(f.subheading)}</h3>` : ""}
        ${f.body ? `<p class="my-[30px] leading-[1.9] md:my-[45px]">${esc(f.body)}</p>` : ""}
        ${link(ctx, f.link, { className: cx("text-link", navy && "text-link--light") })}
      </div>`;
  const image = photo(ctx, f.image, { ratio, className: photoClass, parallax: f.parallax !== false, anchor: f.imageAnchor });

  return `<section class="${cx(
    "relative isolate py-[45px] md:py-[65px] xl:py-[90px]",
    flush ? "mb-0" : "mb-gap",
    navy && "bg-primary text-white",
  )}" data-section="text-image" data-style="${style}" data-size="${standard ? "standard" : "large"}" data-image="${left ? "left" : "right"}">
    ${decor ? `<div class="${decor}" aria-hidden="true"></div>` : ""}
    <div class="${cx("wrap flex flex-col gap-[35px] md:grid md:items-center", columns)}">
      ${left ? `${image}\n      ${content}` : `${content}\n      ${image}`}
    </div>
  </section>`;
}

// Home page pairings. Their geometry is fixed by the design: "block" places the
// photo right, "offset" places it left.
function homeVariant(f, ctx, style) {
  const image = (className) => photo(ctx, f.image, { ratio: "aspect-square", className, parallax: f.parallax !== false, anchor: f.imageAnchor });
  if (style === "block") {
    return `<section class="relative isolate mb-[68px] pt-[45px] md:mb-section md:pt-section" data-section="text-image" data-style="block" data-image="right">
    <div class="absolute top-0 bottom-[90px] left-0 -z-10 w-[94%] bg-green md:bottom-10 md:w-[calc(50%-15px)] lg:bottom-[clamp(80px,6.25vw,110px)]" aria-hidden="true"></div>
    <div class="wrap flex flex-col md:grid md:grid-cols-[46%_54%] md:items-start lg:grid-cols-[42.75%_57.25%]">
      <div class="relative w-full pr-[5%] pb-9 text-white md:pr-[42px] md:pb-[70px] lg:pr-[70px] xl:pr-[clamp(40px,8.5vw,150px)] xl:pb-[90px]">
        <h2 class="type-section text-balance text-white">${esc(f.heading)}</h2>
        <p class="mt-7 mb-[30px] max-w-full leading-[1.9] tracking-[-.02em] md:mt-[30px] md:mb-[35px] md:max-w-[470px] md:leading-[1.75] xl:mt-[58px] xl:mb-[60px] xl:leading-[1.889]">${esc(f.body)}</p>
        ${link(ctx, f.link, { className: "text-link text-link--light" })}
      </div>
      ${image("w-[94%] self-end md:w-full md:self-auto")}
    </div>
  </section>`;
  }
  return `<section class="relative isolate mb-[68px] pb-10 md:mb-section md:pb-section" data-section="text-image" data-style="offset" data-image="left">
    <div class="absolute top-[70px] right-0 bottom-0 left-[6%] -z-10 bg-surface md:top-section md:left-[calc(50%+15px)]" aria-hidden="true"></div>
    <div class="wrap flex flex-col md:grid md:grid-cols-[50%_50%] lg:grid-cols-[57.5%_42.5%]">
      ${image("w-[94%] md:mt-[30px] md:w-full lg:mt-0")}
      <div class="relative mt-[38px] w-full pl-[6.383%] md:mt-[120px] md:pl-[45px] lg:mt-[155px] lg:pl-[60px] xl:mt-[clamp(180px,14.773vw,260px)] xl:pl-[clamp(60px,8.523vw,150px)]">
        <h2 class="type-section text-balance">${esc(f.heading)}</h2>
        <p class="mt-content mb-[30px] max-w-full leading-[1.9] tracking-[-.02em] md:mb-[35px] md:max-w-[470px] md:leading-[1.75] xl:mb-[60px] xl:leading-[1.889]">${esc(f.body)}</p>
        ${link(ctx, f.link)}
      </div>
    </div>
  </section>`;
}
