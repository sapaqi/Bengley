import { esc, attrs, cx, photo, roundLink, dots, shortDate } from "../lib/html.mjs";
import pageHeader from "../sections/page-header.mjs";
import { furtherReading } from "../sections/collections.mjs";

// Fixed layouts for single items (WordPress: single-property.php, single.php,
// single-job.php). Content comes from the item's fields.

const categoryLabel = (p) => ({ commercial: "Commercial", pipeline: "Development Pipeline" }[p.category] || "Residential");
const categoryClass = "mt-[30px] text-[18px] text-accent uppercase md:mt-10 md:text-[15px] xl:mt-[85px] xl:text-[18px]";

/** Property. Fields: title, address, category, image, intro, body[], facts, gallery[], map, website. */
export function propertyTemplate(p, ctx) {
  const all = ctx.collections.properties;
  const next = all[(all.indexOf(p) + 1) % all.length];
  const extra = `<p class="${categoryClass}">${esc(categoryLabel(p))}</p><h2 class="mt-[15px] type-project text-[28px] leading-[1.3] tracking-[-.025em] text-primary md:mt-[18px] md:text-[27px] xl:mt-[25px] xl:text-project">${esc(p.title)}<br>${esc(p.address)}</h2>`;
  const fact = (term, value) => `<div class="grid grid-cols-[30%_70%] border-b border-rule py-4 text-[16px] leading-[1.6] first:border-t md:grid-cols-[33%_67%] md:text-[14px] xl:grid-cols-[27%_73%] xl:text-body"><dt class="font-semibold">${term}</dt><dd class="m-0 min-w-0 wrap-anywhere">${value}</dd></div>`;
  const brochure = `<a class="flex items-center justify-between gap-2.5 no-underline hover:underline" ${attrs({ href: ctx.url(p.brochure || `${p.route}brochure.pdf`), "data-demo-message": p.brochure ? false : "The property brochure will be connected when the PDF is supplied." })}>Brochure<img class="shrink-0" src="${ctx.icon("McGR Download icon DEFAULT")}" width="22" height="22" alt=""></a>`;
  const gallery = p.gallery || [];

  return pageHeader({ variant: "side", title: "Property Details", image: p.heroImage || p.image, extra }, ctx) + `
  <section class="wrap flex flex-col gap-[45px] pt-[55px] pb-gap md:grid md:grid-cols-[32%_58%] md:gap-[10%] md:pt-0" data-section="property-details" aria-label="Property information">
    <aside class="w-full min-w-0 text-primary" aria-label="Property facts">
      ${p.map ? `<a class="relative block" href="${esc(p.map.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(p.title)} in Google Maps (new tab)"><img class="h-auto w-full" src="${ctx.image(p.map.src)}" alt="${esc(p.map.alt)}" width="1000" height="1000"><img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full" src="${ctx.icon("McGR map pin")}" alt="" width="35" height="45"></a>` : ""}
      <dl class="m-0">
        ${fact("Size", esc(p.size || "To be confirmed"))}
        ${fact("Year", esc(p.year || "To be confirmed"))}
        ${fact("Download", brochure)}
        ${p.website ? fact("Website", `<a class="flex items-center justify-between gap-2.5 no-underline hover:underline" href="${esc(p.website.url)}" target="_blank" rel="noopener noreferrer">${esc(p.website.label)}<span class="text-link__arrow" aria-hidden="true"></span></a>`) : ""}
        ${fact("Agents", (p.agents || []).map((a) => `<p class="[&+p]:mt-[30px]">${a.map(esc).join("<br>")}</p>`).join(""))}
      </dl>
    </aside>
    <div class="w-full min-w-0 md:pt-[90px] xl:pt-[130px]">
      <div class="space-y-[30px] md:space-y-[45px] md:pl-[30px] xl:pl-[clamp(40px,6.818vw,120px)]">
        <p class="type-intro tracking-normal text-primary">${esc(p.intro)}</p>
        ${(p.body || []).map((t) => `<p>${esc(t)}</p>`).join("")}
      </div>
      ${gallery.length ? `<section class="relative mt-[45px] w-full md:mt-[90px] md:w-[111.7%] xl:mt-[130px] xl:w-[121.5%]" data-carousel aria-label="Property image gallery">
        <div>${gallery.map((img, i) => `<figure class="m-0 aspect-[1970/1190]" data-slide ${i ? "hidden" : ""}><img class="h-full w-full object-cover" src="${ctx.image(img.src)}" alt="${esc(img.alt)}" width="1970" height="1190" loading="lazy" decoding="async"></figure>`).join("")}</div>
        ${dots(gallery.length, { label: "Choose a property photograph", noun: "photograph", className: "absolute bottom-3 left-1/2 -translate-x-1/2 md:bottom-[25px]" })}
        <p class="sr-only" data-slide-status aria-live="polite"></p>
      </section>` : ""}
    </div>
  </section>
  <section class="mb-gap bg-primary py-[50px] md:bg-[linear-gradient(90deg,white_10%,var(--color-surface)_10%_44%,var(--color-primary)_44%)] md:py-[70px] xl:py-[100px]" data-section="next-property" aria-labelledby="next-property-heading">
    <div class="wrap flex flex-col gap-[35px] md:grid md:grid-cols-[45%_55%] md:items-center md:gap-0">
      ${photo(ctx, p.nextImage || next.image, { ratio: "aspect-[1730/1130]", className: "md:-ml-[28%] md:w-[140%]" })}
      <div class="relative w-full p-0 text-white md:py-[30px] md:pl-[70px] xl:pl-[100px]">
        <h2 class="text-[36px] leading-[1.2] font-normal md:text-section" id="next-property-heading">Next property</h2>
        <p class="${categoryClass}">${esc(categoryLabel(next))}</p>
        <h3 class="mt-[25px] mb-[30px] type-project text-[28px] leading-[1.3] font-normal md:mb-10 md:text-project">${esc(next.title)}<br>${esc(next.address)}</h3>
        ${roundLink(ctx, { label: "View next property", url: next.route })}
      </div>
    </div>
  </section>`;
}

/** News article. Fields: title, date, image, intro, html (body), quote. */
export function newsTemplate(post, ctx) {
  const narrow = "mx-auto w-[88%] max-w-none md:w-[62%] xl:w-[40%] xl:max-w-[704px]";
  const wide = "mx-auto w-[88%] md:w-[78%] xl:w-[53%] xl:max-w-[930px]";
  return `<article data-section="news-article">
    <header class="relative isolate pt-[180px] md:pt-[210px] xl:pt-[clamp(180px,14.2vw,250px)]">
      <div class="absolute inset-x-0 top-0 bottom-[45px] -z-10 bg-surface md:bottom-[140px]" aria-hidden="true"></div>
      <div class="${narrow}">
        <h1 class="text-[30px] leading-[1.2] font-medium tracking-[-.025em] text-heading-alt text-balance md:text-[clamp(30px,2.614vw,46px)]">${esc(post.title)}</h1>
        <time class="mt-[25px] block text-[clamp(13px,.909vw,16px)] leading-[1.5] text-heading-alt md:mt-6" datetime="${post.date}">${shortDate(post.date)}</time>
      </div>
      <div class="${cx(wide, "mt-[30px] md:mt-10")}">${photo(ctx, post.articleImage || post.image, { ratio: "aspect-[1860/1120]", reveal: false, parallax: false, eager: true })}</div>
    </header>
    <div class="${cx(narrow, "pt-[55px] md:pt-[90px] [&>p+p]:mt-[30px]")}">
      <p class="type-intro tracking-normal text-primary">${esc(post.intro)}</p>
      ${post.html}
    </div>
    <div class="${cx(wide, "pt-[60px] pb-[35px] md:pt-[110px] md:pb-[45px]")}"><a class="inline-flex items-center gap-3 text-heading-alt no-underline hover:underline" href="https://www.linkedin.com/sharing/share-offsite/" data-share target="_blank" rel="noopener noreferrer">Share article<img src="${ctx.icon("linkedin logo BLUE")}" alt="on LinkedIn" width="25" height="25"></a></div>
    ${furtherReading(ctx, post.route)}
  </article>`;
}

/** Quote block used inside article bodies. */
export function articleQuote(ctx, text) {
  return `<blockquote class="my-[35px] grid grid-cols-[35px_1fr] items-start gap-[15px] md:my-[45px] md:grid-cols-[50px_1fr] md:gap-[22px]"><img class="mt-[5px] h-auto w-[35px] md:w-[50px]" src="${ctx.icon("McGR Quotation Mark")}" alt="" width="70" height="50"><p class="font-serif text-[clamp(20px,1.364vw,24px)] leading-[1.4] text-quote">${esc(text)}</p></blockquote>`;
}

/** Job. Fields: title, location, category, type, body, responsibilities[], applyEmail, phone. */
export function jobTemplate(job, ctx) {
  const { site } = ctx;
  const h2 = "text-[30px] leading-[1.2] font-medium tracking-[-.025em] text-primary md:text-project";
  const glance = [["Location", job.fullLocation || job.location], ["Category", job.category], ["Type", job.type]];
  const subject = encodeURIComponent(`Application: ${job.title}`);
  const tel = site.phone.replace(/[^+\d]/g, "").replace("+3530", "+353");
  return `<section class="wrap flex flex-col gap-[45px] pt-[180px] pb-[70px] md:grid md:grid-cols-[32%_58%] md:gap-[10%] md:pt-[clamp(190px,16.5vw,290px)] md:pb-[120px] xl:grid-cols-[32%_49%] xl:gap-[19%]" data-section="job-overview">
    <aside class="order-1 md:order-none" aria-labelledby="glance-heading"><h2 class="${h2}" id="glance-heading">At a glance</h2>
      <dl class="mt-[30px] text-primary md:mt-[50px]">${glance.map(([dt, dd]) => `<div class="grid grid-cols-[27%_73%] border-t border-rule py-4 text-[16px] leading-[1.6] last:border-b md:grid-cols-[36%_64%] md:text-[15px] xl:grid-cols-[27%_73%] xl:text-body"><dt class="font-semibold">${dt}</dt><dd class="m-0">${esc(dd)}</dd></div>`).join("")}</dl>
    </aside>
    <div class="order-0 min-w-0 md:order-none"><h1 class="text-[30px] leading-[1.2] font-medium tracking-[-.025em] text-heading-alt md:text-[clamp(30px,2.614vw,46px)]">${esc(job.title)}</h1><p class="mt-[30px] md:mt-[45px]">${esc(job.body)}</p></div>
  </section>
  <section class="bg-surface py-gap" data-section="job-responsibilities">
    <div class="wrap flex flex-col gap-[45px] md:grid md:grid-cols-[57%_37%] md:items-start md:gap-[6%] xl:grid-cols-[58%_32%] xl:gap-[10%]">
      <div><h2 class="${h2}" id="responsibilities-heading">Responsibilities</h2>
        <ul class="bullets mt-[30px] list-disc pl-5 text-[18px] leading-[1.65] md:mt-[45px] md:text-intro [&>li]:pl-0.5 [&>li+li]:mt-5" aria-labelledby="responsibilities-heading">${job.responsibilities.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      </div>
      <aside class="w-full min-w-0 rounded-[10px] bg-white p-[30px] xl:p-[50px]" aria-labelledby="apply-heading">
        <h2 class="text-[22px] leading-[1.4] font-semibold uppercase md:text-[21px] xl:text-[24px]" id="apply-heading">Apply for this job</h2>
        <p class="mt-[30px] text-[18px] leading-[1.65] xl:text-intro">If you are interested in applying for this role, please email us with a cover letter together with an up to date CV.</p>
        <a class="solid-button mt-[30px] inline-block min-w-[200px] md:w-full md:min-w-0 xl:w-auto xl:min-w-[200px]" href="mailto:${esc(job.applyEmail || site.recruitmentEmail)}?subject=${subject}">Email us</a>
        <p class="mt-[30px] text-[18px] leading-[1.65] xl:text-intro">or contact us at<br><a class="mt-2.5 inline-block text-[20px] font-semibold whitespace-nowrap no-underline hover:underline md:text-[length:inherit]" href="tel:${tel}">${esc(site.phone)}</a></p>
      </aside>
    </div>
  </section>`;
}
