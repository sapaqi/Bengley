import { esc, attrs, cx, photo, link, dots } from "../lib/html.mjs";

/** Section Heading. Fields: heading. */
export function sectionHeading(f) {
  return `<section class="wrap mb-[35px] md:mb-[60px]" data-section="section-heading">
    <h2 class="type-section">${esc(f.heading)}</h2>
  </section>`;
}

/**
 * Card Grid. Fields: heading, cards[{ title, body }].
 * Three per row on desktop; with five cards the last two share the row (design).
 */
export function cardGrid(f, ctx, meta) {
  const cards = f.cards || [];
  const wideLastTwo = cards.length % 3 === 2;
  return `<section class="wrap pb-gap" data-section="card-grid" aria-labelledby="${meta.id}">
    <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
    <div class="mt-[35px] grid grid-cols-1 gap-5 md:mt-[55px] md:grid-cols-6 md:gap-7">
      ${cards.map((card, i) => `<article class="${cx("border border-border p-7 xl:p-[clamp(28px,2.273vw,40px)]", wideLastTwo && i >= cards.length - 2 ? "md:col-span-3" : "md:col-span-2")}">
        <h3 class="mb-6 text-[18px] leading-[1.4] font-semibold text-primary uppercase md:mb-[30px] xl:mb-10 xl:text-[clamp(18px,1.25vw,22px)]">${esc(card.title)}</h3>
        <p class="leading-[1.9]">${esc(card.body)}</p>
      </article>`).join("\n      ")}
    </div>
  </section>`;
}

/** Testimonials. Fields: heading, items[{ quote, name, role }]. */
export function testimonials(f, ctx, meta) {
  const items = f.items || [];
  return `<section class="wrap mb-gap block md:grid md:grid-cols-2 md:gap-[10%]" data-section="testimonials" data-carousel aria-labelledby="${meta.id}">
    <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
    <div class="mt-10 md:mt-0">
      <img class="mb-[25px] h-[50px] w-[75px] object-contain object-left md:h-[65px] md:w-[100px]" src="${ctx.icon("McGR Quotation Mark")}" width="100" height="65" alt="">
      ${items.map((item, i) => `<figure class="m-0" data-slide ${i ? "hidden" : ""}><blockquote class="m-0 font-serif text-[28px] leading-[1.25] text-quote md:text-[clamp(25px,2.273vw,40px)] md:leading-[1.15]">${esc(item.quote)}</blockquote><figcaption class="mt-[30px] text-[16px] leading-[1.5] md:mt-[50px]"><strong>${esc(item.name)}</strong><br>${esc(item.role)}</figcaption></figure>`).join("\n      ")}
      ${dots(items.length, { label: "Choose a testimonial", noun: "testimonial", className: "mt-[45px] [--dot:var(--color-dot)]" })}
      <p class="sr-only" data-slide-status aria-live="polite"></p>
    </div>
  </section>`;
}

/**
 * Team Grid. Fields: heading, people[{ name, role, vcard (url, optional),
 * photo{src,alt} (optional) }]. Without photos the cards match the design.
 */
export function teamGrid(f, ctx, meta) {
  return `<section class="wrap pb-gap" data-section="team-grid" aria-labelledby="${meta.id}">
    <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
    <div class="mt-[35px] grid grid-cols-1 gap-5 md:mt-[55px] md:grid-cols-2 md:gap-7">
      ${(f.people || []).map((person) => `<article class="relative flex min-h-[220px] flex-col justify-end border border-border p-7 md:min-h-[260px] xl:min-h-[315px] xl:p-10">
        ${person.photo ? `<img class="mb-auto aspect-square w-[120px] object-cover pb-0" src="${ctx.image(person.photo.src)}" alt="${esc(person.photo.alt || "")}" loading="lazy">` : ""}
        <h3 class="${cx("mb-2.5 text-[29px] leading-[1.25] font-medium tracking-[-.025em] text-heading-alt md:text-subheading", person.photo && "mt-8")}">${esc(person.name)}</h3>
        <p class="pr-[50px] text-[17px] leading-[1.5] text-primary md:text-intro">${esc(person.role)}</p>
        <a ${attrs({
          class: "absolute right-5 bottom-[25px] p-[5px] hover:bg-surface xl:right-[35px] xl:bottom-10",
          href: ctx.url(person.vcard || "#"),
          "aria-label": `Contact card for ${person.name}`,
          "data-demo-message": person.vcard ? false : "The contact card will be connected when contact details are supplied.",
        })}><img src="${ctx.icon("McGR Vcard DEFAULT")}" alt="" width="40" height="32"></a>
      </article>`).join("\n      ")}
    </div>
  </section>`;
}

