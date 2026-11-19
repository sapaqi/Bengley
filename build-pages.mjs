import { readFile, writeFile, mkdir } from "node:fs/promises";
import { makeDetailPages } from "./detail-pages.mjs";

// Generate standalone HTML pages from the shared homepage shell.
const home = await readFile(new URL("index.html", import.meta.url), "utf8");
const head = home.slice(0, home.indexOf("<body>"));
const header = home.slice(home.indexOf('  <a class="skip-link"'), home.indexOf("  <main"));
const footer = home.slice(home.indexOf("  <!-- site-wide/footer"));
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.";
const shortBody = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exercitation ullamcorper suscipit lobortis nisl ut aliquip ex ea.";
const newsTitle = "A new era for Dublin 6. Read about our latest city centre office development.";

function photo(filename, alt, { className = "", ratio = "", reveal = true, portrait = false } = {}) {
  return `<div class="page-photo ${className}" ${ratio ? `style="aspect-ratio:${ratio}"` : ""} ${reveal ? "data-reveal data-parallax" : ""} ${portrait ? 'data-parallax-anchor="top"' : ""}>
    <div class="image-reveal"><div class="image-reveal__content">
      <img class="page-photo__image" src="assets/images/${filename}" alt="${alt}" loading="${reveal ? "lazy" : "eager"}" decoding="async">
    </div></div>
  </div>`;
}

function textLink(label, url, message = "") {
  return `<a class="text-link" href="${url}" ${message ? `data-demo-message="${message}"` : ""}>${label}<span class="text-link__arrow" aria-hidden="true"></span></a>`;
}

function roundLink(label, url) {
  return `<a class="round-link" href="${url}" aria-label="${label}"><img src="assets/icons/McGR%20banner%20Right%20Arrow%20DEFAULT.svg" width="45" height="45" alt=""></a>`;
}

function pageHero(title, image, alt, intro = true) {
  return `<section class="page-hero" aria-labelledby="page-title"><div class="container page-hero__layout">
    ${photo(image, alt, { className: "page-hero__image", ratio: "5/3", reveal: false })}
    <h1 class="page-title" id="page-title">${title}</h1>
  </div></section>${intro ? `<section class="container page-intro" aria-label="Introduction"><p>${lorem}</p></section>` : ""}`;
}

function feature({ title, image, alt, body = shortBody, url, variant = "", subtitle = "", label = "Discover more", portrait = false, ratio = "1140/1340" }) {
  return `<section class="page-feature ${variant}" data-section="text-image"><div class="container page-feature__layout">
    <div class="page-feature__content"><h2>${title}</h2>${subtitle ? `<h3>${subtitle}</h3>` : ""}<p>${body}</p>${url ? textLink(label, url) : ""}</div>
    ${photo(image, alt, { ratio, portrait })}
  </div></section>`;
}

const projectSection = home.slice(home.indexOf('    <section class="projects'), home.indexOf('    <section class="feature feature--responsibility'))
  .replace('id="projects-heading">Our Projects', 'id="projects-heading">Featured <br>Property')
  .replace('href="portfolio/index.html">View all Properties', 'href="portfolio/station-road-lusk/index.html" data-project-detail>View Property');

const propertyTypes = ["new-homes", "commercial", "commercial", "new-homes", "new-homes", "pipeline"];
const propertyImages = ["property-tile-A.jpg", "property-tile-B.jpg", "property-tile-C.jpg", "property-tile-D.jpg"];
const properties = Array.from({ length: 15 }, (_, index) => ({
  category: propertyTypes[index % propertyTypes.length],
  status: index % 4 === 1 ? "let" : "sale",
  image: propertyImages[index % propertyImages.length],
  title: index === 0 ? "Station Road, Lusk" : "Property Name",
  address: index === 0 ? "County Dublin" : "Address",
  url: index === 0 ? "portfolio/station-road-lusk/index.html" : `portfolio/property-${index + 1}/index.html`,
}));
let initialCount = 0;
const propertyCards = properties.map((property, index) => {
  const shown = property.status === "sale" && initialCount++ < 5;
  const label = property.category === "commercial" ? "Commercial" : property.category === "pipeline" ? "Development Pipeline" : "Residential";
  return `<li class="property-card ${index % 2 ? "property-card--tinted" : ""}" data-category="${property.category}" data-status="${property.status}" ${shown ? "" : "hidden"}>
    <a href="${property.url}" class="property-card__link">${photo(property.image, `${label} property from the McGarrell Reilly portfolio`, { ratio: "3/2", reveal: false })}
    <div class="property-card__content"><p class="property-card__category">${label}</p><h3>${property.title}<br>${property.address}</h3><span class="property-card__arrow" aria-hidden="true"></span></div></a>
  </li>`;
}).join("\n");

