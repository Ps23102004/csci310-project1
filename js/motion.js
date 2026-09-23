/**
 * ==========================================================================
 * SKYLINE RELIGION — APPLE MOTION & 3D INTERACTIVE CARD ENGINE
 * Spring Physics, Perspective Tilt, Mobile Drawer & Micro-Interactions
 * ==========================================================================
 */

class MotionSystem {
  constructor() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    this.initCardTilt();
    this.initScrollReactivity();
    this.initMobileDrawer();
    this.initAcademicDrawer();
    this.initScrollReveal();
    this.initMagneticButtons();
    this.initNewsletterForm();
  }

  static FOCUSABLE_SELECTOR = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  // Shared overlay lifecycle: ref-counted scroll lock + inert/aria-hidden + focus trap + focus restore.
  // Every modal/drawer on the page (mobile nav, product modal, cart drawer, checkout modal,
  // AI stylist drawer) opens and closes through these two statics so there is exactly one
  // place that can get scroll-locking or accessibility state wrong.
  static BACKGROUND_LANDMARKS = 'header.skyline-header, main, footer.enriched-brand-footer';

  static openOverlay(backdrop, { trapEl, onClose } = {}) {
    if (!backdrop || backdrop.classList.contains('open')) return;
    MotionSystem._scrollLockCount = (MotionSystem._scrollLockCount || 0) + 1;
    document.body.style.overflow = 'hidden';
    if (MotionSystem._scrollLockCount === 1) {
      document.querySelectorAll(MotionSystem.BACKGROUND_LANDMARKS).forEach(el => el.setAttribute('inert', ''));
    }

    backdrop.removeAttribute('inert');
    backdrop.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('open');
    backdrop._onClose = onClose || null;

    backdrop._returnFocus = document.activeElement;
    const scope = trapEl || backdrop;
    const focusable = scope.querySelectorAll(MotionSystem.FOCUSABLE_SELECTOR);
    if (focusable.length) focusable[0].focus();

    // Bound to document, not the backdrop: an innerHTML re-render inside an open
    // overlay (cart qty buttons, size-guide unit toggle) can drop the focused node,
    // which would otherwise silently kill both Escape and the Tab trap below.
    backdrop._trapHandler = (e) => {
      if (!backdrop.classList.contains('open')) return;
      if (e.key === 'Escape') {
        MotionSystem.closeOverlay(backdrop);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = Array.from(scope.querySelectorAll(MotionSystem.FOCUSABLE_SELECTOR))
        .filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', backdrop._trapHandler);
  }

  static closeOverlay(backdrop) {
    if (!backdrop || !backdrop.classList.contains('open')) return;
    MotionSystem._scrollLockCount = Math.max(0, (MotionSystem._scrollLockCount || 1) - 1);
    if (MotionSystem._scrollLockCount === 0) {
      document.body.style.overflow = '';
      document.querySelectorAll(MotionSystem.BACKGROUND_LANDMARKS).forEach(el => el.removeAttribute('inert'));
    }

    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('inert', '');

    if (backdrop._trapHandler) {
      document.removeEventListener('keydown', backdrop._trapHandler);
      backdrop._trapHandler = null;
    }
    if (backdrop._returnFocus && typeof backdrop._returnFocus.focus === 'function') {
      backdrop._returnFocus.focus();
    }
    if (typeof backdrop._onClose === 'function') backdrop._onClose();
  }

  initScrollReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    if (this.reducedMotion) {
      els.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const siblingIndex = new Map();
    els.forEach(el => {
      const parent = el.parentElement;
      const idx = siblingIndex.get(parent) || 0;
      el.style.setProperty('--stagger', idx);
      siblingIndex.set(parent, idx + 1);
      el.classList.add('reveal-pending');
    });

    // Plain position check on scroll/resize instead of IntersectionObserver: a big
    // scroll jump (scrollbar drag, End key, a fast resize check) can land past a
    // section without the browser ever sampling it mid-transit, so an observer
    // that only fires on crossing leaves that section permanently invisible.
    // getBoundingClientRect has no such gap — it's correct however you got there.
    const revealVisible = () => {
      const vh = window.innerHeight;
      let allDone = true;
      els.forEach(el => {
        if (el.classList.contains('is-revealed')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh - vh * 0.1 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          allDone = false;
        }
      });
      return allDone;
    };

    revealVisible();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (revealVisible()) {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Last-resort safety net: any non-interactive viewing (a full-page screenshot
    // tool, a slow reader, a page that's simply never scrolled) must not leave
    // real content permanently invisible. After a few seconds, show everything.
    setTimeout(() => {
      els.forEach(el => el.classList.add('is-revealed'));
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }, 2500);
  }

  initMagneticButtons() {
    if (this.reducedMotion || this.isTouchDevice) return;

    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${(dy - 2).toFixed(1)}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    const successMsg = document.getElementById('newsletter-success');
    if (!form || !successMsg) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      successMsg.hidden = false;
      requestAnimationFrame(() => successMsg.classList.add('visible'));
      form.reset();
    });
  }

  initCardTilt() {
    if (this.reducedMotion || this.isTouchDevice) return;

    // Delegate tilt handling to cards
    document.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.product-card-3d');
      if (!card) return;

      const inner = card.querySelector('.product-card-inner');
      const glare = card.querySelector('.card-specular-glare');
      if (!inner) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle luxury perspective tilt (max 8 degrees)
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
      }
    });

    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.product-card-3d');
      if (!card) return;

      const related = e.relatedTarget;
      if (related && card.contains(related)) return;

      const inner = card.querySelector('.product-card-inner');
      if (inner) {
        inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        inner.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          if (inner) inner.style.transition = '';
        }, 500);
      }
    });
  }

  initScrollReactivity() {
    const header = document.querySelector('.skyline-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  initMobileDrawer() {
    const trigger = document.getElementById('mobile-menu-trigger');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const closeBtn = document.getElementById('mobile-nav-close');

    if (!trigger || !backdrop) return;

    const openDrawer = () => {
      MotionSystem.openOverlay(backdrop, {
        onClose: () => trigger.setAttribute('aria-expanded', 'false')
      });
      trigger.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => MotionSystem.closeOverlay(backdrop);

    trigger.addEventListener('click', openDrawer);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeDrawer();
      }
    });

    // Close when clicking any nav link inside drawer
    backdrop.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  initAcademicDrawer() {
    const trigger = document.getElementById('academic-toggle-btn');
    const drawer = document.getElementById('academic-eval-drawer');

    if (!trigger || !drawer) return;

    trigger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  static triggerHapticFeedback(element) {
    if (!element) return;
    element.style.transform = 'scale(0.94)';
    setTimeout(() => {
      element.style.transform = '';
    }, 120);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.motionSystem = new MotionSystem();
});
