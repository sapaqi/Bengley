// Section catalog. The key is the section type used in page content and the
// value of data-section in the markup. In WordPress each entry becomes one
// flexible-content layout with the same fields.
import heroSlider from "./hero-slider.mjs";
import pageHeader from "./page-header.mjs";
import intro from "./intro.mjs";
import textImage from "./text-image.mjs";
import imageBand from "./image-band.mjs";
import { sectionHeading, cardGrid, testimonials, teamGrid, careersPromo, richText, contactDetails } from "./content-blocks.mjs";
import { projectsCarousel, propertyList, newsList, newsHero, featuredPublication, publicationLibrary, jobsList } from "./collections.mjs";

export const sections = {
  "hero-slider": heroSlider,
  "page-header": pageHeader,
  intro,
  "text-image": textImage,
  "image-band": imageBand,
  "section-heading": sectionHeading,
  "card-grid": cardGrid,
  testimonials,
  "team-grid": teamGrid,
  "careers-promo": careersPromo,
  "projects-carousel": projectsCarousel,
  "property-list": propertyList,
  "news-list": newsList,
  "news-hero": newsHero,
  "featured-publication": featuredPublication,
  "publication-library": publicationLibrary,
  "jobs-list": jobsList,
  "contact-details": contactDetails,
  "rich-text": richText,
};
