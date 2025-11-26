#  Tariff Finder - Playwright Tests 🚀

Automatisierte Playwright Tests für den **Tariff Finder** mit **22 Test Cases** über alle Szenarien hinweg.

---

## 📋 Test-Aufgabe

**Website**:

**Hauptworkflow (Standard):**
1. Zur Website navigieren
2. PLZ-Feld ausfüllen: 
3. Ort-Feld ausfüllen: 
4. "Jetzt Tarif Finden" Button klicken
5. Tariff-Ergebnisse überprüfen

---

## ✅ Test-Suiten (22 Tests)

### 📌 `tariff-finder-basic.spec.ts` (6 Tests)
Basis-Workflow Tests für den Happy Path:
- ✔️ Website laden und Formular anzeigen
- ✔️ PLZ-Feld ausfüllen
- ✔️ Ort-Feld ausfüllen
- ✔️ Search Button klicken
- ✔️ Ergebnisse anzeigen
- ✔️ Kompletter Standard-Workflow

### 🔍 `tariff-finder-validation.spec.ts` (8 Tests)
Validierung und Fehlerbehandlung:
- ✔️ Leeres PLZ-Feld absenden (Error)
- ✔️ Leeres Ort-Feld absenden (Error)
- ✔️ Ungültiges PLZ-Format
- ✔️ Ungültiges Ort-Format
- ✔️ Felder löschen und neu ausfüllen
- ✔️ Nur PLZ ausfüllen und versuchen
- ✔️ Nur Ort ausfüllen und versuchen
- ✔️ Tab-Navigation zwischen Feldern

### 🎯 `tariff-finder-end-to-end.spec.ts` (8 Tests)
Komplette Benutzer-Journeys:
- ✔️ Kompletter E2E Workflow (Stutensee)
- ✔️ Alternative PLZ (Stuttgart) 70173
- ✔️ Alternative PLZ (Berlin) 10115
- ✔️ Nacheinander mehrere Suchen
- ✔️ Datenpersistenz nach Reload
- ✔️ Browser back Button nach Suche
- ✔️ Mehrere Suchen ohne Neustart
- ✔️ Tarifvergleich zwischen Orten

---

## 📁 Projektstruktur

```
tariff-tests/
├── tests/
│   ├── pages/
│   │   └── EnBWTariffFinderPage.ts      # Page Object Model
│   ├── spec/
│   │   ├── tariff-finder-basic.spec.ts        # 6 Basic Tests
│   │   ├── tariff-finder-validation.spec.ts   # 8 Validation Tests
│   │   └── tariff-finder-end-to-end.spec.ts   # 8 E2E Tests
│   └── fixtures.ts                      # Shared Test Fixtures
├── results/
│   ├── html-report/                     # HTML Test Report
│   ├── test-results.json                # JSON Ergebnisse
│   └── junit-results.xml                # JUnit XML Ergebnisse
├── agents/
│   └── TEST-PLAN.md                     # Detaillierter Test-Plan
├── playwright.config.ts                 # Playwright Konfiguration
├── package.json
├── tsconfig.json
└── README.md                            # Diese Datei
```

---

## 🎭 Page Object Model

**`EnBWTariffFinderPage.ts`** bietet folgende Methoden:

| Methode | Beschreibung |
|---------|-------------|
| `navigateTo()` | Navigiert zur EnBW Tariff-Finder Seite |
| `fillPLZ(plz: string)` | Füllt das PLZ-Feld aus |
| `fillOrt(ort: string)` | Füllt das Ort-Feld aus |
| `clickSearch()` | Klickt den "Jetzt Tarif Finden" Button |
| `getTariffCount()` | Gibt Anzahl der Tarife zurück |
| `getTariffNames()` | Gibt Array aller Tarifnamen zurück |
| `getErrorMessage()` | Gibt Fehlermeldung zurück (wenn vorhanden) |
| `clearPLZ()` | Löscht das PLZ-Feld |
| `clearOrt()` | Löscht das Ort-Feld |

---

## � Quickstart

### Installation
cd enbw-tariff-tests
npm install
npx playwright install
npm test

```bash
# 1. Dependencies installieren
npm install

# 2. Playwright Browser installieren
npx playwright install
```

### Tests ausführen
```bash
# Alle Tests starten
npm test

# Tests mit UI anzeigen
npm run test:ui

# Tests mit sichtbarem Browser (headed)
npm run test:headed

# Nur Basic Tests
npm run test:basic

# Nur Validation Tests
npm run test:validation

# Nur E2E Tests
npm run test:e2e

# Debug Modus
npm run test:debug

# HTML Report anzeigen
npm run test:report
```

---

## 🎭 Agent Workflow

### Phase 1: Planung (Planner)
Der **Planner** erstellt einen detaillierten Test-Plan:
```
- Alle Test-Szenarien definieren
- Schritte dokumentieren
- Edge Cases identifizieren
- Validierungspunkte festlegen
```

### Phase 2: Generierung (Generator)
Der **Generator** erstellt automatisch Test-Code basierend auf dem Plan:
```
- Page Object Model generieren
- Test-Dateien schreiben
- Fixtures definieren
- TypeScript Best Practices anwenden
```

### Phase 3: Ausführung & Debugging (Healer)
Der **Healer** debuggt fehlgeschlagene Tests und repariert sie:
```
- Test-Fehler analysieren
- Fehlerkontext sammeln
- Code anpassen und reparieren
- Tests neu ausführen bis grün
```

---

## 📊 Test-Ergebnisse

Nach der Ausführung findest du die Ergebnisse unter `results/`:

- **HTML Report**: `results/html-report/index.html`
- **JSON Ergebnisse**: `results/test-results.json`
- **JUnit XML**: `results/junit-results.xml`

Öffne den HTML Report im Browser:
```bash
npm run test:report
```

---

## 🔧 Konfiguration

### playwright.config.ts
- **Base URL**: 
- **Timeout**: 10s pro Aktion, 30s Navigation
- **Browser**: Chromium
- **Screenshots**: Nur bei Fehlern
- **Videos**: Nur bei Fehlern
- **Trace**: Immer beim ersten Fehler
- **Retries**: 2 in CI, 0 lokal

### tsconfig.json
- **Target**: ES2020
- **Module**: ESNext
- **Strict Mode**: true
- **Strict Null Checks**: true

---

## � Troubleshooting

### Tests schlagen fehl?
```bash
# 1. Browser neu installieren
npx playwright install --with-deps

# 2. Cache löschen
rm -rf node_modules package-lock.json
npm install

# 3. Debug Modus starten
npm run test:debug
```

### Wenn selektive Tests getestet werden sollen:
```bash
# Nach Test-Name filtern
npx playwright test -g "should fill PLZ"

# Nur Chrome Browser
npx playwright test --project=chromium
```

---

## 📚 Referenzen

- **Playwright Docs**: https://playwright.dev
- **Test Plan**: `agents/TEST-PLAN.md`


**Made with ❤️ using Playwright + TypeScript**
