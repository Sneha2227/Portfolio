/**
 * ==============================================================================
 * INTERACTIVE TERMINAL HUD DECK — EASTER EGG & SYSTEM CONSOLE
 * ==============================================================================
 * A retro-futuristic, fully interactive in-browser terminal drawer.
 * Triggered by the [~] key or header HUD button.
 * Allows exploring Sneha's universe via raw command line directives.
 * ==============================================================================
 */

class TerminalHud {
  constructor() {
    this.container = document.getElementById("terminal-hud");
    this.output = document.getElementById("terminal-output");
    this.input = document.getElementById("terminal-input");
    this.closeBtn = document.getElementById("terminal-close-btn");
    this.triggerBtns = document.querySelectorAll(".terminal-trigger");

    this.isOpen = false;
    this.history = [];
    this.historyIndex = -1;
    this.matrixInterval = null;

    this.init();
  }

  init() {
    if (!this.container || !this.input) return;

    // Print welcome banner
    this.printWelcome();

    // Event listeners
    this.triggerBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Toggle on '~' or '`' key anywhere
    window.addEventListener("keydown", (e) => {
      if (e.key === "`" || e.key === "~") {
        // If user is not typing in a contact form input
        const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          this.toggle();
        }
      } else if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Terminal command execution
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.executeCommand(cmd);
        }
        this.input.value = "";
      } else if (e.key === "ArrowUp") {
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = "";
        }
        e.preventDefault();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.container.classList.add("active");
    this.container.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      this.input.focus();
    }, 150);
    if (window.cosmicAudio) {
      window.cosmicAudio.playClick();
    }
  }

  close() {
    this.isOpen = false;
    this.container.classList.remove("active");
    this.container.setAttribute("aria-hidden", "true");
    if (this.matrixInterval) {
      clearInterval(this.matrixInterval);
      this.matrixInterval = null;
    }
  }

  printWelcome() {
    if (!this.output || !window.PORTFOLIO_DATA) return;
    const lines = window.PORTFOLIO_DATA.terminalCommands.welcomeMessage;
    lines.forEach(line => this.appendLine(line, "system"));
  }

  appendLine(text, type = "normal") {
    const p = document.createElement("div");
    p.className = `terminal-line line-${type}`;
    p.textContent = text;
    this.output.appendChild(p);
    this.output.scrollTop = this.output.scrollHeight;
  }

  executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    this.appendLine(`user@sneha-universe:~$ ${rawCmd}`, "user");

    const data = window.PORTFOLIO_DATA;

    switch (cmd) {
      case "help":
        data.terminalCommands.helpText.forEach(line => this.appendLine(line, "info"));
        break;

      case "whoami":
        this.appendLine(`IDENTIFIER : ${data.identity.name}`, "success");
        this.appendLine(`ROLE       : ${data.identity.desiredRole}`, "info");
        this.appendLine(`COLLEGE    : ${data.identity.college}`, "info");
        this.appendLine(`FOCUS      : ${data.identity.heroTagline}`, "normal");
        this.appendLine(`MOTTO      : "${data.about.tagline}"`, "warning");
        break;

      case "status":
        this.appendLine(`[SYSTEM METRICS]`, "success");
        this.appendLine(`STATUS     : ${data.identity.statusText}`, "info");
        this.appendLine(`TELEMETRY  : ${data.identity.subStatus}`, "normal");
        this.appendLine(`SECTOR     : ${data.identity.sectorCoordinates}`, "normal");
        this.appendLine(`AUDIO SYNTH: ${window.cosmicAudio && window.cosmicAudio.isEnabled ? "ONLINE" : "MUTED"}`, "normal");
        break;

      case "skills":
        this.appendLine(`TECHNICAL ARSENAL:`, "success");
        data.techStack.skills.forEach(s => {
          this.appendLine(`  • ${s.name.padEnd(26)} [${s.level.padEnd(16)}] - ${s.category}`, "info");
        });
        break;

      case "projects":
        this.appendLine(`ENGINEERED LAB PROJECTS:`, "success");
        data.projects.list.forEach((p, idx) => {
          this.appendLine(`  [${idx + 1}] ${p.title} (${p.statusLabel})`, "warning");
          this.appendLine(`      Summary: ${p.summary}`, "normal");
          this.appendLine(`      Stack: ${p.tags.join(", ")}`, "info");
        });
        break;

      case "journey":
        this.appendLine(`RPG ADVENTURE QUEST TIMELINE:`, "success");
        data.journey.levels.forEach(lvl => {
          this.appendLine(`  ${lvl.levelNumber} - ${lvl.stageName} [${lvl.status.toUpperCase()}]`, "info");
          this.appendLine(`      Focus: ${lvl.headline}`, "normal");
          this.appendLine(`      XP   : ${lvl.xp}`, "warning");
        });
        break;

      case "contact":
        this.appendLine(`COMMUNICATION CHANNELS:`, "success");
        this.appendLine(`  EMAIL   : ${data.contact.email}`, "info");
        this.appendLine(`  GITHUB  : ${data.contact.githubUrl}`, "info");
        this.appendLine(`  LINKEDIN: ${data.contact.linkedinUrl}`, "info");
        break;

      case "warp":
        this.appendLine("⚡ INITIATING HYPERDRIVE ACCELERATION...", "warning");
        if (window.universeCanvas) {
          window.universeCanvas.triggerHyperdrive(2800);
        }
        if (window.cosmicAudio) {
          window.cosmicAudio.playCosmicChord();
        }
        setTimeout(() => {
          this.appendLine("✨ DROP FROM WARP SUCCESSFUL. SYSTEM NOMINAL.", "success");
        }, 2800);
        break;

      case "audio":
        if (window.cosmicAudio) {
          const state = window.cosmicAudio.toggle();
          this.appendLine(`🔊 Procedural Cosmic Synthesizer is now ${state ? "ENABLED" : "MUTED"}.`, "success");
        }
        break;

      case "matrix":
        this.toggleMatrix();
        break;

      case "clear":
        this.output.innerHTML = "";
        break;

      case "exit":
      case "quit":
        this.appendLine("Disconnecting HUD link...", "warning");
        setTimeout(() => this.close(), 400);
        break;

      default:
        this.appendLine(`Command not recognized: '${cmd}'. Type 'help' to inspect valid instructions.`, "error");
        break;
    }
  }

  toggleMatrix() {
    if (this.matrixInterval) {
      clearInterval(this.matrixInterval);
      this.matrixInterval = null;
      this.appendLine("Matrix rain sequence terminated.", "warning");
      return;
    }

    this.appendLine("⚡ Matrix data stream initiated. (Type 'matrix' again to stop)", "success");
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";
    let count = 0;

    this.matrixInterval = setInterval(() => {
      let stream = "";
      for (let i = 0; i < 48; i++) {
        stream += chars.charAt(Math.floor(Math.random() * chars.length)) + " ";
      }
      this.appendLine(stream, "matrix");
      count++;
      if (count > 25) {
        clearInterval(this.matrixInterval);
        this.matrixInterval = null;
        this.appendLine("Stream buffer flushed.", "info");
      }
    }, 90);
  }
}

// Global Terminal initialization
window.addEventListener("DOMContentLoaded", () => {
  window.terminalHud = new TerminalHud();
});

