import { esc, attrs, cx, photo, link, roundLink, shortDate } from "../lib/html.mjs";

// Sections fed by collections (Properties, News, Publications, Jobs).
// In WordPress each becomes a WP_Query in the matching template part.

const categoryLabel = (p) => ({ commercial: "Commercial", pipeline: "Development Pipeline" }[p.category] || "Residential");

/**
 * Projects Carousel. Fields: heading, linkMode "all" | "current", linkLabel, limit (4).
 * Featured properties first, then by order; only properties with a photo.
 */
export function projectsCarousel(f, ctx, meta) {
  const projects = [...ctx.collections.properties]
    .filter((p) => p.image)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, f.limit || 4);
  const first = projects[0];
  const linkItem = f.linkMode === "current"
    ? { label: f.linkLabel || "View Property", url: first.route }
    : { label: f.linkLabel || "View all Properties", url: "portfolio/" };
  const data = projects.map((p) => ({ title: p.title, address: p.address, label: categoryLabel(p), image: ctx.image(p.image.src), alt: p.image.alt, url: ctx.url(p.route) }));

  return `<section class="relative isolate pb-[68px] md:pb-section" data-section="projects-carousel" aria-labelledby="${meta.id}">
    <div class="absolute top-[75px] right-0 bottom-[68px] left-1/4 -z-10 bg-surface md:top-0 md:bottom-section md:left-[calc(50%+15px)]" aria-hidden="true"></div>
    <div class="wrap flex flex-col pb-8 md:grid md:grid-cols-[37%_63%] md:pt-[clamp(32px,1.705vw,40px)] md:pb-section xl:grid-cols-[34%_66%]">
      <div class="contents md:flex md:flex-col md:items-start">
        <h2 class="type-section order-0 mb-9 text-balance md:mb-0 md:text-[34px] lg:text-[38px] xl:text-section" id="${meta.id}">${esc(f.heading)}</h2>
        <div class="order-2 mt-7 pr-[18px] md:my-auto md:pt-[60px] md:pr-5 xl:pt-10 xl:pr-6" data-project-details>
          <p class="mb-2 text-[13px] leading-[1.5] text-accent uppercase md:mb-4 md:text-[14px] xl:text-body" data-project-category>${esc(categoryLabel(first))}</p>
          <h3 class="type-project text-[27px] leading-[1.35] text-primary md:text-[25px] md:leading-[1.25] lg:text-[29px] xl:text-project" data-project-title>${esc(first.title)}<br>${esc(first.address)}</h3>
        </div>
        <div class="order-3 mt-[26px] self-start md:mt-0 md:mb-0.5">${link(ctx, linkItem, { className: cx("text-link", f.linkMode === "current" && "js-project-link") })}</div>
      </div>
      <div class="order-1 w-full min-w-0 md:pt-[clamp(100px,6.25vw,110px)]" data-projects aria-roledescription="carousel" aria-label="Property portfolio" tabindex="0">
        <div class="relative aspect-[5/3] overflow-hidden">
          ${photo(ctx, first.image, { className: "absolute inset-0 h-full", parallax: f.parallax !== false })}
          <a class="absolute inset-0 z-[1]" href="${ctx.url(first.route)}" data-project-link aria-label="View ${esc(first.title)}, ${esc(first.address)}"></a>
          <div class="absolute bottom-[7px] left-1/2 z-[2] flex -translate-x-1/2 md:bottom-6" data-project-dots aria-label="Choose a project" hidden></div>
        </div>
        <p class="sr-only" data-slide-status aria-live="polite" aria-atomic="true"></p>
        <script type="application/json" data-project-list>${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>
      </div>
    </div>
  </section>`;
}

