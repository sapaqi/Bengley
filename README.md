# McGarrell Reilly — HTML prototype (Tailwind)

Static prototype of the McGarrell Reilly website, rebuilt with Tailwind CSS as a
catalogue of reusable sections. It is the visual reference for the WordPress
build: every section here maps one-to-one to a flexible-content layout.

The site is in `site/` and needs no build step to view. Open `site/index.html`
or serve the folder (`npm run serve`, then http://127.0.0.1:4173).

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs Tailwind CLI and image-size (build only). |
| `npm run build` | Generates all pages into `site/`, copies `app.js`, compiles and minifies CSS. |
| `npm run watch:css` | Recompiles CSS on change (run `npm run build` after content/template edits). |
| `npm run serve` | Serves `site/` on port 4173. |

Hosting (Netlify or any static host): publish directory `site`, build command
`npm run build` (or none, since `site/` is committed).

## Structure

```
src/
  css/app.css            Tailwind entry: brand tokens, breakpoints, utilities, state rules
  js/app.js              Behaviour (menu, sliders, filters, reveals, parallax)
  lib/html.mjs           Helpers: escaping, relative URLs, photo frame, links, dots
  layout/shell.mjs       <head>, header, footer (site-wide)
  sections/              One file per section type (the catalogue below)
  templates/             Fixed layouts for single Property, News article and Job
  content/
    site.mjs             Global settings: brand, parallax switch, menus, contact details
    pages.mjs            Every page as an ordered list of sections with their fields
    collections.mjs      Properties, News, Publications, Jobs
    terms.mjs            Terms of use text
build.mjs                Renders content + sections into site/
site/                    Generated output (+ assets/ images, icons, fonts)
tools/clean-jpeg.py      Strips XMP/Ducky metadata from JPEGs losslessly
```

## Section catalogue

Each section is a `<section data-section="…">`. In WordPress each becomes one
flexible-content layout with the same fields; the markup and Tailwind classes
move into a template part unchanged.

| `data-section` | Fields | Options |
| --- | --- | --- |
| `hero-slider` | heading, slides[image] | parallax |
| `page-header` | title, image | variant `large` / `side`; parallax (off by default) |
| `intro` | lead, body[], image | variant `offset` / `wide`; with image: imageAnchor, parallax |
| `text-image` | heading, subheading, body, link, image | style `panel` / `outline` / `navy` / `block` / `offset`; size `large` / `standard`; imagePosition `left` / `right`; imageAnchor; parallax |
| `image-band` | slides[heading, body, link, image] | width `full` / `contained`; colour `navy` / `pale`; 2+ slides = carousel; imageAnchor; parallax |
| `section-heading` | heading | – |
| `card-grid` | heading, cards[title, body] | – |
| `testimonials` | heading, items[quote, name, role] | – |
| `team-grid` | heading, people[name, role, vcard, photo] | photo optional (design has none) |
| `careers-promo` | heading, cardHeading, body, link, image | imageAnchor, parallax |
| `projects-carousel` | heading, linkLabel | linkMode `all` / `current`; limit (4) |
| `property-list` | heading | batch (5) |
| `news-list` | heading, link | variant `rows` / `cards` / `library`; limit; batch |
| `news-hero` | – (latest post) | – |
| `featured-publication` | heading, link | – (first publication) |
| `publication-library` | heading | – |
| `jobs-list` | heading | – |
| `contact-details` | title, company, address, phone, email, linkedin, map | – |
| `rich-text` | title, html | – |

Sections 11–17 read from collections; in WordPress they are queries, not
editable lists. Single items use fixed templates: `templates/detail-templates.mjs`
(Property, News article, Job).

`text-image` covers every text/photo pairing (previously `feature` and
`page-feature`). `image-band` covers every photo with an overlaid box
(previously `wide-detail`, `social-feature` and the community carousel).

## Brands (McGR / Fajon)

All colours and fonts are CSS custom properties defined per brand in
`src/css/app.css`:

```css
:root, [data-brand="mcgr"] { --brand-primary: #232c64; … }
[data-brand="fajon"]       { /* values to be approved */ }
```

Tailwind colour utilities (`bg-primary`, `text-heading-alt`, `bg-surface-strong`…)
read these properties, so switching `site.brand` (the `data-brand` attribute on
`<html>`) restyles the whole site. Templates never contain hex values.

| Token | McGR value | Used for |
| --- | --- | --- |
| `primary` | `#232c64` | navy: headings, panels, footer |
| `accent` | `#00aeef` | rules, category labels, buttons |
| `surface` | `#d9f3fd` | light-blue panels |
| `surface-strong` | `#b2e6f8` | stronger blue panels, active filters |
| `surface-alt` | `#eaebf0` | contact block |
| `green` | `#2b6545` | Home Responsibility block |
| `heading-alt` | `#575756` | grey headings and labels |
| `meta` | `#6e6e6e` | dates (5.1:1 on white; was `#777`, 4.48:1) |
| `quote` | `#77799a` | testimonial and article quotes (large text) |
| `border` / `rule` / `outline` | `#999` / `#777` / `#80978a` | card borders, fact lists, outline frames |

## Parallax

Parallax is on by default, as specified by the client, and can be switched off:

- site-wide: `parallax: false` in `src/content/site.mjs` (renders `<html data-parallax="off">`);
- per section: `parallax: false` on any section that has photos.

It is also disabled automatically for visitors with *reduced motion* set.
Image reveals (photos sliding in once) are independent of the switch.

## Decisions and changes from the previous prototype

- Headings contain no manual line breaks; line lengths come from CSS widths so
  edited text wraps naturally. Property/project names keep a break between the
  name and the address, which are two separate fields.
- The logo links to the home page in the HTML (relative link, no JavaScript).
- Every section has `data-section`; no inline `style` attributes.
- The Privacy Statement link is hidden until its content is supplied
  (`site.legalLinks`). Job "Apply" is an email link (a form needs a decision on
  a form plugin and on CV storage).
- Mobile: sub-page text/photo sections now keep a 35px gap between photo and
  heading (the previous build collapsed it to 0).
- Intro with image uses one geometry on Responsibility and Our people.
- News has twelve posts with their own pages (the previous build linked several
  cards to the same article); copy and dates are still draft.
- JPEGs: XMP and Ducky segments removed losslessly (PHP's `exif_read_data`
  warned "Incorrect APP1 Exif Identifier Code" on import). `placemakign-feature.jpg`
  was renamed `placemaking-feature.jpg`.

## Draft content still to replace

Lorem ipsum body copy; repeated news titles and publications; "Property Name /
Address" fixtures; agent details; testimonials; property brochures, publication
PDFs and executive vCards (these links show a notice until the files exist);
Privacy Statement text.

## Accessibility note

`accent` (`#00aeef`) used as text (category labels) and as the button
background with white text measures 2.5:1, below WCAG AA (4.5:1). These are the
designer's colours and have not been changed; a darker accent for text and
buttons would need the designer's approval.
