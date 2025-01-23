
## Features ✨

### Core Protection Mechanisms
- 🛡️ Declarative Net Request Rules (Chrome 88+ DNR API)
- 🔍 Smart Content Script Injection (MutationObserver API)
- 📦 Localized Storage Configuration (chrome.storage.local)
- 🔄 Real-time Session Maintenance (WebSocket Keep-Alive)

## Technical Architecture

### Core Architectural Components
| Module               | Technology                 | Version Requirements |
|----------------------|----------------------------|----------------------|
| Network Layer        | Declarative Net Request API| Chrome 88+           |
| Content Injection    | MutationObserver API       | Level 2              |
| State Management     | IndexedDB                  | v1.0                 |
| UI Components        | Web Components             | v1                   |

## Installation Guide ⚙️

### Development Mode Setup
```bash
git clone https://github.com/wangjianpro999/GPT-foolproof.git
cd GPT-foolproof
```

### Browser Installation
1. Navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle switch in top-right)
3. Click **Load unpacked**
4. Select project root directory

## Project Structure 🗂️

```bash
.
├── _metadata/                 # Auto-generated build artifacts
│   └── generated_indexed_rulesets/  # DNR ruleset indexes
├── icons/                     # Extension icons
│   ├── icon-16.png            # Toolbar icon
│   ├── icon-48.png            # Extension page icon
│   └── icon-128.png           # Store listing icon
├── src/
│   ├── background.js          # Background service core logic
│   ├── content.js             # Content injection script
│   ├── popup/                 # Popup UI components
│   │   ├── popup.html         # UI skeleton
│   │   ├── popup.js           # Interaction logic
│   │   └── styles.css         # Styling
├── rules.json                 # Network request rules
├── manifest.json              # Extension manifest(v3)
└── package.json               # Development dependencies
```

## Contribution Guide 👥

### Development Standards
1. Use ESLint configuration
```bash
npm run lint # Code quality check
```
2. Follow Conventional Commits
3. Major changes require version updates
```diff
// manifest.json
- "version": "1.0.0"
+ "version": "1.1.0"
```

### Localization Contributions
1. Create language directory `docs/[lang]/`
2. Translation file naming:
   - `README.[lang].md`
   - `CHANGELOG.[lang].md`
3. Update multilingual index `docs/translations.json`

## License 📜

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Browser Compatibility 🌍

| Browser | Minimum Version | Support Status |
|---------|-----------------|----------------|
| Chrome  | 88              | ✅ Full support |
| Edge    | 89              | ✅ Full support |
| Opera   | 74              | ⚠️ Basic support |

---

> 🚀 Project under active maintenance - Star & Watch for updates!
> ⚠️ Note: Requires ChatGPT official account

## Language Switcher {#language-switcher}

🌐 Select documentation language:
[简体中文](README.md) |
[English](README_EN.md)
