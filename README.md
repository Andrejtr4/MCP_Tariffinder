# 🚀 EnBW Tariff Finder - MCP + Tests

Ein vollständiges Setup mit **Playwright Tests** und **MCP Server** für Cursor/VSCode Integration.

---

## 📦 Was ist drin?

### 1️⃣ **Playwright Tests** (`enbw-tariff-tests/`)
- **10 automatisierte Tests** (nur Chromium Browser)
- Page Object Model Pattern
- TypeScript

### 2️⃣ **MCP Server** (`playwright-mcp/`)
- Playwright MCP Server für Cursor/VSCode
- Ermöglicht AI-gestützte Test-Generierung

### 3️⃣ **Chatmodes** (`.github/chatmodes/`)
- 🎭 **Planner** - Erstellt Test-Pläne
- 🎭 **Generator** - Generiert Tests aus Plänen
- 🎭 **Healer** - Debuggt fehlgeschlagene Tests

---

## ⚡ Quick Start

### Installation

```bash
# 1. MCP Server einrichten
cd playwright-mcp
npm install

# 2. Tests einrichten
cd ../enbw-tariff-tests
npm install
npx playwright install

# 3. Tests starten
npm test
```

### In Cursor verwenden

1. Öffne die Chatmodes in Cursor
2. Nutze **Planner** um Test-Szenarien zu planen
3. Nutze **Generator** um Tests zu generieren
4. Nutze **Healer** um Fehler zu beheben

---

## 📁 Struktur

```
MCP_Tariffinder/
├── .github/chatmodes/           # 🎭 AI Chatmodes
├── .vscode/settings.json        # ⚙️ MCP Config
├── enbw-tariff-tests/           # ✅ Tests (22 Test Cases)
│   ├── tests/
│   │   ├── pages/EnBWTariffFinderPage.ts
│   │   ├── spec/                # 3 Spec Files
│   │   └── fixtures.ts
│   └── package.json
└── playwright-mcp/              # 🔌 MCP Server
    ├── src/
    ├── package.json
    └── index.js
```

---

## 🎯 Verfügbare Befehle

| Befehl | Beschreibung |
|--------|-------------|
| `npm test` | Tests ausführen |
| `npm run test:ui` | UI Mode (interaktiv) |
| `npm run test:headed` | Mit sichtbarem Browser |
| `npm run test:debug` | Debug Mode |

---

## 🎭 Chatmodes nutzen

### Planner 📋
```
Erstelle einen Test-Plan für die EnBW Tariff-Finder Website
```

### Generator 🎬
```
Generiere Playwright Tests basierend auf diesem Plan:
[PLAN HIER EINFÜGEN]

Pfade:
- enbw-tariff-tests/tests/spec/
- enbw-tariff-tests/tests/pages/EnBWTariffFinderPage.ts
```

### Healer 🔧
```
Debugge und repariere fehlgeschlagene Tests
```

---

## 🚀 Jetzt Starten!

```bash
cd enbw-tariff-tests
npm test
```

**Website:** https://www.enbw.com/strom/privatkunden/produkte