/** Property List (Portfolio). Fields: heading, batch (5). */
export function propertyList(f, ctx, meta) {
  const filters = [["all", "All"], ["new-homes", "New Homes"], ["commercial", "Commercial"], ["pipeline", "Development Pipeline"]];
  let shown = 0;
  const cards = ctx.collections.properties.map((p, i) => {
    const visible = p.status === "sale" && shown++ < (f.batch || 5);
    return `<li ${attrs({ "data-category": p.category, "data-status": p.status, hidden: !visible })}>
        <a class="group grid grid-cols-1 no-underline md:grid-cols-[49%_51%]" href="${ctx.url(p.route)}">
          ${photo(ctx, p.image, { ratio: "aspect-[3/2]", reveal: false, parallax: false })}
          <div class="${cx("relative flex min-h-[230px] flex-col justify-center border px-7 pt-[60px] pb-[55px] md:min-h-0 md:p-[35px] xl:p-[55px]", i % 2 ? "border-surface bg-surface" : "border-border")}">
            <p class="absolute top-[22px] left-7 text-[15px] text-heading-alt uppercase md:top-[25px] md:left-[35px] md:text-[14px] xl:top-[38px] xl:left-[55px] xl:text-[15px]">${esc(categoryLabel(p))}</p>
            <h3 class="type-project text-[28px] tracking-[-.03em] text-heading-alt group-hover:text-primary md:text-[30px] xl:text-project">${esc(p.title)}<br>${esc(p.address)}</h3>
            <span class="card-arrow absolute right-7 bottom-[22px] xl:right-10 xl:bottom-[35px]" aria-hidden="true"></span>
          </div>
        </a>
      </li>`;
  }).join("\n      ");

  return `<section class="wrap pb-gap" data-section="property-list" data-batch="${f.batch || 5}" aria-labelledby="${meta.id}">
    <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
    <form class="my-[35px] flex flex-wrap items-center justify-between gap-7 md:my-[55px]" data-property-filters aria-label="Filter properties">
      <fieldset class="m-0 flex min-w-0 flex-wrap items-center gap-2.5 border-0 p-0 md:gap-3"><legend class="float-left w-full pb-3 text-[14px] leading-[34px] uppercase md:w-auto md:pr-6 md:pb-0">Filter</legend>
        ${filters.map(([value, label]) => `<label class="filter-chip"><input type="radio" name="category" value="${value}" ${value === "all" ? "checked" : ""}><span>${label}</span></label>`).join("")}
      </fieldset>
      <fieldset class="m-0 flex min-w-0 flex-wrap items-center gap-[25px] border-0 p-0 md:gap-3"><legend class="sr-only">Availability</legend>
        <label class="filter-switch">For Sale<input type="checkbox" name="status" value="sale" checked><span aria-hidden="true"></span></label>
        <label class="filter-switch">To Let<input type="checkbox" name="status" value="let"><span aria-hidden="true"></span></label>
      </fieldset>
    </form>
    <ul class="m-0 flex list-none flex-col gap-[30px] p-0 md:gap-[55px]" data-items>
      ${cards}
    </ul>
    <p class="py-[60px]" data-empty hidden>No properties match these filters. <button class="bg-transparent p-0 text-primary underline" type="button" data-reset>Clear filters</button></p>
    <p class="sr-only" data-list-status aria-live="polite"></p>
    <button class="solid-button mx-auto mt-10 md:mt-[70px]" type="button" data-more hidden>Load More</button>
    <noscript><style>[data-section="property-list"] li[hidden]{display:block!important}[data-property-filters]{display:none}</style></noscript>
  </section>`;
}

function newsCard(ctx, post, { heading = "h3", reveal = true, library = false } = {}) {
  const H = heading;
  return `<article ${attrs({ class: library ? "border-b border-accent pb-[30px] md:pb-[50px]" : false, "data-year": library ? post.date.slice(0, 4) : false })}>
        <a class="group block no-underline" href="${ctx.url(post.route)}">${photo(ctx, post.image, { ratio: "aspect-[3/2]", reveal, parallax: reveal })}<time class="mt-5 block text-[16px] text-heading-alt md:mt-[30px]" datetime="${post.date}">${shortDate(post.date)}</time><${H} class="mt-2.5 text-[23px] leading-[1.5] font-medium tracking-[-.025em] group-hover:text-primary group-hover:underline md:mt-[15px] ${library ? "md:text-news-title" : "md:text-[clamp(22px,1.591vw,28px)]"}">${esc(post.title)}</${H}></a>
      </article>`;
}

export const latestNews = (ctx, limit, exclude) => [...ctx.collections.news]
  .filter((post) => post.route !== exclude)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, limit);

