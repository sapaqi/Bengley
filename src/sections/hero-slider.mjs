import { esc, attrs, cx } from "../lib/html.mjs";

/**
 * Hero Slider (Home).
 * Fields: heading, slides[{ image:{src,alt} }], parallax (default true).
 */
export default function heroSlider(f, ctx) {
  const parallax = f.parallax !== false;
  const slides = f.slides.map((slide, i) => {
    const size = ctx.dimensions(slide.image.src);
    return `<img ${attrs({
      class: cx("photo__img fade-slide absolute inset-0 max-md:object-[54%_center] 2xl:object-top", i === 0 && "is-active"),
      src: ctx.image(slide.image.src),
      alt: slide.image.alt,
      width: size.width,
      height: size.height,
      fetchpriority: i === 0 ? "high" : false,
      loading: i === 0 ? false : "lazy",
      decoding: "async",
      "aria-hidden": i === 0 ? false : "true",
    })}>`;
  }).join("\n          ");
  const many = f.slides.length > 1;

  return `<section class="relative mb-0 pt-0 md:mb-[clamp(62px,4.545vw,80px)] md:pt-[69vw] xl:pt-[min(60.2273vw,1060px)]" data-section="hero" aria-labelledby="hero-heading" ${many ? 'aria-roledescription="carousel" aria-label="Featured developments"' : ""}>
    <div ${attrs({ class: "photo relative h-[clamp(440px,125vw,650px)] bg-primary md:absolute md:inset-0 md:h-auto", "data-parallax": parallax, "data-slides": many })}>
      <div class="image-reveal"><div class="image-reveal__content">
          ${slides}
      </div></div>
    </div>
    <div class="relative w-full md:wrap md:absolute md:bottom-0 md:left-1/2 md:flex md:-translate-x-1/2 md:translate-y-[clamp(62px,4.545vw,80px)] md:items-end md:justify-between">
      <div class="relative -mt-[72px] w-[94%] bg-primary px-[6.383%] pt-8 pb-20 text-white md:mt-0 md:w-[72%] md:px-[38px] md:pt-[35px] md:pb-[70px] xl:w-[66%] xl:max-w-[930px] xl:p-[clamp(35px,3.409vw,60px)]">
        <h1 class="max-w-[510px] text-hero leading-[1.28] font-normal tracking-[-.025em] md:max-w-[11em] md:leading-[1.25]" id="hero-heading">${esc(f.heading)}</h1>
        ${many ? `<div class="absolute right-6 bottom-[22px] flex gap-5 md:bottom-5 md:gap-3 xl:right-[30px] xl:bottom-[30px] xl:gap-5" data-slide-controls hidden>
          <button class="image-button size-10 md:size-[38px] xl:size-[45px]" type="button" data-direction="-1" aria-label="Previous development">
            <img class="icon-default" src="${ctx.icon("McGR banner Left Arrow DEFAULT")}" width="45" height="45" alt="">
            <img class="icon-active" src="${ctx.icon("McGR banner Left Arrow ACTIVE")}" width="45" height="45" alt="">
          </button>
          <button class="image-button size-10 md:size-[38px] xl:size-[45px]" type="button" data-direction="1" aria-label="Next development">
            <img class="icon-default" src="${ctx.icon("McGR banner Right Arrow DEFAULT")}" width="45" height="45" alt="">
            <img class="icon-active" src="${ctx.icon("McGR banner Right Arrow ACTIVE")}" width="45" height="45" alt="">
          </button>
        </div>
        <p class="sr-only" data-slide-status aria-live="polite" aria-atomic="true"></p>` : ""}
      </div>
      <a class="group mt-[18px] mr-[6%] ml-auto grid size-12 place-items-center md:m-0 md:-mb-1.5 md:size-[60px]" href="#intro" aria-label="Scroll to introduction">
        <img class="h-4 w-[31px] transition-transform duration-[280ms] group-hover:translate-y-[5px] md:h-[21px] md:w-[41px]" src="${ctx.icon("McGR autoscroll arrow")}" width="41" height="21" alt="">
      </a>
    </div>
  </section>`;
}
