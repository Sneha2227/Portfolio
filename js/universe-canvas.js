/**
 * ==============================================================================
 * UNIVERSE CANVAS ENGINE — "3D COSMIC ORB & STARFIELD SIMULATION"
 * ==============================================================================
 * A high-performance, standalone HTML5 Canvas engine featuring:
 * 1. Deep space twinkling starfield with subtle constellation connections
 * 2. Central 3D Fibonacci Particle Orb with dynamic 3D rotational projection
 * 3. Mouse parallax, magnetic attraction, and interactive shockwave ripple
 * 4. Cinematic "Hyperdrive Warp" acceleration mode
 * 5. High-DPI support, zero dependencies, battery-conscious lifecycle
 * ==============================================================================
 */

class UniverseCanvas {
  constructor(canvasId = "universe-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse / Pointer State
    this.mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isHovering: false,
      isDown: false
    };

    // Animation & State
    this.animFrameId = null;
    this.isRunning = false;
    this.lastTime = performance.now();
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Hyperdrive Warp State
    this.isWarping = false;
    this.warpProgress = 0;
    this.warpTarget = 0;

    // Shockwave ripples
    this.shockwaves = [];

    // Orb 3D geometry
    this.orbRadius = 180;
    this.orbNodes = [];
    this.orbNodeCount = 280;
    this.rotX = 0;
    this.rotY = 0;
    this.targetRotX = 0;
    this.targetRotY = 0;

    // Background Stars
    this.stars = [];
    this.starCount = 140;

