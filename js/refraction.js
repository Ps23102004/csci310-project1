/**
 * ==========================================================================
 * SKYLINE RELIGION — LIGHT REFRACTION & SPECULAR SHADER ENGINE
 * Real-time Canvas Caustics, Chromatic Dispersion & Specular Bloom
 * Performance-Guarded: Pauses Offscreen and When Inactive
 * ==========================================================================
 */

class RefractionEngine {
  constructor(canvasId = 'refraction-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // State
    this.isPaused = false;
    this.animationFrameId = null;

    // Pointer Physics
    this.targetPointer = { x: this.width * 0.5, y: this.height * 0.35 };
    this.currentPointer = { x: this.width * 0.5, y: this.height * 0.35 };
    this.velocity = { x: 0, y: 0 };
    this.lastTime = performance.now();
    this.lastFrameTime = 0;

    // Refraction & Caustic Particles
    this.prisms = [];
    this.numPrisms = 12;
    this.initPrisms();

    // Resize handling
    this.resize = this.resize.bind(this);
    window.addEventListener('resize', this.resize);
    this.resize();

    // Pointer events
    window.addEventListener('mousemove', (e) => {
      this.targetPointer.x = e.clientX;
      this.targetPointer.y = e.clientY;
    }, { passive: true });

    // Touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.targetPointer.x = e.touches[0].clientX;
        this.targetPointer.y = e.touches[0].clientY;
      }
    }, { passive: true });

    // Reduced motion preference
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Viewport & Visibility Observers
    this.initLifecycleGuards();

    // Start render loop
    this.render = this.render.bind(this);
    this.startLoop();
  }

  initLifecycleGuards() {
    // 1. Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseLoop();
      } else {
        this.resumeLoop();
      }
    });

    // 2. Pause when canvas is scrolled off-screen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.resumeLoop();
          } else {
            this.pauseLoop();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(this.canvas);
    }
  }

  startLoop() {
    if (!this.isPaused && !this.animationFrameId) {
      this.lastTime = performance.now();
      this.animationFrameId = requestAnimationFrame(this.render);
    }
  }

  pauseLoop() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resumeLoop() {
    this.isPaused = false;
    this.startLoop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // Cap the backing-store scale: a 3x-DPI display would otherwise redraw a
    // full-viewport gradient at 9x the pixel count every frame for no visible gain.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  initPrisms() {
    this.prisms = [];
    for (let i = 0; i < this.numPrisms; i++) {
      this.prisms.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 40 + Math.random() * 80,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.01,
        refractionIndex: 1.33 + Math.random() * 0.25
      });
    }
  }

  render(timestamp) {
    if (this.isPaused) return;
    this.animationFrameId = requestAnimationFrame(this.render);

    // Throttle to ~30fps: this is a slow ambient background glow, not motion
    // that benefits from 60fps, and it halves the full-viewport redraw cost.
    if (timestamp - this.lastFrameTime < 33) return;
    this.lastFrameTime = timestamp;

    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;

    // Spring interpolation for cursor
    const springStiffness = 0.08;
    const damping = 0.85;

    this.velocity.x = (this.velocity.x + (this.targetPointer.x - this.currentPointer.x) * springStiffness) * damping;
    this.velocity.y = (this.velocity.y + (this.targetPointer.y - this.currentPointer.y) * springStiffness) * damping;
    this.currentPointer.x += this.velocity.x;
    this.currentPointer.y += this.velocity.y;

    // Clear frame
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // 1. Primary Specular Light Ray (Following Pointer)
    const lightGradient = this.ctx.createRadialGradient(
      this.currentPointer.x,
      this.currentPointer.y,
      0,
      this.currentPointer.x,
      this.currentPointer.y,
      450
    );

    if (isDark) {
      lightGradient.addColorStop(0, 'rgba(212, 175, 55, 0.14)'); // Gold refraction
      lightGradient.addColorStop(0.3, 'rgba(120, 160, 255, 0.05)'); // Cool blue dispersion
      lightGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.02)');
      lightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      lightGradient.addColorStop(0, 'rgba(197, 160, 89, 0.16)');
      lightGradient.addColorStop(0.3, 'rgba(160, 190, 255, 0.06)');
      lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    }

    this.ctx.fillStyle = lightGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Refraction Prisms & Caustic Dispersion
    if (!this.reducedMotion) {
      for (const p of this.prisms) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        if (p.x < -p.radius) p.x = this.width + p.radius;
        if (p.x > this.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = this.height + p.radius;
        if (p.y > this.height + p.radius) p.y = -p.radius;

        const dx = this.currentPointer.x - p.x;
        const dy = this.currentPointer.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 400) {
          const intensity = (1 - dist / 400) * 0.12;

          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.angle);

          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.radius, p.radius * 0.6, 0, 0, Math.PI * 2);
          this.ctx.strokeStyle = isDark ? `rgba(212, 175, 55, ${intensity})` : `rgba(180, 150, 80, ${intensity})`;
          this.ctx.lineWidth = 1.5;
          this.ctx.stroke();

          this.ctx.restore();
        }
      }
    }
  }
}

// Instantiate engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.refractionEngine = new RefractionEngine('refraction-canvas');
});
