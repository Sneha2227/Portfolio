/**
 * ==============================================================================
 * MAIN APPLICATION CONTROLLER — SNEHA SINGH DIGITAL UNIVERSE
 * ==============================================================================
 * Handles:
 * - Animated futuristic preloader
 * - Dynamic data hydration from PORTFOLIO_DATA
 * - Interactive custom cursor & magnetic hover reactions
 * - Category filter tabs for Tech Stack & Project Lab
 * - Interactive Project Details Modal
 * - Interactive Contact Form with simulated transmission
 * - Copy-to-clipboard email with tactile feedback
 * - Scroll progress indicator & back-to-top trigger
 * - Intersection Observer for reveal animations & active navbar highlighting
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if data config is loaded
  if (!window.PORTFOLIO_DATA) {
    console.error("PORTFOLIO_DATA configuration not loaded. Check js/portfolio-data.js.");
    return;
  }

  const data = window.PORTFOLIO_DATA;

  // Initialize all subsystems
  initPreloader();
  hydrateIdentity(data);
  hydrateAbout(data);
  hydrateTechStack(data);
  hydrateProjects(data);
  hydrateJourney(data);
  hydrateBeyond(data);
  hydrateContact(data);
  initCustomCursor();
  initNavigation();
  initScrollEffects();
  initAudioControls();
  initEasterEggs();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
});

/* ==============================================================================
   1. PRELOADER & INITIALIZATION SEQUENCE
   ============================================================================== */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const percentEl = document.getElementById("loader-percent");
  const statusEl = document.getElementById("loader-status");

  if (!preloader) return;

  const steps = [
    { threshold: 25, text: "CALIBRATING ORBITAL COORDINATES..." },
    { threshold: 55, text: "SYNTHESIZING PARTICLE MESH..." },
    { threshold: 85, text: "CONNECTING SNEHA'S DIGITAL CORE..." },
    { threshold: 100, text: "UNIVERSE ONLINE. WELCOME." }
  ];

  let isDone = false;
  function finish() {
    if (isDone) return;
    isDone = true;
    if (percentEl) percentEl.textContent = "100%";
    if (statusEl) statusEl.textContent = steps[3].text;
    preloader.classList.add("loaded");
    preloader.style.display = "none";
    document.body.classList.remove("is-loading");
  }

  // Check if loader should be skipped via URL parameter or reduced motion
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("skip_loader") || urlParams.has("preview") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
    return;
  }

  // Allow instant skip on click
  preloader.addEventListener("click", finish);

  let progress = 0;
  const startTime = performance.now();
  const totalDuration = 650; // Snappy 650ms intro sequence

  function step(now) {
    if (isDone) return;
    const elapsed = now - startTime;
    progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));

    if (percentEl) percentEl.textContent = `${progress}%`;
    const currentStep = steps.find(s => progress <= s.threshold) || steps[3];
    if (statusEl) statusEl.textContent = currentStep.text;

    if (progress >= 100) {
      setTimeout(finish, 180);
    } else {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);

  // Absolute safety timeout
  setTimeout(finish, 1200);
}

/* ==============================================================================
   2. HERO & IDENTITY HYDRATION
   ============================================================================== */
