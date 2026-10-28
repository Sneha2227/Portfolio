# 🌌 Beyond The Code — Sneha Singh Digital Universe Portfolio

An interactive, award-winning personal portfolio website engineered for **Sneha Singh**, First-Year Computer Science Engineering student and creative technologist.

Built with **pure vanilla modern HTML5, CSS3, and ES6+ JavaScript** — with **zero external dependencies, zero build steps, and 60fps performance**.

---

## ✨ Experience Highlights

- **🛸 Theme: "Beyond The Code — A Digital Universe"**: Deep midnight interface (`#030712`), electric violet (`#8b5cf6`) and cyan (`#06b6d4`) accents, subtle glowing particles, and glassmorphism.
- **🪐 3D Interactive Particle Orb**: Mathematically projected 3D Fibonacci sphere rotating on an HTML5 Canvas, responding dynamically to mouse movement, dragging, and touch.
- **✨ Hero Landing Experience**:
  - Centered Name: **Sneha Singh**
  - Desired Position: **First-Year Computer Science Engineering Student**
  - Specialty Badge: **Aspiring Software Engineer & Creative Technologist**
  - Headline: *"I'M NOT JUST LEARNING TO CODE. I'M LEARNING TO CREATE."*
  - Live Status Pill: `STATUS: BUILDING MY FUTURE...` with pulsing telemetry
  - Interactive Call-to-Actions and animated scroll indicator
- **🔊 Procedural Cosmic Synthesizer (Web Audio API)**:
  - Generates harmonic celestial chimes and tactile click feedback without downloading audio files.
  - Respects browser autoplay policies with an active/muted audio toggle.
- **💻 Interactive Command HUD Deck (Easter Egg)**:
  - Press `~` or click the **HUD** pill in the top navigation bar to summon a retro-futuristic terminal.
  - Interactive commands: `whoami`, `status`, `skills`, `projects`, `journey`, `contact`, `warp`, `audio`, `matrix`, `clear`, `exit`.
- **🛠️ Tech Arsenal ("Tools in My Inventory")**:
  - Filterable by category (`All`, `Languages`, `Frontend & Web`, `Tools & Workflow`, `On My Radar`).
  - Transparent, honest proficiency badges (`Foundational`, `Active Practice`, `Proficient`, `Exploring`).
- **🚀 Project Lab ("Ideas Turned into Reality")**:
  - Interactive cards with filter tabs, tags, GitHub repo buttons, and live demo links.
  - Built-in **Project Blueprint Modal** that opens detailed breakdowns, architecture notes, and key takeaways.
- **🎮 Learning Journey ("Leveling Up")**:
  - RPG-inspired progression timeline tracking the quest from beginner to aspiring software engineer with XP bars and unlocked capabilities.
- **🌌 Beyond The Screen ("Human Dimension")**:
  - Highlights interests outside code: Stargazing & Astrophysics, Ambient Lo-Fi & Soundscapes, Chess & Logic Puzzles, and Digital Art.
- **📬 Contact Hub ("Let's Build Something")**:
  - One-click copy email button with tactile feedback tooltip.
  - Direct links to GitHub and LinkedIn.
  - Interactive signal transmission form with simulated satellite dispatch feedback.
- **⚡ Performance & Accessibility**:
  - Full mobile, tablet, and desktop responsiveness.
  - `prefers-reduced-motion` support.
  - Native SVG vectors with zero external image dependencies.

---

## 📁 Project Structure

```
Portfolio/
├── index.html              # Semantic HTML5 document
├── README.md               # Documentation & customization guide
├── css/
│   ├── style.css           # Design tokens, typography, hero, canvas layout
│   ├── components.css      # Glassmorphism cards, modals, terminal HUD, forms
│   └── responsive.css      # Mobile (320px–480px), tablet, and reduced motion rules
├── js/
│   ├── portfolio-data.js   # ⚙️ CENTRAL CONFIGURATION (Edit your info here!)
│   ├── universe-canvas.js  # 3D Fibonacci particle orb & starfield simulation
│   ├── audio-synth.js      # Browser-native procedural Web Audio API synth
│   ├── terminal-hud.js     # Retro-futuristic command line drawer
│   └── main.js             # Preloader, data hydration, modal, filtering, and events
└── assets/
    └── favicon.svg         # Custom cosmic orbital SVG favicon
```

---

## ⚙️ How to Personalize (In 1 Single File!)

All your personal details, links, skills, projects, and college information can be edited in **`js/portfolio-data.js`**:

```javascript
// Open js/portfolio-data.js
const PORTFOLIO_DATA = {
  identity: {
    name: "Sneha Singh",
    desiredRole: "First-Year Computer Science Engineering Student",
    college: "[Your College / University Name]", // <-- Put your college name here
    email: "snehasingh.dev@example.com",
    githubUrl: "https://github.com/SnehaSingh-dev",
    linkedinUrl: "https://linkedin.com/in/snehasingh-dev"
  },
  // Add or update skills, project details, and milestone levels anytime!
};
```

Whenever you save `js/portfolio-data.js` and refresh your browser, your entire portfolio automatically updates everywhere!

---

## 🚀 Running Locally

Because this project uses native web technologies without build steps or node dependencies:

### Option 1: Double-Click
Open `index.html` directly in any web browser (Google Chrome, Safari, Edge, Firefox).

### Option 2: VS Code Live Server
1. Open this folder in **VS Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Python Built-in Server
Open your terminal inside this folder and run:
```bash
python3 -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Deploying to GitHub Pages (Free Hosting)

1. Create a new repository on GitHub named `portfolio` or `sneha-singh.github.io`.
2. Push your project files:
   ```bash
   git init
   git add .
   git commit -m "Launch Sneha Singh Digital Universe Portfolio"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings** → **Pages**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your portfolio will be live at `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/`!

