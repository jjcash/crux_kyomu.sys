# CRUX_KYOMU.SYS ⚡

> **High-Entropy Cybernetic Operating Terminal & Quantum Telemetry Dashboard**  
> Built as a static website structure with zero external framework dependencies.

---

## 📁 Directory & Folder Structure

```text
crux_kyomu.sys/
├── index.html                   # Primary Cyberdeck & HUD Dashboard
├── 404.html                     # Custom 404 Void Sector Fallback
├── README.md                    # System Architecture Documentation
└── assets/
    ├── css/
    │   ├── system-theme.css     # CSS Custom Properties, Color Tokens & Themes
    │   ├── animations.css       # CRT Scanlines, Radar Sweeps & Glow Keyframes
    │   ├── terminal.css         # Interactive CLI & Terminal Component Styling
    │   └── main.css             # Main Grid Layout, HUD Panels & Master Stylesheet
    ├── js/
    │   ├── app.js               # Application Bootloader & System Clock
    │   ├── core/
    │   │   ├── audio.js         # Web Audio API Synthesizer (Zero asset audio)
    │   │   ├── background-fx.js # Canvas Matrix Rain & Ambient Particle Generator
    │   │   └── terminal.js      # Terminal Command Interpreter & CLI Engine
    │   └── modules/
    │       ├── diagnostic.js    # Realtime Hex Memory Stream & Telemetry Gauges
    │       ├── logs.js          # Live Event Feed & Dynamic Event Generator
    │       └── navigation.js    # Interactive HUD Controls & Theme Switcher
    ├── images/                  # System Icons, Badges and Graphical Assets
    └── data/
        ├── system_manifest.json # Kernel Configuration & Subsystem Definitions
        └── logs.json            # Initial Boot Event Sequence
```

---

## 🖥️ Terminal Commands

You can interact directly with the in-browser terminal using the following commands:

| Command | Description |
| :--- | :--- |
| `help` | Lists all available console commands |
| `status` | Outputs kernel version, uptime, and memory footprint |
| `scan` | Simulates an active security scan across all memory sectors |
| `purge` | Clears and reclaims temporary quantum synapse heap buffers |
| `nodes` | Displays decentralized mesh network node connectivity |
| `kyomu` | Displays the philosophy of the void (虚無) |
| `theme <name>` | Switches system visual mode (`cyan`, `amber`, `matrix`, `void`) |
| `clear` | Clears current terminal buffer |
| `reboot` | Triggers a simulated kernel soft reset |

---

## 🚀 How to Run Locally

Because this is a vanilla static website with ES Modules (`type="module"`), serve it through any static server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Open your browser at `http://localhost:8000`.
