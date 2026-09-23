/**
 * ==========================================================================
 * SKYLINE RELIGION — FLAGSHIP CATALOG & "EXPLORE THE FIT" ENGINE
 * Authentic Luxury Garments, 4:5 Visual Cards, Multi-Angle Thumbnails, Dual Model Specs
 * ==========================================================================
 */

const SKYLINE_PRODUCTS = [
  {
    id: "sr-01",
    slug: "skyline-arch-heavyweight-hoodie-noir",
    title: "Skyline Arch Heavyweight Hoodie",
    category: "essentials",
    categoryLabel: "Essentials & Fleece",
    price: 195,
    badge: "Signature Drop",
    gsm: "500 GSM",
    fabric: "100% Organic Portuguese Combed Loopback French Terry",
    fit: "Boxy Drop-Shoulder Architectural Drape",
    description: "Our signature silhouette engineered from bespoke 500 GSM Portuguese French terry. Features an unlined double-layer hood without drawstrings, articulated elbow darts, raw-edge reinforced hems, and a subtle micro-spire crest on the left wrist.",
    modelInfo: "Male model: 6'2\" (188cm), 180 lbs wearing Size L. Female model: 5'9\" (175cm), 130 lbs wearing Size S. Both styled for an architectural relaxed drape.",
    care: "Machine wash cold inside out. Flat air-dry to preserve textile density and structure.",
    features: [
      "Custom 500 GSM French Terry milled in Barcelos, Portugal",
      "Reinforced double-needle lock stitching throughout",
      "Seamless kangaroo pocket with concealed internal card sleeve",
      "Pre-shrunk fabric to guarantee zero dimensional shift"
    ],
    images: {
      front: "assets/products/sr-01-front.jpg",
      hover: "assets/products/sr-01-hover.jpg",
      back: "assets/products/sr-01-back.jpg",
      detail: "assets/products/sr-01-detail.jpg"
    },
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 19 },
      { size: "XL", stock: 6 },
      { size: "XXL", stock: 3 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
      rows: [
        { size: "S", in: ["44", "27.5", "22", "24.5"], cm: ["112", "70", "56", "62"] },
        { size: "M", in: ["47", "28.5", "23", "25.5"], cm: ["119", "72", "58", "65"] },
        { size: "L", in: ["50", "29.5", "24", "26.5"], cm: ["127", "75", "61", "67"] },
        { size: "XL", in: ["53", "30.5", "25", "27.0"], cm: ["135", "77", "63", "69"] },
        { size: "XXL", in: ["56", "31.5", "26", "27.5"], cm: ["142", "80", "66", "70"] }
      ]
    }
  },
  {
    id: "sr-02",
    slug: "skyline-arch-heavyweight-hoodie-cream",
    title: "Skyline Arch Hoodie — Alabaster",
    category: "essentials",
    categoryLabel: "Essentials & Fleece",
    price: 195,
    badge: "New Colorway",
    gsm: "500 GSM",
    fabric: "100% Unbleached Organic French Terry",
    fit: "Boxy Drop-Shoulder Architectural Drape",
    description: "Rendered in unbleached natural alabaster cream with delicate oat grain flecks. Heavyweight 500 GSM loopback drape provides protective warmth with a clean, sculptural aesthetic.",
    modelInfo: "Male model: 6'1\" (185cm) wearing Size M. Female model: 5'8\" (173cm) wearing Size S.",
    care: "Gentle cold wash with light colors. Lay flat on dry surface.",
    features: [
      "500 GSM unbleached organic cotton",
      "Dense double-knit hood construction",
      "Articulated underarm gussets for fluid arm rotation",
      "Micro-embroidered tonal skyline mark on hem"
    ],
    images: {
      front: "assets/products/sr-02-front.jpg",
      hover: "assets/products/sr-02-hover.jpg",
      back: "assets/products/sr-02-back.jpg"
    },
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 12 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 4 },
      { size: "XXL", stock: 2 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
      rows: [
        { size: "S", in: ["44", "27.5", "22", "24.5"], cm: ["112", "70", "56", "62"] },
        { size: "M", in: ["47", "28.5", "23", "25.5"], cm: ["119", "72", "58", "65"] },
        { size: "L", in: ["50", "29.5", "24", "26.5"], cm: ["127", "75", "61", "67"] },
        { size: "XL", in: ["53", "30.5", "25", "27.0"], cm: ["135", "77", "63", "69"] },
        { size: "XXL", in: ["56", "31.5", "26", "27.5"], cm: ["142", "80", "66", "70"] }
      ]
    }
  },
  {
    id: "sr-03",
    slug: "sacred-drape-boxy-minimal-tee",
    title: "Sacred Drape Boxy Minimal Tee",
    category: "essentials",
    categoryLabel: "Essentials & Fleece",
    price: 95,
    badge: "Foundation Piece",
    gsm: "280 GSM",
    fabric: "Combed Long-Staple Cotton Luxury Single Jersey",
    fit: "Wide-Cut Relaxed Boxy Silhouette",
    description: "The quintessential foundational t-shirt. Constructed with a 1.25\" seamless double-ribbed collar that never rolls or sags. The heavyweight 280 GSM jersey hangs cleanly away from the frame.",
    modelInfo: "Male model: 6'0\" (183cm), 172 lbs wearing Size M. Female model: 5'8\" (173cm) wearing Size S.",
    care: "Machine wash cold. Do not tumble dry.",
    features: [
      "280 GSM combed long-staple cotton",
      "Thick shape-retaining seamless ribbed collar",
      "Blind-stitched sleeve openings and waistline",
      "Preshrunk yarn with enzyme wash finish"
    ],
    images: {
      front: "assets/products/sr-03-front.jpg"
    },
    sizes: [
      { size: "S", stock: 16 },
      { size: "M", stock: 25 },
      { size: "L", stock: 22 },
      { size: "XL", stock: 10 },
      { size: "XXL", stock: 5 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
      rows: [
        { size: "S", in: ["42", "28.0", "20.5", "9.0"], cm: ["107", "71", "52", "23"] },
        { size: "M", in: ["45", "29.0", "21.5", "9.5"], cm: ["114", "74", "55", "24"] },
        { size: "L", in: ["48", "30.0", "22.5", "10.0"], cm: ["122", "76", "57", "25"] },
        { size: "XL", in: ["51", "31.0", "23.5", "10.5"], cm: ["130", "79", "60", "27"] }
      ]
    }
  },
  {
    id: "sr-04",
    slug: "metropolitan-relaxed-evening-suit",
    title: "Metropolitan Relaxed Evening Suit",
    category: "tailoring",
    categoryLabel: "Tailoring & Suiting",
    price: 580,
    badge: "Signature Suiting",
    gsm: "340 GSM",
    fabric: "Italian Virgin Wool & Mulberry Silk Gabardine",
    fit: "Deconstructed Fluid Tailoring",
    description: "A tailored collision of Savile Row discipline and Lower Manhattan midnight rhythm. Soft unpadded shoulders, floating canvas interior, and relaxed trousers that pool effortlessly over heavy footwear.",
    modelInfo: "Male model: 6'2\" wearing Size 40R (L). Female model: 5'9\" wearing Size 36R (S). Both styled relaxed.",
    care: "Dry clean only. Store on shaped wooden coat hanger.",
    features: [
      "Italian 340 GSM virgin wool & silk blend",
      "Full cupro breathable jacquard lining",
      "Horn buttons with hand-wound shanks",
      "Wide forward-pleat trousers with interior waist adjusters"
    ],
    images: {
      front: "assets/products/sr-04-front.jpg"
    },
    sizes: [
      { size: "36R", stock: 4 },
      { size: "38R", stock: 8 },
      { size: "40R", stock: 11 },
      { size: "42R", stock: 5 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Chest", "Waist", "Inseam", "Jacket Lgth"],
      rows: [
        { size: "36R", in: ["38", "30", "31.5", "29.5"], cm: ["96", "76", "80", "75"] },
        { size: "38R", in: ["40", "32", "32.0", "30.0"], cm: ["102", "81", "81", "76"] },
        { size: "40R", in: ["42", "34", "32.5", "30.5"], cm: ["107", "86", "83", "77"] },
        { size: "42R", in: ["44", "36", "33.0", "31.0"], cm: ["112", "91", "84", "79"] }
      ]
    }
  },
  {
    id: "sr-05",
    slug: "structure-oversized-city-blazer",
    title: "Structure Oversized City Blazer",
    category: "tailoring",
    categoryLabel: "Tailoring & Suiting",
    price: 340,
    badge: "Editorial Cut",
    gsm: "380 GSM",
    fabric: "Heavyweight Worsted Wool Twill",
    fit: "Exaggerated Architectural Silhouette",
    description: "Engineered for dynamic city movement. Features bold peaked lapels, functional surgeon cuffs, and structured drop shoulders that drape naturally over both tailored trousers and vintage denim.",
    modelInfo: "Model: 5'9\" (175cm) wearing Size S for an oversized runway drape.",
    care: "Specialist dry clean only.",
    features: [
      "380 GSM worsted wool twill from Biella, Italy",
      "Double-breasted front with matte horn buttons",
      "Deep interior smartphone and passport jet pockets",
      "Subtle interior skyline coordinates label"
    ],
    images: {
      front: "assets/products/sr-05-front.jpg"
    },
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 7 },
      { size: "M", stock: 9 },
      { size: "L", stock: 4 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Bust/Chest", "Length", "Shoulder", "Sleeve"],
      rows: [
        { size: "XS", in: ["40", "30.0", "19.5", "24.0"], cm: ["102", "76", "49", "61"] },
        { size: "S", in: ["43", "30.5", "20.5", "24.5"], cm: ["109", "77", "52", "62"] },
        { size: "M", in: ["46", "31.0", "21.5", "25.0"], cm: ["117", "79", "55", "64"] },
        { size: "L", in: ["49", "31.5", "22.5", "25.5"], cm: ["124", "80", "57", "65"] }
      ]
    }
  },
  {
    id: "sr-06",
    slug: "empire-relaxed-pleated-trousers",
    title: "Empire Relaxed Pleated Trousers",
    category: "tailoring",
    categoryLabel: "Tailoring & Suiting",
    price: 220,
    badge: "Architectural Cut",
    gsm: "310 GSM",
    fabric: "Wool-Viscose Fluid Gabardine",
    fit: "High-Rise Wide-Leg with Forward Pleats",
    description: "Twin forward pleats deliver a sculptural, fluid drape that commands attention while in stride. Outfitted with hidden interior waist cinch tabs for an exact fit without belt loops.",
    modelInfo: "Male model: 6'1\" (185cm), 31\" waist wearing Size 32 (M). Female model: 5'9\" wearing Size 30 (S).",
    care: "Dry clean or steam gentle cold wash. Air-dry.",
    features: [
      "Fluid 310 GSM wool-viscose blend",
      "Double forward pleat tailoring",
      "Concealed side-seam slash pockets",
      "Extra wide 24\" bottom leg opening"
    ],
    images: {
      front: "assets/products/sr-06-front.jpg"
    },
    sizes: [
      { size: "30", stock: 5 },
      { size: "32", stock: 11 },
      { size: "34", stock: 8 },
      { size: "36", stock: 3 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Waist", "Inseam", "Rise", "Leg Open"],
      rows: [
        { size: "30", in: ["30.5", "31.5", "13.0", "23.0"], cm: ["77", "80", "33", "58"] },
        { size: "32", in: ["32.5", "32.0", "13.5", "24.0"], cm: ["82", "81", "34", "61"] },
        { size: "34", in: ["34.5", "32.5", "14.0", "24.5"], cm: ["88", "83", "36", "62"] },
        { size: "36", in: ["36.5", "33.0", "14.5", "25.0"], cm: ["93", "84", "37", "63"] }
      ]
    }
  },
  {
    id: "sr-07",
    slug: "kinetic-architectural-training-joggers",
    title: "Kinetic Interlock Training Joggers",
    category: "movement",
    categoryLabel: "Movement & Athletics",
    price: 165,
    badge: "Core Movement",
    gsm: "420 GSM",
    fabric: "High-Density Double-Knit Cotton Interlock",
    fit: "Ergonomic Taper with Articulated Knee Darts",
    description: "Engineered for morning athletic training and evening city transit. Dense 420 GSM double-knit cotton retains form permanently without bagging at the knees. Concealed AquaGuard pocket zippers.",
    modelInfo: "Model: 6'0\" (183cm), 175 lbs athletic build wearing Size M.",
    care: "Machine wash cold. Line dry in shade.",
    features: [
      "420 GSM double-knit cotton interlock with structural memory",
      "Ergonomic articulated knee darts",
      "YKK AquaGuard waterproof zipper pockets",
      "Heavy braided tubular drawstrings with silver aglets"
    ],
    images: {
      front: "assets/products/sr-07-front.jpg"
    },
    sizes: [
      { size: "S", stock: 9 },
      { size: "M", stock: 16 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 5 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Waist", "Inseam", "Hip", "Rise"],
      rows: [
        { size: "S", in: ["29-31", "30.0", "40", "11.5"], cm: ["74-79", "76", "102", "29"] },
        { size: "M", in: ["32-34", "30.5", "43", "12.0"], cm: ["81-86", "77", "109", "30"] },
        { size: "L", in: ["35-37", "31.0", "46", "12.5"], cm: ["89-94", "79", "117", "32"] },
        { size: "XL", in: ["38-40", "31.5", "49", "13.0"], cm: ["96-102", "80", "124", "33"] }
      ]
    }
  },
  {
    id: "sr-08",
    slug: "skyline-selvedge-denim-trucker-jacket-raw-black",
    title: "Selvedge Denim Trucker Jacket — Raw Noir",
    category: "outerwear",
    categoryLabel: "Outerwear & Acc",
    price: 265,
    badge: "Japanese Selvedge",
    gsm: "14.5 oz",
    fabric: "Kuroki Mills 14.5 oz Raw Shuttle-Loomed Selvedge Denim",
    fit: "Boxy Cropped Architectural Silhouette",
    description: "Constructed from 14.5 oz raw Japanese selvedge denim milled in Okayama on vintage Toyoda shuttle looms. Features custom cast antique nickel shank buttons, red selvedge ID line along the internal front placket, and dual chest flap pockets.",
    modelInfo: "Male model: 6'2\" (188cm), 180 lbs wearing Size L. Female model: 5'9\" (175cm) wearing Size M for an oversized drape.",
    care: "Dry clean or soak cold inside out without detergent. Hang dry in shade.",
    features: [
      "14.5 oz raw selvedge denim from Kuroki Mills, Okayama",
      "Red-line selvedge visible along front interior button facing",
      "Custom engraved antique nickel shank buttons",
      "Reinforced felled seams with heavy copper core thread"
    ],
    images: {
      front: "assets/products/sr-08-front.jpg"
    },
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 11 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 4 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
      rows: [
        { size: "S", in: ["42", "25.0", "19.5", "25.0"], cm: ["107", "64", "50", "63"] },
        { size: "M", in: ["45", "26.0", "20.5", "25.5"], cm: ["114", "66", "52", "65"] },
        { size: "L", in: ["48", "27.0", "21.5", "26.0"], cm: ["122", "69", "55", "66"] },
        { size: "XL", in: ["51", "28.0", "22.5", "26.5"], cm: ["130", "71", "57", "67"] }
      ]
    }
  },
  {
    id: "sr-09",
    slug: "metropolitan-foundations-boxy-tee-noir",
    title: "Metropolitan Foundations Boxy Tee — Noir",
    category: "essentials",
    categoryLabel: "Essentials & Fleece",
    price: 95,
    badge: "Foundation Piece",
    gsm: "280 GSM",
    fabric: "100% Combed Long-Staple Luxury Jersey",
    fit: "Wide-Cut Relaxed Drop-Shoulder",
    description: "The dark counterpart to our foundational tee. Pitch-black 280 GSM combed cotton jersey with high-density blind-stitch hems and a thick seamless rib collar that maintains its shape through daily wear.",
    modelInfo: "Male model: 6'1\" (185cm) wearing Size L. Female model: 5'9\" (175cm) wearing Size S.",
    care: "Machine wash cold with dark colors. Flat air dry.",
    features: [
      "280 GSM long-staple combed cotton",
      "Thick shape-retaining seamless ribbed collar",
      "Blind-stitched sleeve openings and waistline",
      "Reactive black dye guaranteed not to fade"
    ],
    images: {
      front: "assets/products/sr-09-front.jpg",
      hover: "assets/products/sr-09-hover.jpg"
    },
    sizes: [
      { size: "S", stock: 14 },
      { size: "M", stock: 22 },
      { size: "L", stock: 19 },
      { size: "XL", stock: 8 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
      rows: [
        { size: "S", in: ["42", "28.0", "20.5", "9.0"], cm: ["107", "71", "52", "23"] },
        { size: "M", in: ["45", "29.0", "21.5", "9.5"], cm: ["114", "74", "55", "24"] },
        { size: "L", in: ["48", "30.0", "22.5", "10.0"], cm: ["122", "76", "57", "25"] },
        { size: "XL", in: ["51", "31.0", "23.5", "10.5"], cm: ["130", "79", "60", "27"] }
      ]
    }
  },
  {
    id: "sr-10",
    slug: "skyline-spire-structured-studio-cap",
    title: "Skyline Spire Structured Studio Cap",
    category: "outerwear",
    categoryLabel: "Outerwear & Acc",
    price: 75,
    badge: "Studio Edition",
    gsm: "380 GSM",
    fabric: "Heavy Washed Cotton Chino Twill",
    fit: "Unstructured 6-Panel Low Profile",
    description: "Minimalist headwear finished with a tonal embroidered micro-spire insignia on the left temple. Rear closure features a self-fabric strap with an engraved antique silver buckle.",
    modelInfo: "One Size Fits All (Adjustable circumference 54cm–62cm).",
    care: "Spot clean only with soft damp microfiber cloth.",
    features: [
      "Heavy washed 380 GSM cotton chino twill",
      "Tonal micro-spire high-density embroidery",
      "Solid cast antique silver adjuster buckle",
      "Curved visor with double-stitch reinforcement"
    ],
    images: {
      front: "assets/products/sr-10-front.jpg"
    },
    sizes: [
      { size: "ONE SIZE", stock: 22 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Circumference", "Crown Depth", "Brim Length"],
      rows: [
        { size: "ONE SIZE", in: ["21.5 - 24.5", "6.2", "2.8"], cm: ["54 - 62", "16", "7"] }
      ]
    }
  },
  {
    id: "sr-11",
    slug: "nocturne-burgundy-heavyweight-hoodie",
    title: "Nocturne Burgundy Heavyweight Hoodie",
    category: "essentials",
    categoryLabel: "Essentials & Fleece",
    price: 210,
    badge: "Limited Dye",
    gsm: "520 GSM",
    fabric: "100% Portuguese Dense Combed Loopback Terry",
    fit: "Boxy Drop-Shoulder Silhouette",
    description: "Dyed in our signature deep oxblood/burgundy tone with tonal high-density chest embroidery. 520 GSM Portuguese loopback terry provides monumental drape and insulation during cold nights.",
    modelInfo: "Male model: 6'2\" (188cm) wearing Size L. Female model: 5'9\" (175cm) wearing Size S.",
    care: "Cold wash inside out with like dark colors. Flat air dry.",
    features: [
      "520 GSM Portuguese combed loopback fleece",
      "Signature deep oxblood mineral wash",
      "Seamless front kangaroo pocket",
      "Thick ribbed collar and cuffs with reinforced bartacks"
    ],
    images: {
      front: "assets/products/sr-11-front.jpg"
    },
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 8 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 3 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
      rows: [
        { size: "S", in: ["44", "27.5", "22", "24.5"], cm: ["112", "70", "56", "62"] },
        { size: "M", in: ["47", "28.5", "23", "25.5"], cm: ["119", "72", "58", "65"] },
        { size: "L", in: ["50", "29.5", "24", "26.5"], cm: ["127", "75", "61", "67"] },
        { size: "XL", in: ["53", "30.5", "25", "27.0"], cm: ["135", "77", "63", "69"] }
      ]
    }
  },
  {
    id: "sr-12",
    slug: "studio-atelier-tri-color-capsule-collection",
    title: "Studio Atelier Tri-Color Capsule Collection",
    category: "outerwear",
    categoryLabel: "Outerwear & Acc",
    price: 440,
    badge: "Atelier Bundle",
    gsm: "Multi-Density (280–520 GSM)",
    fabric: "Portuguese Fleece, Selvedge Denim & Jersey",
    fit: "Complete Coordinated Metropolitan Uniform",
    description: "The definitive three-piece urban uniform bundle: Includes the 500 GSM Arch Hoodie, 280 GSM Boxy Tee, and 420 GSM Training Joggers. Shipped in our bespoke magnetic matte-black presentation box.",
    modelInfo: "Sizing custom configured across individual garments upon checkout.",
    care: "Follow individual garment care specifications.",
    features: [
      "Includes 3 signature pieces: Hoodie, Boxy Tee, and Kinetic Joggers",
      "Packaged in bespoke matte-black rigid magnetic presentation box",
      "Numbered certificate of authentic atelier production",
      "Complimentary insured express courier delivery"
    ],
    images: {
      front: "assets/products/sr-12-front.jpg"
    },
    sizes: [
      { size: "S", stock: 3 },
      { size: "M", stock: 7 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 2 }
    ],
    sizeGuide: {
      unit: "inches",
      headers: ["Size", "Hoodie Chest", "Tee Chest", "Jogger Waist"],
      rows: [
        { size: "S", in: ["44", "42", "29-31"], cm: ["112", "107", "74-79"] },
        { size: "M", in: ["47", "45", "32-34"], cm: ["119", "114", "81-86"] },
        { size: "L", in: ["50", "48", "35-37"], cm: ["127", "122", "89-94"] },
        { size: "XL", in: ["53", "51", "38-40"], cm: ["135", "130", "96-102"] }
      ]
    }
  }
];

const SKYLINE_COLLECTIONS = {
  sweatshirts: ['sr-01', 'sr-02', 'sr-11'],
  gym: ['sr-07'],
  streetwear: ['sr-08', 'sr-09', 'sr-10'],
  loungewear: ['sr-03', 'sr-06', 'sr-07'],
  bottoms: ['sr-03', 'sr-06', 'sr-07']
};

class CatalogManager {
  constructor() {
    this.products = [...SKYLINE_PRODUCTS];
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.activeSort = 'featured';
    this.activeProduct = null;
    this.selectedSize = null;
    this.sizeGuideUnit = 'inches';
    this.wishlist = new Set(JSON.parse(localStorage.getItem('skyline_wishlist') || '[]'));

    this.gridElement = document.getElementById('products-grid');
    this.modalBackdrop = document.getElementById('product-modal-backdrop');

    this.init();
  }

  async init() {
    this.updateCategoryCounts();
    this.bindFilters();
    this.bindSearchAndSort();
    this.bindModalEvents();
    this.render();
  }

  updateCategoryCounts() {
    const counts = {
      all: this.products.length,
      essentials: 0,
      tailoring: 0,
      movement: 0,
      outerwear: 0
    };

    this.products.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });

    document.querySelectorAll('.filter-pill').forEach(pill => {
      const cat = pill.getAttribute('data-category');
      const label = pill.getAttribute('data-label') || pill.textContent.split('(')[0].trim();
      pill.setAttribute('data-label', label);
      const count = SKYLINE_COLLECTIONS[cat]
        ? SKYLINE_COLLECTIONS[cat].length
        : (counts[cat] !== undefined ? counts[cat] : 0);
      pill.textContent = `${label} (${count})`;
    });
  }

  bindFilters() {
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        pills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
        this.activeCategory = pill.getAttribute('data-category');
        this.render();
      });
    });
  }

  filterCategory(categoryName) {
    const targetPill = document.querySelector(`.filter-pill[data-category="${categoryName}"]`);
    if (targetPill) {
      targetPill.click();
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  viewWishlist() {
    document.querySelectorAll('.filter-pill').forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-pressed', 'false');
    });
    this.activeCategory = 'wishlist';
    this.render();
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  }

  bindSearchAndSort() {
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.activeSort = e.target.value;
        this.render();
      });
    }
  }

  toggleWishlist(productId, btn) {
    if (this.wishlist.has(productId)) {
      this.wishlist.delete(productId);
      if (btn) btn.classList.remove('active');
    } else {
      this.wishlist.add(productId);
      if (btn) btn.classList.add('active');
    }
    localStorage.setItem('skyline_wishlist', JSON.stringify([...this.wishlist]));
    this.updateWishlistBadge();
    if (this.activeCategory === 'wishlist') this.render();
  }

  updateWishlistBadge() {
    const badge = document.getElementById('wishlist-badge-count');
    if (badge) {
      const count = this.wishlist.size;
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  getFilteredProducts() {
    let result = this.products.filter((item) => {
      const matchesCategory = this.activeCategory === 'all'
        || (this.activeCategory === 'wishlist' ? this.wishlist.has(item.id) : (SKYLINE_COLLECTIONS[this.activeCategory]
          ? SKYLINE_COLLECTIONS[this.activeCategory].includes(item.id)
          : item.category === this.activeCategory));
      const matchesSearch = !this.searchQuery ||
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery) ||
        item.fabric.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (this.activeSort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.activeSort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.activeSort === 'density') {
      result.sort((a, b) => {
        const gsmA = parseInt(a.gsm) || 0;
        const gsmB = parseInt(b.gsm) || 0;
        return gsmB - gsmA;
      });
    }

    return result;
  }

  render() {
    if (!this.gridElement) return;

    const filtered = this.getFilteredProducts();

    if (filtered.length === 0) {
      this.gridElement.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-tertiary);">
          <h3 style="font-size: 18px; color: var(--text-primary); margin-bottom: 6px;">No Pieces Found</h3>
          <p style="font-size: 13px;"></p>
        </div>
      `;
      const queryLine = this.gridElement.querySelector('p');
      if (queryLine) {
        if (this.searchQuery) {
          queryLine.textContent = `No garments match "${this.searchQuery}". Select another category or clear search filter.`;
        } else if (this.activeCategory === 'wishlist') {
          queryLine.textContent = 'Your wishlist is empty. Save pieces with the heart icon to see them here.';
        } else {
          queryLine.textContent = 'No garments match this category. Select another category or clear the search filter.';
        }
      }
      return;
    }

    this.gridElement.innerHTML = filtered.map((item) => {
      const totalStock = item.sizes.reduce((sum, s) => sum + s.stock, 0);
      const stockBadge = totalStock < 10
        ? `<span class="product-badge-tag" style="color: #EF4444; border-color: rgba(239, 68, 68, 0.4);">Only ${totalStock} Left</span>`
        : `<span class="product-badge-tag">${item.badge || 'Signature'}</span>`;

      const isWishlisted = this.wishlist.has(item.id);
      const frontImg = item.images ? item.images.front : `assets/products/${item.id}-front.jpg`;
      const hoverImg = (item.images && item.images.hover) || frontImg;

      const sizePills = item.sizes.map(s => `
        <button class="size-pill-btn" data-id="${item.id}" data-size="${s.size}" ${s.stock === 0 ? 'disabled style="opacity: 0.35; text-decoration: line-through;"' : ''}>
          ${s.size}
        </button>
      `).join('');

      return `
        <div class="product-card-3d" data-id="${item.id}">
          <div class="product-card-inner">
            <div class="card-specular-glare"></div>
            ${stockBadge}

            <!-- Wishlist Heart Button -->
            <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${item.id}" aria-label="Save to Wishlist" title="Save Piece">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <!-- 4:5 Aspect Ratio Container with Hover Image Flip -->
            <div class="product-visual-wrap" data-id="${item.id}">
              <img src="${frontImg}" alt="${item.title} front elevation" class="product-img-front" loading="lazy">
              <img src="${hoverImg}" alt="${item.title} on-body perspective" class="product-img-hover" loading="lazy">
              <div class="quick-size-overlay">
                ${sizePills}
              </div>
            </div>

            <!-- Product Meta Details -->
            <div class="product-details" data-id="${item.id}">
              <div class="product-title-row">
                <h3 class="product-title">${item.title}</h3>
                <span class="product-price">$${item.price}</span>
              </div>
              <div class="product-meta-row">
                <span class="gsm-indicator">${item.gsm}</span>
                <span>${item.fit}</span>
              </div>
              <p class="product-brief-desc">${item.description}</p>

              <div class="product-card-actions-row">
                <button class="card-explore-btn" data-id="${item.id}">
                  <span>${this.modalBackdrop ? 'Inspect Piece' : 'View Dossier'}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <a href="product.html?id=${item.id}" class="dossier-link" title="Technical Dossier">
                  <span>Dossier &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.bindCardInteractions();
    this.updateWishlistBadge();
  }

  bindCardInteractions() {
    const sizeBtns = this.gridElement.querySelectorAll('.size-pill-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const size = btn.getAttribute('data-size');
        const product = this.products.find(p => p.id === id);
        if (product && window.cartManager) {
          window.cartManager.addItem(product, size);
          MotionSystem.triggerHapticFeedback(btn);
        }
      });
    });

    const wishlistBtns = this.gridElement.querySelectorAll('.card-wishlist-btn');
    wishlistBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.toggleWishlist(id, btn);
      });
    });

    const exploreBtns = this.gridElement.querySelectorAll('.card-explore-btn');
    exploreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (this.modalBackdrop) this.openModal(id);
        else window.location.href = `product.html?id=${encodeURIComponent(id)}`;
      });
    });

    const cards = this.gridElement.querySelectorAll('.product-card-3d');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.size-pill-btn') || e.target.closest('.card-wishlist-btn') || e.target.closest('.dossier-link') || e.target.closest('.card-explore-btn')) {
          return;
        }
        const id = card.getAttribute('data-id');
        if (this.modalBackdrop) this.openModal(id);
        else window.location.href = `product.html?id=${encodeURIComponent(id)}`;
      });
    });
  }

  openModal(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product || !this.modalBackdrop) return;

    this.activeProduct = product;
    this.selectedSize = product.sizes.find(s => s.stock > 0)?.size || product.sizes[0].size;

    const modalImg = document.getElementById('modal-primary-img');
    const frontImgPath = product.images ? product.images.front : `assets/products/${product.id}-front.jpg`;
    if (modalImg) {
      modalImg.src = frontImgPath;
      modalImg.alt = `${product.title} front perspective`;
    }

    // Build real image thumbnails
    const angleStrip = document.getElementById('modal-angle-strip');
    if (angleStrip && product.images) {
      const seenSrc = new Set();
      const views = [
        { key: 'front', label: 'Front', src: product.images.front },
        { key: 'hover', label: 'On-Body', src: product.images.hover },
        { key: 'back', label: 'Back', src: product.images.back },
        { key: 'detail', label: 'Weave', src: product.images.detail }
      ].filter(v => v.src && !seenSrc.has(v.src) && seenSrc.add(v.src));

      angleStrip.innerHTML = views.map((v, i) => `
        <button class="thumb-preview-card ${i === 0 ? 'active' : ''}" data-angle="${v.key}" aria-label="View ${v.label} perspective">
          <img src="${v.src}" alt="${v.label}">
          <span>${v.label}</span>
        </button>
      `).join('');

      const thumbs = angleStrip.querySelectorAll('.thumb-preview-card');
      thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          const angleKey = thumb.getAttribute('data-angle');
          if (modalImg && product.images[angleKey]) {
            modalImg.src = product.images[angleKey];
          }
        });
      });
    }

    // Populate modal text
    const titleEl = document.getElementById('modal-title');
    if (titleEl) titleEl.textContent = product.title;
    const priceEl = document.getElementById('modal-price');
    if (priceEl) priceEl.textContent = `$${product.price}`;
    const badgeEl = document.getElementById('modal-badge');
    if (badgeEl) badgeEl.textContent = product.badge || 'Signature';
    const descEl = document.getElementById('modal-description');
    if (descEl) descEl.textContent = product.description;
    const gsmEl = document.getElementById('modal-gsm');
    if (gsmEl) gsmEl.textContent = product.gsm;
    const fabricEl = document.getElementById('modal-fabric');
    if (fabricEl) fabricEl.textContent = product.fabric;
    const fitEl = document.getElementById('modal-fit');
    if (fitEl) fitEl.textContent = product.fit;
    const modelEl = document.getElementById('modal-model');
    if (modelEl) modelEl.textContent = product.modelInfo;
    const careEl = document.getElementById('modal-care');
    if (careEl) careEl.textContent = product.care;

    const featureList = document.getElementById('modal-features');
    if (featureList) {
      featureList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    }

    // Populate Size Pills
    const sizeContainer = document.getElementById('modal-sizes');
    if (sizeContainer) {
      sizeContainer.innerHTML = product.sizes.map(s => `
        <button class="size-choice-btn ${s.size === this.selectedSize ? 'selected' : ''}"
                data-size="${s.size}"
                ${s.stock === 0 ? 'disabled style="opacity: 0.35; text-decoration: line-through;"' : ''}>
          ${s.size} (${s.stock} left)
        </button>
      `).join('');

      sizeContainer.querySelectorAll('.size-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sizeContainer.querySelectorAll('.size-choice-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          this.selectedSize = btn.getAttribute('data-size');
        });
      });
    }

    // Render Size Guide
    this.renderModalSizeGuide(product);

    MotionSystem.openOverlay(this.modalBackdrop);
  }

  renderModalSizeGuide(product) {
    const guideContainer = document.getElementById('modal-size-guide-container');
    if (!guideContainer || !product.sizeGuide) return;

    const isInch = this.sizeGuideUnit === 'inches';
    const unitKey = isInch ? 'in' : 'cm';

    guideContainer.innerHTML = `
      <div class="size-guide-modal-pane">
        <div class="size-unit-toggle-row">
          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-tertiary); letter-spacing: 0.08em;">Atelier Sizing Guide</span>
          <div style="display: flex; gap: 4px;">
            <button class="unit-switch-btn ${isInch ? 'active' : ''}" id="unit-btn-in">Inches</button>
            <button class="unit-switch-btn ${!isInch ? 'active' : ''}" id="unit-btn-cm">CM</button>
          </div>
        </div>
        <table class="size-table">
          <thead>
            <tr>
              ${product.sizeGuide.headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${product.sizeGuide.rows.map(r => `
              <tr>
                <td style="font-weight: 700; color: var(--text-primary);">${r.size}</td>
                ${r[unitKey].map(val => `<td>${val}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const inBtn = document.getElementById('unit-btn-in');
    const cmBtn = document.getElementById('unit-btn-cm');
    if (inBtn && cmBtn) {
      inBtn.onclick = () => {
        this.sizeGuideUnit = 'inches';
        this.renderModalSizeGuide(product);
      };
      cmBtn.onclick = () => {
        this.sizeGuideUnit = 'cm';
        this.renderModalSizeGuide(product);
      };
    }
  }

  closeModal() {
    MotionSystem.closeOverlay(this.modalBackdrop);
  }

  bindModalEvents() {
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) {
          this.closeModal();
        }
      });
    }

    const addBagBtn = document.getElementById('modal-add-bag-btn');
    if (addBagBtn) {
      addBagBtn.addEventListener('click', () => {
        if (this.activeProduct && this.selectedSize && window.cartManager) {
          window.cartManager.addItem(this.activeProduct, this.selectedSize);
          MotionSystem.triggerHapticFeedback(addBagBtn);
          this.closeModal();
          window.cartManager.openDrawer();
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.catalogManager = new CatalogManager();
});