/** Careers Promo. Fields: heading, cardHeading, body, link, image, imageAnchor. */
export function careersPromo(f, ctx, meta) {
  return `<section class="bg-surface py-gap" data-section="careers-promo" aria-labelledby="${meta.id}">
    <div class="wrap">
      <h2 class="type-section" id="${meta.id}">${esc(f.heading)}</h2>
      <div class="mt-[35px] flex flex-col items-end md:mt-[55px] md:grid md:grid-cols-[66%_34%] md:items-center">
        <div class="w-full bg-white p-[35px] md:pt-[65px] md:pr-[100px] md:pb-[65px] md:pl-[55px] xl:pt-[100px] xl:pr-[150px] xl:pb-[100px] xl:pl-[100px]">
          <h3 class="type-subheading text-heading-alt">${esc(f.cardHeading)}</h3>
          <p class="my-[30px] max-w-[460px] md:my-[45px]">${esc(f.body)}</p>
          ${link(ctx, f.link)}
        </div>
        ${photo(ctx, f.image, { ratio: "aspect-[1140/1340]", className: "mt-[30px] w-[80%] md:-ml-[25%] md:mt-0 md:w-[125%]", parallax: f.parallax !== false, anchor: f.imageAnchor })}
      </div>
    </div>
  </section>`;
}

/** Rich Text (Terms of use, Privacy Statement). Fields: title, html. */
export function richText(f) {
  return `<article class="prose-rich mx-auto w-[88%] pt-[180px] pb-gap md:w-[72%] md:pt-[clamp(190px,16.2vw,285px)] xl:w-[53%] xl:max-w-[930px]" data-section="rich-text">
    <h1 class="mb-[35px] text-[32px] leading-[1.2] font-medium tracking-[-.025em] text-primary md:mb-[50px] md:text-project">${esc(f.title)}</h1>
    ${f.html}
  </article>`;
}

/** Contact Details. Fields: title, company, address[], phone, email, linkedin, map{src,alt,url}. */
export function contactDetails(f, ctx) {
  const tel = f.phone.replace(/[^+\d]/g, "").replace("+3530", "+353");
  return `<section class="wrap pt-[180px] pb-[55px] md:pt-[330px] md:pb-[85px]" data-section="contact-details" aria-labelledby="page-title">
    <h1 class="type-section" id="page-title">${esc(f.title)}</h1>
  </section>
  <section class="bg-surface-alt py-[55px] md:py-[130px]" data-section="contact-map" aria-labelledby="contact-company">
    <div class="wrap flex flex-col gap-10 md:grid md:grid-cols-[35%_65%] md:gap-0">
      <div class="border-b border-accent pb-[35px] md:border-r md:border-b-0 md:pr-[25px] md:pb-0 xl:pr-[55px]">
        <h2 class="mb-[25px] text-[26px] leading-[1.4] font-medium md:mb-[35px] md:text-[25px] xl:text-[30px]" id="contact-company">${esc(f.company)}</h2>
        <address class="mb-[30px] leading-[1.8] md:mb-[45px]">${f.address.map(esc).join("<br>")}</address>
        <h3 class="mt-[30px] mb-2 text-[20px] font-semibold md:text-[22px]">Phone</h3><a class="wrap-anywhere no-underline hover:underline" href="tel:${tel}">${esc(f.phone)}</a>
        <h3 class="mt-[30px] mb-2 text-[20px] font-semibold md:text-[22px]">Email</h3><a class="wrap-anywhere no-underline hover:underline" href="mailto:${esc(f.email)}">${esc(f.email)}</a>
        <div class="mt-[45px]">${link(ctx, { label: "Connect on Linkedin", url: f.linkedin, external: true })}</div>
      </div>
      <a class="map-pin relative block w-full md:ml-[35px] md:w-auto xl:ml-[70px]" href="${esc(f.map.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open our location in Google Maps (new tab)"><img class="h-auto w-full object-cover md:h-full md:min-h-[630px]" src="${ctx.image(f.map.src)}" alt="${esc(f.map.alt)}" width="1860" height="1500"></a>
    </div>
  </section>`;
}
