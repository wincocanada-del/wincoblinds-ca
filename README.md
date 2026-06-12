# Winco Blinds Website Starter

New website starter folder for `wincoblinds.ca`.

## Structure

- `index.html` - Home page
- `about.html` - About page
- `services.html` - Services page
- `products.html` - Products page
- `dual-shades.html` - Dual Shades page
- `roller-shades.html` - Roller Shades page
- `motorized-blinds.html` - Motorized Blinds page
- `guides.html` - Guides page
- `gallery.html` - Gallery page
- `faq.html` - FAQ page
- `reviews.html` - Reviews page
- `blog.html` - Blog page
- `contact.html` - Contact page
- `app/index.html` - Temporary placeholder for future Winco app build output
- `_redirects` - Netlify route fallback for `/app/*`
- `assets/css/style.css` - Main styling
- `assets/js/main.js` - Navigation and small interaction script
- `assets/js/products-data.js` - Product catalog data
- `assets/images/` - Image folders

## Recommended workflow

1. Open this folder in VS Code.
2. Run with Live Server.
3. Edit page by page with Codex.
4. Commit to GitHub repo named `wincoblinds-ca`.
5. Deploy with GitHub Pages, Netlify, or Vercel.

## App deployment workflow

- Website repo: `wincoblinds-ca`
- App source project is separate from this website repo.
- App build output should be generated into: `wincoblinds-ca/app`
- The app project should use base path: `/app/`
- After building the app, commit and push the updated `/app` build output from this website repo.
- Netlify will deploy the updated website and app together from the website repo.

## SEO / deployment notes

- Main domain: `https://wincoblinds.ca`
- App path: `https://wincoblinds.ca/app`
- `sitemap.xml` and `robots.txt` are included for basic SEO.
- `/app` is excluded from sitemap because it is an internal web app path.

## Image asset guide

Recommended image structure:

- `assets/images/logo/`
- `assets/images/home/`
- `assets/images/products/`
- `assets/images/gallery/`
- `assets/images/guides/`
- `assets/images/blog/`
- `assets/images/showroom/`

Recommended image naming examples:

- `winco-logo.svg`
- `home-hero-blinds.jpg`
- `dual-shades-living-room.jpg`
- `roller-shades-office.jpg`
- `motorized-blinds-bedroom.jpg`
- `gallery-commercial-office-01.jpg`
- `showroom-edmonton.jpg`

## Contact information note

- Official phone number and email should be confirmed before launch.
- Contact form is currently static unless connected later.
- Address and service area are based on the existing Winco website.

## Vite app config example

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/app/",
  build: {
    outDir: "../wincoblinds-ca/app",
    emptyOutDir: true
  }
});
```

## Example workflow

1. Edit the app in the separate app project folder.
2. Run `npm run build` in the app project.
3. Confirm the build output was generated into `wincoblinds-ca/app`.
4. Open the `wincoblinds-ca` website repo.
5. Run:

   ```bash
   git add .
   git commit -m "Update app build"
   git push
   ```

6. Netlify will deploy the updated website and app.

## Codex instruction example

Do not rebuild the whole website. Only update the requested files. Keep the current folder structure. Preserve the modern minimal premium style for Winco Blinds.
