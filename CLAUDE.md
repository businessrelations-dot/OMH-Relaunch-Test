# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Figma-to-Code Workflow v4.0 - Async Orchestration Pipeline

## 🚨 KRITISCHE WARNUNG

**NIEMALS Figma Auto-Generated Code direkt verwenden!**

Figma generiert schlechten Code mit absoluten Positionen:
```html
<!-- NIEMALS aus Figma kopieren: -->
<div className="w-[486.08px] left-[1271.73px] top-[349.92px] absolute">

<!-- Stattdessen sauberen Code schreiben: -->
<div className="relative w-full max-w-lg">
```

**ABER:** Figma Auto-Code enthält wertvolle Informationen für die Analyse!
- ✅ Nutze es für: Hierarchie, Measurements, Nesting-Struktur
- ❌ Nutze es NICHT für: Absolute Positioning, Direct Implementation

---

## 🎯 2-Phase Async Orchestration Workflow

### Performance-Vergleich:
```
Sequential v3.0:  Planning(5min) → Frontend(20min) → Validation(5min) → Refactor(8min) = 38min
Async v4.0:       Planning(10min) → [Frontend(15min) ∥ Validator(7min) ∥ Refactor(10min)] = 25min

Time Savings: 13 minutes (35% faster) ⚡
```

---

## 📋 Phase 1: Deep Planning & Specification (Main Agent - 10min)

**Rolle:** Strategic Planner & Intelligent Information Architect

### Aufgaben:

#### 1. Figma MCP Integration & Data Extraction
```javascript
// Alle Figma-Daten abrufen
mcp__figma-dev-mode-mcp-server__get_screenshot(nodeId)     // Visual Reference
mcp__figma-dev-mode-mcp-server__get_code(nodeId, forceCode: true)  // For Analysis Only!
mcp__figma-dev-mode-mcp-server__get_variable_defs(nodeId)  // Colors, Spacing Tokens
// Asset URLs werden automatisch bereitgestellt
```

#### 2. Intelligent Extraction & Conversion
```yaml
Analyse des Figma Auto-Codes:
  Parse:
    - Element Hierarchie & Nesting-Struktur
    - Parent-Child Relationships
    - Wiederholte Patterns (Komponenten)

  Convert Measurements:
    - Absolute Positionen → Relative Beziehungen
      Beispiel: "3 cards horizontal, 48px gap" → "3-col grid, 3rem gap"
    - Fixed Widths → Responsive Constraints
      Beispiel: "width: 486px" → "max-w-30rem, 100% mobile"
    - Pixel Values → Rem/Percentage
      Beispiel: "padding: 80px" → "padding: 5rem"

  Extract Relationships:
    - Layout-Struktur (Grid/Flex/Stack)
    - Spacing zwischen Elementen
    - Breakpoint Requirements
```

#### 3. Master Specification Document erstellen

