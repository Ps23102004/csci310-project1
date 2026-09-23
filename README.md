# Skyline Religion — CSCI 310 Project 1

**Live site (GitHub Pages):** https://ps23102004.github.io/csci310-project1/

This repository contains a personal homepage (`index.html`), the six-block **My Project** overview page (`projects.html`), and a separate interactive fashion demonstration (`skyline-religion.html`, linked from Block 1). Open the homepage through a static HTTP server, such as `python3 -m http.server 8000`, and visit `http://localhost:8000/`. The HTML, CSS, JavaScript, and `assets/` files are sufficient for the classroom demonstration and GitHub Pages. The optional Node backend is not available on GitHub Pages; to test it locally, run `npm test`.

**Important:** The shopping bag, checkout preview, promo codes, stock counts, newsletter form, brand copy, and receipt are demonstration features. No payment is collected, order is placed, delivery is scheduled, or email is submitted. The optional stylist may fall back to local heuristic advice and must not be described as live model inference unless its response confirms that engine. The GitHub Pages deployment was checked in a real browser on 2026-09-23 (see the notebook).

For the course walkthrough, use `CSCI310_DEMO_GUIDE.md` and `Development_Notebook_2026F.md`. Presentation slides are submitted alongside this folder as `CSCI310_Project1_Slides_Parth_Singh.pdf`. The notebook does not contain the full original AI conversation transcript; add authentic prompt/response exports when the course documentation site is available.

---

## Historical expansion plan (not a current-feature checklist)

The following plan predates the course packaging. Some aspirational items below, including live Apple Pay, biometrics, local MiniCPM, guaranteed inventory, and 10-endpoint test counts, do not describe the present implementation. Treat them as historical proposals rather than demonstrated capabilities.

# Master Plan: Skyline Religion — Flagship Expansion & Multi-Page Luxury Experience

## Context
Based on user feedback, this plan details the complete expansion of **Skyline Religion** ("Layback Luxury Clothing") into a multi-page luxury fashion platform:
1. **Dedicated Pages**: Every category and core brand pillar will have its own dedicated page (`sweatshirts.html`, `gym.html`, `streetwear.html`, `loungewear.html`, `product.html`, `about.html`, `care.html`) instead of relying solely on an all-in-one view.
2. **Tailored Atmospheric Background Art**: Each category page features custom visual art (e.g. inspiring kinetic grid for gymwear, cozy and bright metropolitan golden-hour skyline for streetwear, monolithic stone drape for sweatshirts, relaxed ambient warmth for loungewear).
3. **Dark Theme Overhaul ("Nocturnal Obsidian Pro")**: Enhanced depth, OLED blacks, multi-stop specular gold/silver edge highlights, and Apple VisionOS glass saturation.
4. **Rich Product Imagery**: Bespoke high-resolution fashion plates for all 12 garments with front, back, and detail angles, plus a standalone image generation script (`backend/generate-images.js`).
5. **Local MiniCPM 5 2B AI Stylist & Suggestion Engine**: Integration with local `minicpm5:2b` via Ollama (`POST /api/stylist`) with an offline expert wardrobe heuristic fallback, accessible via a floating AI Concierge drawer on every page.
6. **Customer Care & About Brand Sections**: Comprehensive care guides, sizing matrices, mill heritage (Portugal & Okayama), and live bespoke concierge inquiry form.

---

## 1. Multi-Page Architecture

```
skyline-religion/
├── index.html                   # Personal homepage (bio) with link to My Project
├── projects.html                # "My Project" six-block overview (Figures 1 & 2)
├── skyline-religion.html        # Main Digital Flagship Home / Hero / Lookbook
├── sweatshirts.html             # Dedicated: Heavyweight Hoodies & Crewnecks (Monolithic Stone Art)
├── gym.html                     # Dedicated: Gym & Athletic Performance (Inspiring Kinetic Art)
├── streetwear.html              # Dedicated: Baggy Denim & Cargo Streetwear (Cozy/Bright Skyline Art)
├── loungewear.html              # Dedicated: Bottoms, Nickers & Essentials (Ambient Cloud Art)
├── product.html                 # Dedicated Dynamic Product Page (?id=sr-01) with Full Gallery
├── about.html                   # Dedicated Brand Story, Craftsmanship, & Mill Heritage
├── care.html                    # Dedicated Customer Care, Sizing Matrix, & Inquiries
├── css/
│   ├── apple-tokens.css         # Overhauled Dark/Light Luxury Tokens & Glass Shaders
│   ├── style.css                # CSCI 310 Layout Specifications
│   ├── skyline.css              # Universal Brand Styles, Modals, Drawer, Nav
│   └── category-art.css         # Category-Specific Atmospheric Background Art Styles
├── js/
│   ├── refraction.js            # HTML5 Canvas Light Refraction Shader
│   ├── theme.js                 # System-Adaptive Dual-Theme Manager
│   ├── motion.js                # Apple Spring Physics & 3D Interactive Tilt
│   ├── catalog.js               # Products Dataset & Shared Rendering Logic
│   ├── cart.js                  # Slide-Over Cart Drawer & Apple Pay Checkout
│   ├── product-art.js           # High-Fidelity SVG/Canvas Product Fashion Plates
│   └── stylist.js               # Local MiniCPM 5 2B AI Stylist & Suggestion Widget
├── backend/
│   ├── server.js                # Extended Node.js REST API (/api/stylist, /api/care, etc.)
│   ├── products.json            # 12 Detailed Garments Dataset
│   ├── test-api.js              # Automated 10-Endpoint Test Suite
│   └── generate-images.js       # GPT Image / DALL-E / Nano Banana Image Generator
└── assets/
    ├── logo.png                 # Skyline Religion Brand Logo Monogram
    └── products/                # Dedicated Garment Fashion Plate Assets
```

