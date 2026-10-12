# You're Flocked

You're Flocked is an iOS 17+ camera-awareness app; FLCKD is only the short name shown under the icon on the phone, so the site leads with the full name and introduces the shorthand once. This site introduces it to everyday visitors, explains independent tile hosting, and gives journalists factual copy and downloadable assets.

## Source of truth
- App: `../flckd-app/README.md`, `PRIVACY.md`, and implemented Swift services. Repository: https://github.com/flckdapp/flckd.
- Hosting: `../flckd-app/server/README.md`. Static routing packs, not a route-calculation API. Default endpoint https://tiles.flckd.app.
- Visual authority: supplied `flckd.butterkit` and six App Store exports. Fraunces, Source Code Pro, pale gray cartographic fields, charcoal, real app screenshots.

## Claims and voice
Plain, direct sentences. First person for project decisions; no invented personal story, testimonials, usage numbers, press coverage, or launch dates. Explain ALPR on first use. Routing and proximity calculations are local; Apple map imagery, DeFlock and Overpass requests are not. Camera coverage is incomplete and routes cannot guarantee avoiding surveillance.

Android is planned. Direct OpenStreetMap submission is not implemented despite an older README bullet. Do not advertise it. No verified store or TestFlight URL or public press email was supplied. Link to the actual iOS build instructions and public GitHub issues instead; a configurable store URL can replace that CTA when available.

## Visitor outcomes
- App visitor: understand cameras, local alerts and routing, then find the iOS source/download destination.
- Self-hoster: understand what is hosted, download working Compose configuration, keep the unauthenticated builder private, connect the app.
- Journalist: copy a concise description, download original icon/screenshots and read privacy caveats without needing an account.

## Technical direction
Bun + Astro with Vite dev reload, ordinary dependencies and standard Cloudflare Pages static hosting. No privacy-specific technology constraints for the marketing website; prefer existing tools to custom infrastructure. This implementation needs no analytics, cookies, or CMS. Deploy independently of the existing tile server. Do not replace the live tile service or put its builder behind the public landing page.
