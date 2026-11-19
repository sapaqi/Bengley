import { makeFinalPages } from "./final-pages.mjs";

// Detail layouts use supplied artwork and existing demonstration fixtures.
export function makeDetailPages({ photo, textLink, roundLink, pageHero, feature, lorem, shortBody, newsTitle, properties, articleSlugs, jobs }) {
  function sideHero(title, image, alt, extra = "") {
    return `<section class="detail-hero" aria-labelledby="page-title"><div class="container detail-hero__layout">
      <div class="detail-hero__heading"><h1 class="section-heading" id="page-title">${title}</h1>${extra}</div>
      ${photo(image, alt, { ratio: "1860/1120", reveal: false })}
    </div></section>`;
  }

  function intro(image) {
    return `<section class="container detail-intro">${photo(image, "Colleagues working together in the office", { ratio: "1140/1340", portrait: true })}
      <div><p class="intro-copy">${lorem}</p><p>${shortBody} ${lorem}</p></div></section>`;
  }

  function wideFeature(title, image, alt, pale = false) {
    return `<section class="wide-detail ${pale ? "wide-detail--pale" : ""}" aria-label="${title}">
      ${photo(image, alt, { ratio: "3520/1740", portrait: true })}
      <div class="wide-detail__panel"><h2>${title}</h2><p>${shortBody}</p></div>
    </section>`;
  }

  const executives = [
    ["Sean Reilly", "Executive Chairman"],
    ["Raymond Reilly", "Chief Executive Officer"],
    ["Deirdre Reilly", "Chief Operating Officer"],
    ["Anthony Kinsella", "Financial Director"],
  ];
  const people = sideHero("Our people", "our-people-banner.jpg", "Two colleagues reviewing work together") + intro("our-people-feature.jpg") + `
    <section class="container executive-section" aria-labelledby="executive-heading"><h2 class="section-heading" id="executive-heading">Executive Team</h2>
      <div class="executive-grid">${executives.map(([name, role]) => `<article class="executive-card"><h3>${name}</h3><p>${role}</p><a class="executive-card__contact" href="about-us/our-people/${name.toLowerCase().replaceAll(" ", "-")}.vcf" aria-label="Contact card for ${name}" data-demo-message="The contact card will be connected when contact details are supplied."><img src="assets/icons/McGR%20Vcard%20DEFAULT.svg" alt="" width="40" height="32"></a></article>`).join("")}</div>
    </section>
    <section class="careers-promo"><div class="container"><h2 class="section-heading">Careers</h2><div class="careers-promo__layout"><div><h3>Working with us</h3><p>${shortBody}</p>${textLink("Opportunities", "working-with-us/index.html")}</div>${photo("our-people-working-with-us.jpg", "A member of the team", { ratio: "1140/1340", portrait: true })}</div></div></section>`;

  const investment = sideHero("Investment", "investments-banner.jpg", "A glass-fronted commercial building on a Dublin street") + `<section class="container detail-lead"><p>${lorem}</p></section>` +
    feature({ title: "Internal Asset<br>Management", image: "asset-management-feature.jpg", alt: "An asset management team in a meeting", variant: "page-feature--panel page-feature--reverse" }) +
    feature({ title: "Internal Property<br>Management", image: "property-management-feature.jpg", alt: "Two colleagues discussing property management", variant: "page-feature--navy detail-navy" }) +
    feature({ title: "Highly Skilled Teams", image: "skilled-teams-feature.jpg", alt: "A team reviewing plans together", ratio: "1730/1130", variant: "page-feature--outline page-feature--reverse" }) +
    feature({ title: "Fit-Out", image: "fit-out-feature.jpg", alt: "A completed commercial interior fit-out", variant: "page-feature--panel" }) +
    feature({ title: "Refurbishment", image: "refurb-feature.jpg", alt: "A refurbished open-plan workplace", variant: "page-feature--panel page-feature--reverse" });

  const development = pageHero("Development", "development-banner.jpg", "Charlemont Square courtyard at dusk") +
    feature({ title: "Unlocking<br>Development Land", image: "development-feature.jpg", alt: "An aerial view of a city development under construction", variant: "page-feature--panel" }) +
    feature({ title: "Building Strong<br>Relationships", image: "strong-relationships-feature.jpg", alt: "Colleagues discussing a project", ratio: "1730/1130", variant: "page-feature--outline page-feature--reverse" }) +
    wideFeature("Record of<br>Working in<br>Partnerships", "partnership-feature.jpg", "Business partners greeting each other") +
    feature({ title: "Technical Analysis", image: "tech-analysis.jpg", alt: "Two colleagues studying information on a laptop", variant: "page-feature--panel page-feature--reverse" });

  const environmental = sideHero("Environmental", "environmental-banner.jpg", "Landscaped homes near the church in Lusk") + `<section class="container detail-lead"><p>${lorem}</p></section>` +
    feature({ title: "Sustainability", image: "climate-action-feature.jpg", alt: "Workers installing rooftop solar panels", variant: "page-feature--panel page-feature--reverse" }) +
    feature({ title: "Energy Efficiency", image: "energy-efficient-feature.jpg", alt: "A modern energy-efficient commercial building", variant: "page-feature--navy detail-navy" }) +
    wideFeature("Biodiversity", "biodiversity-feature.jpg", "Planting and green spaces within a residential development", true);

  const pages = [
    ["about-us/our-people", "Our people", people],
    ["about-us/investment", "Investment", investment],
    ["about-us/development", "Development", development],
    ["responsibility/environmental", "Environmental", environmental],
    ...makeFinalPages({ photo, feature, sideHero, lorem, shortBody, newsTitle, articleSlugs, jobs }),
  ];

  const articleImages = ["station-road-carousel-A.jpg", "property-tile-B.jpg", "property-tile-C.jpg"];
  const articleEntries = [...articleSlugs.map((slug, i) => ({ slug, image: articleImages[i], year: "2023" })), { slug: "archive", image: "property-tile-A.jpg", year: "2022" }];
  for (const [index, { slug, image, year }] of articleEntries.entries()) {
    const related = articleSlugs.map((relatedSlug, i) => ({ slug: relatedSlug, image: articleImages[i] })).filter((_, i) => i !== index).slice(0, 2);
    const article = `<article class="news-article">
      <header class="article-heading"><div class="article-copy"><h1>${newsTitle.replace("Read about", "Read <br>about").replace("centre office", "centre <br>office")}</h1><time datetime="${year}-08-16">16.08.${year.slice(-2)}</time></div>
        <div class="article-image">${photo(image, "A development featured in this article", { ratio: "1860/1120", reveal: false })}</div>
      </header>
      <div class="article-copy article-body"><p class="intro-copy">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
        <p>Ut wisi enim ad minim veniam, quis nostrud exercitation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
        <blockquote class="article-quote"><img src="assets/icons/McGR%20Quotation%20Mark.svg" alt="" width="70" height="50"><p>${shortBody}</p></blockquote>
        <p>${shortBody} Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
      </div>
      <div class="article-wide article-share"><a href="https://www.linkedin.com/sharing/share-offsite/" data-share-article target="_blank" rel="noopener noreferrer">Share article<img src="assets/icons/linkedin%20logo%20BLUE.svg" alt="on LinkedIn" width="25" height="25"></a><p class="sr-only" data-share-status aria-live="polite"></p></div>
      <section class="article-wide further-reading" aria-labelledby="further-heading"><div class="section-heading-row"><h2 id="further-heading">Further reading</h2>${textLink("All news", "media/news/index.html")}</div>
        <div class="news-card-grid">${related.map(item => `<article class="news-card"><a href="media/news/${item.slug}/index.html">${photo(item.image, "Development featured in related news", { ratio: "3/2" })}<time datetime="2023-08-16">16.08.23</time><h3>${newsTitle}</h3></a></article>`).join("")}</div>
      </section>
    </article>`;
    pages.push([`media/news/${slug}`, newsTitle, article]);
  }

  const galleryImages = ["property-page-carousel-A.jpg", "station-road-carousel-A.jpg", "next-property.jpg", "property-tile-C.jpg"];
  const galleryAlts = ["A bright office interior with floor-to-ceiling windows", "Homes along Station Road in Lusk", "Residential homes with rooftop solar panels", "A contemporary commercial reception"];
  for (const [index, property] of properties.entries()) {
    const next = properties[(index + 1) % properties.length];
    const isStation = index === 0;
    const label = property.category === "commercial" ? "Commercial" : property.category === "pipeline" ? "Development Pipeline" : "Residential";
    const heroImage = isStation ? "station-road-carousel-A.jpg" : property.image;
    const heading = `<p class="detail-property__category">${label}</p><h2 class="detail-property__name">${property.title}<br>${property.address}</h2>`;
    const detail = sideHero("Property<br>Details", heroImage, `${property.title}, ${property.address}`, heading) + `
      <section class="container property-detail-layout" aria-label="Property information">
        <aside class="property-facts" aria-label="Property facts">
          ${isStation ? `<a class="property-map" href="https://www.google.com/maps/search/?api=1&amp;query=Station%20Road%20Lusk%20County%20Dublin" target="_blank" rel="noopener noreferrer" aria-label="Open Station Road, Lusk in Google Maps (new tab)"><img src="assets/images/snazzy-image.png" alt="Map of Station Road in Lusk" width="1000" height="1000"><img class="property-map__pin" src="assets/icons/McGR%20map%20pin.svg" alt="" width="35" height="45"></a>` : ""}
          <dl class="property-facts__list"><div><dt>Size</dt><dd>${isStation ? "10,680 sq m" : "To be confirmed"}</dd></div><div><dt>Year</dt><dd>${isStation ? "2017" : "To be confirmed"}</dd></div>
          <div><dt>Download</dt><dd><a href="${property.url.replace("index.html", "brochure.pdf")}" data-demo-message="The property brochure will be connected when the PDF is supplied.">Brochure<img src="assets/icons/McGR%20Download%20icon%20DEFAULT.svg" width="22" height="22" alt=""></a></dd></div>
          ${isStation ? `<div><dt>Website</dt><dd><a href="https://stationroadlusk.ie" target="_blank" rel="noopener noreferrer">stationroadlusk.ie<span class="text-link__arrow" aria-hidden="true"></span></a></dd></div>` : ""}
          <div><dt>Agents</dt><dd><p>Agents Name<br>+353 1 1234567<br>webaddress.ie<br>LRN: 001122</p><p>Agents Name<br>+353 1 1234567<br>webaddress.ie<br>LRN: 001122</p></dd></div></dl>
        </aside>
        <div class="property-detail-content"><div class="property-detail-copy"><p class="intro-copy">${lorem}</p><p>${shortBody} ${lorem}</p></div>
          <section class="property-gallery" aria-label="Property image gallery"><div class="property-gallery__images">${galleryImages.map((image, i) => `<figure ${i ? "hidden" : ""}><img src="assets/images/${image}" alt="${galleryAlts[i]}" width="1970" height="1190" loading="lazy" decoding="async"></figure>`).join("")}</div>
          <div class="property-gallery__controls" aria-label="Choose a property photograph" hidden>${galleryImages.map((_, i) => `<button type="button" class="carousel-dot" aria-label="Show property photograph ${i + 1}" aria-pressed="${i === 0}"></button>`).join("")}</div><p class="sr-only" data-gallery-status aria-live="polite"></p></section>
        </div>
      </section>
      <section class="next-property" aria-labelledby="next-property-heading"><div class="container next-property__layout">${photo(isStation ? "next-property.jpg" : next.image, "Next property in the portfolio", { ratio: "1730/1130" })}<div class="next-property__content"><h2 id="next-property-heading">Next property</h2><p class="detail-property__category">${next.category === "commercial" ? "Commercial" : next.category === "pipeline" ? "Development Pipeline" : "Residential"}</p><h3>${next.title}<br>${next.address}</h3>${roundLink("View next property", next.url)}</div></div></section>`;
    pages.push([property.url.replace("/index.html", ""), `${property.title} — Property Details`, detail]);
  }
  return pages;
}
