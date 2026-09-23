**CSCI-310 Development Notebook**

---

**Guideline:** 

* Please document all your development activities, whether you use any AI coding tool or not. You might mix your manual coding or AI tool usage. Just document the entire process.   
  * If this is a team project or assignment, list all team members’ names in the “Name” field. For each iteration, record the name of the person who contributed any part of the work in the “What do you do?” field.  
* Any interactions with AI coding tools such as ChatGPT, Gemini, Copilot, and others must capture the full conversation history.   
* Use the format below to record your development activities in a clear and consistent manner.   
  * Adding more iteration sections if needed.

---

#### **Name:** Parth Singh

#### **Project/Assignment:** CSCI 310 — Project 1: Personal Work Demo Website & Skyline Religion Luxury GUI

> **Current-status correction (2026-09-22).** The earlier iteration entries below are retained as an existing development narrative, not authenticated timestamps, test logs, or a verbatim AI transcript. Several results were written as assertions without attached evidence; they must not be presented as independently verified. The quoted Iteration 1 prompt is a recorded prompt description, **not** proof of the full conversation or the tool's actual response. The course handout requires the *full AI prompt and response conversation history* on a forthcoming Document Site; that history is not contained in this file and must be supplied from authentic exports if available. Do not invent missing conversations. The current code uses **demo-only** checkout and newsletter interactions: no payment, order, delivery, or email submission occurs. The handout requires GitHub Pages hosting, but no live URL or deployment check is documented here. See the verification addendum below for what can be checked now.

##### **Problem/Task:**
Design a responsive personal project demonstration website intended for GitHub Pages, with a six-block course grid, desktop and mobile layouts, changed imagery/text for mobile, and at least five client-side JavaScript effects. The linked Skyline Religion storefront extends the demonstration with product browsing, visual effects, and optional local backend services. Hosting and exact visual fidelity remain separate checks, not conclusions inferred from source code.

---

##### **Development Log**

- **Iteration 1:**  
  - **Goal/Task/Rationale:** Requirement Analysis & Architectural Planning. Discover exact course rubric, layout constraints, tech limitations, and brand identity context.
  - **What do you do?**  
    Consulted Claude Code CLI in terminal with project context:
    *Prompt*: "Analyze CSCI 310 - GUI course files, syllabus, and project1_personal_work_demo_2026F.pdf. Extract all layout constraints, allowed technologies, and rubric items. Formulate an end-to-end architecture plan for Skyline Religion luxury clothing GUI."
  - **Response/Result:**
    Identified critical project constraints:
    1. Framework restrictions: Vue.js, ReactJS, and AngularJS are disallowed; the handout allows jQuery or pure JavaScript and permits Material UI or Bootstrap components. This implementation uses HTML, CSS, and vanilla JavaScript.
    2. Exact Desktop dimensions: 720px width, 40px outer margins, 2 rows of 3 columns, 200px x 150px block images, 25px gap below header, 20px col gap, 25px row gap.
    3. Exact Mobile dimensions (iPhone 12 Pro 390px): 300px width, 3 rows of 2 columns, 120px x 90px block images, 10px spacing.
    4. Dedicated JS Demo page requiring at least 5 dynamic client-side JavaScript effects.
  - **Your Evaluation:** The existing narrative records a decoupled multi-page approach: `index.html` is the course portal and `skyline-religion.html` is the linked storefront. Layout measurements and assignment compliance require a browser check; the Node.js backend is optional to the static frontend.

