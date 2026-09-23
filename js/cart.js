/**
 * ==========================================================================
 * SKYLINE RELIGION — SHOPPING BAG & LUXURY CHECKOUT ENGINE
 * Slide-Over Liquid Glass Drawer, Promo Discounts & Clean Order Review Flow
 * ==========================================================================
 */

class CartManager {
  constructor() {
    this.STORAGE_KEY = 'skyline_religion_cart';
    this.items = this.loadCart();
    this.discountPercent = 0;
    this.appliedPromo = null;

    this.drawerBackdrop = document.getElementById('cart-drawer-backdrop');
    this.itemsContainer = document.getElementById('cart-items-container');
    this.badgeCount = document.getElementById('cart-badge-count');
    this.subtotalEl = document.getElementById('cart-subtotal');
    this.discountRow = document.getElementById('cart-discount-row');
    this.discountValEl = document.getElementById('cart-discount-val');
    this.totalEl = document.getElementById('cart-total');

    this.checkoutModalBackdrop = document.getElementById('checkout-modal-backdrop');

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {}
  }

  addItem(product, size, quantity = 1) {
    const existingIndex = this.items.findIndex(
      item => item.id === product.id && item.size === size
    );

    const stock = product.sizes?.find(option => option.size === size)?.stock;
    const inBag = existingIndex > -1 ? this.items[existingIndex].quantity : 0;
    if (!Number.isInteger(quantity) || quantity < 1 || stock === undefined || inBag + quantity > stock) {
      this.announceCartLimit(`Only ${stock ?? 0} available in size ${size}.`);
      return false;
    }

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        size: size,
        gsm: product.gsm,
        quantity: quantity,
        category: product.category,
        image: product.images ? product.images.front : `assets/products/${product.id}-front.jpg`
      });
    }

    this.saveCart();
    this.render();

    if (this.badgeCount) {
      this.badgeCount.style.transform = 'scale(1.35)';
      setTimeout(() => {
        this.badgeCount.style.transform = 'scale(1)';
      }, 250);
    }
    return true;
  }

  announceCartLimit(message) {
    let status = document.getElementById('cart-stock-status');
    if (!status) {
      status = document.createElement('p');
      status.id = 'cart-stock-status';
      status.setAttribute('role', 'status');
      status.style.cssText = 'padding:10px 20px;color:var(--text-primary);font-size:13px';
      (this.itemsContainer || document.body).before(status);
    }
    status.textContent = message;
  }

  updateQuantity(id, size, delta) {
    const index = this.items.findIndex(item => item.id === id && item.size === size);
    if (index > -1) {
      const product = typeof SKYLINE_PRODUCTS !== 'undefined' ? SKYLINE_PRODUCTS.find(p => p.id === id) : null;
      const stock = product?.sizes.find(option => option.size === size)?.stock;
      if (delta > 0 && (stock === undefined || this.items[index].quantity + delta > stock)) {
        this.announceCartLimit(`Only ${stock ?? 0} available in size ${size}.`);
        return false;
      }
      this.items[index].quantity += delta;
      if (this.items[index].quantity <= 0) {
        this.items.splice(index, 1);
      }
      this.saveCart();
      this.render();
    }
  }

  removeItem(id, size) {
    this.items = this.items.filter(item => !(item.id === id && item.size === size));
    this.saveCart();
    this.render();
  }

  applyPromo(code) {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'SKYLINE10') {
      this.discountPercent = 10;
      this.appliedPromo = cleaned;
      return { success: true, message: '10% Skyline Patron discount applied.' };
    } else if (cleaned === 'VIP20') {
      this.discountPercent = 20;
      this.appliedPromo = cleaned;
      return { success: true, message: '20% VIP Private Access discount applied.' };
    } else {
      return { success: false, message: 'Invalid or unrecognized promo code.' };
    }
  }

  calculateTotals() {
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = (subtotal * this.discountPercent) / 100;
    const total = subtotal - discount;
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, discount, total, count };
  }

  render() {
    const { subtotal, discount, total, count } = this.calculateTotals();

    // Update Badge
    if (this.badgeCount) {
      this.badgeCount.textContent = count;
      this.badgeCount.style.display = count > 0 ? 'flex' : 'none';
    }

    // Update Totals
    if (this.subtotalEl) this.subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (this.totalEl) this.totalEl.textContent = `$${total.toFixed(2)}`;

    if (this.discountRow && this.discountValEl) {
      if (this.discountPercent > 0) {
        this.discountRow.style.display = 'flex';
        this.discountValEl.textContent = `-$${discount.toFixed(2)} (${this.appliedPromo})`;
      } else {
        this.discountRow.style.display = 'none';
      }
    }

    // Render Cart Items
    if (!this.itemsContainer) return;

    if (this.items.length === 0) {
      this.itemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" style="margin-bottom: 12px;">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p style="font-weight: 600; color: var(--text-primary); font-size: 15px;">Your Bag is Empty</p>
          <p style="font-size: 12px; color: var(--text-secondary); max-width: 220px; line-height: 1.5; margin-top: 4px;">Explore the Skyline Religion collection to curate your city wardrobe.</p>
        </div>
      `;
      return;
    }

    this.itemsContainer.innerHTML = this.items.map(item => `
      <div class="cart-item-row" data-id="${item.id}" data-size="${item.size}">
        <div class="cart-item-img">
          <img src="${item.image || `assets/products/${item.id}-front.jpg`}" alt="${item.title}" onerror="this.src='assets/products/${item.id}-front.jpg'">
        </div>
        <div class="cart-item-info">
          <div>
            <h4 class="cart-item-name">${item.title}</h4>
            <span class="cart-item-size">Size: ${item.size} &bull; ${item.gsm}</span>
          </div>
          <div class="cart-item-bottom">
            <div class="cart-qty-ctrl">
              <button class="qty-btn btn-qty-minus" data-id="${item.id}" data-size="${item.size}" aria-label="Decrease quantity">&minus;</button>
              <span style="font-size: 13px; font-weight: 700; min-width: 16px; text-align: center;">${item.quantity}</span>
              <button class="qty-btn btn-qty-plus" data-id="${item.id}" data-size="${item.size}" aria-label="Increase quantity">&#43;</button>
            </div>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Re-bind Quantity Buttons
    this.itemsContainer.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const size = btn.getAttribute('data-size');
        this.updateQuantity(id, size, -1);
      });
    });

    this.itemsContainer.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const size = btn.getAttribute('data-size');
        this.updateQuantity(id, size, 1);
      });
    });
  }

  openDrawer() {
    MotionSystem.openOverlay(this.drawerBackdrop);
  }

  closeDrawer() {
    MotionSystem.closeOverlay(this.drawerBackdrop);
  }

  bindEvents() {
    // Open Cart Trigger
    const cartTrigger = document.getElementById('cart-trigger-btn');
    if (cartTrigger) {
      cartTrigger.addEventListener('click', () => this.openDrawer());
    }

    // Close Cart Trigger
    const closeBtn = document.getElementById('cart-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (this.drawerBackdrop) {
      this.drawerBackdrop.addEventListener('click', (e) => {
        if (e.target === this.drawerBackdrop) {
          this.closeDrawer();
        }
      });
    }

    if (this.checkoutModalBackdrop) {
      this.checkoutModalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.checkoutModalBackdrop) {
          MotionSystem.closeOverlay(this.checkoutModalBackdrop);
        }
      });
    }

    // Promo Code Trigger
    const promoBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('cart-promo-input');
    const promoMsg = document.getElementById('promo-status-msg');

    if (promoBtn && promoInput) {
      const submitPromo = () => {
        if (this.items.length === 0) {
          if (promoMsg) {
            promoMsg.textContent = 'Add a piece to your bag before applying a promo code.';
            promoMsg.style.color = '#EF4444';
            promoMsg.style.display = 'block';
          }
          return;
        }
        const res = this.applyPromo(promoInput.value);
        if (promoMsg) {
          promoMsg.textContent = res.message;
          promoMsg.style.color = res.success ? 'var(--accent-emerald)' : '#EF4444';
          promoMsg.style.display = 'block';
        }
        this.render();
      };
      promoBtn.addEventListener('click', submitPromo);
      promoInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitPromo();
        }
      });
    }

    // Checkout Button
    const checkoutBtn = document.getElementById('checkout-action-btn') || document.getElementById('apple-pay-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.items.length === 0) return;
        this.startCheckout();
      });
    }
  }

  startCheckout() {
    this.closeDrawer();
    if (!this.checkoutModalBackdrop) return;

    const { subtotal, discount, total, count } = this.calculateTotals();

    const orderId = `SR-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const modalContent = document.getElementById('checkout-modal-content');
    if (modalContent) {
      modalContent.innerHTML = `
        <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--accent-emerald); color: #FFF; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 26px;">
          ✓
        </div>
        <h3 style="font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--text-primary); margin-top: 14px; text-align: center;">
          Demo checkout preview &bull; ${orderId}
        </h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 18px; text-align: center;">
          This is a class-project simulation. No order was placed, no payment was taken, and no delivery is scheduled.
        </p>

        <div class="receipt-card" style="background: var(--bg-glass-input); border: 1px solid var(--border-glass); border-radius: 14px; padding: 18px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: 700; color: var(--text-primary);">
            <span>SKYLINE RELIGION</span>
            <span>${timestamp}</span>
          </div>
          <div style="border-top: 1px dashed var(--border-glass); padding-top: 10px; margin-bottom: 10px;">
            ${this.items.map(i => `
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: var(--text-secondary);">
                <span>${i.quantity}x ${i.title} (${i.size})</span>
                <span style="font-weight: 600; color: var(--text-primary);">$${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          <div style="border-top: 1px dashed var(--border-glass); padding-top: 10px; line-height: 1.8;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-tertiary);">Subtotal</span>
              <span style="font-weight: 600;">$${subtotal.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
              <div style="display: flex; justify-content: space-between; color: var(--accent-emerald);">
                <span>Order Discount (${this.appliedPromo})</span>
                <span>-$${discount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-tertiary);">Illustrative delivery</span>
              <span style="color: var(--accent-emerald); font-weight: 600;">Not scheduled</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 15px; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border-glass); color: var(--accent-gold);">
              <span>Total</span>
              <span>$${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 20px;">
          <button id="print-receipt-btn" class="btn-secondary" style="flex: 1; padding: 12px 0; font-size: 12px; justify-content: center;">
            Print Order Details
          </button>
          <button id="close-checkout-btn" class="btn-primary" style="flex: 1; padding: 12px 0; font-size: 12px; justify-content: center;">
            Continue Browsing
          </button>
        </div>
      `;

      const printBtn = document.getElementById('print-receipt-btn');
      if (printBtn) {
        printBtn.onclick = () => window.print();
      }

      const closeCheckoutBtn = document.getElementById('close-checkout-btn');
      if (closeCheckoutBtn) {
        closeCheckoutBtn.onclick = () => MotionSystem.closeOverlay(this.checkoutModalBackdrop);
      }
    }

    MotionSystem.openOverlay(this.checkoutModalBackdrop, {
      onClose: () => {
        this.items = [];
        this.discountPercent = 0;
        this.appliedPromo = null;
        this.saveCart();
        this.render();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cartManager = new CartManager();
});