    this.init();
  }

  init() {
    this.resize();
    this.buildStars();
    this.buildOrb();
    this.bindEvents();
    this.start();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);

    // Adjust orb size responsively
    const minDim = Math.min(this.width, this.height);
    this.orbRadius = this.width < 600
      ? Math.max(70, Math.min(105, minDim * 0.24))
      : Math.max(110, Math.min(200, minDim * 0.28));
  }

  buildStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        z: Math.random() * 800 + 100, // Depth for warp speed
        baseZ: Math.random() * 800 + 100,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? "#a78bfa" : (Math.random() > 0.5 ? "#22d3ee" : "#ffffff")
      });
    }
  }

  buildOrb() {
    this.orbNodes = [];
    // Spherical Fibonacci distribution gives an evenly spaced spherical shell
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < this.orbNodeCount; i++) {
      const y = 1 - (i / (this.orbNodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at this latitude
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      this.orbNodes.push({
        origX: x,
        origY: y,
        origZ: z,
        x: x,
        y: y,
        z: z,
        // Particle color variation: violet to cyan to pure light
        hue: i % 2 === 0 ? "violet" : "cyan",
        size: Math.random() * 1.8 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
        displacement: 0
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
    }, { passive: true });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isHovering = true;

      // Map mouse position to rotation targets (-1 to 1)
      const normX = (e.clientX / this.width - 0.5) * 2;
      const normY = (e.clientY / this.height - 0.5) * 2;
      this.targetRotY = normX * 0.9;
      this.targetRotX = -normY * 0.7;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      this.mouse.isHovering = false;
      this.targetRotX = 0;
      this.targetRotY = 0;
    });

    // Touch support for mobile devices
    window.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const normX = (touch.clientX / this.width - 0.5) * 2;
        const normY = (touch.clientY / this.height - 0.5) * 2;
        this.targetRotY = normX * 0.8;
        this.targetRotX = -normY * 0.6;
      }
    }, { passive: true });

    // Shockwave on click / tap anywhere in hero
    window.addEventListener("click", (e) => {
      this.triggerShockwave(e.clientX, e.clientY);
    });

    // Handle tab visibility to save battery
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });

    // Listen for reduced motion preference changes
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
      this.reducedMotion = e.matches;
    });
  }

  triggerShockwave(x = this.width / 2, y = this.height / 2) {
    this.shockwaves.push({
      x: x || this.width / 2,
      y: y || this.height / 2,
      radius: 5,
      maxRadius: Math.max(this.width, this.height) * 0.45,
      strength: 1.0,
      color: Math.random() > 0.5 ? "rgba(139, 92, 246, " : "rgba(6, 182, 212, "
    });

    // Displace orb nodes slightly for a tactile jelly-like reaction
    this.orbNodes.forEach((node) => {
      node.displacement = 0.35;
    });
  }

  triggerHyperdrive(duration = 2400) {
    this.isWarping = true;
    this.warpTarget = 1.0;

    // Gradually decelerate back to normal space
    setTimeout(() => {
      this.warpTarget = 0;
      setTimeout(() => {
        this.isWarping = false;
      }, 800);
    }, duration);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.renderLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  renderLoop() {
    if (!this.isRunning) return;
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    this.update(dt, now);
    this.draw(now);

    this.animFrameId = requestAnimationFrame(() => this.renderLoop());
  }

  update(dt, now) {
    // Warp speed interpolation
    if (this.isWarping || this.warpProgress > 0.01) {
      this.warpProgress += (this.warpTarget - this.warpProgress) * 0.08;
    }

    // Smooth rotational lerp
    if (!this.reducedMotion) {
      this.rotX += (this.targetRotX - this.rotX) * 0.05 + 0.003; // Gentle continuous orbit
      this.rotY += (this.targetRotY - this.rotY) * 0.05 + 0.006;
    }

    // Update stars
    const warpMult = 1 + this.warpProgress * 25;
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.twinklePhase += star.twinkleSpeed;

      if (this.isWarping || this.warpProgress > 0.02) {
        star.z -= 15 * warpMult;
        if (star.z <= 10) {
          star.z = 800;
          star.x = Math.random() * this.width;
          star.y = Math.random() * this.height;
        }
      }
    }

    // Update shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += 18;
      sw.strength = 1 - sw.radius / sw.maxRadius;
      if (sw.strength <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }

    // Relax orb displacement back to zero
    for (let i = 0; i < this.orbNodes.length; i++) {
      const node = this.orbNodes[i];
      if (node.displacement > 0.001) {
        node.displacement *= 0.93;
      }
    }
  }

  draw(now) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Clear with dark midnight gradient
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, w, h);

    // Subtle celestial nebula radial ambient glow
    const ambientGrad = ctx.createRadialGradient(
      w * 0.5, h * 0.45, 10,
      w * 0.5, h * 0.45, Math.max(w, h) * 0.65
    );
    ambientGrad.addColorStop(0, "rgba(28, 16, 58, 0.45)");
    ambientGrad.addColorStop(0.5, "rgba(10, 18, 42, 0.25)");
    ambientGrad.addColorStop(1, "rgba(3, 7, 18, 0)");
    ctx.fillStyle = ambientGrad;
    ctx.fillRect(0, 0, w, h);

    // 1. Draw Starfield
    this.drawStars(ctx, now);

    // 2. Draw 3D Interactive Particle Orb (centered around upper hero zone)
    this.drawOrb(ctx, now);

    // 3. Draw Shockwaves
    this.drawShockwaves(ctx);
  }

  drawStars(ctx, now) {
    const w = this.width;
    const h = this.height;
    const cx = w / 2;
    const cy = h / 2;

    if (this.warpProgress > 0.05) {
      // Warp speed streaks
      ctx.lineWidth = 1.5;
      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        const k = 400 / star.z;
        const px = (star.x - cx) * k + cx;
        const py = (star.y - cy) * k + cy;

        const prevK = 400 / (star.z + 20 * (1 + this.warpProgress * 20));
        const prevPx = (star.x - cx) * prevK + cx;
        const prevPy = (star.y - cy) * prevK + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${Math.min(1, this.warpProgress * 0.9)})`;
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }
    } else {
      // Normal Twinkling Stars
      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        const alpha = Math.max(0.1, star.alpha + Math.sin(star.twinklePhase) * 0.25);

        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Subtle constellation lines between close stars (first 35 stars only to keep it clean)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 35; i++) {
        for (let j = i + 1; j < 35; j++) {
          const s1 = this.stars[i];
          const s2 = this.stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 110 * 110) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }
    }
  }

  drawOrb(ctx, now) {
    const w = this.width;
    const h = this.height;
    
    // Orb Center Anchor (anchored in hero upper middle area)
    const orbCenterX = w / 2;
    const orbCenterY = this.width < 600 ? Math.min(h * 0.32, 240) : Math.min(h * 0.40, 310);

    // Rotation matrices
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);

    const projectedNodes = [];
    const baseRadius = this.orbRadius;

    // Transform 3D coordinates
    for (let i = 0; i < this.orbNodes.length; i++) {
      const node = this.orbNodes[i];

      // Subtle breathing wave
      const breathing = Math.sin(now * 0.002 + node.pulseOffset) * 0.05;
      const currentRadius = baseRadius * (1 + breathing + node.displacement);

      const ox = node.origX * currentRadius;
      const oy = node.origY * currentRadius;
      const oz = node.origZ * currentRadius;

      // Y-axis rotation
      const x1 = ox * cosY + oz * sinY;
      const z1 = -ox * sinY + oz * cosY;

      // X-axis rotation
      const y2 = oy * cosX - z1 * sinX;
      const z2 = oy * sinX + z1 * cosX;

      // Perspective projection
      const fov = 480;
      const scale = fov / (fov + z2);
      const projX = orbCenterX + x1 * scale;
      const projY = orbCenterY + y2 * scale;

      projectedNodes.push({
        x: projX,
        y: projY,
        z: z2,
        scale: scale,
        hue: node.hue,
        size: node.size * scale
      });
    }

    // Sort by depth (painter's algorithm)
    projectedNodes.sort((a, b) => b.z - a.z);

    // Draw inner subtle core glow behind nodes
    const coreGrad = ctx.createRadialGradient(
      orbCenterX, orbCenterY, 5,
      orbCenterX, orbCenterY, baseRadius * 1.15
    );
    coreGrad.addColorStop(0, "rgba(139, 92, 246, 0.22)");
    coreGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.12)");
    coreGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(orbCenterX, orbCenterY, baseRadius * 1.15, 0, Math.PI * 2);
    ctx.fill();

    // Draw orbital latitude ring
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(
      orbCenterX,
      orbCenterY,
      baseRadius * 1.35,
      baseRadius * 0.42,
      this.rotY * 0.5,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = "rgba(6, 182, 212, 0.16)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.restore();

    // Draw connecting lines between close projected nodes
    ctx.lineWidth = 0.6;
    for (let i = 0; i < projectedNodes.length; i++) {
      const p1 = projectedNodes[i];
      // Only connect foreground and midground nodes
      if (p1.z > 80) continue;

      for (let j = i + 1; j < projectedNodes.length; j++) {
        const p2 = projectedNodes[j];
        if (p2.z > 80) continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 42 * 42) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / 42) * 0.22;
          ctx.strokeStyle = p1.hue === "violet"
            ? `rgba(168, 85, 247, ${alpha})`
            : `rgba(34, 211, 238, ${alpha})`;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Render nodes
    for (let i = 0; i < projectedNodes.length; i++) {
      const p = projectedNodes[i];
      // Compute depth-based opacity and glow
      const depthAlpha = Math.max(0.15, Math.min(1.0, 0.6 + p.scale * 0.45));

      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.8, p.size), 0, Math.PI * 2);

      if (p.hue === "violet") {
        ctx.fillStyle = `rgba(192, 132, 252, ${depthAlpha})`;
      } else {
        ctx.fillStyle = `rgba(56, 189, 248, ${depthAlpha})`;
      }
      ctx.fill();

      // Subtle specular shine on nearest nodes
      if (p.z < -baseRadius * 0.5) {
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawShockwaves(ctx) {
    for (let i = 0; i < this.shockwaves.length; i++) {
      const sw = this.shockwaves[i];
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `${sw.color}${sw.strength * 0.7})`;
      ctx.lineWidth = 2.5 * sw.strength;
      ctx.stroke();
    }
  }
}

// Global initialization helper
window.addEventListener("DOMContentLoaded", () => {
  window.universeCanvas = new UniverseCanvas("universe-canvas");
});