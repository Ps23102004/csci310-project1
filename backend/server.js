/**
 * ==========================================================================
 * SKYLINE RELIGION — STANDALONE BACKEND REST API SERVER
 * Pure Node.js REST API with CORS, Catalog Filtering, Cart & Checkout Engine
 * CSCI 310 GUI & Game Programming
 * ==========================================================================
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = parseInt(process.env.PORT, 10) || 3001;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Deep clone initial products from products.json
let initialCatalog = [];
try {
  if (fs.existsSync(PRODUCTS_FILE)) {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    initialCatalog = Array.isArray(parsed) ? parsed : (parsed.products || []);
    console.log(`[Skyline Backend] Loaded ${initialCatalog.length} products from products.json`);
  } else {
    console.error(`[Skyline Backend] products.json not found at ${PRODUCTS_FILE}`);
  }
} catch (err) {
  console.error('[Skyline Backend] Error loading products.json:', err.message);
}

// In-Memory Catalog State (Inventory is modified on checkout)
let productsData = JSON.parse(JSON.stringify(initialCatalog));

// Supported Coupons
const COUPONS = {
  'SKYLINE10': { percent: 10, label: '10% Skyline Patron Privilege' },
  'VIP20': { percent: 20, label: '20% VIP Private Access' },
  'STUDENT15': { percent: 15, label: '15% Academic Scholar Privilege' },
  'CSCI310': { percent: 25, label: '25% CSCI 310 Flagship Access' }
};

// In-Memory Storage for Active Cart and Orders
let activeCart = {
  items: [],
  discountPercent: 0,
  appliedPromo: null
};

let ordersStore = [];

// Helper: CORS Headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
}

// Helper: Send JSON Response
function sendJson(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

// Helper: Parse Request Body safely
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) {
        // 1MB flood protection
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) {
        return resolve({});
      }
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('Malformed JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

// Helper: Calculate Cart Totals
function calculateCartTotals(cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = Math.round(((subtotal * cart.discountPercent) / 100) * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: cart.items,
    cart: cart.items, // Backwards-compatible alias
    subtotal,
    discount,
    discountPercent: cart.discountPercent,
    couponCode: cart.appliedPromo,
    appliedPromo: cart.appliedPromo, // Backwards-compatible alias
    shipping: 0,
    total,
    itemCount
  };
}

// Find product by id, slug, or case-insensitive match
function findProduct(identifier) {
  if (!identifier) return null;
  const cleanId = String(identifier).trim().toLowerCase();
  return productsData.find(p =>
    p.id.toLowerCase() === cleanId ||
    (p.slug && p.slug.toLowerCase() === cleanId)
  );
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  // Handle Pre-flight OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname || '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  const query = parsedUrl.query || {};

  try {
    // --------------------------------------------------------------------------
    // 1. GET /api/health
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, {
        status: 'ok',
        service: 'Skyline Religion Luxury REST API',
        timestamp: new Date().toISOString(),
        catalogCount: productsData.length,
        activeOrders: ordersStore.length,
        ordersCount: ordersStore.length,
        activeCartCount: activeCart.items.reduce((s, i) => s + i.quantity, 0),
        version: '1.0.0'
      });
    }

    // --------------------------------------------------------------------------
    // 2. GET /api/products
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/products') {
      let filtered = [...productsData];

      // Query param: category (e.g. sweatshirts, gym, bottoms, streetwear)
      if (query.category && query.category.toLowerCase() !== 'all') {
        const cat = query.category.toLowerCase();
        filtered = filtered.filter(p => p.category && p.category.toLowerCase() === cat);
      }

      // Query param: fit (e.g. boxy, oversized, relaxed, tapered)
      if (query.fit) {
        const fitSearch = query.fit.toLowerCase();
        filtered = filtered.filter(p => p.fit && p.fit.toLowerCase().includes(fitSearch));
      }

      // Query param: size (e.g. XS, S, M, L, XL, 30, 32)
      if (query.size) {
        const targetSize = query.size.toUpperCase();
        filtered = filtered.filter(p =>
          p.sizes && p.sizes.some(s => s.size.toUpperCase() === targetSize && s.stock > 0)
        );
      }

      // Query param: q (search in title, description, fabric, category)
      if (query.q) {
        const q = query.q.toLowerCase().trim();
        filtered = filtered.filter(p =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.fabric && p.fabric.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q)) ||
          (p.fit && p.fit.toLowerCase().includes(q))
        );
      }

      // Query param: sort (price-asc, price-desc, newest)
      if (query.sort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (query.sort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (query.sort === 'newest') {
        filtered.reverse();
      }

      return sendJson(res, 200, {
        count: filtered.length,
        total: productsData.length,
        products: filtered
      });
    }

    // --------------------------------------------------------------------------
    // 3. GET /api/products/:id
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname.startsWith('/api/products/')) {
      const id = pathname.replace('/api/products/', '');
      const product = findProduct(id);

      if (!product) {
        return sendJson(res, 404, {
          error: 'Product not found in Skyline Religion archive',
          requestedId: id
        });
      }

      // Add real-time total inventory calculation
      const totalInventory = (product.sizes || []).reduce((sum, s) => sum + s.stock, 0);

      return sendJson(res, 200, {
        ...product,
        totalInventory,
        inStock: totalInventory > 0
      });
    }

    // --------------------------------------------------------------------------
    // 4. GET /api/cart
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/cart') {
      const cartResponse = calculateCartTotals(activeCart);
      return sendJson(res, 200, cartResponse);
    }

    // --------------------------------------------------------------------------
    // 5. POST /api/cart
    // Handles action: "add" | "update" | "remove" | "clear" | "apply_coupon"
    // --------------------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/cart') {
      const body = await parseBody(req);
      const action = body.action || 'add';
      const targetId = body.productId || body.id;
      const targetSize = body.size ? String(body.size).toUpperCase() : 'M';
      const quantity = typeof body.quantity === 'number' ? body.quantity : 1;

      // ACTION: ADD
      if (action === 'add') {
        if (!targetId) {
          return sendJson(res, 400, { error: 'Missing product ID for add to cart' });
        }

        const product = findProduct(targetId);
        if (!product) {
          return sendJson(res, 404, { error: 'Product not found', productId: targetId });
        }

        // Check stock for specified size
        const sizeObj = product.sizes && product.sizes.find(s => s.size.toUpperCase() === targetSize);
        const availableStock = sizeObj ? sizeObj.stock : 0;

        if (availableStock <= 0) {
          return sendJson(res, 400, {
            error: `Size ${targetSize} for ${product.title} is currently out of stock.`,
            availableStock: 0
          });
        }

        const existingIndex = activeCart.items.findIndex(
          i => (i.id === product.id || i.slug === product.slug) && i.size.toUpperCase() === targetSize
        );

        const currentQtyInCart = existingIndex > -1 ? activeCart.items[existingIndex].quantity : 0;
        if (currentQtyInCart + quantity > availableStock) {
          return sendJson(res, 400, {
            error: `Cannot add ${quantity} item(s). Only ${availableStock - currentQtyInCart} remaining in vault.`,
            availableStock
          });
        }

        if (existingIndex > -1) {
          activeCart.items[existingIndex].quantity += quantity;
          activeCart.items[existingIndex].itemTotal = activeCart.items[existingIndex].quantity * product.price;
        } else {
          const selectedColor = body.color || (product.colors && product.colors[0] ? product.colors[0].name : 'Onyx Black');
          activeCart.items.push({
            id: product.id,
            productId: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            size: targetSize,
            color: selectedColor,
            gsm: product.gsm,
            category: product.category,
            image: product.image,
            sku: sizeObj ? sizeObj.sku : `${product.id}-${targetSize}`,
            quantity: quantity,
            itemTotal: quantity * product.price
          });
        }
      }
      // ACTION: UPDATE
      else if (action === 'update') {
        if (!targetId) {
          return sendJson(res, 400, { error: 'Missing product ID for cart update' });
        }

        const index = activeCart.items.findIndex(
          i => (i.id === targetId || i.productId === targetId || i.slug === targetId) && i.size.toUpperCase() === targetSize
        );

        if (index === -1) {
          return sendJson(res, 404, { error: 'Item not found in active cart' });
        }

        if (quantity <= 0) {
          activeCart.items.splice(index, 1);
        } else {
          const product = findProduct(targetId);
          if (product) {
            const sizeObj = product.sizes && product.sizes.find(s => s.size.toUpperCase() === targetSize);
            const availableStock = sizeObj ? sizeObj.stock : 999;
            if (quantity > availableStock) {
              return sendJson(res, 400, {
                error: `Requested quantity (${quantity}) exceeds available stock (${availableStock}).`,
                availableStock
              });
            }
          }
          activeCart.items[index].quantity = quantity;
          activeCart.items[index].itemTotal = quantity * activeCart.items[index].price;
        }
      }
      // ACTION: REMOVE
      else if (action === 'remove') {
        if (!targetId) {
          return sendJson(res, 400, { error: 'Missing product ID to remove' });
        }

        activeCart.items = activeCart.items.filter(
          i => !((i.id === targetId || i.productId === targetId || i.slug === targetId) && i.size.toUpperCase() === targetSize)
        );
      }
      // ACTION: CLEAR
      else if (action === 'clear') {
        activeCart.items = [];
        activeCart.discountPercent = 0;
        activeCart.appliedPromo = null;
      }
      // ACTION: APPLY_COUPON / APPLY_PROMO
      else if (action === 'apply_coupon' || action === 'apply_promo') {
        const rawCode = body.couponCode || body.code || body.promoCode || '';
        const cleanCode = rawCode.trim().toUpperCase();

        if (COUPONS[cleanCode]) {
          activeCart.discountPercent = COUPONS[cleanCode].percent;
          activeCart.appliedPromo = cleanCode;
        } else {
          return sendJson(res, 400, {
            error: `Invalid or expired reservation privilege code: "${rawCode}"`,
            validCoupons: Object.keys(COUPONS)
          });
        }
      } else {
        return sendJson(res, 400, {
          error: `Unsupported cart action: "${action}". Valid actions: add, update, remove, clear, apply_coupon`
        });
      }

      const updated = calculateCartTotals(activeCart);
      return sendJson(res, 200, {
        success: true,
        action,
        ...updated
      });
    }

    // --------------------------------------------------------------------------
    // 6. POST /api/checkout
    // Validates cart, reduces inventory, generates unique orderId, simulates payment
    // --------------------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/checkout') {
      const body = await parseBody(req);
      const itemsToCheckout = (body.items && body.items.length > 0) ? body.items : activeCart.items;

      if (!itemsToCheckout || itemsToCheckout.length === 0) {
        return sendJson(res, 400, {
          error: 'Cannot checkout with an empty wardrobe bag',
          code: 'EMPTY_CART'
        });
      }

      // Step 1: Validate stock across all requested items
      for (const cartItem of itemsToCheckout) {
        const prod = findProduct(cartItem.productId || cartItem.id);
        if (!prod) {
          return sendJson(res, 400, {
            error: `Product ${cartItem.title || cartItem.id} no longer exists in vault.`,
            code: 'PRODUCT_UNAVAILABLE'
          });
        }

        const sizeKey = (cartItem.size || 'M').toUpperCase();
        const sizeObj = prod.sizes && prod.sizes.find(s => s.size.toUpperCase() === sizeKey);
        const stock = sizeObj ? sizeObj.stock : 0;

        if (stock < cartItem.quantity) {
          return sendJson(res, 400, {
            error: `Insufficient stock for ${prod.title} (Size: ${sizeKey}). Requested: ${cartItem.quantity}, Available: ${stock}.`,
            code: 'INSUFFICIENT_STOCK',
            product: prod.title,
            size: sizeKey,
            availableStock: stock
          });
        }
      }

      // Step 2: Deduct inventory in real-time
      for (const cartItem of itemsToCheckout) {
        const prod = findProduct(cartItem.productId || cartItem.id);
        const sizeKey = (cartItem.size || 'M').toUpperCase();
        const sizeObj = prod.sizes && prod.sizes.find(s => s.size.toUpperCase() === sizeKey);
        if (sizeObj) {
          sizeObj.stock = Math.max(0, sizeObj.stock - cartItem.quantity);
        }
      }

      // Step 3: Compute final order financials
      const subtotal = itemsToCheckout.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discountPercent = body.discountPercent !== undefined ? body.discountPercent : activeCart.discountPercent;
      const discount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
      const shipping = 0; // Complimentary White-Glove Luxury Delivery
      const total = Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100);

      // Step 4: Generate unique Order ID
      const randomSegment = crypto.randomBytes(3).toString('hex').toUpperCase();
      const orderId = `SR-${Date.now().toString().slice(-6)}-${randomSegment}`;

      const customerInfo = body.customer || {
        name: body.customerName || 'VIP Patron',
        email: body.email || 'patron@skyline-religion.luxury'
      };

      const shippingAddress = body.shippingAddress || {
        addressLine: body.address || '450 North Meridian St',
        city: body.city || 'Indianapolis',
        state: body.state || 'IN',
        postalCode: body.postalCode || '46204',
        country: body.country || 'United States'
      };

      const paymentMethod = body.paymentMethod || 'Apple Pay (Biometric Device Pass)';

      const orderRecord = {
        orderId,
        status: 'confirmed',
        statusCode: 'VAULT_SETTLED',
        timestamp: new Date().toISOString(),
        customer: customerInfo,
        shippingAddress,
        paymentMethod,
        paymentStatus: 'paid_simulated',
        items: itemsToCheckout.map(i => ({
          id: i.id || i.productId,
          title: i.title,
          price: i.price,
          size: i.size,
          color: i.color || 'Onyx Black',
          quantity: i.quantity,
          itemTotal: i.price * i.quantity
        })),
        itemCount: itemsToCheckout.reduce((sum, i) => sum + i.quantity, 0),
        subtotal,
        discount,
        couponCode: body.couponCode || activeCart.appliedPromo || null,
        shipping,
        shippingMethod: 'Skyline White-Glove Courier (Carbon-Neutral)',
        total,
        currency: 'USD',
        estimatedDelivery: '2-3 Business Days'
      };

      ordersStore.unshift(orderRecord);

      // Clear active cart if checked out
      activeCart.items = [];
      activeCart.discountPercent = 0;
      activeCart.appliedPromo = null;

      return sendJson(res, 201, {
        success: true,
        message: 'Order confirmed and inventory vaulted successfully.',
        order: orderRecord
      });
    }

    // --------------------------------------------------------------------------
    // 7. GET /api/orders
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/orders') {
      return sendJson(res, 200, {
        count: ordersStore.length,
        orders: ordersStore
      });
    }

    // --------------------------------------------------------------------------
    // 8. POST /api/reset (Testing / Demo Reset Helper)
    // --------------------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/reset') {
      productsData = JSON.parse(JSON.stringify(initialCatalog));
      activeCart = { items: [], discountPercent: 0, appliedPromo: null };
      ordersStore = [];
      return sendJson(res, 200, {
        success: true,
        message: 'Catalog inventory, cart, and orders store reset to initial state.'
      });
    }

    // --------------------------------------------------------------------------
    // 9. POST /api/stylist (Local MiniCPM 5 2B AI Stylist & Suggestion Engine)
    // --------------------------------------------------------------------------
    if (req.method === 'POST' && pathname === '/api/stylist') {
      const body = await parseBody(req);
      const userPrompt = body.prompt || body.message || 'Recommend a luxury streetwear outfit.';
      const occasion = body.occasion || '';
      const fit = body.fitPreference || '';

      // Heuristic Fallback Engine
      const runHeuristic = () => {
        const lower = userPrompt.toLowerCase();
        let advice = "For an elevated metropolitan presence, prioritize fabric density and relaxed architectural volume. A 500 GSM loopback drape anchors the upper frame while selvedge denim provides structural permanence.";
        let recIds = ['sr-01', 'sr-07', 'sr-11'];

        if (lower.includes('gym') || lower.includes('workout') || lower.includes('squat') || occasion === 'gym') {
          advice = "For high-performance compound lifting, pair our 240 GSM silver-ion Aero-Compression with the Ascent Kinetic Joggers. Unrestricted lat mobility and graduated core support.";
          recIds = ['sr-04', 'sr-05', 'sr-06'];
        } else if (lower.includes('airport') || lower.includes('travel') || lower.includes('flight') || occasion === 'travel') {
          advice = "Long-haul flight sanctuary demands unhurried comfort. Layer our 500 GSM Arch Hoodie over the Ascent Joggers, accompanied by the 42L Monolith Rubberized Duffle.";
          recIds = ['sr-01', 'sr-06', 'sr-12'];
        } else if (lower.includes('denim') || lower.includes('streetwear') || lower.includes('baggy')) {
          advice = "Embrace architectural proportions: pair our 14.5oz Okayama Selvedge Wide Carpenter Jeans with the 280 GSM Boxy Minimal Tee and heavy Sanctuary Zip-Up.";
          recIds = ['sr-07', 'sr-10', 'sr-03'];
        } else if (lower.includes('lounge') || lower.includes('summer') || lower.includes('short')) {
          advice = "For warm-weather downtime, our 440 GSM Architectural Tailored Shorts (Nickers) pair effortlessly with the Sacred Drape Boxy Minimal Tee.";
          recIds = ['sr-09', 'sr-10', 'sr-11'];
        } else if (lower.includes('size') || lower.includes('height') || lower.includes('weight')) {
          advice = "Skyline Religion garments feature an intentional boxy drop-shoulder. For a 6'1\" (180 lbs) frame, Size L delivers our signature oversized drape, while Size M provides a refined tailored boxy fit.";
          recIds = ['sr-01', 'sr-02'];
        }

        const recommendedProducts = productsData.filter(p => recIds.includes(p.id));
        return {
          success: true,
          engine: 'vault_heuristic',
          mode: 'heuristic_fallback',
          stylistResponse: advice,
          stylingAdvice: advice,
          recommendedIds: recIds,
          recommendedProducts,
          curationCode: `SR-STYLIST-${Math.floor(1000 + Math.random() * 9000)}`
        };
      };

      // Try local MLX worker running MiniCPM 5 2B on port 8767
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4500);

        const mlxRes = await fetch('http://127.0.0.1:8767/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'minicpm5:2b-mlx',
            messages: [
              {
                role: 'system',
                content: 'You are the Master Stylist and Architectural Wardrobe Director for Skyline Religion, an ultra-luxury streetwear house. Reference pieces by id: sr-01 (Arch Hoodie 500 GSM), sr-04 (Compression Longsleeve), sr-07 (Okayama Selvedge Jeans), sr-11 (Merino Beanie). Provide concise, refined advice.'
              },
              { role: 'user', content: userPrompt }
            ],
            max_tokens: 280,
            temperature: 0.7
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (mlxRes.ok) {
          const mlxData = await mlxRes.json();
          const reply = mlxData.choices?.[0]?.message?.content || '';
          if (reply) {
            // Extract any referenced product IDs
            const matches = reply.match(/sr-\d{2}/gi) || ['sr-01', 'sr-07'];
            const uniqueIds = [...new Set(matches.map(m => m.toLowerCase()))];
            const recommendedProducts = productsData.filter(p => uniqueIds.includes(p.id));

            return sendJson(res, 200, {
              success: true,
              engine: 'minicpm5:2b-mlx',
              mode: 'neural_mlx',
              stylistResponse: reply,
              stylingAdvice: reply,
              recommendedIds: uniqueIds,
              recommendedProducts: recommendedProducts.length > 0 ? recommendedProducts : productsData.slice(0, 3),
              curationCode: `SR-MLX-${Math.floor(1000 + Math.random() * 9000)}`
            });
          }
        }
      } catch (e) {
        // Fallback gracefully to heuristic
      }

      // Return heuristic response
      const fallbackResult = runHeuristic();
      return sendJson(res, 200, fallbackResult);
    }

    // --------------------------------------------------------------------------
    // 10. GET /api/care (Customer Care, Sizing Matrix, Wash Protocols)
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/care') {
      return sendJson(res, 200, {
        service: 'Skyline Religion Private Client Care',
        sizingTolerance: '0.5 inch pre-shrunk tolerance across all pieces',
        sizingMatrix: {
          sweatshirts: [
            { size: 'S', chest: '46"', length: '27"', shoulder: '23"', sleeve: '34"' },
            { size: 'M', chest: '48.5"', length: '28"', shoulder: '24"', sleeve: '35"' },
            { size: 'L', chest: '51"', length: '29"', shoulder: '25"', sleeve: '36"' },
            { size: 'XL', chest: '54"', length: '30"', shoulder: '26"', sleeve: '37"' },
            { size: 'XXL', chest: '57"', length: '31"', shoulder: '27"', sleeve: '38"' }
          ],
          denim: [
            { size: '30', waist: '31.5"', rise: '13.0"', inseam: '32.0"', legOpening: '21.0"' },
            { size: '32', waist: '33.5"', rise: '13.5"', inseam: '32.0"', legOpening: '22.0"' },
            { size: '34', waist: '35.5"', rise: '14.0"', inseam: '33.0"', legOpening: '23.0"' },
            { size: '36', waist: '37.5"', rise: '14.5"', inseam: '33.0"', legOpening: '24.0"' }
          ]
        },
        washProtocols: {
          frenchTerry: 'Wash cold inside out. Flat dry. Pre-shrunk double-enzyme wash ensures zero shrinkage.',
          rawSelvedge: 'Wear raw for 4-6 months before first tub soak in cold water. Hang dry in shade.',
          merinoWool: 'Hand wash cold with wool conditioner. Reshape while damp and dry flat.'
        },
        shipping: {
          tier: 'Skyline White-Glove Courier',
          cost: 0,
          type: 'Complimentary Carbon-Neutral Express',
          sla: '2 Business Days (US) • 3 Business Days (International)'
        },
        guarantee: '30-Day Complimentary Vault Exchange with pre-paid return courier packaging included.'
      });
    }

    // --------------------------------------------------------------------------
    // 11. POST & GET /api/inquiry (Live Concierge Desk)
    // --------------------------------------------------------------------------
    if (pathname === '/api/inquiry') {
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const name = body.name || 'Anonymous Patron';
        const email = body.email || 'patron@skyline.vip';
        const subject = body.subject || 'General Sizing';
        const message = body.message || '';

        const ticketId = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;
        const ticketRecord = {
          ticketId,
          timestamp: new Date().toISOString(),
          name,
          email,
          subject,
          message,
          status: 'queued_in_vault'
        };

        if (!global.inquiriesStore) global.inquiriesStore = [];
        global.inquiriesStore.unshift(ticketRecord);

        return sendJson(res, 201, {
          success: true,
          ticketId,
          message: 'Your concierge inquiry has been registered in the private vault queue.',
          estimatedResponse: 'Under 4 Hours'
        });
      } else if (req.method === 'GET') {
        return sendJson(res, 200, {
          count: (global.inquiriesStore || []).length,
          inquiries: global.inquiriesStore || []
        });
      }
    }

    // --------------------------------------------------------------------------
    // 12. GET /api/brand (Brand Manifesto, Heritage Mills & Privilege Codes)
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname === '/api/brand') {
      return sendJson(res, 200, {
        brand: 'Skyline Religion',
        established: 2026,
        tagline: 'Layback Luxury Clothing',
        manifesto: 'In an era of disposable fashion, Skyline Religion is a devotion to structural permanence. We unite metropolitan architecture with sacred layback comfort.',
        mills: [
          { name: 'The Fleece Sanctuary', location: 'Barcelos, Portugal', spec: '500 GSM circular loopback knitting' },
          { name: 'Kuroki Selvedge Mill', location: 'Kojima, Okayama, Japan', spec: '14.5oz raw shuttle-loom selvedge denim' }
        ],
        coupons: Object.keys(COUPONS).map(k => ({ code: k, description: COUPONS[k].label }))
      });
    }

    // --------------------------------------------------------------------------
    // 13. Static Asset Serving (/assets/*)
    // --------------------------------------------------------------------------
    if (req.method === 'GET' && pathname.startsWith('/assets/')) {
      const relPath = pathname.replace('/assets/', '');
      const ASSETS_ROOT = path.resolve(__dirname, '..', 'assets');
      const safePath = path.normalize(path.join(ASSETS_ROOT, relPath));

      if (safePath.startsWith(ASSETS_ROOT) && fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
        const ext = path.extname(safePath).toLowerCase();
        const mimeTypes = {
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.webp': 'image/webp'
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        setCorsHeaders(res);
        res.writeHead(200, { 'Content-Type': contentType });
        return fs.createReadStream(safePath).pipe(res);
      }
    }

    // --------------------------------------------------------------------------
    // Fallthrough 404
    // --------------------------------------------------------------------------
    return sendJson(res, 404, {
      error: 'Route not found in Skyline Religion REST API',
      path: pathname,
      method: req.method,
      availableEndpoints: [
        'GET /api/health',
        'GET /api/products',
        'GET /api/products/:id',
        'GET /api/cart',
        'POST /api/cart',
        'POST /api/checkout',
        'GET /api/orders',
        'POST /api/reset'
      ]
    });

  } catch (err) {
    console.error('[Skyline Backend Error]:', err);
    return sendJson(res, 500, {
      error: 'Internal Server Error in Skyline Religion API',
      details: err.message
    });
  }
});

// Start listening if run directly
if (require.main === module) {
  server.listen(PORT, () => {
    console.log('====================================================');
    console.log(` SKYLINE RELIGION BACKEND API ACTIVE ON PORT ${PORT}`);
    console.log(` Health Check: http://localhost:${PORT}/api/health`);
    console.log(` Products API: http://localhost:${PORT}/api/products`);
    console.log('====================================================');
  });
}

module.exports = server;
