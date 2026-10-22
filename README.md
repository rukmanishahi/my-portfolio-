# Rukmani Shahi — Personal Portfolio

A responsive, scrapbook-inspired portfolio built with plain HTML, CSS and JavaScript. GSAP + ScrollTrigger are loaded from CDNs for motion effects.

## Run locally

Open `index.html` in a browser. For the smoothest local development, use VS Code's Live Server extension.

## Replace placeholders

- **Hero portrait:** replace `assets/rukmani-cutout.png` with your preferred transparent PNG. Keep the same filename or update the `<img>` path in `index.html`.
- **Project images:** the four project visuals are CSS mockups marked `PROJECT IMAGE PLACEHOLDER` in `index.html`. To use screenshots, replace the contents of each `.project-image` with an `<img src="assets/your-screenshot.png" alt="Description">`; add the file to `assets/` and use `object-fit: cover` in CSS if needed.
- **Video portfolio:** search `href="#"` in `index.html` for the video portfolio button and replace the `#` with your Google Drive, YouTube, or portfolio URL. The All Booked edited-video link also uses `#` intentionally.
- **Resume:** replace `assets/Rukmani_Shahi_Resume.pdf` to update the downloadable PDF, keeping the filename consistent.
- **Project links:** the CO2 Emission Calculator currently links to `https://yourco2day.neocities.org/`. Replace any project `href` values with your live project/repository URLs.

## Free hosting

### GitHub Pages
1. Create a GitHub repository and upload the contents of this folder (not the ZIP itself).
2. Open **Settings → Pages**.
3. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Wait for deployment; GitHub will show your public site URL in the Pages settings.

### Netlify
1. Sign in at Netlify and choose **Add new site → Deploy manually**.
2. Drag the whole `rukmani-portfolio` folder (or its unzipped contents) into the deploy area.
3. Netlify will publish the site and provide a public URL. You can rename the site from its site settings.

## Notes
- Google Fonts and GSAP load from CDNs, so those features need an internet connection.
- `prefers-reduced-motion` is respected; the animations are disabled for users who request reduced motion.
- All resume content has been included, including the Smart Warehouse Autonomous Robot project and all experience bullets.