- **Iteration 2:**  
  - **Goal/Task/Rationale:** Design Tokens, Liquid Glass & Apple HIG Theming System.
  - **What do you do?**  
    Created `css/apple-tokens.css` and `js/theme.js` to establish system-adaptive dual-theming (Dark Mode "Nocturnal Obsidian" and Light Mode "Frosted Alabaster").
    Configured CSS custom properties for backdrop blur (`backdrop-filter: blur(24px) saturate(180%)`), 1px specular highlight borders (`border-glass`), and Apple spring easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
    Implemented `ThemeManager` in `js/theme.js` listening to OS-level `prefers-color-scheme` in real-time with manual override persisted in `localStorage`.
  - **Response/Result:**
    Theme-switching code and appearance tokens are present; no contrast audit, flash-free-load test, or quantified accessibility result is attached to this entry.
  - **Your Evaluation:** Visual intent is documented; accessibility conformity is not established by this notebook.

- **Iteration 3:**  
  - **Goal/Task/Rationale:** CSCI 310 Course Portal & Exact Specification Grid Implementation (`index.html` & `css/style.css`).
  - **What do you do?**  
    Built the personal bio card for Parth Singh and the required 6-block project grid.
    Wrote exact CSS Grid layout matching Figure 1 (Desktop: 720px width, 200x150 images, 25px/20px gaps) and Figure 2 (Mobile: 300px width, 120x90 images, 10px gaps).
    Linked Block 1 ("Javascript Demo") to `skyline-religion.html` and configured Blocks 2-6 for future course assignments.
  - **Response/Result:**
    CSS specifies a 720px desktop section with three 200px columns and a 300px mobile section with two 120px columns. The code alone does not establish pixel-perfect compliance with the handout figures; mobile image/text differences also need review.
  - **Your Evaluation:** Layout implementation is present, but the 30-point layout criterion needs a side-by-side browser comparison.

- **Iteration 4:**  
  - **Goal/Task/Rationale:** Interactive HTML5 Canvas Light Refraction Shader (`js/refraction.js`).
  - **What do you do?**  
    Engineered a custom physics-driven light refraction engine on `<canvas id="refraction-canvas">`.
    Calculated pointer coordinates with spring interpolation (`stiffness: 0.08, damping: 0.85`), rendering dynamic specular ray bloom and chromatic caustic dispersion rings that adapt their color temperature to the active theme.
  - **Response/Result:**
    Pointer-responsive canvas behavior is implemented. No recorded frame-rate or layout-thrashing measurements substantiate the earlier 60fps assertion; reduced-motion behavior should be verified in a browser.
  - **Your Evaluation:** Done. Serves as Dynamic Effect #1 for course evaluation.

- **Iteration 5:**  
  - **Goal/Task/Rationale:** Apple Spring Physics & 3D Interactive Card Tilt with Glare (`js/motion.js`).
  - **What do you do?**  
    Implemented pointer-relative 3D perspective tilt (`rotateX`, `rotateY`) on garment cards with dynamic specular radial glare tracking light incidence. Added spring decay on mouse exit and header scroll reactivity.
  - **Response/Result:**
    Tactile, highly responsive hover feedback that feels physically grounded.
  - **Your Evaluation:** Done. Serves as Dynamic Effect #2.

- **Iteration 6:**  
  - **Goal/Task/Rationale:** Skyline Religion Product Catalog & Virtual Fitting Room Modal (`js/catalog.js`).
  - **What do you do?**  
    Authored dataset of 12 luxury garments across 4 categories (Sweatshirts, Gym, Streetwear, Loungewear) with GSM weights, fabric details, and model measurements.
    Built multi-criteria filter matrix, live search, sort dropdown, and interactive Virtual Fitting Room modal with 360 angle views and size recommendation engine.
  - **Response/Result:**
    Instant client-side filtering with zero reload. Modal opens with Apple-style backdrop blur and scale-spring animation.
  - **Your Evaluation:** Done. Serves as Dynamic Effect #3 & #4.