**Format:**
```markdown
# Master Specification: [Project Name]

## 1. Visual Reference
![Figma Screenshot](localhost:3845/screenshot.png)

## 2. Component Structure Tree
Container (max-w-80rem, px-5rem, py-8rem)
└─ Hero Section
   ├─ Heading
   │  └─ Typography: Poppins 4rem/900, #00ff66
   ├─ Subheading
   │  └─ Typography: Poppins 1.5rem/400, #ffffff
   └─ CTA Button
      └─ Padding: 2rem x 1rem, bg-#00ff66, rounded-0.5rem

└─ Features Grid (3-col desktop, 2-col tablet, 1-col mobile)
   ├─ Feature Card 1 [Pattern: card-default]
   ├─ Feature Card 2 [Pattern: card-default]
   └─ Feature Card 3 [Pattern: card-default]

## 3. Precise Measurements (Converted)
| Element | Figma | Responsive | Notes |
|---------|-------|------------|-------|
| Container max-width | 1280px | 80rem | Desktop constraint |
| Hero padding | 80px | 5rem | All sides |
| Card gap | 48px | 3rem | Grid gap |
| Button padding | 32px 16px | 2rem 1rem | Horizontal x Vertical |
| Border radius | 8px | 0.5rem | Standard |

## 4. Responsive Breakpoint Behavior
- **Mobile (375px-767px):**
  - Stack all cards vertically
  - Full-width buttons
  - Reduced padding (2rem)

- **Tablet (768px-1023px):**
  - 2-column grid
  - Padding 3rem

- **Desktop (1024px+):**
  - 3-column grid
  - Max-width constraints active
  - Padding 5rem

## 5. Design Tokens
Colors:
  - Primary: #00ff66 (Neon Green)
  - Background: #010f07 (Dark)
  - Text: #ffffff (White)

Typography:
  - Font Family: Poppins
  - Heading: 4rem/900
  - Body: 1rem/400
  - Subheading: 1.5rem/400

Spacing Scale:
  - xs: 0.5rem (8px)
  - sm: 1rem (16px)
  - md: 2rem (32px)
  - lg: 3rem (48px)
  - xl: 5rem (80px)

## 6. Asset Manifest
- hero-bg.webp: localhost:3845/assets/hero-bg.webp (1920x1080)
- logo.svg: localhost:3845/assets/logo.svg
- feature-icon-1.svg: localhost:3845/assets/feature-icon-1.svg
[Complete list of all assets with dimensions]

## 7. Pre-Identified Component Patterns
Pattern: card-default (Used 3x)
  - Structure: img + heading + text + button
  - Padding: 2rem
  - Border-radius: 1rem
  - Shadow: 0 4px 6px rgba(0,0,0,0.1)

Pattern: button-primary (Used 2x)
  - Padding: 2rem 1rem
  - Background: #00ff66
  - Color: #010f07
  - Border-radius: 0.5rem
  - Hover: transform scale(1.05)

## 8. Validation Criteria (95% Match)
✅ Typography size: ±2px tolerance
✅ Spacing: ±4px tolerance
✅ Colors: Exact match required
✅ Layout structure: Must match hierarchy
✅ Responsive behavior: All breakpoints work
✅ Assets: All loaded, no placeholders

## 9. Known Challenges
- [List any tricky aspects identified]
- [Areas that need special attention]
```

#### 4. Generate Work Packages

**Work Package A: Frontend Implementation**
```yaml
Specs: [Full component tree with measurements]
Assets: [Complete manifest]
Constraints: [Responsive requirements]
Priority: Build mobile-first, test all breakpoints
```

**Work Package B: Validation Suite**
```yaml
Reference: [Figma screenshot]
Criteria: [95% match definition]
Test Plan: [Breakpoints to validate]
Tools: [Browser automation setup]
```

**Work Package C: Refactoring Patterns**
```yaml
Patterns: [Pre-identified components]
Templates: [Component structure]
Optimization: [Performance targets]
```

**Output:** Master Spec Document + 3 Ready-to-Execute Work Packages

---

## 🚀 Phase 2: Async Orchestration (3 Parallel Agents - 15-20min)

**Rolle:** Concurrent Execution with Dependency Management

### Execution via Task Tool:
```javascript
// Main Agent launches 3 parallel tasks
const [frontendResult, validationResult, refactorResult] = await Promise.all([
  Task({
    subagent_type: "frontend-dev",
    description: "Build responsive UI",
    prompt: `${workPackageA}\n\nBuild pixel-perfect responsive implementation.`
  }),
  Task({
    subagent_type: "ui-design-validator",
    description: "Validate design match",
    prompt: `${workPackageB}\n\nPrepare validation suite, wait for frontend completion, then validate.`
  }),
  Task({
    subagent_type: "component-refactorer",
    description: "Extract components",
    prompt: `${workPackageC}\n\nPrepare refactoring patterns, wait for validation, then optimize.`
  })
]);
```

### Sub-Phase 2A: Frontend Implementation (Agent 1 - 15min)

