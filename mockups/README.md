# Homepage design studies

Three local, English-language concepts for replacing the marketing homepage. The intended audience comes from `ioths/docs/product/vision.md`: people with an existing Obsidian library who want focused mobile capture and portable Markdown files.

Start a static server **from the public-site repository root**, because all links and assets are root-relative:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/mockups/` for the comparison gallery.

| Concept | Page | Design emphasis |
| --- | --- | --- |
| Research journal | `/mockups/01-research-journal.html` | Plato's Cave plain-readable typography and palette, marginalia, an annotated diagram, and an interactive note specimen |
| Systems atlas | `/mockups/02-systems-atlas.html` | Deep blue, sans typography, system boundaries, constraints, and a real Kanban screenshot |
| Field notes | `/mockups/03-field-notes.html` | Botanical green, literary typography, everyday scenarios, and real app imagery |

The shared mockup stylesheet imports the existing `style.css` in a lower-priority cascade layer, reusing local fonts and keeping production styles unchanged. Everything runs locally without third-party font, analytics, or script requests. The journal's three example stages all remain readable without JavaScript; JavaScript progressively adds stage switching. The atlas disclosures use native HTML.

The journal copy has also been revised against Plato's Cave's modules, articles, and notes. Reading scope and editorial decisions are recorded in [voice-notes.md](/mockups/voice-notes.md).

## Research journal: plain-readable adaptation

The journal now loads the existing `/assets/platoscave/plain-readable.css`, which was verified byte-for-byte against `/Users/robertandersson/dev/platoscave/css/themes/plain-readable.css`. `platoscave-tokens.css` is an unchanged snapshot of that project's `css/tokens.css`, kept inside the mockup directory so the production site is unaffected. Fonts are already vendored locally.

`journal-plain-readable.css` adapts the journal composition using these tokens. Its role mapping follows the source `css/base.css`, `css/layout.css`, `css/components/hero-cv.css`, `css/components/controls.css`, `css/components/footer.css`, and `css/pages/link-language.css`:

- Bebas Neue for the wordmark and major headings; Source Serif 4 for prose and smaller editorial headings; Space Mono for labels, navigation, captions, and controls.
- White paper, neutral raised surfaces, black ink, gray rules, rust editorial emphasis, and sage for the diagram's active-work state and keyboard focus.
- Source typography sizes, monochrome segmented selection, underlined text links, square figure frames, and responsive reading columns.
- The marginal notes, observation sequence, interactive specimen, and problem-and-solution copy retain the journal's structure.

To refresh source tokens, copy `platoscave/css/tokens.css` to `mockups/platoscave-tokens.css`. Do not edit the snapshot independently. The other two concepts retain their separate visual directions.

The journal uses the existing `/icon-why-240.png` app artwork in its masthead and closing product note. Both the hero's download badge and the closing download text link point to `https://apps.apple.com/app/id6787224776` without fixing the visitor's storefront country.

Figure 02 adapts the production homepage's Game of Life into a journal experiment: the same R-pentomino seed, 60 × 48 wrapping grid, synchronous rules, and 140ms generation interval. `journal-life.js` reads the plain-readable canvas palette from CSS tokens. Start/Pause, Step, and Reset controls begin paused, including for reduced-motion visitors. Leaving the tab pauses playback; returning does not automatically restart it. The generation and living-cell count are readable as text, with live announcements disabled during playback. A fallback explanation remains if JavaScript or canvas is unavailable.

The figure's visible introduction explains its purpose: emergence from simple local interactions, the connection to the app icon, and the analogy to an observation acquiring a checklist and a board view. The distinction between design inspiration and a scientific model is visible without expanding the rules.

`assets/download-on-the-app-store.svg` is Apple's unmodified English black badge, downloaded from [Apple's official artwork](https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg). It is served locally, shown once per page at 48px high with 12px clear space, and follows the [App Store marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/). Trademark credit appears in the mockup footer.

These pages carry `noindex, nofollow` and are intentionally outside the production build allowlist. They do not modify the live homepage, localization catalogs, legal pages, sitemap, or deployment. Optional storage examples are deliberately non-exhaustive and avoid introducing new provider claims. There are no new scientific-efficacy claims.

When one direction is selected, production implementation should reconcile final copy with current release capabilities, regenerate localization source catalogs, retain canonical/structured metadata and locale behavior, and pass the repository verification gate before publication.