const portfolio = pageHero("Property<br>Portfolio", "McGR-Portfolio-Hero.jpg", "New homes at Station Road, Lusk") + projectSection + `
  <section class="container portfolio-list" aria-labelledby="properties-heading" data-source="properties">
    <h2 class="section-heading" id="properties-heading">All Properties</h2>
    <form class="property-filters" aria-label="Filter properties">
      <fieldset class="category-filters"><legend>Filter</legend>
        ${[["all", "All"], ["new-homes", "New Homes"], ["commercial", "Commercial"], ["pipeline", "Development Pipeline"]].map(([value, label]) => `<label class="filter-chip"><input type="radio" name="category" value="${value}" ${value === "all" ? "checked" : ""}><span>${label}</span></label>`).join("")}
      </fieldset>
      <fieldset class="status-filters"><legend class="sr-only">Availability</legend>
        <label class="filter-switch">For Sale<input type="checkbox" name="status" value="sale" checked><span aria-hidden="true"></span></label>
        <label class="filter-switch">To Let<input type="checkbox" name="status" value="let"><span aria-hidden="true"></span></label>
      </fieldset>
    </form>
    <ul class="property-items">${propertyCards}</ul>
    <p class="property-empty" hidden>No properties match these filters. <button type="button" data-reset-filters>Clear filters</button></p>
    <p class="sr-only" data-property-status aria-live="polite"></p>
    <button class="solid-button load-more" type="button" hidden>Load More</button>
    <noscript><style>.property-card[hidden]{display:block!important}.property-filters{display:none}</style></noscript>
  </section>`;

const values = ["Integrity", "Commercial awareness", "Commitment", "Mutual respect", "Teamwork"];
const about = pageHero("About Us", "About-Us-banner.jpg", "Colleagues in conversation", true) + `
  <section class="container values-section" aria-labelledby="values-heading"><h2 class="section-heading" id="values-heading">Our values</h2>
    <div class="values-grid">${values.map(value => `<article class="value-card"><h3>${value}</h3><p>${shortBody}</p></article>`).join("")}</div>
  </section>` + feature({ title: "Our people", subtitle: "A team of highly skilled<br>and experienced people", image: "about-us-our-people-feature.jpg", alt: "Members of the team meeting together", url: "about-us/our-people/", label: "Meet our people", variant: "page-feature--navy page-feature--people", portrait: true }) + `
  <section class="container expertise-heading"><h2 class="section-heading">Our expertise</h2></section>` +
  feature({ title: "Investment", image: "about-us-investment-feature.jpg", alt: "Contemporary commercial building", url: "about-us/investment/", variant: "page-feature--panel" }) +
  feature({ title: "Development", image: "about-us-development-feature.jpg", alt: "New residential homes with solar panels", url: "about-us/development/", variant: "page-feature--panel page-feature--reverse page-feature--development" }) + `
  <section class="container testimonials" aria-labelledby="testimonials-heading"><h2 class="section-heading" id="testimonials-heading">What our clients say</h2>
    <div class="testimonial-content"><img class="quotation-mark" src="assets/icons/McGR%20Quotation%20Mark.svg" width="100" height="65" alt="">
      <div class="testimonial-items">${Array.from({ length: 4 }, (_, index) => `<figure class="testimonial" ${index ? "hidden" : ""}><blockquote>${lorem}</blockquote><figcaption><strong>Mary Smith</strong><br>Structural Engineer</figcaption></figure>`).join("")}</div>
      <div class="testimonial-controls" aria-label="Choose a testimonial" hidden>${Array.from({ length: 4 }, (_, index) => `<button type="button" class="carousel-dot" aria-label="Show testimonial ${index + 1}" aria-pressed="${index === 0}"></button>`).join("")}</div>
      <p class="sr-only" data-testimonial-status aria-live="polite"></p>
    </div>
  </section>`;

