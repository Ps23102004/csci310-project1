/**
 * ==========================================================================
 * SKYLINE RELIGION — LOCAL MINICPM 5 2B AI STYLIST & CONCIERGE WIDGET
 * Interactive Slide-Over Wardrobe Advisor Powered by Local Model Inference
 * ==========================================================================
 */

class StylistWidget {
  constructor() {
    this.isOpen = false;
    this.isThinking = false;
    this.apiUrl = 'http://localhost:3010/api/stylist';
    this.chatHistory = [
      {
        role: 'assistant',
        text: 'Greetings. I am your Skyline Religion Wardrobe Director, powered by local MiniCPM 5 2B neural inference. Ask me for bespoke outfit pairings, fabric GSM layering, or tailored sizing recommendations.'
      }
    ];

    this.init();
  }

  init() {
    this.injectDOM();
    this.bindEvents();
  }

  injectDOM() {
    // 1. Floating Capsule Trigger
    const trigger = document.createElement('button');
    trigger.className = 'ai-stylist-capsule-btn';
    trigger.id = 'ai-stylist-trigger';
    trigger.setAttribute('aria-label', 'Open AI Stylist Concierge');
    trigger.innerHTML = `
      <span class="stylist-sparkle">✦</span>
      <span class="stylist-label">AI Stylist</span>
      <span class="stylist-model-pill">MiniCPM 2B</span>
    `;
    document.body.appendChild(trigger);

    // 2. Slide-Over Glass Drawer
    const drawerBackdrop = document.createElement('div');
    drawerBackdrop.className = 'stylist-drawer-backdrop';
    drawerBackdrop.id = 'stylist-drawer-backdrop';
    drawerBackdrop.setAttribute('role', 'dialog');
    drawerBackdrop.setAttribute('aria-modal', 'true');
    drawerBackdrop.setAttribute('aria-label', 'AI Stylist Concierge');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    drawerBackdrop.setAttribute('inert', '');
    drawerBackdrop.innerHTML = `
      <div class="stylist-drawer">
        <div class="stylist-header">
          <div class="stylist-header-title">
            <span class="stylist-sparkle">✦</span>
            <div>
              <h3>Skyline Wardrobe Director</h3>
              <span class="model-badge">Powered by Local MiniCPM 5 2B</span>
            </div>
          </div>
          <button class="modal-close-btn" id="stylist-close-btn">&times;</button>
        </div>

        <!-- Quick Scenario Chips -->
        <div class="stylist-chips-bar">
          <button class="stylist-chip" data-prompt="I need an airport travel outfit that transitions into a casual evening dinner.">Airport to Dinner</button>
          <button class="stylist-chip" data-prompt="What should I wear for a heavy squat session in cold weather?">Heavy Gym Session</button>
          <button class="stylist-chip" data-prompt="Recommend an oversized streetwear silhouette with raw selvedge denim.">Oversized Denim</button>
          <button class="stylist-chip" data-prompt="I am 6'1 and 180 lbs. What size should I choose for the 500 GSM Hoodie?">Sizing Recommendation</button>
        </div>

        <!-- Message History -->
        <div class="stylist-chat-scroll" id="stylist-messages">
          <!-- Populated dynamically -->
        </div>

        <!-- Input Bar -->
        <form class="stylist-input-form" id="stylist-input-form">
          <input type="text" id="stylist-user-input" placeholder="Ask about styling, sizing, or occasions..." autocomplete="off">
          <button type="submit" class="stylist-send-btn" id="stylist-send-btn" aria-label="Send message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(drawerBackdrop);

    this.renderMessages();
  }

  static escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  renderMessages() {
    const container = document.getElementById('stylist-messages');
    if (!container) return;

    container.innerHTML = this.chatHistory.map(msg => {
      const isUser = msg.role === 'user';
      let cardsHtml = '';

      if (msg.recommendations && msg.recommendations.length > 0) {
        cardsHtml = `
          <div class="stylist-recommendation-deck">
            ${msg.recommendations.map(p => `
              <div class="stylist-rec-card">
                <div class="rec-info">
                  <span class="rec-title">${StylistWidget.escapeHtml(p.title)}</span>
                  <span class="rec-meta">${StylistWidget.escapeHtml(p.gsm || 'Bespoke')} &bull; $${p.price}</span>
                </div>
                <button class="rec-add-btn" data-product-id="${p.id}">
                  Add M &rarr;
                </button>
              </div>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="stylist-msg-row ${isUser ? 'user' : 'assistant'}">
          <div class="stylist-msg-bubble">
            <p>${StylistWidget.escapeHtml(msg.text)}</p>
            ${cardsHtml}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.rec-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-product-id');
        const product = window.catalogManager && window.catalogManager.products.find(p => p.id === id);
        if (product && window.cartManager) {
          window.cartManager.addItem(product, 'M');
          btn.textContent = 'Added ✓';
        }
      });
    });

    container.scrollTop = container.scrollHeight;
  }

  async sendMessage(userText) {
    if (!userText.trim() || this.isThinking) return;

    // Append user turn
    this.chatHistory.push({ role: 'user', text: userText });
    this.renderMessages();

    this.isThinking = true;
    const container = document.getElementById('stylist-messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'stylist-msg-row assistant typing';
    typingIndicator.innerHTML = `
      <div class="stylist-msg-bubble">
        <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
      </div>
    `;
    container.appendChild(typingIndicator);
    container.scrollTop = container.scrollHeight;

    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
      });

      typingIndicator.remove();

      if (res.ok) {
        const data = await res.json();
        this.chatHistory.push({
          role: 'assistant',
          text: data.stylistResponse || data.stylingAdvice || 'Here are my recommendations based on your request.',
          recommendations: data.recommendedProducts || []
        });
      } else {
        throw new Error('API unavailable');
      }
    } catch (err) {
      typingIndicator.remove();
      // Intelligent Client-Side Heuristic Fallback
      this.handleClientFallback(userText);
    } finally {
      this.isThinking = false;
      this.renderMessages();
    }
  }

  handleClientFallback(userText) {
    const lower = userText.toLowerCase();
    let advice = "For that occasion, I recommend prioritizing fabric weight and silhouette harmony.";
    let recIds = ['sr-01', 'sr-07', 'sr-11'];

    if (lower.includes('gym') || lower.includes('workout') || lower.includes('squat')) {
      advice = "For high-performance training, pair the 240 GSM silver-ion Aero-Compression with the Ascent Kinetic Joggers. Unrestricted lat mobility and graduated core support.";
      recIds = ['sr-04', 'sr-05', 'sr-06'];
    } else if (lower.includes('airport') || lower.includes('travel') || lower.includes('flight')) {
      advice = "Long-haul flights demand unhurried comfort. Layer our 500 GSM Arch Hoodie over the Kinetic Joggers, accompanied by the 42L Monolith Rubberized Duffle.";
      recIds = ['sr-01', 'sr-06', 'sr-12'];
    } else if (lower.includes('denim') || lower.includes('streetwear') || lower.includes('baggy')) {
      advice = "Embrace architectural proportions: pair our 14.5oz Okayama Selvedge Wide Carpenter Jeans with the 280 GSM Boxy Minimal Tee and heavy Sanctuary Zip-Up.";
      recIds = ['sr-07', 'sr-10', 'sr-03'];
    } else if (lower.includes('size') || lower.includes('height') || lower.includes('weight')) {
      advice = "Skyline Religion pieces are engineered with an intentional boxy drop-shoulder. For 6'1\" (180 lbs), Size L delivers our signature oversized drape, while Size M provides a refined tailored boxy fit.";
      recIds = ['sr-01', 'sr-02'];
    }

    const matchedProducts = (window.catalogManager && window.catalogManager.products)
      ? window.catalogManager.products.filter(p => recIds.includes(p.id))
      : [];

    this.chatHistory.push({
      role: 'assistant',
      text: advice,
      recommendations: matchedProducts
    });
  }

  open() {
    const backdrop = document.getElementById('stylist-drawer-backdrop');
    if (backdrop) {
      MotionSystem.openOverlay(backdrop, { onClose: () => { this.isOpen = false; } });
      this.isOpen = true;
      document.getElementById('stylist-user-input')?.focus();
    }
  }

  close() {
    const backdrop = document.getElementById('stylist-drawer-backdrop');
    if (backdrop) MotionSystem.closeOverlay(backdrop);
  }

  bindEvents() {
    const trigger = document.getElementById('ai-stylist-trigger');
    if (trigger) trigger.addEventListener('click', () => this.open());

    const closeBtn = document.getElementById('stylist-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const backdrop = document.getElementById('stylist-drawer-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
    }

    const form = document.getElementById('stylist-input-form');
    const input = document.getElementById('stylist-user-input');
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input.value;
        input.value = '';
        this.sendMessage(val);
      });
    }

    // Quick chips
    document.querySelectorAll('.stylist-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        this.sendMessage(prompt);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.stylistWidget = new StylistWidget();
});
