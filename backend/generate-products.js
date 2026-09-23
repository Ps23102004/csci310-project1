// Script to generate rich products.json with bespoke SVG assets for Skyline Religion
const fs = require('fs');
const path = require('path');

function createSvgAsset(title, category, angleLabel, colorHex, gsm, iconType) {
  const bgGrad1 = "#0d0e11";
  const bgGrad2 = "#181a20";
  const accentGold = "#d4af37";
  const borderCol = "rgba(255,255,255,0.08)";
  const garmentFill = colorHex || "#1a1b1f";

  // Garment SVG paths based on iconType
  let garmentSvg = "";
  if (iconType === "hoodie") {
    garmentSvg = `
      <!-- Hoodie Silhouette -->
      <path d="M 270 270 L 330 200 Q 400 160 470 200 L 530 270 L 640 380 L 580 430 L 520 370 L 520 720 L 280 720 L 280 370 L 220 430 L 160 380 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- Hood Crossover -->
      <path d="M 330 200 Q 400 280 470 200" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2" />
      <path d="M 360 215 Q 400 260 440 215" fill="#121316" stroke="none" />
      <!-- Kangaroo Pocket / Stitch lines -->
      <path d="M 320 540 L 480 540 L 500 660 L 300 660 Z" fill="#000000" fill-opacity="0.18" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
      <!-- Rib Hem -->
      <rect x="280" y="700" width="240" height="20" fill="#000000" fill-opacity="0.3" stroke="#ffffff" stroke-opacity="0.1" />
      <!-- Spire Logo Emblem -->
      <polygon points="400,340 408,370 392,370" fill="${accentGold}" opacity="0.85" />
      <line x1="400" y1="330" x2="400" y2="380" stroke="${accentGold}" stroke-width="1.2" opacity="0.9" />
    `;
  } else if (iconType === "crewneck") {
    garmentSvg = `
      <!-- Crewneck Silhouette -->
      <path d="M 280 260 L 340 220 Q 400 250 460 220 L 520 260 L 650 360 L 590 415 L 515 350 L 515 720 L 285 720 L 285 350 L 210 415 L 150 360 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- Thick Ribbed Collar -->
      <path d="M 340 220 Q 400 260 460 220 Q 400 275 340 220 Z" fill="#202227" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.8" />
      <!-- Acid wash mottled texture overlay -->
      <circle cx="370" cy="420" r="45" fill="#ffffff" fill-opacity="0.04" filter="blur(8px)" />
      <circle cx="440" cy="510" r="60" fill="#ffffff" fill-opacity="0.03" filter="blur(10px)" />
      <!-- Tonal Spire Logo -->
      <polygon points="400,380 409,415 391,415" fill="#ffffff" opacity="0.4" />
      <line x1="400" y1="365" x2="400" y2="425" stroke="#ffffff" stroke-width="1.5" opacity="0.5" />
      <!-- Ribbed cuffs and hem -->
      <rect x="285" y="700" width="230" height="20" fill="#000000" fill-opacity="0.25" />
    `;
  } else if (iconType === "zip-sweatshirt") {
    garmentSvg = `
      <!-- Funnel Neck Zip Silhouette -->
      <path d="M 290 270 L 360 180 L 440 180 L 510 270 L 640 370 L 585 425 L 510 365 L 510 720 L 290 720 L 290 365 L 215 425 L 160 370 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- Funnel Collar Structure -->
      <path d="M 360 180 L 440 180 L 445 250 L 355 250 Z" fill="#1e2025" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <!-- Two-way Metallic Zipper Track -->
      <line x1="400" y1="180" x2="400" y2="720" stroke="#d0d5dd" stroke-width="3" stroke-dasharray="4,2" />
      <!-- Top and Bottom Pullers -->
      <rect x="395" y="260" width="10" height="18" rx="2" fill="#d4af37" stroke="#ffffff" stroke-width="0.5" />
      <rect x="395" y="660" width="10" height="18" rx="2" fill="#d4af37" stroke="#ffffff" stroke-width="0.5" />
      <!-- Thermal Waffle Grid Accent Line -->
      <line x1="330" y1="370" x2="330" y2="690" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
      <line x1="470" y1="370" x2="470" y2="690" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
    `;
  } else if (iconType === "compression-longsleeve") {
    garmentSvg = `
      <!-- Athletic Compression Muscle Fit Silhouette -->
      <path d="M 310 230 Q 400 250 490 230 L 560 270 L 670 470 L 625 495 L 510 330 L 485 710 L 315 710 L 290 330 L 175 495 L 130 470 Z" fill="${garmentFill}" stroke="#4da6ff" stroke-opacity="0.35" stroke-width="2" />
      <!-- Ergonomic Chest Contour Lines -->
      <path d="M 340 330 Q 400 370 460 330" fill="none" stroke="#4da6ff" stroke-opacity="0.5" stroke-width="1.5" />
      <path d="M 360 410 Q 400 450 440 410" fill="none" stroke="#4da6ff" stroke-opacity="0.3" stroke-width="1.2" />
      <!-- Laser Perforation Matrix -->
      <circle cx="400" cy="520" r="2" fill="#4da6ff" opacity="0.6" />
      <circle cx="390" cy="530" r="2" fill="#4da6ff" opacity="0.6" />
      <circle cx="410" cy="530" r="2" fill="#4da6ff" opacity="0.6" />
      <circle cx="400" cy="540" r="2" fill="#4da6ff" opacity="0.6" />
      <!-- Reflective Crest -->
      <polygon points="400,280 406,295 394,295" fill="#4da6ff" opacity="0.9" />
    `;
  } else if (iconType === "tank") {
    garmentSvg = `
      <!-- Deep Drop-Arm Tank Silhouette -->
      <path d="M 340 220 Q 400 260 460 220 L 500 260 Q 430 430 485 530 L 490 730 L 310 730 L 315 530 Q 370 430 300 260 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- Bound Edge Collar and Low Armhole -->
      <path d="M 340 220 Q 400 260 460 220" fill="none" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" />
      <path d="M 500 260 Q 430 430 485 530" fill="none" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="3,3" />
      <path d="M 300 260 Q 370 430 315 530" fill="none" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="3,3" />
      <!-- Minimalist Spine Geometry Print -->
      <line x1="400" y1="360" x2="400" y2="600" stroke="${accentGold}" stroke-width="2" opacity="0.8" />
      <circle cx="400" cy="350" r="4" fill="${accentGold}" opacity="0.9" />
    `;
  } else if (iconType === "joggers") {
    garmentSvg = `
      <!-- Kinetic Training Joggers -->
      <path d="M 310 220 L 490 220 L 475 420 L 440 730 L 385 730 L 400 450 L 415 450 L 360 730 L 325 730 L 325 420 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- Elastic Waistband & Drawstrings -->
      <rect x="310" y="210" width="180" height="25" rx="3" fill="#121316" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <line x1="390" y1="235" x2="385" y2="290" stroke="#d4af37" stroke-width="2" />
      <line x1="410" y1="235" x2="415" y2="290" stroke="#d4af37" stroke-width="2" />
      <!-- Articulated Knee Darts -->
      <path d="M 335 480 Q 360 495 385 480" fill="none" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <path d="M 415 480 Q 440 495 465 480" fill="none" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <!-- Ankle Zipper Accents -->
      <line x1="328" y1="670" x2="328" y2="725" stroke="#d0d5dd" stroke-width="2.5" />
      <line x1="437" y1="670" x2="437" y2="725" stroke="#d0d5dd" stroke-width="2.5" />
    `;
  } else if (iconType === "carpenter-jeans") {
    garmentSvg = `
      <!-- Wide-Leg Carpenter Selvedge Denim -->
      <path d="M 290 210 L 510 210 L 500 420 L 480 750 L 415 750 L 400 440 L 385 750 L 320 750 L 300 420 Z" fill="${garmentFill}" stroke="#c98a58" stroke-opacity="0.4" stroke-width="2" />
      <!-- Waistband & Copper Button -->
      <rect x="290" y="200" width="220" height="24" fill="#141a24" stroke="#c98a58" stroke-width="1" />
      <circle cx="400" cy="212" r="5" fill="#d4af37" />
      <!-- Carpenter Utility Panels & Hammer Loop -->
      <rect x="330" y="380" width="50" height="180" fill="none" stroke="#c98a58" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="4,2" />
      <rect x="420" y="380" width="50" height="180" fill="none" stroke="#c98a58" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="4,2" />
      <path d="M 475 480 L 495 480 L 495 530 L 475 530" fill="none" stroke="#c98a58" stroke-width="2.5" />
      <!-- Redline Selvedge Accent at Cuff -->
      <line x1="320" y1="735" x2="385" y2="735" stroke="#e63946" stroke-width="2.5" />
      <line x1="415" y1="735" x2="480" y2="735" stroke="#e63946" stroke-width="2.5" />
    `;
  } else if (iconType === "cargo") {
    garmentSvg = `
      <!-- Nocturne Multi-Pocket Baggy Cargo -->
      <path d="M 280 200 L 520 200 L 515 410 L 505 740 L 425 740 L 400 440 L 375 740 L 295 740 L 285 410 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- 3D Bellows Cargo Pockets with Straps -->
      <rect x="270" y="360" width="45" height="75" rx="3" fill="#16181b" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <rect x="485" y="360" width="45" height="75" rx="3" fill="#16181b" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <rect x="280" y="470" width="45" height="70" rx="3" fill="#16181b" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <rect x="475" y="470" width="45" height="70" rx="3" fill="#16181b" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
      <!-- Metal D-Ring Hardware -->
      <circle cx="330" cy="240" r="7" fill="none" stroke="#d4af37" stroke-width="2" />
      <!-- Shock Cord Hem Bungee Toggles -->
      <circle cx="300" cy="735" r="4" fill="#d4af37" />
      <circle cx="500" cy="735" r="4" fill="#d4af37" />
    `;
  } else if (iconType === "tailored-shorts") {
    garmentSvg = `
      <!-- Architectural Tailored Shorts / Nickers -->
      <path d="M 300 220 L 500 220 L 515 400 L 530 590 L 415 590 L 400 390 L 385 590 L 270 590 L 285 400 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- Forward Deep Pleats -->
      <line x1="350" y1="240" x2="340" y2="480" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.8" />
      <line x1="450" y1="240" x2="460" y2="480" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.8" />
      <!-- Tailored Extended Tab Waistband -->
      <rect x="295" y="210" width="210" height="24" fill="#1e2025" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.2" />
      <circle cx="400" cy="222" r="4" fill="#d4af37" />
      <!-- Blind Stitch Hem -->
      <line x1="270" y1="575" x2="385" y2="575" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1" stroke-dasharray="5,3" />
      <line x1="415" y1="575" x2="530" y2="575" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1" stroke-dasharray="5,3" />
    `;
  } else if (iconType === "minimal-tee") {
    garmentSvg = `
      <!-- Boxy Minimal Heavyweight Tee -->
      <path d="M 285 240 L 350 205 Q 400 235 450 205 L 515 240 L 630 330 L 580 380 L 510 320 L 510 680 L 290 680 L 290 320 L 220 380 L 170 330 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2.5" />
      <!-- Thick 1.25 inch Mock Neck Rib -->
      <path d="M 350 205 Q 400 245 450 205 Q 400 260 350 205 Z" fill="#25272d" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" />
      <!-- Drop Shoulder Construction Line -->
      <line x1="320" y1="265" x2="330" y2="350" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
      <line x1="480" y1="265" x2="470" y2="350" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
      <!-- Minimalist Hem Spire Tag -->
      <rect x="290" y="660" width="16" height="12" fill="#d4af37" opacity="0.9" />
    `;
  } else if (iconType === "beanie") {
    garmentSvg = `
      <!-- Skyline Spire Ribbed Merino Beanie -->
      <path d="M 310 490 C 310 290 490 290 490 490 Z" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2.5" />
      <!-- Vertical Cardigan Rib Lines -->
      <path d="M 340 490 C 340 330 460 330 460 490" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
      <path d="M 370 490 C 370 320 430 320 430 490" fill="none" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
      <line x1="400" y1="290" x2="400" y2="490" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5" />
      <!-- Turn-Up Fold Cuff -->
      <rect x="295" y="470" width="210" height="70" rx="8" fill="#222429" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2" />
      <!-- Metal Medallion Crest Badge Hand-Riveted -->
      <circle cx="400" cy="505" r="14" fill="#d4af37" stroke="#ffffff" stroke-width="1" />
      <polygon points="400,496 405,512 395,512" fill="#111215" />
    `;
  } else if (iconType === "duffle") {
    garmentSvg = `
      <!-- Monolith Rubberized Weekend Duffle -->
      <rect x="220" y="380" width="360" height="210" rx="28" fill="${garmentFill}" stroke="#ffffff" stroke-opacity="0.3" stroke-width="2.5" />
      <path d="M 220 530 L 580 530 L 580 562 Q 580 590 552 590 L 248 590 Q 220 590 220 562 Z" fill="#0c0d0f" stroke="#ffffff" stroke-opacity="0.2" />
      <path d="M 310 380 Q 310 240 400 240 Q 490 240 490 380" fill="none" stroke="#25272e" stroke-width="14" stroke-linecap="round" />
      <path d="M 310 380 Q 310 240 400 240 Q 490 240 490 380" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" />
      <line x1="260" y1="415" x2="540" y2="415" stroke="#d0d5dd" stroke-width="3" />
      <rect x="385" y="408" width="16" height="14" rx="2" fill="#d4af37" />
      <path d="M 220 450 L 250 450 L 250 520 L 220 520 Z" fill="#181a1f" stroke="#ffffff" stroke-opacity="0.2" />
      <circle cx="235" cy="470" r="3" fill="#ffffff" opacity="0.4" />
      <circle cx="235" cy="485" r="3" fill="#ffffff" opacity="0.4" />
      <circle cx="235" cy="500" r="3" fill="#ffffff" opacity="0.4" />
      <rect x="520" y="470" width="28" height="18" rx="3" fill="#d4af37" opacity="0.9" />
    `;
  }

  const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGrad1}" />
      <stop offset="100%" stop-color="${bgGrad2}" />
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="800" height="1000" fill="url(#bgGrad)" />
  <circle cx="400" cy="450" r="360" fill="url(#glowGrad)" />

  <rect x="25" y="25" width="750" height="950" fill="none" stroke="${borderCol}" stroke-width="1" />
  <line x1="25" y1="85" x2="775" y2="85" stroke="${borderCol}" stroke-width="1" />
  <line x1="25" y1="915" x2="775" y2="915" stroke="${borderCol}" stroke-width="1" />

  <text x="50" y="60" font-family="'Helvetica Neue', -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="5" fill="#f0f0f2">SKYLINE RELIGION</text>
  <text x="750" y="60" font-family="'Helvetica Neue', -apple-system, sans-serif" font-size="11" font-weight="500" letter-spacing="3" text-anchor="end" fill="${accentGold}">LAYBACK LUXURY</text>

  <g transform="translate(0, 20)">
    ${garmentSvg}
  </g>

  <g transform="translate(50, 875)">
    <rect x="0" y="0" width="200" height="26" rx="3" fill="#14161a" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
    <text x="12" y="17" font-family="'Helvetica Neue', -apple-system, sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#ffffff">${angleLabel.toUpperCase()}</text>
  </g>

  <g transform="translate(750, 875)">
    <text x="0" y="17" font-family="'Helvetica Neue', -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="2" text-anchor="end" fill="#8e929b">${gsm} // SPEC</text>
  </g>

  <text x="50" y="948" font-family="'Helvetica Neue', -apple-system, sans-serif" font-size="13" font-weight="600" letter-spacing="1.5" fill="#ffffff">${title.toUpperCase()}</text>
  <text x="750" y="948" font-family="'Helvetica Neue', -apple-system, sans-serif" font-size="11" font-weight="400" letter-spacing="3" text-anchor="end" fill="#717680">${category.toUpperCase()} // ARCHIVE 2026</text>