function hydrateIdentity(data) {
  const id = data.identity;

  // Prominently Centered Name
  const heroNameEl = document.getElementById("hero-name");
  if (heroNameEl) heroNameEl.textContent = id.name;

  const brandLogoNameEl = document.getElementById("brand-name");
  if (brandLogoNameEl) brandLogoNameEl.textContent = id.name;

  // Desired Role & Badges
  const heroRoleEl = document.getElementById("hero-desired-role");
  if (heroRoleEl) heroRoleEl.textContent = id.desiredRole;

  const heroBadgeEl = document.getElementById("hero-specialty-badge");
  if (heroBadgeEl) heroBadgeEl.textContent = id.specialtyBadge;

  // Status indicators
  const statusLabelEl = document.getElementById("hero-status-label");
  if (statusLabelEl) statusLabelEl.textContent = id.statusText;

  const subStatusEl = document.getElementById("hero-sub-status");
  if (subStatusEl) subStatusEl.textContent = id.subStatus;

  // Taglines
  const heroTaglineEl = document.getElementById("hero-tagline");
  if (heroTaglineEl) heroTaglineEl.textContent = id.heroTagline;

  const heroSubtitleEl = document.getElementById("hero-subtitle");
  if (heroSubtitleEl) heroSubtitleEl.textContent = id.heroSubtitle;

  // CTAs
  const ctaExplore = document.getElementById("cta-explore-btn");
  if (ctaExplore) ctaExplore.textContent = id.ctaExploreText;

  const ctaProjects = document.getElementById("cta-projects-btn");
  if (ctaProjects) ctaProjects.textContent = id.ctaProjectsText;

  // Footer identity
  const footerNameEl = document.getElementById("footer-name");
  if (footerNameEl) footerNameEl.textContent = id.name;

  const footerSectorEl = document.getElementById("footer-sector");
  if (footerSectorEl) footerSectorEl.textContent = id.sectorCoordinates;
}

/* ==============================================================================
   3. ABOUT SECTION HYDRATION
   ============================================================================== */
function hydrateAbout(data) {
  const about = data.about;
  const container = document.getElementById("about-cards-grid");
  const statsContainer = document.getElementById("about-stats-row");

  if (container) {
    container.innerHTML = about.cards.map((card, idx) => `
      <div class="glass-card about-card reveal-card" style="--card-delay: ${idx * 0.15}s;">
        <div class="card-glow"></div>
        <div class="card-header">
          <div class="card-icon-box">
            ${getIconSvg(card.icon)}
          </div>
          <span class="card-chip">LOG 0${idx + 1}</span>
        </div>
        <h3 class="about-card-title">${card.title}</h3>
        <p class="about-card-subtitle">${card.subtitle}</p>
        <p class="about-card-text">${card.text}</p>
      </div>
    `).join("");
  }

  if (statsContainer) {
    statsContainer.innerHTML = about.stats.map(stat => `
      <div class="about-stat-chip">
        <span class="stat-label">${stat.label}</span>
        <span class="stat-value">${stat.value}</span>
      </div>
    `).join("");
  }
}

/* ==============================================================================
   4. TECH STACK HYDRATION & FILTERING
   ============================================================================== */
function hydrateTechStack(data) {
  const stack = data.techStack;
  const tabsContainer = document.getElementById("tech-filter-tabs");
  const gridContainer = document.getElementById("tech-skills-grid");

  if (!tabsContainer || !gridContainer) return;

  // Render Filter Tabs
  tabsContainer.innerHTML = stack.categories.map((cat, idx) => `
    <button class="filter-tab ${idx === 0 ? 'active' : ''}" data-category="${cat.id}">
      ${cat.label}
    </button>
  `).join("");

  // Function to render skills
  const renderSkills = (categoryFilter = "all") => {
    const filtered = categoryFilter === "all"
      ? stack.skills
      : stack.skills.filter(s => s.category === categoryFilter);

    gridContainer.innerHTML = filtered.map(skill => `
      <div class="glass-card tech-card reveal-card" data-category="${skill.category}">
        <div class="tech-icon-wrapper">
          ${getTechIconSvg(skill.icon)}
        </div>
        <div class="tech-info">
          <div class="tech-header-row">
            <h4 class="tech-name">${skill.name}</h4>
            <span class="tech-level-badge level-${skill.levelType}">${skill.level}</span>
          </div>
          <p class="tech-desc">${skill.description}</p>
        </div>
      </div>
    `).join("");
  };

  renderSkills("all");

  // Tab click listener
  tabsContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".filter-tab");
    if (!target) return;

    tabsContainer.querySelectorAll(".filter-tab").forEach(tab => tab.classList.remove("active"));
    target.classList.add("active");

    const category = target.getAttribute("data-category");
    renderSkills(category);

    if (window.cosmicAudio) window.cosmicAudio.playClick();
  });
}