/**
 * News List. Fields: heading, variant "rows" | "cards" | "library", link {label,url}, limit.
 * rows: Home. cards: Media (three latest). library: News page with year filter.
 */
export function newsList(f, ctx, meta) {
  const variant = f.variant || "rows";

  if (variant === "rows") {
    const posts = latestNews(ctx, f.limit || 3);
    return `<section class="wrap scroll-mt-[100px] pb-[68px] md:scroll-mt-[120px] md:pb-section" data-section="news-list" data-variant="rows" aria-labelledby="${meta.id}">
    <div class="mb-[35px] flex flex-wrap items-center justify-between gap-5 md:mb-[clamp(60px,5.114vw,90px)] md:flex-nowrap md:gap-6">
      <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
      <div class="ml-auto md:ml-0">${link(ctx, f.link, { arrow: false })}</div>
    </div>
    <ul class="m-0 list-none p-0">
      ${posts.map((post, i) => `<li class="${cx("border-t border-accent", i === posts.length - 1 && "border-b")}"><a class="news-row group grid grid-cols-[1fr_24px] items-start gap-x-[14px] gap-y-3 py-7 no-underline md:min-h-[180px] md:grid-cols-[24%_1fr_24px] md:gap-0 md:px-5 md:py-12 lg:grid-cols-[25%_1fr_40px] lg:px-[45px]" href="${ctx.url(post.route)}"><time class="col-span-full text-[15px] leading-[1.5] text-meta md:col-span-1 md:text-news-date" datetime="${post.date}">${shortDate(post.date)}</time><h3 class="max-w-[680px] text-[19px] leading-[1.55] font-medium tracking-[-.025em] group-hover:text-primary md:text-news-title md:leading-[1.5]">${esc(post.title)}</h3><span class="news-row__arrow" aria-hidden="true"></span></a></li>`).join("\n      ")}
    </ul>
  </section>`;
  }

  if (variant === "cards") {
    const posts = latestNews(ctx, f.limit || 3);
    return `<section class="wrap pt-[55px] pb-gap md:pt-20" id="latest-news" data-section="news-list" data-variant="cards" aria-labelledby="${meta.id}">
    <div class="mb-[35px] flex flex-wrap items-start justify-between gap-5 md:mb-[50px] md:flex-nowrap md:items-center md:gap-[30px]">
      <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
      <div class="ml-auto md:ml-0">${link(ctx, f.link)}</div>
    </div>
    <div class="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-7">
      ${posts.map((post) => newsCard(ctx, post)).join("\n      ")}
    </div>
  </section>`;
  }

  // library
  const posts = latestNews(ctx, Infinity);
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];
  const batch = f.batch || 9;
  return `<section class="wrap pt-[180px] pb-gap md:pt-[clamp(190px,16.5vw,290px)]" data-section="news-list" data-variant="library" data-batch="${batch}" aria-labelledby="page-title">
    <div class="mb-10 flex flex-wrap items-start justify-between gap-[25px] md:mb-[clamp(40px,3.5vw,70px)] md:flex-nowrap md:items-center md:gap-[30px]">
      <h1 class="text-[32px] leading-[1.2] font-medium tracking-[-.025em] text-primary md:text-project" id="page-title">${esc(f.heading)}</h1>
      <label class="pill-select ml-auto md:ml-0"><span class="sr-only">Filter news by year</span><select data-filter><option value="all">Select year</option>${years.map((y) => `<option value="${y}">${y}</option>`).join("")}</select></label>
    </div>
    <div class="grid grid-cols-1 gap-x-7 gap-y-[35px] md:grid-cols-3 md:gap-y-[60px]" data-items>
      ${posts.map((post) => newsCard(ctx, post, { heading: "h2", reveal: false, library: true })).join("\n      ")}
    </div>
    <p class="sr-only" data-list-status aria-live="polite"></p>
    <button class="solid-button mx-auto mt-10 md:mt-20" type="button" data-more hidden>Load More</button>
    <noscript><style>[data-variant="library"] article[hidden]{display:block!important}.pill-select{display:none}</style></noscript>
  </section>`;
}

