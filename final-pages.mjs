// Final five supplied layouts. Repeated entries remain demonstration content.
export function makeFinalPages({ photo, feature, sideHero, lorem, shortBody, newsTitle, articleSlugs, jobs }) {
  const communitySlides = [
    ["McGarrell Reilly<br>in the community", "in-the-community-feature.jpg", "Volunteers collecting litter together"],
    ["Placemaking", "placemakign-feature.jpg", "A shared courtyard within a residential development"],
    ["Health &amp; Safety", "health-and-safety-feature.jpg", "A construction professional wearing protective equipment"],
    ["Responsible Sourcing", "responsible-sourcing.jpg", "Trees in a sustainably managed woodland"],
  ];
  const community = `<section class="community-carousel" aria-label="McGarrell Reilly in the community">
    <div class="community-images">${communitySlides.map(([title, image, alt], i) => `<figure ${i ? "hidden" : ""}>${photo(image, alt, { reveal: false })}</figure>`).join("")}</div>
    <div class="community-panel"><div class="community-copy">${communitySlides.map(([title], i) => `<article ${i ? "hidden" : ""}><h2>${title}</h2><p>${shortBody}</p></article>`).join("")}</div>
      <div class="community-controls" aria-label="Choose a community story" hidden>${communitySlides.map((_, i) => `<button type="button" class="carousel-dot" aria-label="Show community story ${i + 1}" aria-pressed="${i === 0}"></button>`).join("")}</div>
      <p class="sr-only" data-community-status aria-live="polite"></p>
    </div></section>`;
  const social = sideHero("Social", "social-banner.jpg", "A community event in a shared courtyard") + `<section class="container detail-lead"><p>${lorem}</p></section>` +
    feature({ title: "Placemaking", image: "placemakign-feature.jpg", alt: "A landscaped courtyard with seating and play spaces", variant: "page-feature--panel page-feature--reverse" }) + community +
    feature({ title: "Health &amp; Safety", image: "health-and-safety-feature.jpg", alt: "A construction professional wearing protective equipment", ratio: "1730/1130", variant: "page-feature--outline page-feature--reverse" }) +
    feature({ title: "Responsible<br>Sourcing", image: "responsible-sourcing.jpg", alt: "Trees in a woodland", variant: "page-feature--navy detail-navy" });

  const publications = `<section class="container collection-page" data-publication-library aria-labelledby="page-title">
    <div class="collection-heading"><h1 id="page-title">Publications</h1><label class="collection-select"><span class="sr-only">Filter publications by type</span><select data-publication-filter><option value="all">Select type</option><option value="commercial">Commercial</option><option value="residential">Residential</option></select></label></div>
    <div class="publication-grid">${Array.from({ length: 16 }, (_, i) => {
      const locks = i % 2 === 1;
      const title = locks ? "The Locks" : "Charlemont Square";
      return `<article class="publication-card" data-publication-type="${locks ? "residential" : "commercial"}"><a href="media/publications/${locks ? "the-locks" : "charlemont-square"}.pdf" data-demo-message="The publication PDF will be connected when the file is supplied." aria-label="Download ${title}"><img class="publication-card__cover" src="assets/images/${locks ? "the-locks-bro-thumb.png" : "charlemont-sq-bro-thumb.png"}" alt="${title} brochure cover" width="${locks ? "660" : "1140"}" height="${locks ? "930" : "1340"}" loading="lazy"><div class="publication-card__caption"><h2>${title}</h2><img src="assets/icons/McGR%20Download%20icon%20DEFAULT.svg" width="23" height="23" alt=""></div></a></article>`;
    }).join("")}</div><p class="sr-only" data-publication-status aria-live="polite"></p>
    <noscript><style>.collection-select{display:none}</style></noscript>
  </section>`;

  const newsItems = Array.from({ length: 12 }, (_, i) => ({
    year: i < 9 ? "2023" : "2022",
    image: ["property-tile-A.jpg", "property-tile-B.jpg", "property-tile-C.jpg"][i % 3],
    slug: i < 9 ? articleSlugs[i % 3] : "archive",
  }));
  const latestNews = `<section class="container collection-page news-library" data-news-library aria-labelledby="page-title">
    <div class="collection-heading"><h1 id="page-title">Latest news</h1><label class="collection-select"><span class="sr-only">Filter news by year</span><select data-news-filter><option value="all">Select year</option><option value="2023">2023</option><option value="2022">2022</option></select></label></div>
    <div class="news-card-grid">${newsItems.map((item, i) => `<article class="news-card news-library__card" data-news-year="${item.year}" ${i >= 9 ? "hidden" : ""}><a href="media/news/${item.slug}/index.html">${photo(item.image, "A development featured in the news", { ratio: "3/2", reveal: false })}<time datetime="${item.year}-08-16">16.08.${item.year.slice(-2)}</time><h2>${newsTitle}</h2></a></article>`).join("")}</div>
    <p class="sr-only" data-news-status aria-live="polite"></p><button class="solid-button news-load-more" type="button" hidden>Load More</button>
    <noscript><style>.news-library__card[hidden]{display:block!important}.collection-select{display:none}</style></noscript>
  </section>`;

  const responsibilities = [
    "Set up and maintain proforma job cost projects for multiple real estate entities (operations and development).",
    "Enter job budgets, ensuring proper approvals (lease commissions, tenant improvements, spec spaces, and capital).",
    "Refer to tenants’ leases to conduct financial reconciliations for tenant improvements.",
    "Research and prepare journal entries for job cost reclasses.",
    "Review properties’ loan documents to establish loan draw parameters/requirements.",
    "Compile and submit loan draws for approval.",
    "Verify lien releases and contract compliance for development invoices.",
    "Execute monthly accounting close procedures and deliverables (journal entries, reconcile balance sheet accounts including bank reconciliations, reports) in compliance with GAAP.",
    "Review and understand relevant documents including but not limited to loan documents, tenant leases, development agreements, venture agreements, other contracts and agreements.",
    "Manage the preparation of various monthly and annual financial reports for clients.",
    "Ensure that financial reports comply with GAAP and established accounting standards and procedures.",
    "Assist in preparation of annual budget and operating expense calculations.",
    "Adhere to SteelWave’s Vision, Culture and Commitment statement. Assist with various projects and duties as assigned.",
  ];
  const jobBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet quam ipsum. Sed eget neque odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae finibus nunc. Donec finibus sed nisl nec volutpat. Mauris tempor in eros vitae commodo. Duis tincidunt nisi ac ante posuere placerat. Cras enim lorem, congue eu nunc ultrices, finibus viverra risus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Cras enim lorem, congue eu nunc ultrices, finibus viverra risus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.";
  const jobPages = jobs.map((title, i) => [`working-with-us/job-${i + 1}`, title, `
    <section class="container job-overview"><aside class="job-glance" aria-labelledby="glance-heading"><h2 id="glance-heading">At a glance</h2><dl><div><dt>Location</dt><dd>Dublin, Ireland</dd></div><div><dt>Category</dt><dd>Accounting</dd></div><div><dt>Type</dt><dd>Full-time</dd></div></dl></aside>
      <div class="job-description"><h1>${title.replaceAll("&", "&amp;")}</h1><p>${jobBody}</p></div></section>
    <section class="job-responsibilities"><div class="container job-responsibilities__layout"><div><h2 id="responsibilities-heading">Responsibilities</h2><ul aria-labelledby="responsibilities-heading">${responsibilities.map(item => `<li>${item}</li>`).join("")}</ul></div>
      <aside class="job-apply" aria-labelledby="apply-heading"><h2 id="apply-heading">Apply for this job</h2><p>If you are interested in applying for this role, please email us with a cover letter together with an up to date CV.</p><a class="solid-button" href="mailto:info@mcgarrellreilly.ie?subject=${encodeURIComponent(`Application: ${title}`)}">Email us</a><p>or contact us at<br><a class="job-apply__phone" href="tel:+35314161300">+353 (0)1 4161 300</a></p></aside>
    </div></section>`]);

  const terms = `<article class="terms-page"><h1>Terms of use</h1>
    <p>These Website Terms of Use apply to this website which is operated by McGarrell Reilly under the domain name www.mcgarrellreilly.ie (hereinafter referred to as "the Website") and is part of the McGarrell Reilly (hereinafter referred to as "we", "us", "our"), which also includes such other group companies as may from time to time be listed on the Website.</p>
    <p>Access to this website and the use of information on it is subject to these terms and conditions which you should read carefully. By proceeding further you accept them. If you do not accept these terms and conditions, please do not continue to use this website. While McGarrell Reilly has taken all reasonable steps to ensure the accuracy and completeness of the information on the pages of this site it can accept no legal liability in respect of any inaccuracy or incompleteness in such information.</p>
    <h2>Copyright</h2><p>Copyright is claimed for this website and all information appearing on it. Ownership of all intellectual property rights relating to this website is vested in McGarrell Reilly Group. The information or materials contained in this website (including, but not limited to, text, graphics, html and CGI code) may not be copied, transmitted, amended, reproduced, distributed or published in any form whatsoever without the prior consent in writing of McGarrell Reilly Group.</p>
    <h2>Information concerning properties on this Website</h2><p>Any particulars and/or specific property related information contained within this website are given as a general outline for the guidance of intending purchasers or lessors and do not constitute any part of an offer or a contract.</p>
    <p>All statements contained in any particulars in respect of any property listed on this website are made without responsibility on the part of the agents or the vendor/lessor.</p>
    <p>None of the statements contained in these particulars are to be relied on as statements or representations of fact.</p>
    <p>The particulars (including but not limited to various plans, photographs, descriptions and measurements) have been carefully prepared but their accuracy is not guaranteed and any intending purchasers/lessees shall satisfy themselves by inspection or otherwise as to their correctness. No omission, accidental error or other inaccuracy shall be a ground for a claim for compensation or for the rescission of a contract by either the vendor/lessor or the purchaser/tenant.</p>
    <p>McGarrell Reilly Group nor any person in its employment has any authority to make or give any representation or warranty in relation to any property referred to in this website.</p>
    <h2>Third-Party Websites</h2><p>McGarrell Reilly Group may provide as a convenience to you, links to websites operated by other entities and persons. Any link to a non McGarrell Reilly Group website does not mean that McGarrell Reilly Group (or any other person involved with the provision and maintenance of this website) endorses or accepts any responsibility for the content or the use of such websites. If you use these websites you do so at your own risk. McGarrell Reilly Group (or any other person involved with the provision and maintenance of this website) makes no warranty or representation regarding, and does not sponsor or endorse, any linked websites or the information or the materials appearing thereon or any products or services described thereon. Furthermore, links do not imply, save where expressly indicated, that McGarrell Reilly Group is affiliated or associated with linked websites or that any linked website is authorised to use any trademark, trade name, logo, or copyright of McGarrell Reilly Group.</p>
    <p>No links to this website may be included in any other website without our express written authorisation.</p>
    <p>Any opinions, statements, services, offers or other information or content expressed or made available in the website by any third party are those of the respective author(s) or distributor(s) and not of McGarrell Reilly Group.</p>
    <h2>Contracting Online</h2><p>Nothing on this website is intended to be nor should be construed as an offer to enter into a contractual relationship with you or anyone else, except for these terms and conditions which govern the relationship between us in relation to your use of the website.</p>
    <p>If you make a contract with a third party who is named or referred to on this website, it is your responsibility to ensure that you are comfortable with the terms of that contract and to take legal advice if necessary.</p>
    <h2>Disclaimer</h2><p>You may use and browse this website at your own risk. If you are dissatisfied with any of the materials contained in the website, or with any of these terms, your sole and exclusive remedy is to discontinue accessing and using the website.</p>
    <p>McGarrell Reilly Group makes no representation or warranty or undertaking of any kind in relation to the information contained in this website or the completeness or accuracy of such information. Nothing on this website constitutes advice nor does the transmission, downloading or sending of any information create any contractual relationship.</p>
    <p>No liability whatsoever is accepted by McGarrell Reilly Group for any action taken in reliance on the information contained on this website.</p>
    <p>McGarrell Reilly Group (or any other person involved with the provision and maintenance of this website) assumes no responsibility and shall not be liable for any damages to, or viruses that may infect your computer equipment or other property on account of your access to, use of, or browsing the website including but not limited to any bulletin board or communication facility.</p>
    <h2>Jurisdiction and Governing Law</h2><p>These terms and conditions will be governed by the laws of Ireland. The Irish Courts will have exclusive jurisdiction to settle any disputes which may arise out of or in connection with these terms and conditions or use of this website.</p>
    <p>Use of this website by persons outside of Ireland is without the authority of McGarrell Reilly Group and no liability can be accepted for any losses, costs, claims, demands and expenses arising out of any use of this website by persons situated outside of Ireland.</p>
  </article>`;

  return [["responsibility/social", "Social", social], ["media/publications", "Publications", publications], ["media/news", "Latest news", latestNews], ...jobPages, ["terms-of-use", "Terms of use", terms]];
}
