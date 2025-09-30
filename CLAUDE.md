# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Figma-to-Code Workflow v3.0 - Sequential Agent Pipeline

## 🚨 KRITISCHE WARNUNG

**NIEMALS Figma Auto-Generated Code direkt verwenden!**

Figma generiert schlechten Code mit absoluten Positionen:
```html
<!-- NIEMALS aus Figma kopieren: -->
<div className="w-[486.08px] left-[1271.73px] top-[349.92px] absolute">

<!-- Stattdessen sauberen Code schreiben: -->
<div className="relative w-full max-w-lg">
```

---

## 🎯 4-Phasen Sequential Agent Pipeline

### Phase 1: Design-Analyse & Information Brokering (Main Agent)

**Rolle:** Information Broker & Figma-Filter

```yaml
Aufgaben:
  1. Figma MCP → Screenshot + Assets abrufen
  2. Schlechten Auto-Code FILTERN (kritisch!)
  3. Design-Specification erstellen:
     - Visual Reference (Screenshot)
     - Asset URLs (strukturierte Liste)
     - Design Tokens (Farben, Spacing)
     - Component-Struktur identifizieren

Output: Gefiltertes Briefing für Frontend-Dev Agent
```

#### Figma MCP Integration:
```javascript
// Design analysieren
mcp__figma-dev-mode-mcp-server__get_screenshot(nodeId)
mcp__figma-dev-mode-mcp-server__get_code(nodeId, forceCode: true)
// → Code wird gefiltert, nicht direkt verwendet!
```

### Phase 2: Implementation (Frontend-Dev Agent)

**Input:** Kuratierte Design-Specs vom Main Agent (KEIN direkter Figma-Zugriff!)

```yaml
Aufgaben:
  - Semantisches HTML5 strukturieren
  - Responsive CSS implementieren (Mobile-First)
  - JavaScript-Interaktivität hinzufügen
  - Alle Assets korrekt einbinden (localhost:3845)

Wichtige Regeln:
  - Ignoriert Figma Auto-Code vollständig
  - Baut responsive von Anfang an
  - Nutzt relative Units (rem, %, vw)
  - Erstellt saubere, wartbare Struktur
```

### Phase 3: Design-Validation (UI-Design-Validator Agent)

**Quality Gate:** Muss >95% Design-Match erreichen

```yaml
Prüfungen:
  - Visual Regression Testing vs. Figma Screenshot
  - Responsive Behavior (375px, 768px, 1024px, 1920px)
  - Asset-Integration vollständig
  - Performance Metrics (<2s Load Time)

Bei Fail (<95%):
  - Zurück zu Phase 2 mit detaillierter Fix-Liste
  - Main Agent kann zusätzliche Figma-Infos bereitstellen
```

### Phase 4: Component-Refactoring (Component-Refactorer Agent)

**Trigger:** NUR nach erfolgreicher Design-Validation

```yaml
Optimierungen:
  - Pattern-Extraktion (wiederholte Elemente)
  - Component-Erstellung:
    * Logo Cards (Partner-Logos)
    * Problem Cards (3x gleiche Struktur)
    * Button Varianten
    * Statistik Items
  - Code-Deduplizierung
  - Performance-Optimierung
```

---

## ⚡ Workflow-Regeln

1. **Sequentiell, nicht parallel** - Jede Phase baut auf der vorherigen auf
2. **Main Agent filtert Figma-Müll** - Subagents sehen nur saubere Specs
3. **Validation vor Refactoring** - Erst funktionieren, dann optimieren
4. **Kein direkter Figma-Zugriff für Subagents** - Verhindert schlechten Code
5. **Quality Gates zwischen Phasen** - Fail-Fast Prinzip

---

## Architecture Guidelines

### Code-Stil Präferenzen:
- **Vanilla HTML/CSS/JS** - keine Frameworks
- **CSS Grid + Flexbox** für Layouts
- **CSS Custom Properties** für Theming
- **Intersection Observer** für Scroll-Animationen
- **requestAnimationFrame** für Performance

### Design-System Integration:
- **Poppins Font** (Google Fonts)
- **Neon Green**: #00ff66
- **Dark Background**: #010f07
- **Glass-Morphism**: backdrop-filter: blur()
- **Smooth Animations**: 0.3s ease transitions

### Responsive Breakpoints:
```css
/* Mobile-First Approach */
/* Base: Mobile (375px+) */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

### Animation Performance:
```css
/* Nur transform und opacity animieren */
.smooth-animation {
  will-change: transform, opacity;
  transform: translateZ(0); /* Hardware-Acceleration */
}
```

---

## Asset-Management

### Asset-Integration:
- Alle Assets von `localhost:3845/assets/` nutzen
- Figma MCP stellt Asset-URLs bereit
- Kein manueller Download erforderlich
- Assets direkt im Code verwenden

### Performance-Optimierung:
```css
/* Critical Assets - Preload */
<link rel="preload" as="image" href="localhost:3845/assets/hero.webp">

/* Non-Critical - Lazy Load */
.hero-bg {
  background: url('localhost:3845/assets/hero.webp');
  loading: lazy;
}
```

---

## ❌ Anti-Patterns zu vermeiden

### Niemals verwenden:
```html
<!-- Absolute Positionierung aus Figma -->
<div className="w-[486.08px] left-[1271.73px] absolute">

<!-- Sinnlose Gradients -->
<div className="bg-gradient-to-r from-green-500 to-green-500">

<!-- Platzhalter-Assets -->
<img src="placeholder.jpg">
```

### Stattdessen:
```html
<!-- Responsive Layout -->
<div className="relative w-full max-w-lg">

<!-- Einfache Farben -->
<div className="bg-green-500">

<!-- Echte Assets -->
<img src="localhost:3845/assets/hero.webp" alt="Hero Image">
```

---

## Erfolgs-Kriterien

### ✅ Code-Qualität
- [ ] KEINE absoluten Pixel-Positionen
- [ ] 100% responsive (Mobile → Desktop)
- [ ] Semantisches HTML5
- [ ] Saubere CSS-Struktur

### ✅ Asset Integration
- [ ] Alle Assets von localhost:3845 verwendet
- [ ] Keine Platzhalter-Bilder
- [ ] Optimierte Ladezeiten
- [ ] Fallback-System implementiert

### ✅ Visual Accuracy
- [ ] >95% Figma-Design-Match (validiert)
- [ ] Pixel-perfect Typography
- [ ] Korrekte Farbwerte (#00ff66)
- [ ] Exakte Spacing/Margins

### ✅ Performance
- [ ] <2s Initial Load Time
- [ ] Smooth 60fps Animationen
- [ ] Lazy Loading implementiert
- [ ] Critical Assets preloaded

### ✅ Functionality
- [ ] Alle Interaktionen funktional
- [ ] Cross-Browser kompatibel
- [ ] Mobile-responsive
- [ ] Components extrahiert (nach Validation)

---

## Version History

**v3.0 - Sequential Agent Pipeline**
- 4-Phasen sequentieller Workflow statt parallel
- Warnung vor Figma Auto-Code
- Information Broker Konzept (Main Agent filtert)
- Quality Gates zwischen Phasen
- Anti-Patterns Dokumentation

**v2.0 - Enhanced Asset Management**
- Intelligente Asset-Extraktion aus Figma
- Performance-optimierte Asset-Loading

**v1.0 - Basic Workflow**
- Multi-Agent Parallelisierung
- Glass-Morphism & Animation Support

---

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.