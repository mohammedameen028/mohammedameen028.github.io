# Mohammed Ameen Ulla — Portfolio

Personal portfolio site hosted at [mohammedameen028.github.io](https://mohammedameen028.github.io)

## Stack

Pure HTML · CSS · JavaScript — no build step required.  
Animation powered by [Anime.js](https://animejs.com/) via CDN.

## Project Structure

```
mohammedameen028.github.io/
├── index.html                  ← Main page (all sections)
├── assets/
│   ├── css/
│   │   └── style.css           ← All styles
│   ├── js/
│   │   └── main.js             ← Animations + interactions
│   └── Mohammed_Ameen_Resume.pdf  ← ⚠️ Add your resume PDF here
└── README.md
```

## Deployment (GitHub Pages)

### Option A — Replace existing repo

```bash
# Clone your current portfolio repo
git clone https://github.com/mohammedameen028/mohammedameen028.github.io
cd mohammedameen028.github.io

# Remove the old Jekyll files
rm -rf _config.yml _layouts _includes Gemfile* *.md

# Copy all files from this project into the repo root
# (copy index.html, assets/ folder, README.md)

# Add your resume PDF
cp /path/to/your/resume.pdf assets/Mohammed_Ameen_Resume.pdf

# Commit and push
git add .
git commit -m "feat: new portfolio — refined minimalist design"
git push origin main
```

GitHub Pages will auto-deploy within ~2 minutes. Visit `https://mohammedameen028.github.io` to confirm.

### Option B — Fresh start

```bash
git init
git remote add origin https://github.com/mohammedameen028/mohammedameen028.github.io.git
git add .
git commit -m "feat: portfolio v2"
git push -u origin main --force
```

### GitHub Pages Settings

In your repo: **Settings → Pages → Source → Deploy from branch → main → / (root)**

No `_config.yml` or Jekyll config needed — GitHub Pages serves static HTML directly.

---

## Adding Your Resume PDF

Place your resume at:
```
assets/Mohammed_Ameen_Resume.pdf
```

The "Resume" nav button and the download link both point to this path.  
If you rename the file, update the `href` in `index.html` (two places: nav and the footer area).

---

## Customising Content

All content is in `index.html`. Search for these markers to update:

| What | Search for |
|---|---|
| Photo / avatar | Add `<img>` tag in `.hero` section if desired |
| LinkedIn URL | `linkedin.com/in/mohammed-ameen-551583bb` |
| GitHub URL | `mohammedameen028` |
| Email | `mohammedameen028@gmail.com` |
| Phone | `+91-7204069441` |
| Projects section | Add a `<!-- PROJECTS -->` section between Experience and Skills |

---

## Adding Real Contact Form Email

The contact form currently opens your mail client (`mailto:`). GitHub Pages is static, so there's no server.  
To receive emails directly in your inbox, use one of these free services:

### Formspree (recommended — free tier, 50 submissions/month)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form, get your form ID (e.g. `xabc1234`)
3. In `assets/js/main.js`, replace the mailto block with:

```javascript
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
if (res.ok) {
  submit.textContent = 'Message Sent ✓';
  note.textContent = 'Thanks! I\'ll be in touch soon.';
} else {
  note.textContent = 'Something went wrong. Please email me directly.';
}
```

### EmailJS (client-side, no backend)

See [emailjs.com/docs](https://www.emailjs.com/docs/) — free tier handles 200 emails/month.

---

## Performance

- No build step, no framework overhead
- Fonts loaded via Google Fonts with `display=swap`
- Anime.js loaded from cdnjs CDN (~17KB gzipped)
- All images use `loading="lazy"` (add to any `<img>` tags you add)
- Respects `prefers-reduced-motion`

Target Lighthouse scores: **Performance 95+ · Accessibility 100 · Best Practices 100 · SEO 100**

---

## Adding a Projects Section

Between `</section>` (after Experience) and `<section id="skills">`, add:

```html
<section id="projects">
  <div class="container section-pad">
    <div class="reveal">
      <span class="sec-label">03.</span>
      <h2 class="sec-title">Projects</h2>
    </div>
    <div class="projects-grid">
      <!-- Add project cards here -->
    </div>
  </div>
</section>
```

Then update the `sec-label` numbers on Skills (04) and Contact (05) accordingly, and add `projects` to the `sections` array in `main.js`.