/** Further reading (News article template): two latest other posts. */
export function furtherReading(ctx, exclude) {
  return `<section class="mx-auto w-[88%] border-t border-accent pt-[35px] pb-gap md:w-[78%] md:pt-[45px] xl:w-[53%] xl:max-w-[930px]" aria-labelledby="further-heading">
      <div class="mb-[35px] flex flex-wrap items-start justify-between gap-5 md:mb-[50px] md:flex-nowrap md:items-center md:gap-[30px]"><h2 class="text-[25px] font-medium md:text-[28px]" id="further-heading">Further reading</h2><div class="ml-auto md:ml-0">${link(ctx, { label: "All news", url: "media/news/" })}</div></div>
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-7">${latestNews(ctx, 2, exclude).map((post) => newsCard(ctx, post)).join("")}</div>
    </section>`;
}

/** News Hero (Media). Shows the latest post over its photo. Fields: none. */
export function newsHero(f, ctx) {
  const post = latestNews(ctx, 1)[0];
  return `<section class="relative h-[790px] text-white md:h-[min(60.227vw,1060px)] md:min-h-[650px]" data-section="news-hero" aria-labelledby="media-title">
    ${photo(ctx, post.heroImage || post.image, { className: "absolute inset-0 h-full max-md:[&_img]:object-[62%_center]", reveal: false, parallax: false, eager: true })}
    <div class="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_29_67/64%)_0%,rgb(12_29_67/38%)_36%,rgb(12_29_67/0%)_78%)]" aria-hidden="true"></div>
    <div class="wrap absolute bottom-[45px] left-1/2 -translate-x-1/2 md:bottom-[clamp(45px,3.409vw,60px)]">
      <time class="text-[clamp(14px,.909vw,16px)] leading-[1.5]" datetime="${post.date}">${shortDate(post.date)}</time>
      <h1 class="my-[25px] max-w-[620px] text-[30px] leading-[1.2] font-normal tracking-[-.025em] text-balance md:my-[clamp(22px,1.705vw,30px)] md:text-[clamp(28px,2.614vw,46px)]" id="media-title">${esc(post.title)}</h1>
      <p class="mb-[30px] max-w-full text-[16px] leading-[1.75] md:mb-[clamp(35px,3.125vw,55px)] md:max-w-[min(32.386vw,570px)] md:text-[clamp(14px,1.023vw,18px)] md:leading-[1.8]">${esc(post.excerpt)}</p>
      ${roundLink(ctx, { label: "Read the featured article", url: post.route })}
    </div>
  </section>`;
}

/** Featured Publication (Media). Fields: heading, link. Uses the first publication. */
export function featuredPublication(f, ctx, meta) {
  const pub = ctx.collections.publications[0];
  return `<section class="bg-surface py-[60px] md:py-[100px]" data-section="featured-publication" aria-labelledby="${meta.id}">
    <div class="wrap">
      <div class="mb-[35px] flex flex-wrap items-start justify-between gap-5 md:mb-[50px] md:flex-nowrap md:items-center md:gap-[30px]">
        <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
        <div class="ml-auto md:ml-0">${link(ctx, f.link)}</div>
      </div>
      <div class="mt-[35px] flex flex-col md:mt-[70px] md:grid md:grid-cols-[55%_45%] md:items-center">
        <div class="w-full bg-white p-[30px] md:p-[55px] xl:pt-[90px] xl:pr-[120px] xl:pb-[90px] xl:pl-[90px]">
          <h3 class="text-[30px] leading-[1.3] font-medium text-heading-alt md:text-[32px] xl:text-[42px]">${esc(pub.title)}</h3>
          <p class="my-[30px] md:my-[45px]">${esc(pub.summary)}</p>
          ${link(ctx, { label: "Download", url: pub.file, message: pub.file ? "" : "The publication PDF will be connected in the next stage.", placeholder: "media/publications/" })}
        </div>
        <img class="mt-[30px] ml-auto h-auto w-[75%] md:mt-0 md:-ml-[25px] md:w-full" src="${ctx.image(pub.cover.src)}" alt="${esc(pub.cover.alt)}" width="1140" height="1340" loading="lazy">
      </div>
    </div>
  </section>`;
}

