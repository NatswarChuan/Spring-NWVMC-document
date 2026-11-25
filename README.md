# Spring-NWVMC (`0.1.0`) — Official Documentation Portal & AI-Agent Adoption Kit

[![Maven Central](https://img.shields.io/badge/Maven%20Central-io.github.natswarchuan%3Aspring--nwvmc%3A0.1.0-blue.svg)](https://central.sonatype.com/artifact/io.github.natswarchuan/spring-nwvmc)
[![Live Docs](https://img.shields.io/badge/GitHub%20Pages-Live%20Portal-10b981.svg)](https://natswarchuan.github.io/Spring-NWVMC-document/)
[![Framework Source](https://img.shields.io/badge/GitHub-Spring--NWVMC-181717.svg)](https://github.com/NatswarChuan/Spring-NWVMC)
[![License](https://img.shields.io/badge/License-Apache--2.0-lightgrey.svg)](LICENSE)

Official **GitHub Pages** documentation portal (built bundle + full React 19 / Vite / TypeScript source code), multilingual Markdown manuals, and universal **AI-Agent Adoption Kit** for **`io.github.natswarchuan:spring-nwvmc:0.1.0`**.

---

## Live Links (GitHub Pages)

- **Interactive Portal (34 pages × 20 languages, RTL support):** https://natswarchuan.github.io/Spring-NWVMC-document/
- **AI-Agent Adoption Kit Page:** https://natswarchuan.github.io/Spring-NWVMC-document/#ai-agent-kit
- **`llmstxt.org` Entry Point:** https://natswarchuan.github.io/Spring-NWVMC-document/llms.txt

---

## Quick Maven Central Dependency (`0.1.0`)

```xml
<dependency>
  <groupId>io.github.natswarchuan</groupId>
  <artifactId>spring-nwvmc</artifactId>
  <version>0.1.0</version>
</dependency>
```

---

## Repository Contents

| Path | Description |
| :--- | :--- |
| [`index.html`](index.html), [`assets/`](assets/), [`dist/`](dist/), [`.nojekyll`](.nojekyll) | Production-built static site ready for **GitHub Pages** (Deploy from branch `main` / `(root)`) |
| [`src/`](src/), [`scripts/`](scripts/), [`package.json`](package.json), [`vite.config.ts`](vite.config.ts) | Full React 19 + Vite + TypeScript source code for the 20-language documentation portal |
| [`ai-agent-kit/`](ai-agent-kit/) | Universal `INTRO`, `RULES`, `SKILL`, `CHECKLIST`, 5 machine-verified `references/01..05`, 8 drop-in `adapters/` (Antigravity/Gemini, Claude Code, Codex, Cursor, Copilot, Windsurf, Cline, Generic LLMs), and 1-command installers (`install.ps1` / `install.sh`) |
| [`llms.txt`](llms.txt) | Structured `llmstxt.org` index for AI agents and web crawlers |
| [`GUIDE_EN.md`](GUIDE_EN.md), [`GUIDE_VI.md`](GUIDE_VI.md), [`GUIDE_JA.md`](GUIDE_JA.md), [`GUIDE_ZH.md`](GUIDE_ZH.md), [`topics/`](topics/) | Complete synchronized Markdown reference manuals and focused topic guides (`01..07`) |

---

## Local Development & Rebuild

```bash
npm install
npm run dev      # Local Vite preview server
npm run build    # Compiles TypeScript + Vite bundle and syncs dist/ -> index.html & assets/
```

## Install AI-Agent Kit into Any Spring Boot Project

```powershell
# Windows (PowerShell)
.\ai-agent-kit\install.ps1 -Target "C:\path\to\your-spring-boot-project" -Agent all
```

```bash
# macOS / Linux / Git Bash
./ai-agent-kit/install.sh --target /path/to/your-spring-boot-project --agent all
```
