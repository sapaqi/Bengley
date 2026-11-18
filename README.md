# McGarrell Reilly homepage

Responsive HTML handover for Page 1 of the McGarrell Reilly website. Content is in English, following the supplied artwork. The source Illustrator homepage and UI kit define the visual reference.

## Preview

With Node.js installed, run `node server.mjs` in this directory and open <http://127.0.0.1:4173>. There are no package dependencies to install. Stop the server with Ctrl+C. The page can also be opened directly through `index.html`. An npm installation can use the equivalent `npm run dev` script.

## Files and components

- `index.html` contains live text and semantic sections, each identified by `data-section`.
- `styles.css` contains the brand variables, layout, shared text-image variants, responsive rules and focus states.
- `app.js` contains the demonstration data and progressive enhancements.
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

Future-page URLs are retained in the markup and fixtures. A normal click displays an availability message because this delivery contains the homepage. Remove `setupDemoLinks()` and the `demo-notice` element when the WordPress routes exist. Modified clicks follow the literal target URL. Verify all final slugs during integration.

## Responsive and interaction decisions

- Desktop starts at 1200px. Tablet is 768–1199px. Mobile is below 768px.
- Mobile layouts are proposed from the supplied desktop artwork. Sections stack, navigation expands using a Menu button, and image focal points are preserved as far as possible.
- The navigation uses a translucent background and an 18px backdrop blur. Above 80px scroll it shrinks to a 60px bar and replaces the full logo with the supplied symbol. It resets when scrolling back above that threshold.
- Hero arrows and project dots are manual controls. Arrow keys work while focus is within their carousel. Image decoding happens before switching, and failed loads preserve the current image.
- The first hero uses `McGR-Home-banner.jpg`. Two additional slides use other supplied property images as agreed demonstration material. Their final image selection requires client approval.
- Hero photography is visible immediately and retains scroll parallax. The other three photo sections reveal from halfway up the image to the top over 950ms, with a 1.5-second zoom-out. The frame stays fixed. A sliding overflow window and a counter-moving inner image layer create the reveal with 2px overscan, avoiding clip-path edge artifacts. Each reveal runs once per page load.
- Parallax moves hero photography at 30% of scroll distance, capped at 19% of frame height. Section photography moves at 38% of scroll distance around the viewport centre, capped at 16% of frame height in each direction. Image overscan keeps the frames filled throughout the stronger movement. Updates ease through requestAnimationFrame and stop when settled. Reduced-motion preferences disable reveal and parallax, including changes to the preference while the page is open.
- Responsibility uses `data-parallax-anchor="top"`. Its image scales around the top edge as the page scrolls, without vertical translation, so the people's heads remain in the frame. Its reveal zoom also uses the top anchor.
- The closed mobile header has no scrolling container. Its logo is clipped to the current brand frame, while the expanded menu can scroll when the viewport is too short to show all navigation links.
- The source's yellow section numbers, heading-level annotations and word-count instructions have been omitted. Lorem ipsum remains as draft body copy.

## Design observations for review

The source combines a `Residential` display label with the requested `New homes` property taxonomy. Both are represented separately in the fixtures for developer review.

The small cyan category text against white has low contrast in the source artwork. Its source colour is preserved for design review. The responsibility green (`#2b6545`) and pale blue (`#d9f3fd`) surfaces are sampled from the rendered Illustrator artwork and should be confirmed against brand tokens if exact source values are provided.

The LinkedIn URL is a proposed destination and needs confirmation. It is set in the footer markup. No phone link appears in the homepage artwork.

## Verification

Run `node --check app.js` and `node --check server.mjs` for JavaScript syntax checks. An npm installation can use `npm run check`. Browser verification should cover 1760, 1440, 1024, 768, 390 and 320px widths, keyboard navigation, menu dismissal, both sliders, header reset, reduced motion, image loading and JavaScript-disabled baseline content.

The demo was checked in the in-app browser at those six viewport widths. No horizontal page overflow was found. Both sliders, three-row news selection, mobile menu expansion, Escape dismissal and the compact header were verified. JavaScript syntax and referenced local assets were also checked. Reduced-motion handling and the JavaScript-disabled baseline were checked in source rather than through browser emulation.

The current motion revision was checked at 390px mobile and 1280px desktop widths. Hero is visible immediately. The three section reveals start halfway up their frames, finish in 950ms and retain a stationary outer frame. The moving overflow window was inspected mid-animation without the thin edge lines seen with clip-path. Responsibility's top image edge stays aligned to its frame while its scale changes. The closed mobile header has matching client/scroll dimensions. No horizontal overflow or console warnings/errors were observed. Expanded navigation was also checked in a 280px-high viewport during the earlier menu revision.
