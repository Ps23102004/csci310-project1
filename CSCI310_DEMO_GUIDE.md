# CSCI 310 Project 1 — Demo Guide

**Presenter:** Parth Singh · **Project:** Personal project website + Skyline Religion interactive demo · **Status:** local demonstration; GitHub Pages deployment not verified here · **Updated:** 2026-09-22

## Assignment and talk timing

The local `project1_personal_work_demo_2026F.pdf` asks for a personal project website hosted on GitHub Pages; an entry homepage and six-block **My Project** overview; desktop and mobile layouts with text **and image changes** on mobile; organized HTML/CSS/JS files; and a page with at least **five client-side JavaScript dynamic effects**. It permits jQuery or pure JavaScript, prohibits React/Vue/Angular, and permits Material UI or Bootstrap components. The submission is a **ZIP including slides**. The presentation section describes about five minutes plus one minute Q&A, while the grading section calls for a **four-minute presentation**. Rehearse a four-minute core and leave Q&A separate. Hosting is worth 20% of the website component; do not say that requirement is complete without a tested public URL.

## Four-minute core script

| Time | Show | Say / point to |
|---|---|---|
| 0:00–0:30 | `index.html` | “I’m Parth Singh. This is my personal project overview and the entry point to my Skyline Religion GUI demo. It uses HTML, CSS and vanilla JavaScript.” |
| 0:30–1:15 | Desktop project grid, then 390px viewport | Point to **My Project**, six reserved blocks, three columns on desktop and two on mobile. On Block 1, the mobile `<picture>` swaps to a fabric-detail photo and the shorter mobile copy replaces desktop copy. Other blocks are future-project placeholders, not completed linked projects. CSS expresses a 720px desktop section with 200×150px imagery, and a 300px mobile section with 120×90px imagery; compare the rendered page to the handout figures instead of claiming pixel-perfect compliance by inspection alone. |
| 1:15–1:35 | Click Block 1 → `skyline-religion.html` | Explain that the course overview links to the separate storefront demonstration; its cart and checkout are a class-project simulation, not commerce. |
| 1:35–3:20 | Five effects in succession | **1** Move pointer over hero: canvas light response (`refraction.js`). **2** Toggle light/dark theme (`theme.js`). **3** Hover a product card: tilt/glare (`motion.js`). **4** Filter/search products and open a product inspection/size interface (`catalog.js`). **5** Add an item, adjust quantity, use `SKYLINE10`, open the checkout **preview** (`cart.js`). Verify each interaction in the chosen browser before presenting; if one fails, substitute another working client-side effect rather than asserting success. |
| 3:20–4:00 | `css/`, `js/`, `backend/` overview and closing slide | Highlight file organization and why the client-side interactions do not depend on React/Vue/Angular. Optional Node backend offers API and stylist features locally, with a heuristic fallback if the local model is unavailable. “The preview takes no payment, places no order, and sends no newsletter email.” Close with candid outstanding checks: public hosting and complete accessibility review. |

If time allows, show category pages, the product detail view, and stylist drawer as **extensions**, not substitutes for the required five browser-visible effects.

## Demo setup and fallback

1. Open `index.html` in a browser (or serve the directory locally if file-origin browser policies interfere). Keep `skyline-religion.html` ready in another tab. The static presentation should not require the optional backend.
2. In DevTools, compare a desktop width and **390px** mobile width. Show that Block 1 changes both artwork and text. Check the other six-block layout against Figure 1 and Figure 2 in the PDF. Do not infer exact compliance solely from CSS declarations.
3. Clear stale demo cart state if it would obscure the flow. Add a product before pressing “Preview demo checkout.” The result is an illustrative receipt/order ID, **not** Apple Pay, biometric authentication, a charge, an order, or scheduled delivery.
4. The newsletter success state explicitly says no email was sent or saved. Do not submit real addresses for a demonstration.
5. If demonstrating the optional backend, run `node backend/server.js` in one terminal and `node backend/test-api.js` in another. The stylist API attempts a local MLX service at `127.0.0.1:8767` and otherwise returns heuristic advice. Distinguish the engine observed in the API response; never call fallback text a live model answer.
6. If navigation, model service, or browser rendering differs on the presentation machine, return to the static course grid and document the limitation instead of claiming it worked.

## Evidence and limits

- **Source inspection (2026-09-22):** `index.html` has the six-block grid and Block 1 `<picture>` and separate desktop/mobile copy; `css/style.css` declares the responsive grid; the scripts include canvas, theme, motion, catalog and cart interactions. Source inspection alone is not an end-to-end browser or accessibility audit.
- **Coordinator-reported browser QA (2026-09-22):** Desktop showed six blocks in three columns; 390px mobile showed six blocks in two columns with Block 1 asset and copy swaps, and inspected pages showed no horizontal overflow at 390px. Product detail rendered after removal of a stale dossier section. Newsletter preview did not save or submit an email; wishlist empty state updated immediately; cart refused a ninth unit when stock was eight; and the receipt stated no order, payment or delivery. These checks do not establish perfect pixel fidelity, cross-browser support, or complete accessibility.
- **Checkout implementation:** `js/cart.js` labels its confirmation “Demo checkout preview” and states no payment/order/delivery. `backend/server.js` has a separate **in-memory simulated-order** checkout response (`paid_simulated`); those local test orders are not real purchases or payment processing.
- **Backend API test (2026-09-22):** Started the local backend on isolated port 31987 and ran `PORT=31987 node backend/test-api.js`: **12 passed, 0 failed**. These are API checks, not proof of frontend behavior, deployment, real payments, or live model inference.
- **Not verified here:** live GitHub Pages URL, deployment, perfect figure geometry, cross-browser/mobile performance, screen-reader coverage, WCAG conformance, real MLX availability on the presentation machine, or a complete original AI prompt/response transcript.

## Q&A answers

- **Why vanilla JS?** The handout permits jQuery or pure JavaScript and prohibits sophisticated frameworks including React, Vue and Angular. Vanilla JS keeps DOM behavior visible for assessment.
- **Is checkout live?** No. Local cart state and illustrative receipt demonstrate event handling and calculation; no payment, fulfillment or order is processed.
- **Is the stylist always AI-powered?** No. It requires the optional local backend/model service; the backend can return heuristic fallback advice.
- **Is it hosted?** The handout requires GitHub Pages, but provide a public tested URL only if one has actually been deployed and checked. Otherwise say hosting remains outstanding.
- **Is it accessible?** There are accessibility-oriented hooks such as labels and reduced-motion handling, but no comprehensive audit is documented. Do not claim universal keyboard support or WCAG compliance.

**Submission check:** The local ZIP `../Skyline_Religion_CSCI310_Project1_2026-09-22.zip` includes the HTML/CSS/JS/assets, this guide, the notebook, and the PDF and editable HTML slides. Its required entries and ZIP integrity were verified locally. Public GitHub Pages hosting, the course deadline, and Brightspace submission still require separate verification. Source handout: `/Users/parthsingh/Documents/Omi/AI-Brain-Vault/02 - University/Csci 310 - GUI/project1_personal_work_demo_2026F.pdf`.