</svg>`.trim();

  return "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
}

const products = [
  {
    id: "sr-01",
    slug: "skyline-arch-heavyweight-hoodie",
    title: "Skyline Arch Heavyweight Hoodie",
    category: "sweatshirts",
    categoryLabel: "Heavyweight Sweatshirts",
    price: 195,
    description: "Engineered from bespoke 500 GSM organic French terry, the Skyline Arch Hoodie captures effortless architectural drape with dropped shoulders, exaggerated sleeve stacking, and seamless rib trim. Pre-shrunk and double-enzyme washed for a broken-in yet substantial hand.",
    gsm: "500 GSM",
    fabric: "100% Organic Heavyweight French Terry",
    fit: "Boxy Drop-Shoulder",
    colors: [
      { name: "Onyx Black", hex: "#121212" },
      { name: "Bone White", hex: "#E7E4DC" },
      { name: "Slate Mist", hex: "#4A525A" }
    ],
    sizes: [
      { size: "XS", sku: "SR-SW-01-XS", stock: 12 },
      { size: "S", sku: "SR-SW-01-S", stock: 24 },
      { size: "M", sku: "SR-SW-01-M", stock: 35 },
      { size: "L", sku: "SR-SW-01-L", stock: 28 },
      { size: "XL", sku: "SR-SW-01-XL", stock: 14 }
    ],
    badge: "Signature Drop",
    badges: ["Signature Drop", "Run 001", "Core Collection"],
    features: [
      "500 GSM custom-milled loopback French terry",
      "Seamless double-layered crossover hood without drawstrings",
      "Drop-shoulder boxy architectural drape",
      "Concealed side-seam pockets with silk-satin lining",
      "Tonal micro-embroidered Skyline crest at cuff"
    ],
    modelInfo: "Model is 6'2\" (188cm), 180 lbs wearing Size L for an oversized drape.",
    care: "Machine wash cold inside out. Hang dry to maintain fiber density.",
    angles: [
      { label: "Front View", icon: "🏛️" },
      { label: "Back Silhouette", icon: "📐" },
      { label: "Fabric Detail", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Skyline Arch Heavyweight Hoodie", "sweatshirts", "Front Elevation", "#151619", "500 GSM", "hoodie"),
    angleImages: [
      createSvgAsset("Skyline Arch Heavyweight Hoodie", "sweatshirts", "Angle 01: Front Architectural Drape", "#151619", "500 GSM", "hoodie"),
      createSvgAsset("Skyline Arch Heavyweight Hoodie", "sweatshirts", "Angle 02: Rear Profile & Stacking", "#101113", "500 GSM", "hoodie"),
      createSvgAsset("Skyline Arch Heavyweight Hoodie", "sweatshirts", "Angle 03: Macro French Terry Texture", "#1c1e22", "500 GSM", "hoodie"),
      createSvgAsset("Skyline Arch Heavyweight Hoodie", "sweatshirts", "Angle 04: Flat Lay Proportions", "#151619", "500 GSM", "hoodie")
    ]
  },
  {
    id: "sr-02",
    slug: "relic-acid-wash-crewneck",
    title: "Relic Acid-Wash Crewneck",
    category: "sweatshirts",
    categoryLabel: "Heavyweight Sweatshirts",
    price: 175,
    description: "An artisanal tribute to brutalist patinas. Each Relic Crewneck undergoes an individualized mineral acid-wash immersion, yielding subtle stone-grey gradients across 460 GSM combed cotton terry. Finished with a dense tonal embroidered spire on the chest.",
    gsm: "460 GSM",
    fabric: "100% Combed Heavy Cotton Terry",
    fit: "Oversized Slouch",
    colors: [
      { name: "Mineral Ash", hex: "#3A3837" },
      { name: "Faded Sage", hex: "#6B7268" }
    ],
    sizes: [
      { size: "S", sku: "SR-SW-02-S", stock: 18 },
      { size: "M", sku: "SR-SW-02-M", stock: 26 },
      { size: "L", sku: "SR-SW-02-L", stock: 20 },
      { size: "XL", sku: "SR-SW-02-XL", stock: 8 }
    ],
    badge: "Limited Wash",
    badges: ["Artisanal Wash", "Low Stock", "Limited Edition"],
    features: [
      "460 GSM heavyweight reverse-weave terry",
      "Individual artisanal mineral acid-wash finish",
      "Tonal high-density embroidered Spire emblem",
      "Reinforced twin-needle rib collar and cuffs",
      "Raw-edge back yoke detail"
    ],
    modelInfo: "Model is 6'0\" (183cm), 172 lbs wearing Size M.",
    care: "Cold wash with dark colors. Flat dry.",
    angles: [
      { label: "Front View", icon: "🏛️" },
      { label: "Back Embroidery", icon: "📐" },
      { label: "Collar Detail", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Relic Acid-Wash Crewneck", "sweatshirts", "Front Elevation", "#303236", "460 GSM", "crewneck"),
    angleImages: [
      createSvgAsset("Relic Acid-Wash Crewneck", "sweatshirts", "Angle 01: Front View & Collar", "#303236", "460 GSM", "crewneck"),
      createSvgAsset("Relic Acid-Wash Crewneck", "sweatshirts", "Angle 02: Back Yoke Construction", "#282a2e", "460 GSM", "crewneck"),
      createSvgAsset("Relic Acid-Wash Crewneck", "sweatshirts", "Angle 03: Acid Wash Dye Dispersion", "#383a3f", "460 GSM", "crewneck"),
      createSvgAsset("Relic Acid-Wash Crewneck", "sweatshirts", "Angle 04: Folded Silhouette", "#303236", "460 GSM", "crewneck")
    ]
  },
  {
    id: "sr-03",
    slug: "sanctuary-two-way-zip-sweatshirt",
    title: "Sanctuary Two-Way Zip Sweatshirt",
    category: "sweatshirts",
    categoryLabel: "Heavyweight Sweatshirts",
    price: 210,
    description: "The apex of thermal luxury. Constructed with 520 GSM heavyweight knit bonded to a micro-waffle thermal lining. Featuring custom brushed-palladium two-way RiRi zippers and an articulated funnel neck that can be worn flat or sculpted.",
    gsm: "520 GSM",
    fabric: "Heavyweight Cotton Fleece with Bonded Micro-Waffle Lining",
    fit: "Structured Boxy",
    colors: [
      { name: "Cathedral Black", hex: "#1B1C1E" },
      { name: "Raw Ecru", hex: "#DCD8CD" }
    ],
    sizes: [
      { size: "S", sku: "SR-SW-03-S", stock: 15 },
      { size: "M", sku: "SR-SW-03-M", stock: 22 },
      { size: "L", sku: "SR-SW-03-L", stock: 17 },
      { size: "XL", sku: "SR-SW-03-XL", stock: 9 }
    ],
    badge: "Hardware Focus",
    badges: ["Signature Drop", "Hardware Edition", "Thermal Lined"],
    features: [
      "520 GSM bonded thermal knit construction",
      "Custom Swiss-engineered two-way matte palladium zipper",
      "Sculpted funnel collar with hidden magnetic clasp",
      "Internal zippered media pocket with cable pass-through",
      "Heavy gauge ribbing engineered for zero sagging"
    ],
    modelInfo: "Model is 6'1\" (185cm), 175 lbs wearing Size L.",
    care: "Dry clean or gentle cold wash. Zip closed before washing.",
    angles: [
      { label: "Front Zip", icon: "🏛️" },
      { label: "Side Profile", icon: "📐" },
      { label: "Hardware Zoom", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Sanctuary Two-Way Zip Sweatshirt", "sweatshirts", "Front Elevation", "#18191d", "520 GSM", "zip-sweatshirt"),
    angleImages: [
      createSvgAsset("Sanctuary Two-Way Zip Sweatshirt", "sweatshirts", "Angle 01: Funnel Neck & Zipper Track", "#18191d", "520 GSM", "zip-sweatshirt"),
      createSvgAsset("Sanctuary Two-Way Zip Sweatshirt", "sweatshirts", "Angle 02: Open Zip Layering View", "#131417", "520 GSM", "zip-sweatshirt"),
      createSvgAsset("Sanctuary Two-Way Zip Sweatshirt", "sweatshirts", "Angle 03: Palladium RiRi Puller Detail", "#202126", "520 GSM", "zip-sweatshirt"),
      createSvgAsset("Sanctuary Two-Way Zip Sweatshirt", "sweatshirts", "Angle 04: Interior Waffle Lining", "#18191d", "520 GSM", "zip-sweatshirt")
    ]
  },
  {
    id: "sr-04",
    slug: "aero-compression-longsleeve",
    title: "Aero-Compression Longsleeve",
    category: "gym",
    categoryLabel: "Technical Gym",
    price: 115,
    description: "Form meeting kinetic function. Crafted from precision Italian polyamide with zoned micro-rib compression panels and bonded laser-cut ventilation channels. Second-skin ergonomics without constriction.",
    gsm: "240 GSM",
    fabric: "78% Recycled Polyamide, 22% Elastane Compression Rib",
    fit: "Second-Skin Muscle Fit",
    colors: [
      { name: "Vantablack", hex: "#0E0E10" },
      { name: "Cobalt Shadow", hex: "#1C2D42" },
      { name: "Glacier Grey", hex: "#9EABB7" }
    ],
    sizes: [
      { size: "XS", sku: "SR-GM-04-XS", stock: 10 },
      { size: "S", sku: "SR-GM-04-S", stock: 25 },
      { size: "M", sku: "SR-GM-04-M", stock: 32 },
      { size: "L", sku: "SR-GM-04-L", stock: 22 },
      { size: "XL", sku: "SR-GM-04-XL", stock: 11 }
    ],
    badge: "Performance Tech",
    badges: ["Performance Tech", "New Season", "Laser Cut"],
    features: [
      "Zoned compression micro-rib mapped to deltoids and spine",
      "Ultrasonic bonded seams prevent skin chafing during intense training",
      "Laser-perforated heat dispersion matrix across lower back",
      "Four-way hyper-stretch memory recovery fabric",
      "Matte heat-transfer reflective branding"
    ],
    modelInfo: "Model is 6'2\" (188cm), 195 lbs athletic build wearing Size L.",
    care: "Machine wash cold. Do not use fabric softeners.",
    angles: [
      { label: "Front View", icon: "🏛️" },
      { label: "Ventilation Back", icon: "📐" },
      { label: "Laser Seams", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Aero-Compression Longsleeve", "gym", "Front Elevation", "#111419", "240 GSM", "compression-longsleeve"),
    angleImages: [
      createSvgAsset("Aero-Compression Longsleeve", "gym", "Angle 01: Kinetic Muscle Map Fit", "#111419", "240 GSM", "compression-longsleeve"),
      createSvgAsset("Aero-Compression Longsleeve", "gym", "Angle 02: Laser-Cut Back Aeration", "#0d1014", "240 GSM", "compression-longsleeve"),
      createSvgAsset("Aero-Compression Longsleeve", "gym", "Angle 03: Bonded Seam Macro Detail", "#161b21", "240 GSM", "compression-longsleeve"),
      createSvgAsset("Aero-Compression Longsleeve", "gym", "Angle 04: Tension Stretch Display", "#111419", "240 GSM", "compression-longsleeve")
    ]
  },
  {
    id: "sr-05",
    slug: "metropolis-heavy-drop-arm-tank",
    title: "Metropolis Heavy Drop-Arm Tank",
    category: "gym",
    categoryLabel: "Technical Gym",
    price: 85,
    description: "Built for heavy lifting and high-heat training sessions. Made from substantial 260 GSM combed jersey with an exaggerated drop-armhole silhouette that emphasizes shoulder and lat tapers while ensuring maximum airflow.",
    gsm: "260 GSM",
    fabric: "100% Long-Staple Combed Cotton",
    fit: "Deep Drop-Arm Relaxed",
    colors: [
      { name: "Carbon Noir", hex: "#1E1E1E" },
      { name: "Chalk", hex: "#F3F2EE" },
      { name: "Washed Olive", hex: "#4C5346" }
    ],
    sizes: [
      { size: "S", sku: "SR-GM-05-S", stock: 20 },
      { size: "M", sku: "SR-GM-05-M", stock: 30 },
      { size: "L", sku: "SR-GM-05-L", stock: 25 },
      { size: "XL", sku: "SR-GM-05-XL", stock: 12 }
    ],
    badge: "Core Essential",
    badges: ["Summer Gym Drop", "Core Essential"],
    features: [
      "260 GSM heavyweight combed ring-spun cotton",
      "Deep sculpted drop-armhole with bound-edge reinforcement",
      "Split side vents with bar-tack stabilization",
      "Screen-printed minimal vertical spine geometry",
      "Antimicrobial silver-ion bio-wash finish"
    ],
    modelInfo: "Model is 5'11\" (180cm), 185 lbs wearing Size M.",
    care: "Tumble dry low or hang dry.",
    angles: [
      { label: "Front Chest", icon: "🏛️" },
      { label: "Drop-Arm Side", icon: "📐" },
      { label: "Back Yoke", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Metropolis Heavy Drop-Arm Tank", "gym", "Front Elevation", "#18191c", "260 GSM", "tank"),
    angleImages: [
      createSvgAsset("Metropolis Heavy Drop-Arm Tank", "gym", "Angle 01: Drop Armhole Silhouette", "#18191c", "260 GSM", "tank"),
      createSvgAsset("Metropolis Heavy Drop-Arm Tank", "gym", "Angle 02: Minimal Spine Geometry", "#131416", "260 GSM", "tank"),
      createSvgAsset("Metropolis Heavy Drop-Arm Tank", "gym", "Angle 03: Bound Collar & Reinforcement", "#222327", "260 GSM", "tank"),
      createSvgAsset("Metropolis Heavy Drop-Arm Tank", "gym", "Angle 04: Side Split Vent View", "#18191c", "260 GSM", "tank")
    ]
  },
  {
    id: "sr-06",
    slug: "ascent-kinetic-training-joggers",
    title: "Ascent Kinetic Training Joggers",
    category: "gym",
    categoryLabel: "Technical Gym",
    price: 145,
    description: "The bridge between performance training and high-end streetwear. Crafted in 420 GSM technical French terry with water-repellent coating, articulated knee darts, and concealed YKK zipper cuffs for adjustable taper over high-tops.",
    gsm: "420 GSM",
    fabric: "90% Organic Cotton Terry, 10% Recycled Spandex",
    fit: "Tapered Articulated",
    colors: [
      { name: "Pitch Black", hex: "#141416" },
      { name: "Basalt Grey", hex: "#3F4246" }
    ],
    sizes: [
      { size: "S", sku: "SR-GM-06-S", stock: 16 },
      { size: "M", sku: "SR-GM-06-M", stock: 28 },
      { size: "L", sku: "SR-GM-06-L", stock: 24 },
      { size: "XL", sku: "SR-GM-06-XL", stock: 10 }
    ],
    badge: "Dual Function",
    badges: ["Signature Drop", "Bestseller", "Water Repellent"],
    features: [
      "420 GSM structured French terry with DWR weather guard",
      "Articulated knee seams tailored for dynamic movement",
      "Concealed ankle gusset with matte black reverse-coil zippers",
      "Internal drawcord with rubberized metal aglets",
      "Double zipper-secured hand pockets and hidden passport pouch"
    ],
    modelInfo: "Model is 6'1\" (185cm), 180 lbs wearing Size L.",
    care: "Wash with zippers closed. Hang dry.",
    angles: [
      { label: "Full Length", icon: "🏛️" },
      { label: "Pocket Detail", icon: "📐" },
      { label: "Ankle Cuff", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Ascent Kinetic Training Joggers", "gym", "Front Elevation", "#151619", "420 GSM", "joggers"),
    angleImages: [
      createSvgAsset("Ascent Kinetic Training Joggers", "gym", "Angle 01: Front Articulated Taper", "#151619", "420 GSM", "joggers"),
      createSvgAsset("Ascent Kinetic Training Joggers", "gym", "Angle 02: Rear Knee Darts & Yoke", "#111214", "420 GSM", "joggers"),
      createSvgAsset("Ascent Kinetic Training Joggers", "gym", "Angle 03: Reverse-Coil Ankle Zipper", "#1f2125", "420 GSM", "joggers"),
      createSvgAsset("Ascent Kinetic Training Joggers", "gym", "Angle 04: Waistband Aglet Detail", "#151619", "420 GSM", "joggers")
    ]
  },
  {
    id: "sr-07",
    slug: "skyline-selvedge-wide-carpenter-jeans",
    title: "Skyline Selvedge Wide Carpenter Jeans",
    category: "bottoms",
    categoryLabel: "Luxury Bottoms",
    price: 230,
    description: "Woven on vintage Toyoda shuttle looms in Kojima, Okayama. 14oz red-line Japanese selvedge denim cut in a modern wide-leg carpenter silhouette with utility panels, custom branded copper rivets, and a gentle stonewash drape.",
    gsm: "14oz / 475 GSM",
    fabric: "100% Kojima Japanese Selvedge Denim",
    fit: "Wide-Leg Straight Carpenter",
    colors: [
      { name: "Raw Indigo", hex: "#1C283F" },
      { name: "Vintage Stonewash", hex: "#5C6F84" }
    ],
    sizes: [
      { size: "30", sku: "SR-BT-07-30", stock: 10 },
      { size: "32", sku: "SR-BT-07-32", stock: 20 },
      { size: "34", sku: "SR-BT-07-34", stock: 18 },
      { size: "36", sku: "SR-BT-07-36", stock: 8 }
    ],
    badge: "Japanese Selvedge",
    badges: ["Japanese Selvedge", "Limited Edition", "Kojima Mill"],
    features: [
      "Authentic 14oz shuttle-loomed Japanese red-line selvedge denim",
      "Reinforced double-front carpenter leg panels with hammer loop",
      "Custom debossed leather waistband patch in Italian calfskin",
      "Oxidized antique copper rivets and donut buttons",
      "Relaxed wide leg opening with clean stack drape over footwear"
    ],
    modelInfo: "Model is 6'1\" (185cm) wearing Size 32 (Medium).",
    care: "Soak cold inside out. Wear raw for unique contrast fades.",
    angles: [
      { label: "Front Break", icon: "🏛️" },
      { label: "Carpenter Details", icon: "📐" },
      { label: "Selvedge ID", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Skyline Selvedge Wide Carpenter Jeans", "bottoms", "Front Elevation", "#182233", "14oz Selvedge", "carpenter-jeans"),
    angleImages: [
      createSvgAsset("Skyline Selvedge Wide Carpenter Jeans", "bottoms", "Angle 01: Wide Leg Carpenter Stack", "#182233", "14oz Selvedge", "carpenter-jeans"),
      createSvgAsset("Skyline Selvedge Wide Carpenter Jeans", "bottoms", "Angle 02: Rear Utility Pockets", "#131b28", "14oz Selvedge", "carpenter-jeans"),
      createSvgAsset("Skyline Selvedge Wide Carpenter Jeans", "bottoms", "Angle 03: Redline Selvedge ID & Cuff", "#233045", "14oz Selvedge", "carpenter-jeans"),
      createSvgAsset("Skyline Selvedge Wide Carpenter Jeans", "bottoms", "Angle 04: Hammer Loop & Copper Rivets", "#182233", "14oz Selvedge", "carpenter-jeans")
    ]
  },
  {
    id: "sr-08",
    slug: "nocturne-multi-pocket-baggy-cargo",
    title: "Nocturne Multi-Pocket Baggy Cargo",
    category: "bottoms",
    categoryLabel: "Luxury Bottoms",
    price: 185,
    description: "Architectural utility meets luxury proportion. Engineered with 10 ergonomic 3D bellowed pockets, heavy metal Fidlock-compatible D-rings, and elasticated hem shock-cords that transition the fit from wide balloon to cinched jogger.",
    gsm: "340 GSM",
    fabric: "100% High-Density Cotton Twill with Peached Finish",
    fit: "Voluminous Baggy Cargo",
    colors: [
      { name: "Midnight Black", hex: "#101114" },
      { name: "Desaturated Moss", hex: "#3C423B" },
      { name: "Dune Sand", hex: "#B8AC99" }
    ],
    sizes: [
      { size: "S", sku: "SR-BT-08-S", stock: 14 },
      { size: "M", sku: "SR-BT-08-M", stock: 26 },
      { size: "L", sku: "SR-BT-08-L", stock: 19 },
      { size: "XL", sku: "SR-BT-08-XL", stock: 7 }
    ],
    badge: "Architectural Cut",
    badges: ["Low Stock", "Architectural Cut", "10-Pocket Utility"],
    features: [
      "Heavyweight 340 GSM peached cotton twill",
      "10 functional ergonomic bellows pockets with concealed snaps",
      "Industrial gunmetal hardware and utility key carabiner ring",
      "Dual hem bungee toggles for instant silhouette transformation",
      "Triple-needle seam reinforcement along high-stress points"
    ],
    modelInfo: "Model is 6'0\" (183cm), 170 lbs wearing Size M.",
    care: "Machine wash cold. Iron low if needed.",
    angles: [
      { label: "Front Standing", icon: "🏛️" },
      { label: "Cargo Pockets", icon: "📐" },
      { label: "Ankle Cinch", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Nocturne Multi-Pocket Baggy Cargo", "bottoms", "Front Elevation", "#131417", "340 GSM", "cargo"),
    angleImages: [
      createSvgAsset("Nocturne Multi-Pocket Baggy Cargo", "bottoms", "Angle 01: Front Baggy Volume", "#131417", "340 GSM", "cargo"),
      createSvgAsset("Nocturne Multi-Pocket Baggy Cargo", "bottoms", "Angle 02: 3D Bellows Pocket Profile", "#0e0f12", "340 GSM", "cargo"),
      createSvgAsset("Nocturne Multi-Pocket Baggy Cargo", "bottoms", "Angle 03: Metal D-Ring Hardware", "#1a1c21", "340 GSM", "cargo"),
      createSvgAsset("Nocturne Multi-Pocket Baggy Cargo", "bottoms", "Angle 04: Cinch Cord Bungee Hem", "#131417", "340 GSM", "cargo")
    ]
  },
  {
    id: "sr-09",
    slug: "architectural-tailored-shorts-nickers",
    title: "Architectural Tailored Shorts / Nickers",
    category: "bottoms",
    categoryLabel: "Luxury Bottoms",
    price: 135,
    description: "A fluid, knee-length statement short bridging relaxed suiting and avant-garde street silhouette. Cut with deep forward pleats, an extended rise, and a luxurious heavyweight tropical wool-viscose blend that drapes with graceful authority.",
    gsm: "310 GSM",
    fabric: "65% Fine Viscose, 35% Tropical Virgin Wool",
    fit: "Relaxed Wide-Leg Tailored",
    colors: [
      { name: "Monolith Grey", hex: "#2B2D31" },
      { name: "Deep Charcoal", hex: "#1A1B1E" }
    ],
    sizes: [
      { size: "S", sku: "SR-BT-09-S", stock: 12 },
      { size: "M", sku: "SR-BT-09-M", stock: 22 },
      { size: "L", sku: "SR-BT-09-L", stock: 15 },
      { size: "XL", sku: "SR-BT-09-XL", stock: 6 }
    ],
    badge: "New Season",
    badges: ["New Season", "Run 001", "Tailored Pleats"],
    features: [
      "Substantial tropical wool blend with fluid low-wrinkle drape",
      "Double forward front pleats and extended rise silhouette",
      "Curved tailored waistband with internal drawstring and belt loops",
      "Clean blind-stitched hem resting just below the knee cap",
      "Side slant welt pockets and back jetted horn-button pockets"
    ],
    modelInfo: "Model is 6'2\" (188cm) wearing Size L.",
    care: "Cold wash. Lay flat to dry.",
    angles: [
      { label: "Front View", icon: "🏛️" },
      { label: "Side Silhouette", icon: "📐" },
      { label: "Waistband Detail", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Architectural Tailored Shorts / Nickers", "bottoms", "Front Elevation", "#1f2126", "310 GSM", "tailored-shorts"),
    angleImages: [
      createSvgAsset("Architectural Tailored Shorts / Nickers", "bottoms", "Angle 01: Pleated Knee-Length Drape", "#1f2126", "310 GSM", "tailored-shorts"),
      createSvgAsset("Architectural Tailored Shorts / Nickers", "bottoms", "Angle 02: Rear Jetted Pocket Tailoring", "#181a1e", "310 GSM", "tailored-shorts"),
      createSvgAsset("Architectural Tailored Shorts / Nickers", "bottoms", "Angle 03: Tropical Wool Weave Macro", "#272a30", "310 GSM", "tailored-shorts"),
      createSvgAsset("Architectural Tailored Shorts / Nickers", "bottoms", "Angle 04: Waistband Internal Drawstring", "#1f2126", "310 GSM", "tailored-shorts")
    ]
  },
  {
    id: "sr-10",
    slug: "sacred-drape-boxy-minimal-tee",
    title: "Sacred Drape Boxy Minimal Tee",
    category: "streetwear",
    categoryLabel: "Architectural Streetwear",
    price: 95,
    description: "The quintessential luxury foundation. Cut from 280 GSM single-origin combed organic jersey with a high, substantial 1.25-inch mock rib collar that never curls or loses shape. Tailored with seamless sides and an intentional boxy torso.",
    gsm: "280 GSM",
    fabric: "100% GOTS Certified Combed Organic Jersey",
    fit: "Boxy Drop-Shoulder",
    colors: [
      { name: "Pure Onyx", hex: "#0D0D0E" },
      { name: "Alabaster White", hex: "#F5F3ED" },
      { name: "Concrete Grey", hex: "#7E8287" }
    ],
    sizes: [
      { size: "XS", sku: "SR-ST-10-XS", stock: 15 },
      { size: "S", sku: "SR-ST-10-S", stock: 30 },
      { size: "M", sku: "SR-ST-10-M", stock: 45 },
      { size: "L", sku: "SR-ST-10-L", stock: 35 },
      { size: "XL", sku: "SR-ST-10-XL", stock: 18 }
    ],
    badge: "Foundation Piece",
    badges: ["Core Essential", "Signature Drop", "100% GOTS Cotton"],
    features: [
      "280 GSM ultra-compact combed organic cotton jersey",
      "Reinforced 1.25-inch high-density ribbed neckband",
      "Drop-shoulder boxy cut with elbow-grazing sleeves",
      "Silicon-washed for a buttery, cool-to-touch surface texture",
      "Blind-hem finishing on cuffs and bottom hemline"
    ],
    modelInfo: "Model is 6'0\" (183cm) wearing Size M.",
    care: "Machine wash cold. Do not bleach.",
    angles: [
      { label: "Front Drape", icon: "🏛️" },
      { label: "Collar Structure", icon: "📐" },
      { label: "Fabric Texture", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Sacred Drape Boxy Minimal Tee", "streetwear", "Front Elevation", "#121316", "280 GSM", "minimal-tee"),
    angleImages: [
      createSvgAsset("Sacred Drape Boxy Minimal Tee", "streetwear", "Angle 01: Boxy Drop-Shoulder Fit", "#121316", "280 GSM", "minimal-tee"),
      createSvgAsset("Sacred Drape Boxy Minimal Tee", "streetwear", "Angle 02: Clean High-Rib Collar", "#0d0e10", "280 GSM", "minimal-tee"),
      createSvgAsset("Sacred Drape Boxy Minimal Tee", "streetwear", "Angle 03: Organic Cotton Jersey Surface", "#1a1b1f", "280 GSM", "minimal-tee"),
      createSvgAsset("Sacred Drape Boxy Minimal Tee", "streetwear", "Angle 04: Minimal Hem Flag Label", "#121316", "280 GSM", "minimal-tee")
    ]
  },
  {
    id: "sr-11",
    slug: "skyline-spire-ribbed-merino-beanie",
    title: "Skyline Spire Ribbed Merino Beanie",
    category: "streetwear",
    categoryLabel: "Architectural Streetwear",
    price: 75,
    description: "Spun from 100% extra-fine Australian merino wool in a dense 7-gauge half-cardigan knit. Adorned with a custom die-cast brushed gunmetal Skyline spire crest badge hand-riveted onto the fold-over cuff.",
    gsm: "7-Gauge Heavy Knit",
    fabric: "100% Extra-Fine Australian Merino Wool",
    fit: "Sculpted Crown Fold Cuff",
    colors: [
      { name: "Obsidian", hex: "#131314" },
      { name: "Heather Basalt", hex: "#505459" },
      { name: "Oatmeal Melange", hex: "#C8BEB2" }
    ],
    sizes: [
      { size: "One Size", sku: "SR-ST-11-OS", stock: 55 }
    ],
    badge: "100% Merino",
    badges: ["100% Merino Wool", "Signature Hardware", "Australian Yarn"],
    features: [
      "100% non-mulesed extra-fine Australian merino wool yarn",
      "Dense 7-gauge half-cardigan rib stitch with thermal retention",
      "Custom die-cast metal Skyline spire medallion with matte finish",
      "Zero itchy handfeel, naturally odor-resistant and breathable",
      "Form-holding four-piece crown shaping"
    ],
    modelInfo: "One size fits all. Sculpted crown with 3.5\" adjustable cuff.",
    care: "Dry clean or hand wash cold with wool detergent. Dry flat.",
    angles: [
      { label: "Front Crown", icon: "🏛️" },
      { label: "Hardware Crest", icon: "📐" },
      { label: "Knit Gauge", icon: "🧵" },
      { label: "Flat Lay", icon: "👕" }
    ],
    image: createSvgAsset("Skyline Spire Ribbed Merino Beanie", "streetwear", "Front Elevation", "#18191d", "7-Gauge", "beanie"),
    angleImages: [
      createSvgAsset("Skyline Spire Ribbed Merino Beanie", "streetwear", "Angle 01: Front Crown & Fold Cuff", "#18191d", "7-Gauge", "beanie"),
      createSvgAsset("Skyline Spire Ribbed Merino Beanie", "streetwear", "Angle 02: Hand-Riveted Gunmetal Crest", "#131417", "7-Gauge", "beanie"),
      createSvgAsset("Skyline Spire Ribbed Merino Beanie", "streetwear", "Angle 03: Half-Cardigan Rib Structure", "#212228", "7-Gauge", "beanie"),
      createSvgAsset("Skyline Spire Ribbed Merino Beanie", "streetwear", "Angle 04: Crown Four-Dart Tailoring", "#18191d", "7-Gauge", "beanie")
    ]
  },
  {
    id: "sr-12",
    slug: "monolith-rubberized-weekend-duffle",
    title: "Monolith Rubberized Weekend Duffle",
    category: "streetwear",
    categoryLabel: "Architectural Streetwear",
    price: 260,
    description: "An uncompromising travel vessel. Constructed from matte rubberized waterproof canvas with welded waterproof zippers, magnetic German Fidlock quick-release buckles, and an isolated ventilated shoe / laundry chamber.",
    gsm: "600D Rubberized Poly-Canvas",
    fabric: "600D Waterproof Rubberized Canvas & Ballistic Cordura Base",
    fit: "45L Weekender Spec",
    colors: [
      { name: "Stealth Matte Black", hex: "#111215" },
      { name: "Brutalist Concrete", hex: "#464A50" }
    ],
    sizes: [
      { size: "45L One Size", sku: "SR-ST-12-OS", stock: 18 }
    ],
    badge: "German Hardware",
    badges: ["Waterproof", "Low Stock", "German Hardware", "45L Volume"],
    features: [
      "Fully waterproof 600D matte rubberized canvas body",
      "High-frequency welded seams and Aquaguard YKK zippers",
      "German-engineered Fidlock magnetic sternum and shoulder hardware",
      "Dedicated ventilated subterranean compartment for footwear or gym gear",
      "Padded 16-inch laptop cocoon with microfiber lining"
    ],
    modelInfo: "Dimensions: 22\" L x 12\" W x 11\" H. 45-Liter capacity.",
    care: "Wipe clean with damp cloth.",
    angles: [
      { label: "Profile", icon: "🏛️" },
      { label: "Shoe Chamber", icon: "📐" },
      { label: "Fidlock Buckle", icon: "🧵" },
      { label: "Interior", icon: "👕" }
    ],
    image: createSvgAsset("Monolith Rubberized Weekend Duffle", "streetwear", "Front Elevation", "#151619", "600D Canvas", "duffle"),
    angleImages: [
      createSvgAsset("Monolith Rubberized Weekend Duffle", "streetwear", "Angle 01: Architectural Profile", "#151619", "600D Canvas", "duffle"),
      createSvgAsset("Monolith Rubberized Weekend Duffle", "streetwear", "Angle 02: Subterranean Ventilated Pod", "#101114", "600D Canvas", "duffle"),
      createSvgAsset("Monolith Rubberized Weekend Duffle", "streetwear", "Angle 03: Fidlock Quick-Release Hardware", "#1e2025", "600D Canvas", "duffle"),
      createSvgAsset("Monolith Rubberized Weekend Duffle", "streetwear", "Angle 04: Padded Laptop Cocoon Chamber", "#151619", "600D Canvas", "duffle")
    ]
  }
];

const outputPath = path.join(__dirname, 'products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`Successfully generated ${products.length} products to ${outputPath}`);
