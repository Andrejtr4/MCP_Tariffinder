# 🚀 Setup & Installation Guide

Alles was du wissen musst, um das EnBW Tariff Finder Test-Projekt neu aufzusetzen.

---

## 📋 Voraussetzungen

Bevor du startest, stelle sicher, dass du folgende Software installiert hast:

- **Node.js** (v16 oder höher) → [Download](https://nodejs.org/)
- **npm** (kommt mit Node.js)
- **Git** (für Repository Management) → [Download](https://git-scm.com/)

### Node.js & npm überprüfen:
```bash
node --version  # Sollte v16+ sein
npm --version   # Sollte v7+ sein
```

---

## 📥 Projekt klonen

```bash
# Klone das Repository
git clone https://github.com/Andrejtr4/MCP_Tariffinder.git

# Wechsel ins Projekt-Verzeichnis
cd MCP_Tariffinder/enbw-tariff-tests
```

---

## 🔧 Installation - Schritt für Schritt

### 1. Dependencies installieren
```bash
npm install
```

Das installiert alle Abhängigkeiten aus `package.json`:
- `@playwright/test` - Playwright Testing Framework
- `@types/node` - TypeScript Node Types
- `typescript` - TypeScript Compiler

### 2. Playwright Browser installieren
```bash
npx playwright install
```

Das installiert die Browser (Chromium, Firefox, WebKit):
- **Chromium** - Für Chrome/Edge Tests
- **Firefox** - Für Firefox Tests
- **WebKit** - Für Safari Tests

⚠️ **Wichtig**: Dieser Schritt ist **NOTWENDIG** und dauert ein paar Minuten!

---

## ✅ Überprüfung - Alles installiert?

```bash
# Playwright CLI überprüfen
npx playwright --version

# TypeScript überprüfen
npx tsc --version
```

---

## 🎯 Erste Tests starten

### Alle Tests ausführen
```bash
npm test
```

### Tests mit UI Mode (Interaktiv)
```bash
npm run test:ui
```

### Tests im Debug Mode
```bash
npm run test:debug
```

### Spezifischen Test ausführen
```bash
npx playwright test tariff-finder-basic.spec.ts
```

### Tests mit Report anschauen
```bash
npm run test:report
```

---

## 📁 Projektstruktur

```
enbw-tariff-tests/
├── package.json                    # 📦 Abhängigkeiten
├── playwright.config.ts            # ⚙️ Playwright Konfiguration
├── tsconfig.json                   # ⚙️ TypeScript Konfiguration
├── README.md                       # 📖 Projekt-Übersicht
├── SETUP.md                        # 👈 Diese Datei
│
├── tests/
│   ├── fixtures.ts                 # 🔧 Test Fixtures
│   ├── pages/
│   │   └── EnBWTariffFinderPage.ts # 📄 Page Object Model
│   └── spec/
│       ├── tariff-finder-basic.spec.ts          # ✅ 6 Tests
│       ├── tariff-finder-validation.spec.ts     # ✅ 8 Tests
│       └── tariff-finder-end-to-end.spec.ts     # ✅ 8 Tests
│
└── results/                        # 📊 Test Reports (nach `npm test`)
```

---

## 🐛 Troubleshooting

### Problem: `command not found: npx`
**Lösung**: Node.js ist nicht installiert
```bash
# Installiere Node.js von https://nodejs.org/
node --version  # Überprüfe Installation
```

### Problem: `Module not found`
**Lösung**: Dependencies nicht installiert
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: Playwright Browser nicht gefunden
**Lösung**: Browser nicht installiert
```bash
npx playwright install
```

### Problem: TypeScript Fehler
**Lösung**: TypeScript neu kompilieren
```bash
npx tsc --noEmit  # Überprüfe auf Fehler
npm install       # Reinstalliere @types/node
```

---

## 🎭 Mit Generator Chatmode arbeiten

Wenn du neue Tests mit dem AI Generator erstellen möchtest:

```
Du bist ein Playwright Test Generator.

Generiere Tests basierend auf diesem Plan:
[DEIN TEST-PLAN HIER]

WICHTIG:
- Alle Test-Dateien müssen in: tests/spec/
- Page Object Model: tests/pages/EnBWTariffFinderPage.ts
- Fixtures: tests/fixtures.ts
- TypeScript verwenden
- Playwright Best Practices
```

Dann müssen die generierten Tests in `tests/spec/` kopiert werden.

---

## 🚀 Tipps für Entwickler

### Test im Watch Mode ausführen
```bash
npx playwright test --watch
```

### Einzelnen Test debuggen
```bash
npx playwright test tests/spec/tariff-finder-basic.spec.ts --debug
```

### VSCode Extension installieren
Installiere "Playwright Test for VSCode" in VSCode für bessere Unterstützung

---

## ✨ Häufige Befehle

```bash
# Installation
npm install                    # Dependencies installieren
npx playwright install         # Browser installieren

# Tests ausführen
npm test                      # Alle Tests starten
npm run test:ui              # UI Mode (interaktiv)
npm run test:debug           # Debug Mode
npm run test:headed          # Mit sichtbarem Browser
npm run test:report          # Test Report anschauen

# Code Qualität
npx tsc --noEmit             # TypeScript überprüfen

# Cleanup
rm -rf node_modules          # node_modules löschen
rm -rf results/              # Test Results löschen
```

---

## 🆘 Weitere Hilfe

- 📖 [Playwright Dokumentation](https://playwright.dev)
- 📖 [TypeScript Dokumentation](https://www.typescriptlang.org)
- 🐛 [Playwright GitHub Issues](https://github.com/microsoft/playwright/issues)

---

## ✅ Fertig?

Wenn alles installiert ist, starte die Tests mit:

```bash
npm test
```

Viel Erfolg! 🚀
