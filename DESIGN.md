# You're Flocked website design

## 1. Direction and references
The user committed only to a serif and light page, explicitly inviting creative freedom beyond Butterkit. Inspected App Store intro and routing exports, raw camera map/notification/route screenshots, the app icon and wide Butterkit background. Retain Fraunces; the accent is the teal from tiles.flckd.app so app, site and tile server read as one family, expand into a generous editorial layout with a faint map texture and real phone screenshots. Avoid hacker aesthetics. Privacy is a product benefit, not a restriction on the site's choice of dependencies; use ordinary Astro and Cloudflare Pages tooling.

## 2. Color and material
One hue, four jobs, taken from the product itself: the tile server's #2dd4bf and the app's route teal #00b3a6 and slate #22303d. Paper #f3f3ef, ink #242628, muted #5c605e. Accent #0f766e is the only saturated action colour on the light page (primary button fill under paper text, links, nav state, focus rings, small icons; 4.9:1 on paper), deepening to #115e59 on hover. Accent-mid #0d9488 carries the one emphasised word in each display heading (large text only, 3.4:1) and the brand dot. Accent-bright #2dd4bf appears only on the slate #22303d dark band, where it reads at 7:1, so the site's dark section and the tile server share a look. Mint #dcefe9 replaces gray for section washes (feature fields, hero orbit, closing field); pale #e8e9e3 stays for utilitarian surfaces (notices, code, press contact); line #d4d5ce. No red: camera markers stay red inside the screenshots, the site does not borrow it. Fine contour lines on hero and closing field. Genuine screenshots inside rounded black device frames with offset soft shadows (ink at 15%, 12px/24px/48px). Other content stays unboxed.
## 3. Typography
Self-hosted variable Fraunces weight 700–800 for wordmark and display, with optical sizing. Public Sans 400–700 for readable explanatory text. Source Code Pro 500/600 for factual labels and code. Hero 52–88px, page title 48–72px, section 36–52px, subsection 24–30px, body 16–19px, supporting 13–14px. Headings tracking -0.04em minimum, balanced wrapping. Body width max 65ch.

## 4. Layout and spacing
Content max 1200px, gutter 24px mobile / 48px desktop. Spacing 4, 8, 12, 16, 24, 32, 48, 64, 80, 112px. Desktop hero asymmetric text/device split; mobile text then device. Alternating expansive feature sections, compact factual strips and dark privacy section. Breakpoints 640, 900px. No horizontal page overflow.

## 5. Primitives
Shared SiteLayout with navigation/footer, current-page link state and skip link. Button links: bright-teal solid primary with ink text, transparent bordered secondary, inline text with arrow. States: visible hover shade/underline, 3px focus outline, 44px touch area. Icon component uses a consistent 24px stroked SVG family. Phone frame wraps an unaltered app screenshot. Details/summary supplies accessible FAQ disclosure. CopyCode supports copy success/error with live status; code stays selectable without JS. Press downloads are native anchors. No fake forms or inactive buttons.

## 6. Interaction
Native navigation and disclosures; optional copy uses clipboard and gives visible feedback. Feature screenshots are static proof rather than a made-up live map. Short 160ms color/transform transitions on controls only; no ornamental motion. Reduced-motion disables transforms and smooth scrolling.

## 7. Accessibility and performance
Semantic landmarks, one h1 per page, h2/h3 hierarchy, descriptive alt text, explicit image dimensions, keyboard focus, readable contrast and native controls. Images resized to WebP for the site with 400w and 660w variants chosen by srcset; press receives originals. Hero contour art is inline SVG so it never becomes the largest paint. All CSS is inlined at build time (Astro inlineStylesheets: always) so nothing render-blocks. Fonts served locally with swap. Hero contours are inline SVG so they never become the LCP element; screenshots ship 400w and 660w WebP variants with srcset; all CSS is inlined at build time so nothing render-blocks. No hydration framework, trackers or remote scripts. Route SEO titles/descriptions and Open Graph metadata. Canonical origin configurable with SITE_URL.

## 8. Content constraints and handoff
Audience includes nontechnical readers, privacy-conscious users and journalists. Keep hosting jargon on its own page. No store badge until a verified link exists. No invented press contact; use public project issues. Hosting instructions are not a claim that a new service has been deployed. Source files and launch settings are documented in README.md. Review responsive screenshots and interaction evidence before delivery.