/* ==============================================================================
   5. PROJECT LAB HYDRATION, FILTERING & MODAL
   ============================================================================== */
function hydrateProjects(data) {
  const projects = data.projects;
  const tabsContainer = document.getElementById("project-filter-tabs");
  const gridContainer = document.getElementById("projects-grid");

  if (!tabsContainer || !gridContainer) return;

  // Filter tabs
  tabsContainer.innerHTML = projects.categories.map((cat, idx) => `
    <button class="filter-tab ${idx === 0 ? 'active' : ''}" data-category="${cat.id}">
      ${cat.label}
    </button>
  `).join("");

  // Render project cards
  const renderProjects = (filter = "all") => {
    const filtered = filter === "all"
      ? projects.list
      : projects.list.filter(p => p.category === filter);

    gridContainer.innerHTML = filtered.map(project => `
      <article class="glass-card project-card reveal-card" data-category="${project.category}">
        <div class="card-glow"></div>
        <div class="project-top-meta">
          <span class="project-badge">${project.badge}</span>
          <span class="project-status-tag ${project.isPlaceholder ? 'is-placeholder' : 'is-active'}">
            ${project.statusLabel}
          </span>
        </div>

        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>

        <div class="project-tags">
          ${project.tags.map(t => `<span class="tag-pill">${t}</span>`).join("")}
        </div>

        <div class="project-actions">
          <button class="btn-inspect-project" data-project-id="${project.id}">
            <span>Inspect Blueprint</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          <div class="project-links">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" title="GitHub Repository" aria-label="GitHub Repository">
                ${getSocialSvg('github')}
              </a>
            ` : ''}
            ${project.liveDemoUrl ? `
              <a href="${project.liveDemoUrl}" class="icon-link live-link" title="Live Preview" aria-label="Live Demo Preview">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `).join("");
  };

  renderProjects("all");

  // Tab click
  tabsContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".filter-tab");
    if (!target) return;

    tabsContainer.querySelectorAll(".filter-tab").forEach(tab => tab.classList.remove("active"));
    target.classList.add("active");

    const category = target.getAttribute("data-category");
    renderProjects(category);

    if (window.cosmicAudio) window.cosmicAudio.playClick();
  });

  // Project Modal Inspection Handlers
  gridContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inspect-project");
    if (!btn) return;

    const projectId = btn.getAttribute("data-project-id");
    const project = projects.list.find(p => p.id === projectId);
    if (project) {
      openProjectModal(project);
    }
  });

  initProjectModal();
}

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = document.getElementById("modal-backdrop");

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

function openProjectModal(project) {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-dynamic-content");

  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-blueprint-header">
      <div class="blueprint-meta">
        <span class="project-badge">${project.badge}</span>
        <span class="project-status-tag ${project.isPlaceholder ? 'is-placeholder' : 'is-active'}">
          ${project.statusLabel}
        </span>
      </div>
      <h2 class="modal-project-title">${project.title}</h2>
      <p class="modal-project-desc">${project.fullDescription}</p>
    </div>

    <div class="modal-section">
      <h4 class="modal-subtitle">ARCHITECTURE & TOOLS</h4>
      <div class="project-tags">
        ${project.tags.map(t => `<span class="tag-pill">${t}</span>`).join("")}
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-subtitle">KEY ENGINEERING TAKEAWAYS</h4>
      <ul class="modal-takeaways-list">
        ${project.keyLearnings.map(k => `<li>${k}</li>`).join("")}
      </ul>
    </div>

    <div class="modal-footer-actions">
      ${project.githubUrl ? `
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="cosmic-btn btn-secondary">
          ${getSocialSvg('github')}
          <span>Inspect Source on GitHub</span>
        </a>
      ` : ''}
      ${project.liveDemoUrl ? `
        <a href="${project.liveDemoUrl}" class="cosmic-btn btn-primary">
          <span>Launch Live App</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      ` : ''}
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  if (window.cosmicAudio) window.cosmicAudio.playClick();
}

