# McGarrell Reilly website preview

Responsive static HTML handover for all eighteen supplied layouts: Home, six main-menu pages, six earlier inner-page layouts and the final five views. Content is in English, following the supplied Illustrator homepage, UI kit and seventeen JPG page references. The output is ready for a static preview and subsequent WordPress integration.

## Preview

With Node.js installed, run `node server.mjs` in this directory and open <http://127.0.0.1:4173>. There are no package dependencies to install. Stop the server with Ctrl+C. The page can also be opened directly through `index.html`. An npm installation can use the equivalent `npm run dev` script.

## GitHub handover

Extract `McGarrell-Reilly-GitHub.zip` and upload its contents to the repository root. Keep the directories intact, including `assets`, and include the hidden `.gitignore` and `.gitattributes` files. Do not upload the ZIP itself. The archive contains the source generators, generated HTML and all local website assets; review screenshots and previous handover archives are excluded.

The project uses Node.js built-in modules only, so no dependency installation is needed. With Node.js and npm available:

```sh
npm run check
npm run build
npm run dev
```

Commit regenerated subpages and `page-manifest.js` whenever content definitions or the shared shell change. The included HTML works directly on static hosting without a build step. This package does not configure publishing, GitHub Pages or an automatic deployment. `.gitignore` excludes local configuration, dependencies, logs, handover ZIPs and root-level review screenshots while retaining the website photography in `assets`.

## Files and components

- `index.html` contains live text and semantic sections, each identified by `data-section`.
- `styles.css` contains the brand variables, layout, shared text-image variants, responsive rules and focus states.
- `app.js` contains shared navigation, motion, homepage demonstration data and progressive enhancements.
- `pages.css` and `pages.js` contain the main subpage layouts, Portfolio filtering, testimonial controls, property gallery and article sharing.
- `details.css` and `detail-pages.mjs` define the six inner-page layouts.
- `final-pages.css` and `final-pages.mjs` define Publications, Social, job details, Latest news and Terms of use. Collection filtering and the community carousel are in `pages.js`.
- `page-manifest.js` is generated alongside the HTML. It identifies implemented routes for the preview link handler.
- The `portfolio`, `about-us`, `responsibility`, `working-with-us`, `media` and `contact-us` directories each contain a standalone `index.html`.
- `build-pages.mjs` regenerates all subpages from their content definitions and the homepage header/footer. Run `node build-pages.mjs` after editing the shared shell or page definitions. The generated HTML is included and needs no build step to view.
- `assets` contains the supplied SVGs, original photography and locally hosted Libre Franklin font with its OFL licence.

The `hero`, `intro`, `projects`, `text-image`, `news` and `footer` sections map to WordPress section components. Responsibility uses the `image-right` text-image variant and Careers uses `image-left`. Child classes describe their content, including `heading`, `body`, `image`, `content`, `items` and `item`.

Use the CSS custom properties as the source for the eventual Figma variables or WordPress theme tokens. They cover colour, typography, spacing and motion. The root brand attribute is `data-brand="mcgr"`. This delivery implements the McGR mode. Fajon requires its approved content and layout mapping in a later phase.

## WordPress integration

| Section | WordPress content source | Behaviour |
| --- | --- | --- |
| Header and footer | Global site settings and navigation menus | Logo, address, social URL and navigation are site-wide. Add the global phone field when its placement is agreed. |
| Hero | Ordered homepage slides | Each slide has an image and alternative text. The current headline is common to all demo slides. |
| Intro | Homepage editable body | Preserve live text and its width. |
| Our Projects | Properties | `featured property` determines the initial project. The same selected property should feature on the Portfolio page. Demo ordering places the featured item first. |
| Responsibility and Careers | Homepage section fields | Heading, body, image, link label and URL, with an image-left or image-right layout variant. |
| Featured News | Published news posts | Query three posts ordered by publication date descending. Use WordPress permalinks and localized dates. |