---

## 2. Atmospheric Background Art per Category

1. **Sweatshirts & Hoodies (`sweatshirts.html`)**:
   - **Art Theme**: *Monolithic Stone & Architectural Drape*.
   - Deep charcoal brutalist architectural forms with subtle marble and heavy French Terry woven loopback textures.
2. **Gym & Performance (`gym.html`)**:
   - **Art Theme**: *Inspiring & Kinetic Athletic Drive*.
   - Sleek obsidian background with laser-guided geometric speed vectors, subtle glowing cobalt pulses, and clean ergonomic line work.
3. **Streetwear & Denim (`streetwear.html`)**:
   - **Art Theme**: *Cozy & Bright Metropolitan Skyline*.
   - Warm golden-hour city dusk gradient, ambient rooftop silhouettes, and raw Okayama pink-line selvedge denim edge motifs.
4. **Loungewear & Bottoms (`loungewear.html`)**:
   - **Art Theme**: *Ambient Cloud & Unhurried Serenity*.
   - Soft organic alabaster/smoke wave gradients evoking pure comfort and relaxed drape.

---

## 3. Dark Theme Overhaul ("Nocturnal Obsidian Pro")

- `--bg-base`: Deepest `#050608` with multi-layered ambient mesh gradients.
- `--bg-glass`: `rgba(13, 15, 22, 0.75)` with `backdrop-filter: blur(28px) saturate(200%)`.
- `--border-glass`: Specular multi-stop highlight `linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(212, 175, 55, 0.22) 50%, rgba(255, 255, 255, 0.04) 100%)`.
- `--accent-gold`: Radiant warm gold (`#D4AF37`) with luminous glow `rgba(212, 175, 55, 0.35)`.
- High-contrast text readability (21:1 on headings, 16:1 on body).

---

## 4. High-Fashion Product Artwork & Imagery

1. **`js/product-art.js`**:
   - SVG vector fashion plates for all 12 garments featuring accurate silhouette cuts, pocket placements, rib collars, 500 GSM loop textures, and the Skyline Religion crest monogram.
2. **`backend/generate-images.js`**:
   - Node.js script supporting automated generation via OpenAI GPT Image / DALL-E / Nano Banana when an API key is present in environment, saving directly to `assets/products/`.

---

## 5. Local MiniCPM 5 2B AI Stylist & Suggestion Engine

1. **Backend Service (`backend/server.js`)**:
   - `POST /api/stylist`:
     - Receives `{ prompt, occasion, fitPreference, measurements }`.
     - Queries local Ollama at `http://localhost:11434/api/generate` with model `minicpm5:2b`.
     - Intelligent fallback: If Ollama is offline, an **Expert Wardrobe Heuristic Engine** pairs garments (e.g. 500 GSM Arch Hoodie + Selvedge Carpenter Jeans + Spire Beanie) and provides bespoke styling rationale.
2. **Frontend Widget (`js/stylist.js`)**:
   - Floating interactive "AI Stylist" capsule button on every page.
   - Slide-out glass drawer where users can ask for outfit recommendations, sizing advice, or occasion styling.

---

## 6. Implementation Roles & Task Distribution

### Subagent: Sonnet 5 (Backend Specialist)
- Extend `backend/server.js`:
  - Add `POST /api/stylist` (Ollama MiniCPM 5 2B integration + heuristic fallback).
  - Add `GET /api/care` (structured care FAQs and sizing tables).
  - Add `POST /api/inquiry` (concierge customer inquiries).
- Build `backend/generate-images.js`.
- Update `backend/test-api.js` to test all new endpoints.

### Primary Model: Frontend Lead (UI/UX, Art, Pages)
- Overhaul Dark Theme tokens in `css/apple-tokens.css` and `css/skyline.css`.
- Create `css/category-art.css` with atmospheric background art for all 4 categories.
- Build `js/product-art.js` rendering fashion plates for all 12 products.
- Build the dedicated pages:
  - `sweatshirts.html`
  - `gym.html`
  - `streetwear.html`
  - `loungewear.html`
  - `product.html` (Dynamic product details by `?id=...`)
  - `about.html` (Brand story and mill heritage)
  - `care.html` (Customer care, sizing, and concierge)
- Build `js/stylist.js` (Floating AI Stylist widget on all pages).
- Enrich footers with Brand Manifesto and Customer Care accordions.

---

## 7. Verification & Quality Assurance

1. Run `npm test` to verify all 10 backend API endpoints pass.
2. Verify all 7 pages load seamlessly in browser with working navigation links, cart drawer, and theme toggle.
3. Test the MiniCPM 5 2B AI Stylist widget with prompts like "What should I wear for an evening workout to dinner?".
4. Test responsive layouts on mobile (390px) and desktop (1200px+).