const responsibility = pageHero("Responsibility", "responsibility-banner.jpg", "Planting and landscaping within a city development", false) + `
  <section class="container responsibility-intro">${photo("responsibility-feature.jpg", "Indoor plants within a building", { ratio: "1140/1340" })}
    <div><p class="intro-copy">${lorem}</p><p>${shortBody} ${lorem}</p></div>
  </section>` + feature({ title: "Environmental", image: "environmental.jpg", alt: "Planting and landscaped streets around residential homes", url: "responsibility/environmental/", variant: "page-feature--outline page-feature--reverse", ratio: "1730/1130" }) + `
  <section class="container social-feature" aria-labelledby="social-heading">${photo("social-banner.jpg", "People gathering at a community event", { ratio: "2/1" })}
    <div class="social-feature__panel"><h2 class="section-heading" id="social-heading">Social</h2><p>${shortBody}</p>${roundLink("Discover more about Social", "responsibility/social/")}</div>
  </section>` + feature({ title: "Governance", image: "governance-feature.jpg", alt: "A person signing a document", variant: "page-feature--panel" });

const jobs = ["Sr. Accountant, Construction & Commercial Accounting", "Accounting Manager - Commercial Real Estate Accounting", "Sr. Accountant, Construction & Commercial Accounting", "Accounting Manager - Commercial Real Estate Accounting"];
const working = pageHero("Working<br>with us", "working-with-us-banner.jpg", "A colleague participating in a meeting") + `
  <section class="jobs-section" data-source="jobs" aria-labelledby="jobs-heading"><div class="container">
    <h2 class="section-heading" id="jobs-heading">Current Opportunities</h2>
    <div class="jobs-columns" aria-hidden="true"><span>Role</span><span>Type</span><span>Location</span><span></span></div>
    <ul class="jobs-list">${jobs.map((title, index) => `<li><a class="job-row" href="working-with-us/job-${index + 1}/"><h3>${title}</h3><span>Full-time</span><span>Dublin</span><img src="assets/icons/McGR%20banner%20Right%20Arrow%20DEFAULT.svg" width="45" height="45" alt=""></a></li>`).join("")}</ul>
  </div></section>`;

const articleSlugs = ["a-new-era-for-dublin-6", "city-centre-office-development", "latest-development"];
const newsCards = ["property-tile-A.jpg", "property-tile-B.jpg", "property-tile-C.jpg"].map((image, index) => `<article class="news-card"><a href="media/news/${articleSlugs[index]}/index.html">${photo(image, "Development featured in the latest news", { ratio: "3/2" })}<time datetime="2023-08-16">16.08.23</time><h3>${newsTitle}</h3></a></article>`).join("");
const media = `<section class="media-hero" aria-labelledby="media-title">
    ${photo("News-post-promo.jpg", "An illuminated courtyard at Charlemont Square", { className: "media-hero__image", reveal: false })}
    <div class="media-hero__shade"></div><div class="container media-hero__content"><time datetime="2023-08-16">16.08.23</time><h1 id="media-title">A new era for Dublin 6. <br>Read about our latest city <br>centre office development.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>${roundLink("Read the featured article", "media/news/a-new-era-for-dublin-6/")}</div>
  </section>
  <section class="container media-news" id="latest-news" data-source="posts"><div class="section-heading-row"><h2 class="section-heading">Latest news</h2>${textLink("All news", "media/news/")}</div><div class="news-card-grid">${newsCards}</div></section>
  <section class="publication-section" data-source="publications"><div class="container"><div class="section-heading-row"><h2 class="section-heading">Latest publication</h2>${textLink("Publications library", "media/publications/")}</div>
    <div class="publication-feature"><div><h3>1 Charlemont Square</h3><p>${shortBody}</p>${textLink("Download", "media/publications/charlemont-square.pdf", "The publication PDF will be connected in the next stage.")}</div>
      <img src="assets/images/charlemont-sq-bro-thumb.png" alt="1 Charlemont Square brochure cover" width="1140" height="1340" loading="lazy">
    </div>
  </div></section>`;