Property fixtures expose `id`, `title`, `address`, `label`, `category`, `status`, `featured`, `image`, `alt` and `url`. Categories are `New homes`, `Commercial` and `Development pipeline`. Statuses are `For Sale` and `To Let`. The visible `Residential` label follows the supplied homepage artwork.

The fixture object is `demoData` at the top of `app.js`. Replace it at the template boundary with WordPress data. Initial HTML contains the first hero, property and three news rows so the baseline page remains visible without JavaScript. Keep that initial markup consistent when integrating the CMS. Additional project fixtures intentionally retain the artwork's `Property Name` and `Address` placeholders.

The renderer demonstrates latest-three selection using three source news placeholders and one older fixture. The dates and repeated news copy follow the draft and need editorial replacement.

All 38 generated pages are connected through the shared header and footer. The logo returns to Home. Relative `section/index.html` links and depth-aware subpage base URLs support both static hosting and opening the files directly. Preserve or replace this base deliberately when converting to CMS templates. Only missing PDF/VCF downloads and the unsupplied Privacy Statement retain availability messages. Remove `setupDemoLinks()` and the `demo-notice` element when the WordPress routes exist. Modified clicks follow the literal target URL. Verify all final slugs during integration.

## Responsive and interaction decisions

- Desktop starts at 1200px. Tablet is 768–1199px. Mobile is below 768px.
- Mobile layouts are proposed from the supplied desktop artwork. Sections stack, navigation expands using a Menu button, and image focal points are preserved as far as possible.
- The navigation uses a translucent background and an 18px backdrop blur. Above 80px scroll it shrinks to a 60px bar and replaces the full logo with the supplied symbol. It resets when scrolling back above that threshold.
- Hero arrows and project dots are manual controls. Arrow keys work while focus is within their carousel. Image decoding happens before switching, and failed loads preserve the current image.
- The first hero uses `McGR-Home-banner.jpg`. Two additional slides use other supplied property images as agreed demonstration material. Their final image selection requires client approval.
- Hero photography is visible immediately at its original scale, matching the wider draft crop, and retains scroll parallax. The scroll offset is constrained to keep the visible area covered when returning quickly to the top. The other three photo sections reveal from halfway up the image to the top over 950ms, with a 1.5-second zoom-out. The frame stays fixed. A sliding overflow window and a counter-moving inner image layer create the reveal with 2px overscan, avoiding clip-path edge artifacts. Each reveal runs once per page load.
- Parallax moves hero photography at 30% of scroll distance, capped at 19% of frame height. Section photography moves at 38% of scroll distance around the viewport centre, capped at 16% of frame height in each direction. Section image overscan keeps the frames filled throughout the stronger movement. Updates ease through requestAnimationFrame and stop when settled. Reduced-motion preferences disable reveal and parallax, including changes to the preference while the page is open.
- Responsibility uses `data-parallax-anchor="top"`. Its image scales around the top edge as the page scrolls, without vertical translation, so the people's heads remain in the frame. Its reveal zoom also uses the top anchor.
- The closed mobile header has no scrolling container. Its logo is clipped to the current brand frame, while the expanded menu can scroll when the viewport is too short to show all navigation links.
- The source's yellow section numbers, heading-level annotations and word-count instructions have been omitted. Lorem ipsum remains as draft body copy.

## Design observations for review

The source combines a `Residential` display label with the requested `New homes` property taxonomy. Both are represented separately in the fixtures for developer review.

The small cyan category text against white has low contrast in the source artwork. Its source colour is preserved for design review. The responsibility green (`#2b6545`) and pale blue (`#d9f3fd`) surfaces are sampled from the rendered Illustrator artwork and should be confirmed against brand tokens if exact source values are provided.

The LinkedIn URL is a proposed destination and needs confirmation. It is set in the footer markup. No phone link appears in the homepage artwork.

## Verification

