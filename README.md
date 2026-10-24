# PHENY — Wasswa Stephen

> **Creative Technologist · Software Engineering Student · Digital Production**  
> *Where visual thinking meets purposeful technology.*  
> Kampala, Uganda

[![Vercel Deployment](https://img.shields.io/badge/Hosted_on-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Clean URLs](https://img.shields.io/badge/Routing-Clean_URLs-blue?style=flat)](vercel.json)
[![Security Headers](https://img.shields.io/badge/Security-A%2B_Headers-emerald?style=flat)](vercel.json)
[![Responsive](https://img.shields.io/badge/Responsive-360px_to_4K-cyan?style=flat)](index.html)

---

## 🧭 About the Project

This repository hosts the official personal portfolio website for **Wasswa Stephen** under his professional brand identity **PHENY**.

The portfolio presents verified capabilities across **software engineering**, **web design and development**, **UI/UX architecture**, **graphic design**, and **digital media production**. Built with an intentional digital craft approach, it combines high-performance static rendering, clean typography, refined motion aesthetics, and serverless form ingestion without heavy frameworks.

---

## 🏛️ Architecture & Page Structure

The portfolio follows a multi-page static architecture configured with Vercel Clean URLs (`cleanUrls: true`), allowing seamless extensionless URLs (`/about`, `/services`, `/work`, `/contact`, `/start-project`).

```
Wasswa-Phen/
├── index.html            # Home: Hero stage, previews of About, Services, Work & CTA
├── about.html            # About PHENY: Biography, competencies & Design Philosophy
├── services.html         # Services: Full 9-discipline creative & technical services grid
├── work.html             # Selected Work: Live client showcase (T&T Junior School) & Testimonials
├── contact.html          # Contact: Direct communication channels & general inquiry form
├── start-project.html    # Project Brief: Scoped project intake form with budget & timeline
├── site.js               # Centralized client application logic (icons, menu, forms, animations)
├── vercel.json           # Vercel configuration: Clean URLs & hardened security headers
├── site.webmanifest      # Progressive web app manifest & mobile configuration
├── wasswa-stephen.png    # High-resolution architectural portrait
├── tandtSchoolLogo.png   # Client asset: T&T Junior School crest
└── _reference/           # Immutable snapshot of the approved single-page baseline
    └── index.html
```

---

## 🎨 Visual Design System

The visual identity uses a tailored palette engineered for depth, readability, and modern high-contrast aesthetic:

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Deep Space** | `#060c19` | Primary page background & shell |
| **Deep Navy** | `#07142f` | Header, cards, footer & dark containers |
| **Soft Navy** | `#0b1d44` | Selected work showcase background |
| **Electric Blue** | `#1649d8` | Primary brand accent, primary CTA buttons |
| **Vibrant Cyan** | `#2de5ff` | Interactive highlights, glow effects, active indicators |
| **Mist White** | `#edf3ff` / `#f7f9ff` | High-contrast content backgrounds & light grids |

### Typography
- **Headings & Display**: [Outfit](https://fonts.google.com/specimen/Outfit) (`font-weight: 700 / 800 / 900`, tight letter-spacing)
- **Body & Interface**: [Inter](https://fonts.google.com/specimen/Inter) (`font-weight: 400 / 500 / 600`, clean legibility)

---

## 🛡️ Security & Performance Engineering

### 1. HTTP Security Headers ([vercel.json](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/vercel.json))
All routes are protected by modern HTTP security headers:
- `X-Content-Type-Options: nosniff` — Prevents MIME-type sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin` — Protects referrer privacy.
- `X-Frame-Options: DENY` — Hardens against clickjacking attacks.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — Enforces HTTPS.

### 2. Form Integrity & Anti-Abuse ([site.js](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/site.js))
- **Honeypot Protection**: An invisible, off-screen input (`name="botcheck"`, `tabindex="-1"`) traps automated spam scrapers without prompting CAPTCHAs to real users.
- **Input Length Caps**: Enforced in markup and validated in JavaScript (Name: 100 chars, Email: 254 chars, Message/Details: 2000 chars).
- **Client-Side Cooldown**: Implements a 30-second localStorage throttle to prevent accidental double-clicks or repeated rapid submissions.
- **Safe Text Output**: Uses `textContent` (never `innerHTML`) for status messaging to prevent DOM-based XSS vulnerabilities.
- **No-CORS Ingestion**: Direct asynchronous payload dispatch to Google Apps Script endpoint with error fallbacks.

### 3. Motion & UX Accessibility
- **CSS `translate` & `opacity` Animations**: Uses CSS `translate` rather than `transform` for `IntersectionObserver` scroll-in reveals, preserving hardware-accelerated `:hover` lift effects (`transform: translateY(-5px)`) without jitter.
- **`prefers-reduced-motion` Support**: Fully respects OS-level motion reduction preferences. Content remains 100% visible and accessible if JavaScript is disabled.
- **Accessible Mobile Drawer**: Built with proper ARIA attributes (`aria-expanded`, `aria-controls`, `role="dialog"`, `aria-modal="true"`), closes on link tap or `Escape` key press, and releases body scroll lock on browser Back navigation (`pageshow` event).

---

## 📄 Page Breakdown

### 1. [Home (`index.html`)](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/index.html)
- Architectural hero stage featuring Wasswa Stephen's portrait.
- Floating status pill: *"Available for Projects — Design & Development"*.
- Interactive typewriter headline animation.
- Curated teaser previews for About, Services, and Selected Work with direct page routing.
- High-visibility *"Start a Project"* Call to Action banner.

### 2. [About (`about.html`)](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/about.html)
- Overview of academic background in Software Engineering at Victoria University Kampala.
- Multi-disciplinary capability matrix (Graphic Design, Web Design, UI/UX, Software Engineering).
- Cobalt-tinted Design Philosophy section: *"Clean design. Clear communication. Purposeful technology."*

### 3. [Services (`services.html`)](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/services.html)
Nine core creative and technical services:
1. Graphic Design
2. Brand & Visual Identity
3. Posters & Flyers
4. Social Media Graphics
5. Web Design
6. UI/UX Design
7. Website & Landing Page Design
8. Digital Content Design
9. Presentation Design

### 4. [Work (`work.html`)](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/work.html)
- **Live Client Showcase**: T&T Junior School website ([tandtjuniorschool.com](https://tandtjuniorschool.com)).
- Client feedback section prepared for incoming project testimonials.

### 5. [Contact (`contact.html`)](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/contact.html)
- Direct contact links: WhatsApp (`+256 701 951404`), MTN Phone (`+256 763 260974`), Email (`wasswastephen24@gmail.com`).
- Social profiles: LinkedIn, GitHub, Instagram, Facebook.
- Fast inquiry form submitting directly to Google Sheets / Apps Script.

### 6. [Start a Project (`start-project.html`)](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/start-project.html)
- Dedicated project intake brief capturing:
  - Client Name & Email
  - WhatsApp / Phone Number
  - Service Discipline Needed
  - Budget Tier (in UGX)
  - Target Project Timeline
  - Scope & Project Details
- Sends JSON payload with `type: "project"` for organized client workflow management.

---

## 🛠️ Technology Stack

- **Markup & Structure**: Semantic HTML5 with complete OpenGraph & Twitter metadata.
- **Styling**: Tailored Vanilla CSS design system + Tailwind CSS Play CDN (3.4.17).
- **Icons**: [Lucide Icons](https://lucide.dev/) (v0.577.0) & [Font Awesome](https://fontawesome.com/) (v6.5.1).
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Outfit & Inter).
- **Scripting**: Pure Vanilla JavaScript ([site.js](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/site.js), zero framework dependencies).
- **Backend Automation**: Google Apps Script Web App delivering form submissions to Google Sheets with instant email alerts.
- **Hosting & Infrastructure**: [Vercel](https://vercel.com) with custom domain DNS managed through Namecheap.

---

## 💻 Local Development

To run and preview the project locally:

```bash
# Clone the repository
git clone https://github.com/Wasswa-Phen/Wasswa-Phen.git

# Navigate to the folder
cd Wasswa-Phen

# Run with any local static server (e.g. npx serve)
npx serve .
```

Visit `http://localhost:3000` in your browser. All pages, forms, and mobile drawer transitions will function as in production.

---

## 🚀 Deployment to Vercel

1. Commit and push any changes to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio documentation and structure"
   git push origin main
   ```
2. Vercel automatically detects the push and deploys the updated static build.
3. Clean URLs are automatically handled via [vercel.json](file:///g:/Wasswa%20Stephen/Victoria%20University/Real%20Life%20Java%202026/Wasswa-Phen/vercel.json).

---

## 📬 Contact & Connect

- **WhatsApp**: [+256 701 951 404](https://wa.me/256701951404)
- **Call (MTN)**: [+256 763 260 974](tel:+256763260974)
- **Email**: [wasswastephen24@gmail.com](mailto:wasswastephen24@gmail.com)
- **LinkedIn**: [linkedin.com/in/stephen-wasswa](https://linkedin.com/in/stephen-wasswa)
- **GitHub**: [github.com/Wasswa-Phen](https://github.com/Wasswa-Phen)
- **Instagram**: [@wasswa_phen](https://instagram.com/wasswa_phen)

---

*© 2026 PHENY — Wasswa Stephen. All rights reserved.*
