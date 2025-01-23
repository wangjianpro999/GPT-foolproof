# GPT Anti-Dumbing Plugin / GPT防降智插件

[![GitHub Release](https://img.shields.io/github/v/release/wangjianpro999/GPT-foolproof?style=flat-square)](https://github.com/wangjianpro999/GPT-foolproof/releases)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/none?label=Chrome%20Extension&style=flat-square)](https://github.com/wangjianpro999/GPT-foolproof#installation)
[![GitHub License](https://img.shields.io/github/license/wangjianpro999/GPT-foolproof?color=42b983&style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)
![Browser Support](https://img.shields.io/badge/Chrome-88%2B-blue?logo=google-chrome&style=flat-square)
[![English](https://img.shields.io/badge/Language-English|简体中文-f37626?style=flat-square)](#language-switcher)

🌐 **Project URL**: [https://github.com/wangjianpro999/GPT-foolproof](https://github.com/wangjianpro999/GPT-foolproof)

## Language Switcher 🌐
[简体中文](README.md) | 
[English](README_EN.md)

## Table of Contents 📌
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Project Structure](#project-structure)
- [Technical Architecture](#technical-architecture)
- [Contribution Guide](#contribution-guide)
- [License](#license)
- [Browser Compatibility](#browser-compatibility)
- [Language Switcher](#language-switcher)

## Features ✨

### Core Protection Mechanisms
- 🛡️ Declarative Net Request Rules (Chrome 88+ DNR API)
- 🔍 Smart Content Script Injection (MutationObserver API)
- 📦 Localized Storage Configuration (chrome.storage.local)
- 🔄 Real-time Session Maintenance (WebSocket Keep-Alive)

### Technology Stack
| Module | Technology | Version |
|--------|------------|---------|
| Network Interception | Declarative Net Request | Chrome 88+ |
| Content Injection | MutationObserver | Level 2 |
| State Storage | IndexedDB | v1.0 |
| UI Framework | Web Components | v1 |

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