Run `node --check app.js`, `node --check pages.js`, `node --check build-pages.mjs` and `node --check server.mjs` for JavaScript syntax checks. An npm installation can use `npm run check`. Browser verification should cover 1760, 1440, 1024, 768, 390 and 320px widths, keyboard navigation, menu dismissal, both sliders, header reset, reduced motion, image loading and JavaScript-disabled baseline content.

The demo was checked in the in-app browser at those six viewport widths. No horizontal page overflow was found. Both sliders, three-row news selection, mobile menu expansion, Escape dismissal and the compact header were verified. JavaScript syntax and referenced local assets were also checked. Reduced-motion handling and the JavaScript-disabled baseline were checked in source rather than through browser emulation.

The current motion revision was checked at 390px mobile and 1280px desktop widths. Hero is visible immediately. The three section reveals start halfway up their frames, finish in 950ms and retain a stationary outer frame. The moving overflow window was inspected mid-animation without the thin edge lines seen with clip-path. Responsibility's top image edge stays aligned to its frame while its scale changes. The closed mobile header has matching client/scroll dimensions. No horizontal overflow or console warnings/errors were observed. Expanded navigation was also checked in a 280px-high viewport during the earlier menu revision.

The corrected hero crop was checked at 390px, 1760px and 2193px widths. Its CSS scale is 1 at the top of the page. Wide-screen photography aligns to the top of the source image. The visible hero remains covered during parallax scrolling and a fast return to the top.

## Six main-menu pages

- Portfolio includes the shared featured-property carousel, category radios, For Sale/To Let switches and batches of five results. Category and availability filters combine. Both switches on include both statuses. Both off include all statuses. A filter change resets the visible batch to five. The 15 entries are demonstration fixtures, not live listings.
- About Us includes five value cards, people, Investment, Development and four manually selected testimonials with keyboard controls. Repeated testimonial text and names are source placeholders awaiting editorial content.
- Responsibility includes its plant introduction and Environmental, Social and Governance sections.
- Working with us includes the four draft job rows from the supplied reference. They are layout fixtures, not current job advertisements.
- Media includes the featured article, three latest-news cards and a publication feature. Only the brochure cover was supplied. Download displays a notice until the actual PDF is provided.
- Contact Us includes working `tel:` and `mailto:` links, the supplied map image with a location marker, and a link to Google Maps. It does not embed a third-party map widget.

Social, job details, the full news listing, Publications and Terms of use are implemented. Privacy Statement was not supplied and retains its availability notice. Main navigation stays usable on every implemented page. Draft Lorem ipsum is retained, while Marvel controls and word-count instructions are excluded.

For static hosting, upload the contents of `McGarrell-Reilly-website.zip`, retaining the directory structure with `index.html` at the root. The archive includes all 38 generated HTML pages and local assets. These represent seven main pages, five editorial detail pages, four draft news articles, fifteen property fixtures, Publications, Latest news, four job fixtures and Terms of use. Repeated fixture pages demonstrate the supplied templates rather than additional real properties or published articles. No deployment has been performed by this delivery.

The six new pages were checked at 320, 390, 768 and 1760px widths for horizontal overflow and active navigation. Desktop navigation, mobile menu transitions, Portfolio filtering and increments of five, testimonial selection and keyboard controls, and the missing-PDF notice were exercised in the browser. HTML checks confirmed one H1 per page, unique IDs, seven existing navigation destinations and valid local asset paths. JavaScript syntax checks passed. Reduced-motion and no-JavaScript fallback logic were inspected in source.

## Inner pages and sitemap