**Input:** Work Package A (Enhanced Specification)

```yaml
Aufgaben:
  - Parse Master Spec Document
  - Build semantisches HTML5 mit genauer Hierarchie
  - Implement responsive CSS (Mobile-First)
    * Use exact measurements from spec (in rem)
    * Follow responsive breakpoint behavior
    * Apply design tokens consistently
  - Add JavaScript-Interaktivität
  - Integrate all assets from manifest
  - Test across breakpoints during build

Vorteile der Enhanced Specs:
  - Keine Rätselraten bei Measurements (±95% genau)
  - Klare Component-Struktur vorgegeben
  - Responsive Behavior dokumentiert
  - Alle Assets vorbereitet
  → Faster implementation, fewer validation failures
```

### Sub-Phase 2B: Validation (Agent 2 - 2min prep + 5min validate)

**Input:** Work Package B + Frontend Output

```yaml
Parallel Preparation (while Frontend builds):
  - Setup Browser Automation (Playwright)
  - Load Figma Screenshot Reference
  - Configure Visual Comparison Tools
  - Prepare Test Matrix:
    * Mobile: 375px
    * Tablet: 768px
    * Desktop: 1024px
    * Large: 1920px

Validation Execution (after Frontend completes):
  - Visual Regression Testing
  - Responsive Behavior Check
  - Asset Integration Verification
  - Performance Metrics
  - Generate Detailed Report:
    * Match Percentage (target: >95%)
    * List of Discrepancies
    * Screenshots of Issues

Output: Pass/Fail + Fix Instructions if needed
```

### Sub-Phase 2C: Component Refactoring (Agent 3 - 2min prep + 8min refactor)

**Input:** Work Package C + Validated Code

```yaml
Parallel Preparation (while validation runs):
  - Analyze Pre-Identified Patterns
  - Load Component Templates
  - Setup Optimization Tools
  - Prepare Extraction Strategy

Refactoring Execution (after validation passes):
  - Extract Reusable Components:
    * card-default → Card.js/Card.css
    * button-primary → Button.js/Button.css
  - Deduplicate repeated code
  - Create Component Library Structure
  - Optimize Performance:
    * Lazy loading
    * Image optimization
    * CSS minification
  - Update main code to use components

Output: Optimized Component Library + Updated Code
```

---

## ⚡ Workflow-Regeln

1. **2-Phase Execution:** Deep Planning → Async Orchestration
2. **Enhanced Measurement Extraction:** Figma Auto-Code für Analyse, nie direkt implementieren
3. **Parallel Efficiency:** 3 Agents arbeiten gleichzeitig (mit Dependency Management)
4. **Work Package System:** Klare, dokumentierte Aufgaben für jeden Agent
5. **Quality Gates:** Validation muss >95% erreichen vor Refactoring
6. **Preparation Optimization:** Agents bereiten vor während andere arbeiten
7. **🔗 Preview Link Rule:** Nach jedem Build-Process IMMER einen funktionsfähigen Link zum Ergebnis bereitstellen:
   - Für lokale Dateien: `file:///C:/Users/PC/Projects/TestSite/index.html`
   - Für HTTP-Server: `http://localhost:PORT/`
   - Format: "✅ **Vorschau:** [Hier klicken um Ergebnis anzusehen](link)"

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

**v4.0 - Async Orchestration Pipeline** (Current)
- 2-Phase Workflow: Deep Planning (10min) → Async Orchestration (15-20min)
- Enhanced Measurement Extraction (Figma Auto-Code für intelligente Analyse)
- Parallel Agent Execution mit Dependency Management (3 Agents gleichzeitig)
- Work Package System für strukturierte Task Distribution
- Master Specification Document Format mit präzisen Measurements
- 35% Performance-Verbesserung (38min → 25min)
- Preparation Optimization (Agents bereiten parallel vor)

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
- erfinde nie etwas dazu. du bist dazu da designs so umzusetzen wie sie dir vorgegeben werden.