/* ==============================================================================
   6. LEARNING JOURNEY TIMELINE HYDRATION
   ============================================================================== */
function hydrateJourney(data) {
  const journey = data.journey;
  const container = document.getElementById("journey-timeline");

  if (!container) return;

  container.innerHTML = journey.levels.map(lvl => `
    <div class="timeline-item timeline-${lvl.statusType} reveal-card">
      <div class="timeline-marker">
        <div class="marker-dot"></div>
      </div>
      <div class="timeline-content glass-card">
        <div class="card-glow"></div>
        <div class="timeline-header">
          <div class="level-indicator">
            <span class="level-code">${lvl.levelNumber}</span>
            <span class="level-title">${lvl.stageName}</span>
          </div>
          <span class="status-chip chip-${lvl.statusType}">${lvl.status}</span>
        </div>

        <p class="timeline-period">${lvl.period}</p>
        <h4 class="timeline-headline">${lvl.headline}</h4>
        <p class="timeline-desc">${lvl.description}</p>

        <div class="unlocked-skills">
          <span class="skills-label">Unlocked Capabilities:</span>
          <div class="skill-chips-row">
            ${lvl.unlockedSkills.map(s => `<span class="unlocked-chip">✦ ${s}</span>`).join("")}
          </div>
        </div>

        <div class="xp-progress-bar">
          <span class="xp-label">EXPERIENCE POINTS</span>
          <span class="xp-val">${lvl.xp}</span>
        </div>
      </div>
    </div>
  `).join("");
}

/* ==============================================================================
   7. BEYOND THE SCREEN HYDRATION
   ============================================================================== */
function hydrateBeyond(data) {
  const beyond = data.beyondScreen;
  const container = document.getElementById("beyond-cards-grid");

  if (!container) return;

  container.innerHTML = beyond.interests.map(item => `
    <div class="glass-card beyond-card reveal-card" data-interest-id="${item.id}">
      <div class="card-glow"></div>
      <div class="beyond-icon-box">
        ${getBeyondIconSvg(item.icon)}
      </div>
      <span class="beyond-tag">${item.tag}</span>
      <h3 class="beyond-title">${item.title}</h3>
      <blockquote class="beyond-quote">"${item.quote}"</blockquote>
      <p class="beyond-desc">${item.description}</p>
    </div>
  `).join("");
}

/* ==============================================================================
   8. CONTACT SECTION & INTERACTIVE FORM
   ============================================================================== */
