# CSCI 310 Project 1: Demo Guide

**Presenter:** Parth Singh · **Live site:** https://ps23102004.github.io/csci310-project1/ · **Updated:** 2026-09-23

The grading rubric asks for a 4-minute presentation that shows how the site was developed and that it meets the requirements. The full script below runs about 4:50. Skip slide 8 (QA pass) to finish near 4:15. Q&A comes after.

## Before you start

- Open the live site in a second browser window: homepage, then **View My Project**, then Block 1.
- Have DevTools device mode ready at 390 px (iPhone 12 Pro) to show the mobile layout.
- Don't type a real email address into the newsletter demo.

## Timed script (slides: `CSCI310_Project1_Slides_Parth_Singh.pdf`)

| Time | Slide | What to say / do |
|---|---|---|
| 0:00–0:25 | 1 Cover | "Hi, I'm Parth. Project 1 asked for a personal homepage, a My Project page with six blocks, and one interactive project. Mine is Skyline Religion, a storefront concept for my streetwear brand, built with plain HTML, CSS, and vanilla JavaScript." |
| 0:25–1:00 | 2 Brief | Desktop: 3 columns in a 720 px section, 200 × 150 images. Mobile (390 px): 2 columns in a 300 px section, 120 × 90 images. On mobile, Block 1 swaps both its image and its text. The layout is CSS Grid with no tables. *Toggle device mode.* |
| 1:00–1:30 | 3 Structure | `index.html` homepage → `projects.html` My Project → `skyline-religion.html` storefront. Five JS files, one job each. The optional Node backend isn't needed for any effect. No frameworks. *Click Block 1.* |
| 1:30–2:30 | 4 Interaction (live) | 1) Move the cursor: the canvas light follows it. 2) Theme toggle. 3) Hover a card: tilt and glare. 4) Filter, search, open a product, switch angles. 5) Add to bag, change quantity, apply SKYLINE10: the total updates. |
| 2:30–2:55 | 5 Boundary | The checkout is a preview: the receipt is labeled as a demo, and no payment, order, delivery, or signup happens. |
| 2:55–3:25 | 6 AI disclosure | Claude Code built it across 12 iterations. Playwright, TypeSafe's Jev model, and Pillow were used to check it. Everything is logged in the development notebook. |
| 3:25–3:55 | 7 Requirements | Go through the handout line by line. Everything is done, including hosting (show the live URL). The only open item is a full accessibility review. |
| 3:55–4:30 | 8 QA pass (optional) | Three reported bugs; two were false. The black photo was real, and 4 photos were affected, not 1. Mean brightness went from 23.8 to 57.8. Lesson: verify the claim before fixing the code. |
| 4:30–4:50 | 9 Close | A responsive hub, five interactions, clear limits, now live on GitHub Pages. Thank you, questions? |

## Likely questions

- **Is it hosted?** Yes: https://ps23102004.github.io/csci310-project1/ (checked in a real browser on 2026-09-23).
- **Does the AI stylist work online?** Not on GitHub Pages. It needs the optional local backend and falls back to a heuristic when that isn't running.
- **Which frameworks?** None. Pure JavaScript, which the handout allows.
- **Is it accessible?** Not fully reviewed yet. A full WCAG review is the one item still outstanding.
