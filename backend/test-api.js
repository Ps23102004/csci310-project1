/**
 * ==========================================================================
 * SKYLINE RELIGION — BACKEND REST API AUTOMATED TEST SUITE
 * ==========================================================================
 */

const http = require('http');

const PORT = process.env.PORT || 3010;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log(' RUNNING SKYLINE RELIGION BACKEND API AUTOMATED TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(name, condition) {
    if (condition) {
      console.log(` ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(` ❌ FAIL: ${name}`);
      failed++;
    }
  }

  try {
    // Test 1: GET /api/health
    const health = await request('GET', '/api/health');
    assert('Health Check Endpoint (GET /api/health)', health.status === 200 && health.body.status === 'ok');

    // Test 2: GET /api/products
    const products = await request('GET', '/api/products');
    assert('Get Products Catalog (GET /api/products)', products.status === 200 && products.body.products.length >= 12);

    // Test 3: GET /api/products?category=sweatshirts
    const sweatshirts = await request('GET', '/api/products?category=sweatshirts');
    assert('Filter Products by Category (GET /api/products?category=sweatshirts)',
      sweatshirts.status === 200 && sweatshirts.body.products.every(p => p.category === 'sweatshirts'));

    // Test 4: GET /api/products/sr-01
    const singleProduct = await request('GET', '/api/products/sr-01');
    assert('Get Single Product Profile (GET /api/products/sr-01)',
      singleProduct.status === 200 && singleProduct.body.id === 'sr-01' && singleProduct.body.price === 195);

    // Test 5: POST /api/cart (Add Item)
    const addCart = await request('POST', '/api/cart', {
      action: 'add',
      id: 'sr-01',
      size: 'L',
      quantity: 1
    });
    assert('Add Item to Cart (POST /api/cart action:add)',
      addCart.status === 200 && addCart.body.cart.some(i => i.id === 'sr-01' && i.size === 'L'));

    // Test 6: POST /api/cart (Apply Promo)
    const promo = await request('POST', '/api/cart', {
      action: 'apply_promo',
      promoCode: 'VIP20'
    });
    assert('Apply Privilege Promo Code (POST /api/cart action:apply_promo)',
      promo.status === 200 && promo.body.discount > 0);

    // Test 7: POST /api/checkout (Apple Pay Simulated Order)
    const checkout = await request('POST', '/api/checkout', {
      customer: { name: 'Parth Singh', email: 'parth@skyline.vip' },
      paymentMethod: 'Apple Pay (Biometric FaceID)'
    });
    assert('Execute Simulated Checkout (POST /api/checkout)',
      checkout.status === 201 && checkout.body.success === true && checkout.body.order.orderId.startsWith('SR-'));

    // Test 8: GET /api/orders
    const orders = await request('GET', '/api/orders');
    assert('List Settled Orders (GET /api/orders)',
      orders.status === 200 && orders.body.count > 0);

    // Test 9: POST /api/stylist (MiniCPM 5 2B / Heuristic Wardrobe Director)
    const stylist = await request('POST', '/api/stylist', {
      prompt: 'Recommend an oversized airport to dinner travel outfit'
    });
    assert('AI Stylist & Suggestions (POST /api/stylist)',
      stylist.status === 200 && stylist.body.success === true && stylist.body.recommendedProducts.length > 0);

    // Test 10: GET /api/care (Sizing Matrix & Care Protocols)
    const care = await request('GET', '/api/care');
    assert('Customer Care & Sizing Matrix (GET /api/care)',
      care.status === 200 && care.body.sizingMatrix && care.body.washProtocols);

    // Test 11: POST /api/inquiry (Bespoke Concierge Ticketing)
    const inquiry = await request('POST', '/api/inquiry', {
      name: 'Parth Singh',
      email: 'parth@skyline.vip',
      subject: 'sizing',
      message: 'Need bespoke sizing consultation for 500 GSM Arch Hoodie'
    });
    assert('Bespoke Concierge Desk (POST /api/inquiry)',
      inquiry.status === 201 && inquiry.body.ticketId.startsWith('INQ-'));

    // Test 12: GET /api/brand (Brand Heritage & Mills)
    const brand = await request('GET', '/api/brand');
    assert('Brand Heritage & Mills (GET /api/brand)',
      brand.status === 200 && brand.body.mills.length >= 2);

  } catch (err) {
    console.error('Test Suite encountered network/execution error:', err);
    failed++;
  }

  console.log('\n====================================================');
  console.log(` TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Start server if needed and run tests
const server = require('./server');

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // Server is already running on PORT; execute tests directly against active server
    runTests();
  } else {
    throw err;
  }
});

server.listen(PORT, () => {
  runTests().then(() => {
    server.close();
  });
});
