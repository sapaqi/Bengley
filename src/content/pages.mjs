// Pages built from the section catalog (WordPress: pages with flexible content).
// Each page is an ordered list of sections; every section has a `type` from
// src/sections/index.mjs and the fields that section accepts.
import { lorem, shortBody } from "./site.mjs";
import { termsHtml } from "./terms.mjs";

const img = (src, alt) => ({ src, alt });
const more = (url, label = "Discover more") => ({ label, url });

export const pages = [
  {
    route: "",
    title: "Home",
    description: "McGarrell Reilly Group — creating some of the highest quality developments in Ireland.",
    overImage: true,
    preload: "McGR-Home-banner.jpg",
    sections: [
      {
        type: "hero-slider",
        heading: "Creating some of the highest quality developments in Ireland",
        slides: [
          { image: img("McGR-Home-banner.jpg", "Charlemont Square's contemporary office buildings illuminated at dusk") },
          { image: img("property-page-carousel-A.jpg", "A development from the McGarrell Reilly property portfolio") },
          { image: img("McGR-Portfolio-Hero.jpg", "New homes at Station Road, Lusk, County Dublin") },
        ],
      },
      { type: "intro", variant: "wide", body: [lorem] },
      { type: "projects-carousel", heading: "Our Projects", linkMode: "all", linkLabel: "View all Properties" },
      {
        type: "text-image", style: "block", heading: "Responsibility",
        body: `${lorem} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
        link: more("responsibility/", "More about Responsibility"),
        image: img("McGR-Home-responsibility.jpg", "A family outside their home"), imageAnchor: "top",
      },
      {
        type: "text-image", style: "offset", heading: "Careers",
        body: `${lorem} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
        link: more("working-with-us/", "View Careers"),
        image: img("McGR-Home-careers.jpg", "Colleagues working together in the office"),
      },
      { type: "news-list", variant: "rows", heading: "Featured News", link: { label: "All news", url: "media/news/" } },
    ],
  },
  {
    route: "portfolio/",
    title: "Property Portfolio",
    sections: [
      { type: "page-header", variant: "large", title: "Property Portfolio", image: img("McGR-Portfolio-Hero.jpg", "New homes at Station Road, Lusk") },
      { type: "intro", body: [lorem] },
      { type: "projects-carousel", heading: "Featured Property", linkMode: "current", linkLabel: "View Property" },
      { type: "property-list", heading: "All Properties", batch: 5 },
    ],
  },
  {
    route: "about-us/",
    title: "About Us",
    sections: [
      { type: "page-header", variant: "large", title: "About Us", image: img("About-Us-banner.jpg", "Colleagues in conversation") },
      { type: "intro", body: [lorem] },
      {
        type: "card-grid", heading: "Our values",
        cards: ["Integrity", "Commercial awareness", "Commitment", "Mutual respect", "Teamwork"].map((title) => ({ title, body: shortBody })),
      },
      {
        type: "text-image", style: "navy", heading: "Our people", subheading: "A team of highly skilled and experienced people",
        body: shortBody, link: more("about-us/our-people/", "Meet our people"),
        image: img("about-us-our-people-feature.jpg", "Members of the team meeting together"), imageAnchor: "top",
      },
      { type: "section-heading", heading: "Our expertise" },
      {
        type: "text-image", style: "panel", heading: "Investment", body: shortBody, link: more("about-us/investment/"),
        image: img("about-us-investment-feature.jpg", "Contemporary commercial building"),
      },
      {
        type: "text-image", style: "panel", imagePosition: "left", heading: "Development", body: shortBody, link: more("about-us/development/"),
        image: img("about-us-development-feature.jpg", "New residential homes with solar panels"),
      },
      {
        type: "testimonials", heading: "What our clients say",
        items: Array.from({ length: 4 }, () => ({ quote: lorem, name: "Mary Smith", role: "Structural Engineer" })), // DRAFT
      },
    ],
  },
  {
    route: "about-us/our-people/",
    title: "Our people",
    sections: [
      { type: "page-header", variant: "side", title: "Our people", image: img("our-people-banner.jpg", "Two colleagues reviewing work together") },
      { type: "intro", image: img("our-people-feature.jpg", "Colleagues working together in the office"), imageAnchor: "top", lead: lorem, body: [`${shortBody} ${lorem}`] },
      {
        type: "team-grid", heading: "Executive Team",
        people: [
          { name: "Sean Reilly", role: "Executive Chairman" },
          { name: "Raymond Reilly", role: "Chief Executive Officer" },
          { name: "Deirdre Reilly", role: "Chief Operating Officer" },
          { name: "Anthony Kinsella", role: "Financial Director" },
        ],
      },
      {
        type: "careers-promo", heading: "Careers", cardHeading: "Working with us", body: shortBody,
        link: more("working-with-us/", "Opportunities"),
        image: img("our-people-working-with-us.jpg", "A member of the team"), imageAnchor: "top",
      },
    ],
  },
  {
    route: "about-us/investment/",
    title: "Investment",
    sections: [
      { type: "page-header", variant: "side", title: "Investment", image: img("investments-banner.jpg", "A glass-fronted commercial building on a Dublin street") },
      { type: "intro", body: [lorem] },
      { type: "text-image", size: "standard", style: "panel", imagePosition: "left", heading: "Internal Asset Management", body: shortBody, image: img("asset-management-feature.jpg", "An asset management team in a meeting") },
      { type: "text-image", size: "standard", style: "navy", heading: "Internal Property Management", body: shortBody, image: img("property-management-feature.jpg", "Two colleagues discussing property management") },
      { type: "text-image", size: "standard", style: "outline", imagePosition: "left", heading: "Highly Skilled Teams", body: shortBody, image: img("skilled-teams-feature.jpg", "A team reviewing plans together") },
      { type: "text-image", size: "standard", style: "panel", heading: "Fit-Out", body: shortBody, image: img("fit-out-feature.jpg", "A completed commercial interior fit-out") },
      { type: "text-image", size: "standard", style: "panel", imagePosition: "left", heading: "Refurbishment", body: shortBody, image: img("refurb-feature.jpg", "A refurbished open-plan workplace") },
    ],
  },
  {
    route: "about-us/development/",
    title: "Development",
    sections: [
      { type: "page-header", variant: "large", title: "Development", image: img("development-banner.jpg", "Charlemont Square courtyard at dusk") },
      { type: "intro", body: [lorem] },
      { type: "text-image", size: "standard", style: "panel", heading: "Unlocking Development Land", body: shortBody, image: img("development-feature.jpg", "An aerial view of a city development under construction") },
      { type: "text-image", size: "standard", style: "outline", imagePosition: "left", heading: "Building Strong Relationships", body: shortBody, image: img("strong-relationships-feature.jpg", "Colleagues discussing a project") },
      { type: "image-band", imageAnchor: "top", slides: [{ heading: "Record of Working in Partnerships", body: shortBody, image: img("partnership-feature.jpg", "Business partners greeting each other") }] },
      { type: "text-image", size: "standard", style: "panel", imagePosition: "left", heading: "Technical Analysis", body: shortBody, image: img("tech-analysis.jpg", "Two colleagues studying information on a laptop") },
    ],
  },
  {
    route: "responsibility/",
    title: "Responsibility",
    sections: [
      { type: "page-header", variant: "large", title: "Responsibility", image: img("responsibility-banner.jpg", "Planting and landscaping within a city development") },
      { type: "intro", image: img("responsibility-feature.jpg", "Indoor plants within a building"), lead: lorem, body: [`${shortBody} ${lorem}`] },
      { type: "text-image", style: "outline", imagePosition: "left", heading: "Environmental", body: shortBody, link: more("responsibility/environmental/"), image: img("environmental.jpg", "Planting and landscaped streets around residential homes") },
      { type: "image-band", width: "contained", slides: [{ heading: "Social", body: shortBody, link: { label: "Discover more about Social", url: "responsibility/social/" }, image: img("social-banner.jpg", "People gathering at a community event") }] },
      { type: "text-image", style: "panel", heading: "Governance", body: shortBody, image: img("governance-feature.jpg", "A person signing a document") },
    ],
  },
  {
    route: "responsibility/environmental/",
    title: "Environmental",
    sections: [
      { type: "page-header", variant: "side", title: "Environmental", image: img("environmental-banner.jpg", "Landscaped homes near the church in Lusk") },
      { type: "intro", body: [lorem] },
      { type: "text-image", size: "standard", style: "panel", imagePosition: "left", heading: "Sustainability", body: shortBody, image: img("climate-action-feature.jpg", "Workers installing rooftop solar panels") },
      { type: "text-image", size: "standard", style: "navy", heading: "Energy Efficiency", body: shortBody, image: img("energy-efficient-feature.jpg", "A modern energy-efficient commercial building") },
      { type: "image-band", colour: "pale", imageAnchor: "top", slides: [{ heading: "Biodiversity", body: shortBody, image: img("biodiversity-feature.jpg", "Planting and green spaces within a residential development") }] },
    ],
  },
  {
    route: "responsibility/social/",
    title: "Social",
    sections: [
      { type: "page-header", variant: "side", title: "Social", image: img("social-banner.jpg", "A community event in a shared courtyard") },
      { type: "intro", body: [lorem] },
      { type: "text-image", size: "standard", style: "panel", imagePosition: "left", heading: "Placemaking", body: shortBody, image: img("placemaking-feature.jpg", "A landscaped courtyard with seating and play spaces") },
      {
        type: "image-band", label: "McGarrell Reilly in the community",
        slides: [
          { heading: "McGarrell Reilly in the community", body: shortBody, image: img("in-the-community-feature.jpg", "Volunteers collecting litter together") },
          { heading: "Placemaking", body: shortBody, image: img("placemaking-feature.jpg", "A shared courtyard within a residential development") },
          { heading: "Health & Safety", body: shortBody, image: img("health-and-safety-feature.jpg", "A construction professional wearing protective equipment") },
          { heading: "Responsible Sourcing", body: shortBody, image: img("responsible-sourcing.jpg", "Trees in a sustainably managed woodland") },
        ],
      },
      { type: "text-image", size: "standard", style: "outline", imagePosition: "left", heading: "Health & Safety", body: shortBody, image: img("health-and-safety-feature.jpg", "A construction professional wearing protective equipment") },
      { type: "text-image", size: "standard", style: "navy", heading: "Responsible Sourcing", body: shortBody, image: img("responsible-sourcing.jpg", "Trees in a woodland") },
    ],
  },
  {
    route: "working-with-us/",
    title: "Working with us",
    sections: [
      { type: "page-header", variant: "large", title: "Working with us", image: img("working-with-us-banner.jpg", "A colleague participating in a meeting") },
      { type: "intro", body: [lorem] },
      { type: "jobs-list", heading: "Current Opportunities" },
    ],
  },
  {
    route: "media/",
    title: "Media",
    overImage: true,
    sections: [
      { type: "news-hero" },
      { type: "news-list", variant: "cards", heading: "Latest news", link: { label: "All news", url: "media/news/" } },
      { type: "featured-publication", heading: "Latest publication", link: { label: "Publications library", url: "media/publications/" } },
    ],
  },
  {
    route: "media/news/",
    title: "Latest news",
    sections: [{ type: "news-list", variant: "library", heading: "Latest news", batch: 9 }],
  },
  {
    route: "media/publications/",
    title: "Publications",
    sections: [{ type: "publication-library", heading: "Publications" }],
  },
  {
    route: "contact-us/",
    title: "Contact Us",
    sections: [
      {
        type: "contact-details", title: "Contact us", company: "McGarrell Reilly Group",
        address: ["31/32 Charlemont Street", "Saint Kevin's", "Dublin 2", "D02 DK57"],
        phone: "+ 353 (0) 1 416 1300", email: "info@mcgarrellreilly.ie",
        linkedin: "https://www.linkedin.com/company/mcgarrell-reilly-group/",
        map: { src: "location-map.jpg", alt: "Map showing the office on Charlemont Street, Dublin", url: "https://www.google.com/maps/search/?api=1&query=31%2F32%20Charlemont%20Street%20Dublin%202%20D02%20DK57" },
      },
    ],
  },
  {
    route: "terms-of-use/",
    title: "Terms of use",
    sections: [{ type: "rich-text", title: "Terms of use", html: termsHtml }],
  },
];