- **Iteration 7:**  
  - **Goal/Task/Rationale:** Slide-Over Cart Drawer & Demo-Only Checkout Preview (`js/cart.js`).
  - **What do you do?**  
    Engineered a slide-over cart drawer with quantity increments/decrements, live total calculations, and Privilege promo code engine (`SKYLINE10`, `VIP20`).
    Implemented a frontend checkout preview with an illustrative receipt and demo order ID. It does not invoke Apple Pay, biometrics, payment processing, order placement, or delivery. The standalone backend also exposes a separate simulated checkout endpoint, not a live payment integration.
  - **Response/Result:**
    The client-side cart uses localStorage for local demo state. This is not a live e-commerce workflow.
  - **Your Evaluation:** Done. Serves as Dynamic Effect #5.

- **Iteration 8:**  
  - **Goal/Task/Rationale:** Decoupled Backend Service & Verification (`backend/server.js` & `backend/test-api.js`).
  - **What do you do?**  
    Implemented standalone Node.js REST API with `/api/products`, `/api/products/:id`, `/api/cart`, `/api/checkout`, and `/api/health`. Executed automated test suite verifying all endpoints.
  - **Response/Result:**
    A historical all-endpoints-pass assertion appears in the prior draft; see the dated verification addendum for independently observed results and remaining checks.
  - **Your Evaluation:** Backend test results do not establish GitHub Pages hosting, frontend accessibility, or submission readiness.

- **Iteration 9:**  
  - **Goal/Task/Rationale:** Nocturnal Obsidian Pro Dark Theme Overhaul.
  - **What do you do?**  
    Upgraded `css/apple-tokens.css` with true OLED blacks (`#000000`), chiseled chamfer borders with directional light catchers (`--border-metallic`), multi-tier gold spectrum (`#D4AF37`, `#E5C483`, `#FFF2D1`), and VisionOS glass saturation (`blur(28px) saturate(210%)`).
  - **Response/Result:**
    Drastically deeper, richer luxury presentation with zero grayish-blue cast. OLED screens achieve full pixel power down on dark background.
  - **Your Evaluation:** Done.

- **Iteration 10:**  
  - **Goal/Task/Rationale:** Multi-Page Architecture & Category Atmospheric Background Art.
  - **What do you do?**  
    Created dedicated pages (`sweatshirts.html`, `gym.html`, `streetwear.html`, `loungewear.html`, `product.html`, `about.html`, `care.html`) with bespoke background art (`css/category-art.css`):
    1. Monolithic Stone & Terry Drape for Sweatshirts.
    2. Kinetic Performance Grid & Laser Pulses for Gymwear.
    3. Golden-Hour Metropolitan Skyline with Okayama Redline Selvedge for Streetwear.
    4. Ambient Cloud-Terry Fluid Serenity for Loungewear.
  - **Response/Result:**
    Every garment category possesses an immersive, bespoke identity while sharing the floating glass nav, cart drawer, and theme state.
  - **Your Evaluation:** Done.

- **Iteration 11:**  
  - **Goal/Task/Rationale:** Product imagery and visual rendering (`js/product-art.js`, `backend/generate-images.js`, `assets/products/`).
  - **What do you do?**  
    Added product-art rendering logic, image-generation tooling, product photographs and alternate-angle controls on `product.html`. The prior draft's claim of 48 exported files is not supported by the current `assets/products/` directory, which contained **18 files** on 2026-09-22; the prior count is not a verified deliverable.
  - **Response/Result:**
    Product visual assets and angle controls are present; individual image completeness and cross-browser performance need separate testing.
  - **Your Evaluation:** Current asset inventory is recorded without asserting 48 views or an uninterrupted rendering guarantee.

- **Iteration 12:**  
  - **Goal/Task/Rationale:** Local MiniCPM 5 2B AI Stylist & Customer Care Concierge (`js/stylist.js` & `backend/server.js`).
  - **What do you do?**  
    Engineered floating AI Stylist drawer on all pages connected to backend `POST /api/stylist`. Configured connection to local Apple Silicon MLX worker running `minicpm5:2b-mlx` at `http://127.0.0.1:8767`, backed by an expert wardrobe heuristic fallback. Added `GET /api/care`, `POST /api/inquiry`, and `GET /api/brand` with 12/12 automated API tests passing.
  - **Response/Result:**
    The stylist UI calls the optional localhost backend. Its server attempts a local MLX worker and falls back to a deterministic wardrobe heuristic; live model availability is not guaranteed on another machine.
  - **Your Evaluation:** This is an optional enhancement, not proof of assignment completion.