function hydrateContact(data) {
  const contact = data.contact;

  const emailTextEl = document.getElementById("contact-email-text");
  if (emailTextEl) emailTextEl.textContent = contact.email;

  const directMailtoEl = document.getElementById("direct-email-link");
  if (directMailtoEl) directMailtoEl.href = `mailto:${contact.email}`;

  const ghLink = document.getElementById("contact-github-link");
  if (ghLink) {
    ghLink.href = contact.githubUrl;
    ghLink.textContent = `@${contact.githubHandle}`;
  }

  const inLink = document.getElementById("contact-linkedin-link");
  if (inLink) {
    inLink.href = contact.linkedinUrl;
    inLink.textContent = contact.linkedinHandle;
  }

  const pledgeEl = document.getElementById("response-pledge");
  if (pledgeEl) pledgeEl.textContent = contact.responsePledge;

  // Copy email to clipboard button
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(contact.email).then(() => {
        const originalText = copyBtn.querySelector(".btn-label").textContent;
        copyBtn.querySelector(".btn-label").textContent = "Copied to Clipboard! 📋";
        copyBtn.classList.add("copied");

        if (window.cosmicAudio) window.cosmicAudio.playChime(784, 0.5);

        setTimeout(() => {
          copyBtn.querySelector(".btn-label").textContent = originalText;
          copyBtn.classList.remove("copied");
        }, 2200);
      }).catch(() => {
        // Fallback for older browsers
        window.location.href = `mailto:${contact.email}`;
      });
    });
  }

  // Interactive Contact Transmission Form
  const form = document.getElementById("cosmic-contact-form");
  const formFeedback = document.getElementById("form-feedback-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("form-sender-name");
      const emailInput = document.getElementById("form-sender-email");
      const messageInput = document.getElementById("form-sender-message");
      const submitBtn = form.querySelector("button[type='submit']");

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showFormFeedback("Please fill out all fields before transmitting signal.", "error");
        return;
      }

      // Simulate network transmission to Sneha's orbit
      submitBtn.disabled = true;
      submitBtn.classList.add("transmitting");
      const submitSpan = submitBtn.querySelector(".submit-text");
      const oldBtnText = submitSpan.textContent;
      submitSpan.textContent = "ENCRYPTING SIGNAL...";

      if (window.cosmicAudio) window.cosmicAudio.playClick();

      setTimeout(() => {
        submitSpan.textContent = "TRANSMITTING TO ORBIT...";
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove("transmitting");
          submitSpan.textContent = oldBtnText;

          // Clear fields
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";

          showFormFeedback("Signal transmitted successfully! Sneha will receive your transmission shortly. 🚀", "success");
          if (window.cosmicAudio) window.cosmicAudio.playChime(880, 0.7);
        }, 1200);
      }, 900);
    });
  }

  function showFormFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `feedback-box feedback-${type}`;
    formFeedback.style.display = "block";
    setTimeout(() => {
      formFeedback.style.display = "none";
    }, 6000);
  }
}

/* ==============================================================================
   9. CUSTOM ANIMATED CURSOR
   ============================================================================== */
function initCustomCursor() {
  const cursorDot = document.getElementById("cursor-dot");
  const cursorGlow = document.getElementById("cursor-glow");

  if (!cursorDot || !cursorGlow) return;

  // Disable on touch devices
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    cursorDot.style.display = "none";
    cursorGlow.style.display = "none";
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let glowX = -100;
  let glowY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  // Smooth lerp for glow halo
  function renderCursorGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    requestAnimationFrame(renderCursorGlow);
  }
  requestAnimationFrame(renderCursorGlow);

  // Magnetic hover states on interactive elements
  const hoverables = "a, button, input, textarea, .glass-card, .filter-tab, .clickable";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) {
      document.body.classList.remove("cursor-hover");
    }
  });
}

/* ==============================================================================
   10. NAVIGATION, SMOOTH SCROLL & ACTIVE SECTION OBSERVER
   ============================================================================== */
function initNavigation() {
  const nav = document.getElementById("main-nav");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu-links");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      mobileToggle.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll click handler
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.startsWith("#live-demo")) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        if (window.cosmicAudio) window.cosmicAudio.playClick();
      }
    });
  });

  // Active section spy
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

/* ==============================================================================
   11. SCROLL REVEAL & BACK TO TOP PROGRESS RING
   ============================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  const progressCircle = document.getElementById("scroll-progress-ring");

  const totalLength = 283; // 2 * PI * 45 for r=45

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    // Show/hide back to top
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // Update radial ring
    if (progressCircle) {
      const offset = totalLength - (scrollPercent * totalLength);
      progressCircle.style.strokeDashoffset = offset;
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.cosmicAudio) window.cosmicAudio.playClick();
    });
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".reveal-card, .section-heading-group");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==============================================================================
   12. AUDIO & EASTER EGG TRIGGERS
   ============================================================================== */
function initAudioControls() {
  const audioToggleBtn = document.getElementById("audio-toggle-btn");
  if (!audioToggleBtn) return;

  audioToggleBtn.addEventListener("click", () => {
    if (window.cosmicAudio) {
      const isEnabled = window.cosmicAudio.toggle();
      audioToggleBtn.classList.toggle("sound-on", isEnabled);
      const label = audioToggleBtn.querySelector(".audio-label");
      if (label) label.textContent = isEnabled ? "AUDIO: ON" : "AUDIO: MUTED";
    }
  });
}

