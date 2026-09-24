# Winco public website

The public website was redesigned on the `website-redesign` branch. The staff app is separate. These scripts never build, copy or change `/app`.

## Editing and previewing

- `scripts/build-site.mjs`: page content and shared header/footer. Run `npm run build` after changing it. Generated HTML is committed so Netlify's existing static hosting needs no new build setup.
- `assets/css/style.css`: responsive styling.
- `assets/js/main.js`: mobile navigation, filters, photo dialog and email preparation.
- `assets/data/catalog.json`: fabric catalogue and local photo filenames.
- `npm run preview`: local-only preview at http://127.0.0.1:5500. It deliberately serves only public marketing files; the staff app is outside this preview.
- `npm run check`: checks public links, images, anchors and page metadata.

## Enquiries

The form prepares a message addressed to `wincocanada@gmail.com` and opens the visitor's email app. The visitor must press Send there. It does not claim that an enquiry has been delivered and does not depend on unconfigured Netlify Forms or Supabase. Phone and direct email links are also provided. Automatic web-form delivery can be added once the desired delivery service is configured.

## Sources and images

Company contact details and hours were checked against the original Winco website on 2026-09-24:

- https://www.wincoblinds.com/pages/contact-window-shades-blinds-showroom-edmonton
- https://www.wincoblinds.com/pages/products
- https://www.wincoblinds.com/pages/products/dual-shades
- https://www.wincoblinds.com/pages/products/roller-shades
- https://www.wincoblinds.com/

Product swatch images and gallery photos are from the user's existing official website. Product swatches follow that site's displayed catalogue order. Gallery filenames correspond to source IDs 2812557, 2812552, 2812551, 2812550, 2830852 and 2830851. `original-hero.jpg` is source ID 2819794. The logo was copied from the local Winco app's existing logo asset without changing the app.

`room-inspiration.webp` is AI-generated design imagery, visibly labelled “Design illustration”; it is not presented as a completed Winco installation. The original generated PNG remains in the Codex generated-images folder. No fabricated testimonials, review scores, installation counts, fixed lead times or warranty promises were added.

## Scope and deployment

The existing `_redirects` and app assets are preserved. The website repo already contained uncommitted app changes from earlier setup; keep them separate from a website-only publish. The original public website files and an app hash manifest were backed up at `../website-backups/before-redesign-20260924-150540` before this redesign. Production deployment uses a website-only commit pushed to the existing GitHub main branch, which Netlify publishes automatically. The app changes already present locally are excluded from that commit.

## Verification completed

- All 13 public HTML pages return HTTP 200 in the local preview.
- 376 local links and assets, fragment targets, page headings and metadata checked.
- All 13 pages checked at a 390px mobile viewport: no horizontal overflow or broken loaded images.
- Home layout visually checked on mobile, tablet and desktop; desktop gallery photos checked after scrolling into view.
- Mobile menu open/Escape close, fabric filtering, product selection carried into the enquiry form, gallery filtering, photo dialog open/Escape close, and required form fields checked in the browser.
- Homepage browser error/warning log was empty during the final check.
- All 15 files under `/app` have the same SHA-256 hashes as the pre-redesign manifest. `_redirects` is unchanged.
- Enquiry email delivery itself was not sent/tested against an external mailbox.