---

## 2026-09-22 — Current evidence and presentation preparation

- **Contributor / task:** Parth Singh project deliverables, with AI-assisted review of the existing notebook/guide and preparation of presentation materials. This addendum records actions observable in this work session only; it does **not** backfill missing original AI conversations or certify who authored every earlier code iteration.
- **Assignment source checked:** `project1_personal_work_demo_2026F.pdf` under `AI-Brain-Vault/02 - University/Csci 310 - GUI/`. It calls for GitHub Pages hosting, homepage/project overview, six project blocks, desktop/mobile image and text changes, at least five client-side JS effects, organized folders, a presentation, and a ZIP including slides. It allows jQuery/pure JS and Material UI/Bootstrap but prohibits sophisticated frameworks such as Vue/React/Angular. The prose says about five minutes plus a minute of Q&A; grading asks for a four-minute presentation, so the demo guide/deck use a four-minute core.
- **Implementation evidence from source inspection:** `index.html` contains Block 1's responsive `<picture>` and distinct mobile/desktop copy; `css/style.css` declares three desktop columns (200px image width) and two mobile columns (120px image width). The linked storefront contains interactive code in `js/refraction.js`, `js/theme.js`, `js/motion.js`, `js/catalog.js`, and `js/cart.js`. The frontend checkout labels itself a demo and states no order/payment/delivery is made. The newsletter success text says no address is submitted or saved. `backend/server.js` calls a localhost MLX worker when available and otherwise uses heuristic fallback.
- **Fresh verification, 2026-09-22:** Started the optional local backend on isolated port 31987 and ran `PORT=31987 node backend/test-api.js`: **12 passed, 0 failed**. This validates the tested API cases in that process, including simulated checkout and stylist endpoint behavior; it does **not** prove live model inference, real payment, deployment, mobile figure fidelity, or accessibility. Generated `CSCI310_Skyline_Religion_Slides.pdf` from editable `CSCI310_Skyline_Religion_Slides.html`; PDF metadata reports seven pages at 960×540 pt (16:9).
- **Remaining verification:** Demonstrate each claimed client-side effect in a real browser; compare 390px mobile and desktop screenshots with the assignment figures; audit keyboard/focus, assistive-technology behavior, contrast, and reduced motion; deploy/check a real GitHub Pages URL if required for submission; inspect final ZIP and include slides; submit authentic full AI prompt/response history to the Document Site if available. No transcript, public deployment, or accessibility certificate is manufactured here.
- **Presentation source and notes:** The editable HTML deck includes collapsible speaker notes, and the demo guide provides a timed four-minute walkthrough. The PDF is a rendered presentation, not a web deployment.
- **Additional browser QA reported by coordinator, 2026-09-22:** After a stale product-detail section was removed, the product page rendered. Desktop showed six blocks in three columns; 390px mobile showed six blocks in two columns with the Block 1 image/copy swap. Inspected pages had no horizontal overflow at 390px. Newsletter preview neither submitted nor stored email; wishlist empty state updated immediately; cart refused a ninth item when stock was eight; and the receipt explicitly said no payment, order, or delivery. These observations were relayed by the coordinator, not independently reproduced as part of this documentation pass. They do not establish perfect accessibility or public deployment. The backend API creates only in-memory **simulated** orders during testing.

---

## 2026-09-23 — Independent QA re-verification, asset fix, and presentation build