| Parent | Detail destination | Entry point |
| --- | --- | --- |
| About Us | `about-us/our-people/index.html` | Our people feature |
| About Us | `about-us/investment/index.html` | Investment feature |
| About Us | `about-us/development/index.html` | Development feature |
| Responsibility | `responsibility/environmental/index.html` | Environmental feature |
| Media and Home | `media/news/a-new-era-for-dublin-6/index.html` and two other article fixtures | Featured article, news cards, homepage news, Further reading |
| Portfolio and Home | `portfolio/station-road-lusk/index.html` and fourteen other property fixtures | Featured carousel, listing cards, Next property |
| Responsibility | `responsibility/social/index.html` | Social feature |
| Media | `media/publications/index.html` and `media/news/index.html` | Publications library and All news |
| Working with us | `working-with-us/job-1/index.html` through `job-4/index.html` | Four role rows |
| Footer | `terms-of-use/index.html` | Terms of use |
| Our people | `working-with-us/index.html` | Careers / Opportunities |

The active header item on each detail page identifies its parent section. The six main-menu entries stay unchanged. The homepage, header, footer and supplied page features provide access to every implemented route, without adding each detail page to the main menu.

Property details use the reference's Lusk map, size, year and website for Station Road. Remaining properties keep their existing draft names and addresses, with size and year shown as "To be confirmed". Agent names, telephone numbers and licence identifiers are source placeholders. The gallery reuses supplied sample photography in the draft template and has four manual controls, left/right keyboard navigation and a live status message. A failed image decode retains the previous image. Next property cycles through the existing fixture list. The Portfolio View Property link follows the currently selected featured project.

The new article layout includes the supplied quotation style and two related articles. Repeated titles and dates follow the draft. LinkedIn sharing uses the current published URL and clears preview query parameters. In localhost and file previews it displays an availability message, so a local URL is not shared. Clicking the share control on a hosted site opens LinkedIn; it does not publish a post automatically.

Executive contact-card icons preserve the source names and roles. Actual VCF files and property-brochure PDFs were not supplied, so those downloads display a specific availability notice. No contact details or brochures have been fabricated. Text remains live, Lorem ipsum remains draft content, and Marvel controls and word-count annotations are excluded.

The six inner layouts were checked in the browser at 320, 390, 768 and 1760px widths. There was no horizontal document overflow. The shared parent navigation, About Us to Our people, Portfolio to details, Media to article, Next property, related articles, gallery button/keyboard controls and local sharing notice were exercised. Local asset paths, unique IDs, one H1 per page, active parent markers and reachability of all 29 pages from Home were checked in source. JavaScript syntax checks passed.


## Final five views

Publications displays the reference's sixteen repeated cover cards. The Commercial and Residential classifications are demonstration filter data. Actual PDFs were not supplied; downloads display a specific notice.

Latest news initially displays nine cards, matching the reference. Load More reveals the remaining three archive fixtures. The year filter resets the batch. Repeated draft titles and 2023 dates follow the source; the 2022 archive fixture allows the older-year behaviour to be reviewed.

Social uses the original supplied photography. Its first community slide follows the supplied design. The other three manual slides reuse Social assets and draft text as proposed demonstration variants. Dot buttons and left/right keys select stories; there is no autoplay.

All four existing job rows open detail pages. Their copy is draft source content, including the source's SteelWave reference, which needs editorial replacement. Email us composes a message with the role in the subject. The recipient uses the existing Contact email, info@mcgarrellreilly.ie, because the job artwork does not specify an address; confirm the recruitment recipient before production. Telephone links use the supplied number.

Terms of use is transcribed from the supplied screenshot with broken encoding and split words cleaned up. It has not been rewritten as a new legal policy. Privacy Statement still needs supplied content. Source word-count notes and Marvel controls are excluded from all pages.

The final five layouts were checked at 320, 390, 768 and 1760px widths with no horizontal document overflow. Publication type filtering, year filtering, batch loading, archive navigation, community dot/keyboard controls, role destinations and Terms navigation were exercised in the browser. Mail and phone targets were inspected without sending messages or placing calls. Browser console checks returned no warnings or errors. Static checks confirmed 38 reachable HTML pages, one H1 per page, unique IDs, correct current-section markers, matching route manifest and existing local asset paths. JavaScript syntax checks passed. No deployment was performed.