/** Publication Library. Fields: heading. Filter by type. */
export function publicationLibrary(f, ctx) {
  const pubs = ctx.collections.publications;
  const types = [...new Set(pubs.map((p) => p.type))];
  return `<section class="wrap pt-[180px] pb-gap md:pt-[clamp(190px,16.5vw,290px)]" data-section="publication-library" aria-labelledby="page-title">
    <div class="mb-10 flex flex-wrap items-start justify-between gap-[25px] md:mb-[clamp(40px,3.5vw,70px)] md:flex-nowrap md:items-center md:gap-[30px]">
      <h1 class="text-[32px] leading-[1.2] font-medium tracking-[-.025em] text-primary md:text-project" id="page-title">${esc(f.heading)}</h1>
      <label class="pill-select ml-auto md:ml-0"><span class="sr-only">Filter publications by type</span><select data-filter><option value="all">Select type</option>${types.map((t) => `<option value="${t}">${t[0].toUpperCase() + t.slice(1)}</option>`).join("")}</select></label>
    </div>
    <div class="grid grid-cols-1 gap-x-5 gap-y-[35px] sm:grid-cols-2 md:gap-x-[30px] md:gap-y-[50px] lg:grid-cols-4 xl:gap-x-[clamp(25px,3.5vw,70px)] xl:gap-y-[70px]" data-items>
      ${pubs.map((pub) => `<article data-type="${pub.type}"><a class="group flex h-full flex-col no-underline" ${attrs({ href: ctx.url(pub.file || "media/publications/"), "data-demo-message": pub.file ? false : "The publication PDF will be connected when the file is supplied.", "aria-label": `Download ${pub.title}` })}><img class="aspect-[3/4] h-auto w-full object-contain object-left-bottom" src="${ctx.image(pub.cover.src)}" alt="${esc(pub.cover.alt)}" loading="lazy"><div class="mt-[18px] flex flex-1 items-start justify-between gap-2 border-b border-accent pb-5 md:mt-[25px] md:gap-2.5 md:pb-[30px] xl:gap-[15px]"><h2 class="text-[18px] leading-[1.4] font-medium tracking-[-.025em] wrap-anywhere group-hover:text-primary group-hover:underline md:text-[20px] md:wrap-normal xl:text-[clamp(19px,1.591vw,28px)]">${esc(pub.title)}</h2><img class="mt-0.5 size-[19px] shrink-0 md:mt-[5px] md:size-[23px]" src="${ctx.icon("McGR Download icon DEFAULT")}" width="23" height="23" alt=""></div></a></article>`).join("\n      ")}
    </div>
    <p class="sr-only" data-list-status aria-live="polite"></p>
    <noscript><style>.pill-select{display:none}</style></noscript>
  </section>`;
}

/** Jobs List. Fields: heading. */
export function jobsList(f, ctx, meta) {
  const grid = "grid grid-cols-[1fr_1fr_40px] items-center gap-[15px] md:grid-cols-[minmax(0,1fr)_16%_12%_48px] md:gap-7";
  const jobs = ctx.collections.jobs;
  return `<section class="bg-surface py-[60px] md:py-[130px]" data-section="jobs-list" aria-labelledby="${meta.id}">
    <div class="wrap">
      <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
      <div class="${cx(grid, "mt-[70px] hidden pb-[30px] text-heading-alt uppercase md:grid")}" aria-hidden="true"><span>Role</span><span>Type</span><span>Location</span><span></span></div>
      <ul class="m-0 mt-[35px] list-none p-0 md:mt-0">
        ${jobs.map((job, i) => `<li><a class="${cx(grid, "group min-h-0 border-t border-accent py-[30px] no-underline md:min-h-[140px] md:py-[35px]", i === jobs.length - 1 && "border-b")}" href="${ctx.url(job.route)}"><h3 class="col-span-full text-[19px] leading-[1.5] font-semibold group-hover:text-primary group-hover:underline md:col-span-1 xl:text-[23px]">${esc(job.title)}</h3><span class="text-[16px] md:text-[18px] xl:text-[22px]">${esc(job.type)}</span><span class="text-[16px] md:text-[18px] xl:text-[22px]">${esc(job.location)}</span><img class="size-10 md:size-[45px]" src="${ctx.icon("McGR banner Right Arrow DEFAULT")}" width="45" height="45" alt=""></a></li>`).join("\n        ")}
      </ul>
    </div>
  </section>`;
}