- **Contributor / task:** Parth Singh, with AI tool assistance in Claude Code (CLI, model Claude Sonnet 5). A separate Gemini CLI session had performed a read-only QA pass earlier the same day on this project and reported three suspected bugs. This entry documents the tools used to check those reports and the resulting code/asset change and presentation artifact — it does not certify anything about the Gemini session's own internal behavior beyond what its own transcript showed.
- **AI tools and MCP servers used this session:**
  1. **Claude Code CLI** (Claude Sonnet 5) — read the reported bugs, read the actual source (`js/catalog.js`, `js/product-art.js`, category HTML pages) to form an independent hypothesis before trusting the other AI's report.
  2. **`plugin:playwright` MCP (Playwright browser automation)** — started a local Python `http.server` static file server and drove a real headless Chromium browser against `loungewear.html`, `streetwear.html`, `gym.html`, `sweatshirts.html`, and `product.html` to reproduce (or fail to reproduce) each reported bug directly, rather than trusting static code reading alone.
  3. **TypeSafe `jev-latest` model (System One API, `POST https://api.typesafe.ai/v1/systemone`)** — given the three claims plus the collected code-reading and browser evidence as `state`, asked independent `noul` (yes/no probability) and `choice` questions to adjudicate each claim before any fix was made, as a second, differently-built model checking the same evidence.
  4. **Python + Pillow (PIL)** — measured grayscale mean brightness of all 12 product front photos to quantify the "black image" report instead of asserting it by eye.
  5. **Claude's built-in Artifact tool (Slides type)** — generated the CSCI 310 presentation deck as a web-based, downloadable slide deck (see below).
- **Findings:**
  - "Empty category pages" (claimed `js/catalog.js` filter mismatch): **false positive**. `SKYLINE_COLLECTIONS` already maps the named categories to explicit product IDs, checked before the generic `item.category` fallback. All four category pages rendered real product cards in a live browser test. Jev: `noul = 0.03` (not confirmed).
  - "Rear/Macro Weave angle photos 404 on `product.html?id=sr-03`": **false positive**. `sr-03` only declares a `front` image, so those buttons never render for it; a full scan of every product's declared image paths against `assets/products/` found zero missing files; clicking all four angle buttons on `sr-01` (which does declare all four) loaded every image with no 404. Jev: `noul = 0.03`.
  - "`sr-06-front.jpg` looks black": **real**, and broader than reported. Measured brightness (0–255 grayscale mean) across all 12 front photos: `sr-06` = 23.8, plus three more (`sr-04` = 27.8, `sr-05` = 31.0, `sr-11` = 30.2) far below the 56–136 range of the other 8. Jev: `noul = 0.94` (genuine asset-quality issue, not a broken link), recommended action `brighten_dark_assets_only` (confidence 0.72).
- **Fix applied:** Brightened all four underexposed front photos (`sr-04`, `sr-05`, `sr-06`, `sr-11`) using PIL `ImageEnhance.Brightness` with a per-file factor computed to bring each to the healthy ~57–62 mean-brightness range. Originals preserved as `*-front.orig.jpg` next to each file. No code changes were made — the filter and image-path bugs did not reproduce against the current code, so nothing there needed fixing. Verified the visual result in the same live browser session (screenshot of `product.html?id=sr-06`).
- **Presentation deck:** Built with Claude's Artifact tool (Slides Appifact type) at the user's request, reusing the four-minute script and honest evidence/limits framing already established in `CSCI310_Skyline_Religion_Slides.html`/`.pdf` (2026-09-22), and adding one new slide ("QA pass — today") documenting the verification above with a before/after brightness comparison image. The deck lives as a private, editable web artifact; exporting it to `.pptx`/PDF for Keynote, PowerPoint, or Google Slides is a manual download step from that page, not an automated file-generation step, and is recorded here as such rather than claimed as a delivered file.
- **Limits of this entry:** This documents tool calls and their outputs as observed in this session; it is not a claim that the Gemini CLI session's earlier report was made in bad faith, nor a certification of the Playwright/Jev API infrastructure's own reliability beyond what was directly observed here.
