/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION DATA - "BEYOND THE CODE"
 * ==============================================================================
 * Welcome Sneha! This is your central control deck.
 * You can customize ALL your personal information, links, skills, projects,
 * milestones, and interests right here in this single file.
 * 
 * Simply edit the values inside the quotes, save the file, and refresh your browser!
 * ==============================================================================
 */

const PORTFOLIO_DATA = {
  // ==========================================
  // 1. PERSONAL IDENTITY & HERO HEADLINE
  // ==========================================
  identity: {
    // Your prominent centered name
    name: "Sneha Singh",
    
    // Desired position / role title
    desiredRole: "First-Year Computer Science Engineering Student",
    
    // Alternative sub-badge / specialties
    specialtyBadge: "Aspiring Software Engineer & Creative Technologist",
    
    // College or University [Editable placeholder]
    college: "[Your College / University Name]",
    
    // Location / Base
    location: "India",
    
    // Availability or status badge
    statusText: "BUILDING MY FUTURE...",
    subStatus: "CORE: LEARNING CS // LEVEL: 01 // LATENCY: 12ms",

    // Hero main impactful statements
    heroTagline: "I'M NOT JUST LEARNING TO CODE. I'M LEARNING TO CREATE.",
    heroSubtitle: "First-year CSE student stepping into the digital universe — exploring algorithmic logic, modern web architecture, and creative problem-solving.",

    // Call-to-actions
    ctaExploreText: "Explore My Universe",
    ctaProjectsText: "View My Projects",
    
    // System coordinates shown in footer/terminal
    sectorCoordinates: "SECTOR 01 // ORBIT ACTIVE"
  },

  // ==========================================
  // 2. ABOUT ME - "THE HUMAN BEHIND THE SCREEN"
  // ==========================================
  about: {
    sectionTitle: "THE HUMAN BEHIND THE SCREEN",
    sectionBadge: "ABOUT SNEHA",
    tagline: "Curiosity ignited by logic, fueled by creativity.",
    
    // Narrative cards
    cards: [
      {
        id: "spark",
        icon: "sparkles",
        title: "The Spark",
        subtitle: "Why Computer Science?",
        text: "I was captivated by how a few lines of structured logic can bring interactive systems to life. Choosing Computer Science Engineering wasn't just about computers — it was about gaining the superpower to transform imagination into tangible, working software."
      },
      {
        id: "current",
        icon: "cpu",
        title: "Current Focus",
        subtitle: "Building Solid Foundations",
        text: "As a first-year student, I am dedicating my time to mastering foundational programming languages (C/C++ & Python), strengthening core data structures and algorithmic thinking, and building responsive, accessible web interfaces with clean JavaScript."
      },
      {
        id: "philosophy",
        icon: "compass",
        title: "Engineering Mindset",
        subtitle: "Beyond the Syntax",
        text: "Code is more than syntax; it is a canvas for problem-solving. I prioritize readability, continuous iteration, and understanding what happens under the hood — from memory and logic gates to user experience."
      }
    ],

    // Quick stats highlights
    stats: [
      { label: "Academic Standing", value: "Year 1 CSE" },
      { label: "Core Focus", value: "DSA & Web Tech" },
      { label: "Growth Mode", value: "Constant Learning" },
      { label: "Creative Drive", value: "100% Curious" }
    ]
  },

  // ==========================================
  // 3. TECH STACK - "TOOLS IN MY INVENTORY"
  // ==========================================
  // Honest, editable proficiency levels:
  // "Foundational" (Beginner learning syntax/concepts)
  // "Active Practice" (Building projects & solving problems)
  // "Exploring" (Currently learning / experimenting)
  techStack: {
    sectionTitle: "TOOLS IN MY INVENTORY",
    sectionBadge: "TECH ARSENAL",
    description: "Every tool serves a purpose. Here is my current inventory of languages, frameworks, and developer tools with genuine proficiency levels.",
    
    categories: [
      { id: "all", label: "All Arsenal" },
      { id: "languages", label: "Languages" },
      { id: "frontend", label: "Frontend & Web" },
      { id: "tools", label: "Tools & Workflow" },
      { id: "exploring", label: "On My Radar" }
    ],

    skills: [
      {
        name: "Python",
        category: "languages",
        level: "Active Practice",
        levelType: "intermediate", // 'beginner', 'intermediate', 'exploring'
        description: "Scripting, algorithm problem solving, basic automation, and OOP principles.",
        icon: "python"
      },
      {
        name: "C / C++",
        category: "languages",
        level: "Foundational",
        levelType: "beginner",
        description: "Memory models, pointers, basic data structures, and computer science foundations.",
        icon: "cpp"
      },
      {
        name: "JavaScript (ES6+)",
        category: "frontend",
        level: "Active Practice",
        levelType: "intermediate",
        description: "DOM manipulation, asynchronous fetch, event loops, canvas rendering, and modern syntax.",
        icon: "javascript"
      },
      {
        name: "HTML5 & Semantic Web",
        category: "frontend",
        level: "Proficient",
        levelType: "intermediate",
        description: "Accessible document architecture, SEO fundamentals, and clean markup hierarchy.",
        icon: "html"
      },
      {
        name: "CSS3 & Glassmorphism",
        category: "frontend",
        level: "Proficient",
        levelType: "intermediate",
        description: "Flexbox, CSS Grid, custom properties, animations, and responsive fluid layouts.",
        icon: "css"
      },
      {
        name: "Git & GitHub",
        category: "tools",
        level: "Active Practice",
        levelType: "intermediate",
        description: "Version control, commit hygiene, branch management, and collaborative workflow.",
        icon: "git"
      },
      {
        name: "VS Code & Terminal",
        category: "tools",
        level: "Comfortable",
        levelType: "intermediate",
        description: "Zsh / Bash terminal navigation, code editing shortcuts, debugging, and productivity.",
        icon: "terminal"
      },
      {
        name: "Data Structures & Algos",
        category: "exploring",
        level: "Currently Leveling Up",
        levelType: "exploring",
        description: "Arrays, Linked Lists, Stacks, Queues, Searching & Sorting algorithms.",
        icon: "dsa"
      },
      {
        name: "UI / UX Design",
        category: "exploring",
        level: "Exploring",
        levelType: "exploring",
        description: "Visual hierarchy, micro-interactions, dark mode aesthetics, and human-computer design.",
        icon: "palette"
      }
    ]
  },

  // ==========================================
  // 4. PROJECT LAB - "IDEAS TURNED INTO REALITY"
  // ==========================================
  projects: {
    sectionTitle: "IDEAS TURNED INTO REALITY",
    sectionBadge: "PROJECT LAB",
    description: "Hands-on projects where theory meets execution. Each project represents a step forward in my engineering journey.",
    
    categories: [
      { id: "all", label: "All Projects" },
      { id: "web", label: "Web Applications" },
      { id: "algorithms", label: "Algorithms & Logic" },
      { id: "systems", label: "CLI & Systems" }
    ],

    list: [
      {
        id: "sorting-visualizer",
        title: "Algorithm Sorting Visualizer",
        category: "algorithms",
        badge: "Interactive Tool",
        isPlaceholder: true, // Marker for student placeholder
        statusLabel: "Sample Project / Editable",
        summary: "An interactive browser visualizer illustrating Bubble Sort, Selection Sort, and Merge Sort step-by-step with adjustable speed and audio chimes.",
        fullDescription: "Built to strengthen my understanding of time complexity and sorting algorithms. Users can generate random arrays, select algorithms, step through comparisons, and observe bar swaps rendered dynamically in real time.",
        tags: ["JavaScript", "HTML5 Canvas", "Algorithms", "CSS3"],
        githubUrl: "https://github.com/SnehaSingh-dev/sorting-visualizer", // Editable placeholder
        liveDemoUrl: "#live-demo-sorting",
        keyLearnings: [
          "Visualized asymptotic time complexity (O(n²) vs O(n log n))",
          "Managed asynchronous delay queues using Promises and async/await",
          "Engineered smooth 60fps canvas redraw routines"
        ]
      },
      {
        id: "digital-universe-portfolio",
        title: "Digital Universe Portfolio",
        category: "web",
        badge: "Live Experience",
        isPlaceholder: false,
        statusLabel: "Active Portfolio",
        summary: "This personal universe! Built with vanilla modern JavaScript, 3D interactive particle simulation, dynamic HUD terminal, and glassmorphic aesthetics.",
        fullDescription: "Designed to reflect my identity as a creative first-year engineer. Eliminates heavyweight dependencies in favor of lightweight, blazing-fast native web APIs, responsive layouts, and interactive canvas physics.",
        tags: ["HTML5", "CSS Grid", "Canvas API", "Web Audio API", "ES6+"],
        githubUrl: "https://github.com/SnehaSingh-dev/digital-universe-portfolio", // Editable placeholder
        liveDemoUrl: "#",
        keyLearnings: [
          "Developed custom 3D mathematical projection for rotating particle sphere",
          "Engineered responsive glassmorphic UI with zero layout shifts",
          "Synthesized browser-native procedural chimes via Web Audio API"
        ]
      },
      {
        id: "student-grade-manager",
        title: "C++ Student Academic Ledger",
        category: "systems",
        badge: "Console System",
        isPlaceholder: true,
        statusLabel: "Sample Project / Editable",
        summary: "A robust terminal application written in C++ for tracking course credits, calculating SGPA/CGPA, and persisting academic records to disk via File I/O.",
        fullDescription: "An object-oriented program demonstrating structured data modeling. Features input sanitization, error recovery, file persistence, and tabular formatting in standard terminal environments.",
        tags: ["C++", "File I/O", "OOP", "CLI"],
        githubUrl: "https://github.com/SnehaSingh-dev/cpp-student-ledger", // Editable placeholder
        liveDemoUrl: null, // No live web demo for CLI
        keyLearnings: [
          "Applied class inheritance, encapsulation, and operator overloading",
          "Handled structured binary & text file persistence safely",
          "Designed intuitive ASCII terminal menus with clean validation"
        ]
      },
      {
        id: "focus-nebula",
        title: "Focus Nebula — Ambient Pomodoro",
        category: "web",
        badge: "Productivity App",
        isPlaceholder: true,
        statusLabel: "Sample Project / Editable",
        summary: "A serene, distraction-free productivity timer with cosmic ambient background generator, task session tracker, and keyboard shortcuts.",
        fullDescription: "Created to help fellow students enter deep focus sessions. Features customizable work/break intervals, session history stored in LocalStorage, and a subtle glowing cosmic breathing timer.",
        tags: ["JavaScript", "CSS Animations", "LocalStorage", "UI Design"],
        githubUrl: "https://github.com/SnehaSingh-dev/focus-nebula", // Editable placeholder
        liveDemoUrl: "#live-demo-focus",
        keyLearnings: [
          "Handled precision timer drift using requestAnimationFrame and timestamps",
          "Persisted user preferences and task records with LocalStorage API",
          "Crafted calming, accessible micro-interactions and audio cues"
        ]
      }
    ]
  },

  // ==========================================
  // 5. LEARNING JOURNEY - "LEVELING UP"
  // ==========================================
  journey: {
    sectionTitle: "MY LEARNING JOURNEY",
    sectionBadge: "LEVELING UP",
    subtitle: "A game-inspired progression timeline tracking my quest from beginner to aspiring software engineer.",
    
    levels: [
      {
        levelNumber: "LVL 01",
        stageName: "The Initiation",
        status: "Completed",
        statusType: "completed",
        period: "Semester 1",
        headline: "First Line of Code & Algorithmic Wonder",
        description: "Wrote my very first 'Hello, World!' in C and Python. Discovered the thrill of breaking complex problems into discrete logical steps. Familiarized myself with the command line and Git version control.",
        xp: "1,200 / 1,200 XP",
        unlockedSkills: ["Basic Syntax", "Variables & Control Flow", "Functions", "Git Basics"]
      },
      {
        levelNumber: "LVL 02",
        stageName: "Forging the Interface",
        status: "Completed",
        statusType: "completed",
        period: "Semester 1 & 2",
        headline: "The Web as an Interactive Canvas",
        description: "Dived deep into HTML5 semantics, CSS Grid/Flexbox architectures, and modern JavaScript. Discovered that frontend development is where engineering logic merges seamlessly with human empathy and visual art.",
        xp: "2,500 / 2,500 XP",
        unlockedSkills: ["Semantic HTML5", "Responsive CSS", "JavaScript DOM & Events", "Canvas Graphics"]
      },
      {
        levelNumber: "LVL 03",
        stageName: "The Logic Core",
        status: "Current Quest",
        statusType: "current",
        period: "Ongoing Focus",
        headline: "Data Structures & Computational Problem Solving",
        description: "Actively unraveling Linear & Non-linear Data Structures (Arrays, Linked Lists, Stacks, Queues, Trees) and their asymptotic complexities. Grinding algorithmic problem-solving to build rock-solid analytical skills.",
        xp: "1,850 / 3,500 XP (Active)",
        unlockedSkills: ["Time & Space Complexity", "Linked Lists", "Stack & Queue Mechanics", "Recursion"]
      },
      {
        levelNumber: "LVL 04",
        stageName: "The Next Frontier",
        status: "Upcoming Quest",
        statusType: "upcoming",
        period: "Next Milestones",
        headline: "Full-Stack Engineering & Open Source Collaboration",
        description: "Future roadmap: Delving into backend architecture, RESTful API design, database schemas (SQL/NoSQL), and contributing meaningfully to open-source software initiatives.",
        xp: "Locked Milestone",
        unlockedSkills: ["API Development", "Databases", "System Design Basics", "Open Source"]
      }
    ]
  },

  // ==========================================
  // 6. BEYOND THE SCREEN - "HUMAN DIMENSION"
  // ==========================================
  beyondScreen: {
    sectionTitle: "BEYOND THE SCREEN",
    sectionBadge: "HUMAN DIMENSION",
    subtitle: "The hobbies, passions, and curiosities that fuel my creativity outside the IDE.",
    
    interests: [
      {
        id: "cosmos",
        title: "Cosmology & Stargazing",
        icon: "telescope",
        tag: "Inspiration",
        quote: "The cosmos is within us. We are made of star-stuff.",
        description: "Fascinated by astrophysics, orbital mechanics, and the sheer scale of the universe. It keeps me grounded and continually reminds me that no bug is insurmountable in the grand cosmic scheme."
      },
      {
        id: "music",
        title: "Ambient Lo-Fi & Soundscapes",
        icon: "headphones",
        tag: "Deep Work Flow",
        quote: "Sound creates the architecture of concentration.",
        description: "I love exploring generative electronic soundscapes and ambient music while coding. The rhythm helps sustain uninterrupted deep focus and stimulates creative problem-solving."
      },
      {
        id: "puzzles",
        title: "Chess & Logic Puzzles",
        icon: "chess",
        tag: "Strategic Thinking",
        quote: "Every move has a consequence; plan three steps ahead.",
        description: "Enjoy playing casual chess and untangling mathematical riddles. It hones pattern recognition, foresight, and patience — skills that translate directly into writing resilient code."
      },
      {
        id: "design",
        title: "Digital Art & Minimalist Design",
        icon: "brush",
        tag: "Aesthetics",
        quote: "Perfection is attained not when there is nothing more to add, but when nothing left to take away.",
        description: "Experimenting with color harmony, typography, and dark-mode aesthetics. I believe clean aesthetics reflect clear thoughts."
      }
    ]
  },

  // ==========================================
  // 7. CONTACT & SOCIALS - "LET'S BUILD SOMETHING"
  // ==========================================
  contact: {
    sectionTitle: "LET'S BUILD SOMETHING",
    sectionBadge: "GET IN TOUCH",
    headline: "Have an opportunity, an idea, or just want to discuss tech and the cosmos?",
    subheadline: "My inbox is always open. Whether you are a fellow student, a mentor, an engineer, or just stopping by — feel free to send a signal!",
    
    // Editable contact details
    email: "snehasingh.dev@example.com", // [YOUR EMAIL]
    githubUrl: "https://github.com/SnehaSingh-dev", // [YOUR GITHUB URL]
    linkedinUrl: "https://linkedin.com/in/snehasingh-dev", // [YOUR LINKEDIN URL]
    
    // Quick social handles for display
    githubHandle: "SnehaSingh-dev",
    linkedinHandle: "Sneha Singh",
    
    // Response pledge
    responsePledge: "⚡ Average response time: Within 24-48 hours"
  },

  // ==========================================
  // 8. INTERACTIVE EASTER EGG: TERMINAL COMMANDS
  // ==========================================
  // Commands available in the interactive HUD terminal
  terminalCommands: {
    welcomeMessage: [
      "===========================================================",
      "  SNEHA SINGH // DIGITAL UNIVERSE INTERACTIVE COMMAND HUD  ",
      "  SYSTEM READY • FIRMWARE v1.4.2 • ALL SENSORS NOMINAL     ",
      "===========================================================",
      "Type 'help' to view available system commands.",
      ""
    ],
    helpText: [
      "AVAILABLE COMMANDS:",
      "  whoami       - Display personal bio and academic profile",
      "  status       - View real-time system and learning status",
      "  skills       - Output technical inventory & proficiency levels",
      "  projects     - List all engineered projects in the lab",
      "  journey      - Display current RPG quest milestone and XP",
      "  contact      - Print official communication coordinates",
      "  warp         - Trigger a cosmic hyperdrive warp animation!",
      "  audio        - Play or toggle procedural ambient celestial chime",
      "  clear        - Clear this command terminal screen",
      "  matrix       - Toggle digital rain mode",
      "  exit         - Close the terminal HUD deck"
    ]
  }
};

// Attach to global window object for universal script access
window.PORTFOLIO_DATA = PORTFOLIO_DATA;

// Freeze object to prevent unintentional modification
if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_DATA);
}