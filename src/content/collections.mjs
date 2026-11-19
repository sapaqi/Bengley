// Collections (WordPress: custom post types Properties, News, Publications, Jobs).
// Entries marked DRAFT repeat the placeholder copy from the supplied artwork.
import { lorem, shortBody } from "./site.mjs";

const img = (src, alt) => ({ src, alt });

// ---------------------------------------------------------------- Properties
const categories = ["new-homes", "commercial", "commercial", "new-homes", "new-homes", "pipeline"];
const tiles = ["property-tile-A.jpg", "property-tile-B.jpg", "property-tile-C.jpg", "property-tile-D.jpg"];
const gallery = [
  img("property-page-carousel-A.jpg", "A bright office interior with floor-to-ceiling windows"),
  img("station-road-carousel-A.jpg", "Homes along Station Road in Lusk"),
  img("next-property.jpg", "Residential homes with rooftop solar panels"),
  img("property-tile-C.jpg", "A contemporary commercial reception"),
];
const agents = [
  ["Agents Name", "+353 1 1234567", "webaddress.ie", "LRN: 001122"],
  ["Agents Name", "+353 1 1234567", "webaddress.ie", "LRN: 001122"],
];

export const properties = Array.from({ length: 15 }, (_, i) => {
  const station = i === 0;
  const category = categories[i % categories.length];
  const label = category === "commercial" ? "Commercial" : category === "pipeline" ? "Development pipeline" : "Residential";
  return {
    slug: station ? "station-road-lusk" : `property-${i + 1}`,
    route: station ? "portfolio/station-road-lusk/" : `portfolio/property-${i + 1}/`,
    title: station ? "Station Road, Lusk" : "Property Name", // DRAFT
    address: station ? "County Dublin" : "Address", // DRAFT
    category,
    status: i % 4 === 1 ? "let" : "sale",
    featured: station,
    image: station
      ? img("McGR-Portfolio-Hero.jpg", "New homes at Station Road, Lusk, County Dublin")
      : img(tiles[i % tiles.length], `${label} property from the McGarrell Reilly portfolio`),
    heroImage: station ? img("station-road-carousel-A.jpg", "Station Road, Lusk, County Dublin") : null,
    nextImage: station ? img("next-property.jpg", "Next property in the portfolio") : null,
    size: station ? "10,680 sq m" : "",
    year: station ? "2017" : "",
    brochure: "", // PDF not supplied yet
    website: station ? { label: "stationroadlusk.ie", url: "https://stationroadlusk.ie" } : null,
    map: station ? { src: "snazzy-image.png", alt: "Map of Station Road in Lusk", url: "https://www.google.com/maps/search/?api=1&query=Station%20Road%20Lusk%20County%20Dublin" } : null,
    agents,
    intro: lorem,
    body: [`${shortBody} ${lorem}`],
    gallery,
  };
});

// ---------------------------------------------------------------------- News
const newsTitle = "A new era for Dublin 6. Read about our latest city centre office development."; // DRAFT
const newsSlugs = ["a-new-era-for-dublin-6", "city-centre-office-development", "latest-development"];
const newsDates = ["2023-08-16", "2023-08-09", "2023-08-02", "2023-07-26", "2023-07-19", "2023-07-12", "2023-07-05", "2023-06-28", "2023-06-21", "2022-08-16", "2022-08-09", "2022-08-02"];
const newsImages = ["property-tile-A.jpg", "property-tile-B.jpg", "property-tile-C.jpg"];
const articleImages = ["station-road-carousel-A.jpg", "property-tile-B.jpg", "property-tile-C.jpg"];

export const news = newsDates.map((date, i) => {
  const slug = newsSlugs[i] || `news-${i + 1}`;
  return {
    slug,
    route: `media/news/${slug}/`,
    title: newsTitle,
    date,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: img(newsImages[i % 3], "Development featured in the news"),
    articleImage: img(articleImages[i % 3], "A development featured in this article"),
    heroImage: i === 0 ? img("News-post-promo.jpg", "An illuminated courtyard at Charlemont Square") : null,
    intro: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    paragraphs: [
      "Ut wisi enim ad minim veniam, quis nostrud exercitation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
      { quote: shortBody },
      `${shortBody} Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.`,
    ],
  };
});

// -------------------------------------------------------------- Publications
export const publications = Array.from({ length: 16 }, (_, i) => {
  const locks = i % 2 === 1;
  return {
    title: locks ? "The Locks" : i === 0 ? "1 Charlemont Square" : "Charlemont Square", // DRAFT repeats
    type: locks ? "residential" : "commercial",
    cover: locks ? img("the-locks-bro-thumb.png", "The Locks brochure cover") : img("charlemont-sq-bro-thumb.png", "Charlemont Square brochure cover"),
    summary: shortBody,
    file: "", // PDF not supplied yet
  };
});

// ---------------------------------------------------------------------- Jobs
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
  "Adhere to the company’s Vision, Culture and Commitment statement. Assist with various projects and duties as assigned.",
];
const jobBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet quam ipsum. Sed eget neque odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae finibus nunc. Donec finibus sed nisl nec volutpat. Mauris tempor in eros vitae commodo. Duis tincidunt nisi ac ante posuere placerat. Cras enim lorem, congue eu nunc ultrices, finibus viverra risus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Cras enim lorem, congue eu nunc ultrices, finibus viverra risus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.";

export const jobs = [
  "Sr. Accountant, Construction & Commercial Accounting",
  "Accounting Manager - Commercial Real Estate Accounting",
  "Sr. Accountant, Construction & Commercial Accounting",
  "Accounting Manager - Commercial Real Estate Accounting",
].map((title, i) => ({
  route: `working-with-us/job-${i + 1}/`,
  title,
  type: "Full-time",
  location: "Dublin",
  fullLocation: "Dublin, Ireland",
  category: "Accounting",
  body: jobBody,
  responsibilities,
}));
