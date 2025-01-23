
## 功能特性 ✨

### 核心防护机制
- 🛡️ 声明式网络请求规则（Chrome 88+ Declarative Net Request API）
- 🔍 智能内容脚本注入（MutationObserver API）
- 📦 本地化存储配置（chrome.storage.local）
- 🔄 实时会话状态维护（WebSocket保活）

### 技术实现矩阵
| 模块 | 技术栈 | 版本 |
|------|--------|-----|
| 网络拦截 | Declarative Net Request | Chrome 88+ |
| 内容注入 | MutationObserver | Level 2 |
| 状态存储 | IndexedDB | v1.0 |
| UI框架 | Web Components | v1 |

## 安装指南 ⚙️

### 开发模式安装
```bash
git clone https://github.com/wangjianpro999/GPT-foolproof.git
cd GPT-foolproof
```

### 浏览器加载
1. 访问 `chrome://extensions`
2. 启用 **开发者模式** (右上角开关)
3. 点击 **加载已解压的扩展程序**
4. 选择项目根目录

## 项目结构 🗂️

```bash
.
├── _metadata/                 # 自动化构建产物
│   └── generated_indexed_rulesets/  # DNR规则集索引
├── icons/                     # 扩展图标集
│   ├── icon-16.png            # 工具栏图标
│   ├── icon-48.png            # 扩展管理页图标
│   └── icon-128.png           # 商店展示图标
├── src/
│   ├── background.js          # 后台服务核心逻辑
│   ├── content.js             # 内容注入脚本
│   ├── popup/                 # 弹出界面组件
│   │   ├── popup.html         # 界面骨架
│   │   ├── popup.js           # 交互逻辑
│   │   └── styles.css         # 样式方案
├── rules.json                 # 网络请求规则配置
├── manifest.json              # 扩展清单文件(v3)
└── package.json               # 开发依赖配置
```

## 技术架构 🧩

### 核心架构组件
| 模块       | 技术实现                     | 版本要求   |
|------------|------------------------------|------------|
| 网络层     | Declarative Net Request API  | Chrome 88+ |
| 内容注入   | MutationObserver API         | Level 2    |
| 状态管理   | IndexedDB                    | v1.0       |
| UI组件     | Web Components               | v1         |

## 贡献指南 👥

### 开发规范
1. 使用ESLint标准配置
```bash
npm run lint # 代码规范检查
```
2. 提交信息遵循Conventional Commits
3. 重大变更需更新版本号
```diff
// manifest.json
- "version": "1.0.0"
+ "version": "1.1.0"
```

### 国际化贡献
1. 创建对应语言目录 `docs/[lang]/`
2. 翻译文件命名规范：
   - `README.[lang].md`
   - `CHANGELOG.[lang].md`
3. 更新多语言索引文件 `docs/translations.json`

## 许可证 📜

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 浏览器兼容性 🌍

| 浏览器 | 最低版本 | 测试状态 |
|--------|----------|----------|
| Chrome | 88       | ✅ 全功能支持 |
| Edge   | 89       | ✅ 全功能支持 |
| Opera  | 74       | ⚠️ 基础功能支持 |

## 语言切换 {#language-switcher}

🌐 选择文档语言 / Select documentation language:  
[简体中文](README.md) | 
[English](README_EN.md)

---

> 🚀 项目持续维护中，欢迎Star & Watch以获取最新更新！  
> ⚠️ 注意：本扩展需配合ChatGPT官方账户使用