const mapsUrl = "https://www.google.com/maps/search/?api=1&amp;query=31%2F32%20Charlemont%20Street%20Dublin%202%20D02%20DK57";
const contact = `<section class="container contact-heading"><h1 class="section-heading" id="page-title">Contact us</h1></section>
  <section class="contact-section" aria-labelledby="contact-company"><div class="container contact-layout"><div class="contact-information">
    <h2 id="contact-company">McGarrell Reilly Group</h2><address>31/32 Charlemont Street<br>Saint Kevin's<br>Dublin 2<br>D02 DK57</address>
    <h3>Phone</h3><a href="tel:+35314161300">+ 353 (0) 1 416 1300</a><h3>Email</h3><a href="mailto:info@mcgarrellreilly.ie">info@mcgarrellreilly.ie</a>
    ${textLink("Connect on Linkedin", "https://www.linkedin.com/company/mcgarrell-reilly-group/")}
    </div><a class="contact-map" href="${mapsUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open our location in Google Maps (new tab)"><img src="assets/images/location-map.jpg" alt="Map showing the office on Charlemont Street, Dublin" width="1860" height="1500" loading="eager"></a>
  </div></section>`;

const pages = [
  ["portfolio", "Property Portfolio", portfolio],
  ["about-us", "About Us", about],
  ["responsibility", "Responsibility", responsibility],
  ["working-with-us", "Working with us", working],
  ["media", "Media", media],
  ["contact-us", "Contact Us", contact],
  ...makeDetailPages({ photo, textLink, roundLink, pageHero, feature, lorem, shortBody, newsTitle, properties, articleSlugs, jobs }),
];

for (const [slug, title, content] of pages) {
  const base = "../".repeat(slug.split("/").length);
  const section = slug.split("/")[0];
  let pageHead = head.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n  <base href="${base}">`)
    .replace(/<title>.*?<\/title>/, `<title>${title} | McGarrell Reilly Group</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${title} — McGarrell Reilly Group.">`)
    .replace(/  <link rel="preload" href="assets\/images\/McGR-Home-banner.jpg"[^>]*>\n/, "")
    .replace('  <script src="app.js" defer></script>', '  <link rel="stylesheet" href="pages.css">\n  <link rel="stylesheet" href="final-pages.css">\n  <script src="app.js" defer></script>\n  <script src="pages.js" defer></script>');
  if (slug.includes("/")) pageHead = pageHead.replace('<link rel="stylesheet" href="pages.css">', '<link rel="stylesheet" href="pages.css">\n  <link rel="stylesheet" href="details.css">');
  const pageHeader = header.replace('href="#main"', `href="${slug}/index.html#main"`)
    .replace(`href="${section}/index.html"`, `href="${section}/index.html" aria-current="page"`);
  const pageClass = slug.replaceAll("/", "-");
  const pageFooter = slug === "terms-of-use" ? footer.replace('href="terms-of-use/index.html"', 'href="terms-of-use/index.html" aria-current="page"') : footer;
  await mkdir(new URL(`${slug}/`, import.meta.url), { recursive: true });
  const pageHtml = `${pageHead}<body class="subpage page-${pageClass}${slug.includes("/") ? " detail-page" : ""}">\n${pageHeader}<main id="main">${content}</main>\n${pageFooter}`;
  await writeFile(new URL(`${slug}/index.html`, import.meta.url), pageHtml
    .replaceAll('href="about-us/our-people/"', 'href="about-us/our-people/index.html"')
    .replaceAll('href="about-us/investment/"', 'href="about-us/investment/index.html"')
    .replaceAll('href="about-us/development/"', 'href="about-us/development/index.html"')
    .replaceAll('href="responsibility/environmental/"', 'href="responsibility/environmental/index.html"')
    .replaceAll('href="responsibility/social/"', 'href="responsibility/social/index.html"')
    .replaceAll('href="media/news/"', 'href="media/news/index.html"')
    .replaceAll('href="media/publications/"', 'href="media/publications/index.html"')
    .replaceAll('href="terms-of-use/"', 'href="terms-of-use/index.html"')
    .replace(/href="working-with-us\/job-(\d+)\/"/g, 'href="working-with-us/job-$1/index.html"')
    .replaceAll('href="portfolio/station-road-lusk/"', 'href="portfolio/station-road-lusk/index.html"')
    .replaceAll('href="media/news/a-new-era-for-dublin-6/"', 'href="media/news/a-new-era-for-dublin-6/index.html"'));
  console.log(`Created ${slug}/index.html`);
}

await writeFile(new URL("page-manifest.js", import.meta.url), `// Generated by build-pages.mjs.\nwindow.previewPages = Object.freeze(${JSON.stringify(["index.html", ...pages.map(([slug]) => `${slug}/index.html`)], null, 2)});\n`);