function initEasterEggs() {
  const warpBtn = document.getElementById("btn-warp-easteregg");
  if (warpBtn) {
    warpBtn.addEventListener("click", () => {
      if (window.universeCanvas) {
        window.universeCanvas.triggerHyperdrive(2600);
      }
      if (window.cosmicAudio) {
        window.cosmicAudio.playCosmicChord();
      }
    });
  }
}

/* ==============================================================================
   13. LIVE UTC / LOCAL TIME CLOCK
   ============================================================================== */
function updateLiveClock() {
  const clockEl = document.getElementById("footer-live-time");
  if (!clockEl) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  const secs = String(now.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${hours}:${mins}:${secs} LOCAL`;
}

/* ==============================================================================
   14. VECTOR ICON GENERATOR HELPERS (Zero external image dependencies!)
   ============================================================================== */
function getIconSvg(type) {
  switch (type) {
    case "sparkles":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/></svg>`;
    case "cpu":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`;
    case "compass":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
    default:
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

function getTechIconSvg(type) {
  switch (type) {
    case "python":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><path d="M12 2c5 0 5 2 5 2v3H9V6s0-4 3-4z"/><path d="M12 22c-5 0-5-2-5-2v-3h8v1s0 4-3 4z"/><circle cx="10" cy="4.5" r="1" fill="#38bdf8"/><circle cx="14" cy="19.5" r="1" fill="#38bdf8"/><path d="M4 9c0-3 2-3 2-3h5v4H4s0-1 0-1z"/><path d="M20 15c0 3-2 3-2 3h-5v-4h7s0 1 0 1z"/></svg>`;
    case "cpp":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8"><polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>`;
    case "javascript":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 16c0 1.5-1 2-2 2-1.5 0-2-1-2-2"/><path d="M15 13c1 0 2 .5 2 1.8 0 1.5-1.2 2.2-2.5 2.2-1.5 0-2-.8-2-2"/></svg>`;
    case "html":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="1.8"><path d="M4 3h16l-1.5 15L12 22 5.5 18z"/><path d="M8 8h8M8 12h7.5L15 16l-3 1-3-1"/></svg>`;
    case "css":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><path d="M4 3h16l-1.5 15L12 22 5.5 18z"/><path d="M8 8h8M8 12h7.5M8 16h6.5"/></svg>`;
    case "git":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.8"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v6M9 6h3a3 3 0 0 1 3 3v6"/></svg>`;
    case "terminal":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.8"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;
    case "dsa":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="1.8"><circle cx="12" cy="5" r="3"/><circle cx="6" cy="19" r="3"/><circle cx="18" cy="19" r="3"/><line x1="10.5" y1="7.5" x2="7.5" y2="16.5"/><line x1="13.5" y1="7.5" x2="16.5" y2="16.5"/></svg>`;
    case "palette":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e879f9" stroke-width="1.8"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9.8-10-9.8z"/></svg>`;
    default:
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`;
  }
}

function getBeyondIconSvg(type) {
  switch (type) {
    case "telescope":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.8"><path d="m10.5 7.5 4-4a2.8 2.8 0 0 1 4 4l-4 4"/><path d="m3.5 14.5 7-7"/><circle cx="12" cy="12" r="2"/><path d="m7.5 18.5-4 4M16.5 18.5l4 4M12 17v5"/></svg>`;
    case "headphones":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="1.8"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`;
    case "chess":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="1.8"><path d="M14 4h-4a2 2 0 0 0-2 2v2h8V6a2 2 0 0 0-2-2zM6 20h12v-2H6v2zM7 16h10l-1-6H8l-1 6z"/></svg>`;
    case "brush":
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="1.8"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M18 11l-4-4"/><path d="M15 3a2 2 0 0 1 3 0l3 3a2 2 0 0 1 0 3l-3 3-6-6 3-3z"/></svg>`;
    default:
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

function getSocialSvg(platform) {
  if (platform === "github") {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
  }
  return "";
}