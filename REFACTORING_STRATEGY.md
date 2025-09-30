# Component Refactoring Strategy

## Overview

This document outlines the comprehensive strategy for extracting reusable components from the validated OMH Digital landing page implementation, based on best practices from vanilla JavaScript component design patterns.

## Best Practices Applied (from Context7 Research)

### 1. Web Components Pattern
- Use Custom Elements API for true encapsulation
- Leverage `connectedCallback` for initialization
- Implement proper lifecycle management
- Use Shadow DOM for style isolation (where appropriate)

### 2. Template-Based Rendering
- Pre-define HTML templates outside component classes
- Share templates across instances for performance
- Use template cloning for efficient DOM creation

### 3. Component Communication
- Custom events for parent-child communication
- Event delegation for handling dynamic content
- Observer pattern for state changes

### 4. State Management
- Private fields (#property) for encapsulated state
- Signals/reactive patterns for automatic updates
- Separate data concerns from presentation

### 5. Reusability Principles
- Single Responsibility: Each component does one thing well
- Composition over Inheritance: Build complex from simple
- Prop-based Configuration: Flexible but with sensible defaults
- Zero Framework Dependencies: Pure vanilla JavaScript

## Component Extraction Priority

### Phase 1: High-Impact, High-Frequency Components
**Order:** LogoCard → StatItem → HeroImage

**Rationale:**
- LogoCard appears 15 times (highest duplication)
- StatItem appears 4 times with identical structure
- HeroImage appears 4 times with variations

**Expected Code Reduction:** ~60%

### Phase 2: Interactive Components
**Order:** CtaButton (Primary/Secondary)

**Rationale:**
- Critical for user engagement
- Need consistent behavior/styling
- Future reusability across pages

**Expected Code Reduction:** ~15%

### Phase 3: Complex Components
**Order:** ProblemCard

**Rationale:**
- More complex internal structure
- Lower frequency (3x) but high visual impact
- Good candidate for future variations

**Expected Code Reduction:** ~25%

## Component Architecture Decisions

### 1. LogoCard Component

**Architecture:** Lightweight Custom Element (No Shadow DOM)

**Reasoning:**
- Needs to inherit global carousel styles
- Simple structure doesn't require style encapsulation
- Performance critical (15 instances)

**Implementation Pattern:**
```javascript
class LogoCard extends HTMLElement {
  connectedCallback() {
    const logoUrl = this.getAttribute('logo-url');
    const logoAlt = this.getAttribute('logo-alt');

    this.innerHTML = `
      <img src="${logoUrl}" alt="${logoAlt}" class="logo-card__image">
    `;
  }
}
customElements.define('logo-card', LogoCard);
```

**Usage:**
```html
<div class="logo-card">
  <img src="..." alt="...">
</div>
```

---

### 2. CtaButton Component

**Architecture:** Custom Element with Attribute Observation

**Reasoning:**
- Requires state tracking (hover, active)
- Needs accessibility features (focus, keyboard)
- Two variants share core functionality

**Implementation Pattern:**
```javascript
class CtaButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'href', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const text = this.textContent;
    const className = `cta-${variant}`;

    this.innerHTML = `<button class="${className}">${text}</button>`;
  }
}
customElements.define('cta-button', CtaButton);
```

**Usage:**
```html
<cta-button variant="primary" href="#contact">
  Kostenlose Beratung
</cta-button>
```

---

### 3. ProblemCard Component

**Architecture:** Template-Based Custom Element

**Reasoning:**
- Complex internal structure
- Benefits from template reuse
- Needs content projection (icon, title, description)

**Implementation Pattern:**
```javascript
const problemCardTemplate = document.createElement('template');
problemCardTemplate.innerHTML = `
  <div class="problem-card__icon"></div>
  <div class="problem-card__content">
    <h3 class="problem-card__title"></h3>
    <p class="problem-card__description"></p>
  </div>
`;

class ProblemCard extends HTMLElement {
  connectedCallback() {
    const clone = problemCardTemplate.content.cloneNode(true);

    const title = this.getAttribute('title');
    const description = this.getAttribute('description');

    clone.querySelector('.problem-card__title').textContent = title;
    clone.querySelector('.problem-card__description').textContent = description;

    this.appendChild(clone);
  }
}
customElements.define('problem-card', ProblemCard);
```

**Usage:**
```html
<problem-card
  title="Kaum Besucher & Anfragen"
  description="Du hast bereits eine Website...">
</problem-card>
```

---

### 4. StatItem Component

**Architecture:** Minimal Custom Element with Separator Logic

**Reasoning:**
- Very simple structure
- Needs sibling awareness (separators)
- High performance requirement

**Implementation Pattern:**
```javascript
class StatItem extends HTMLElement {
  connectedCallback() {
    const number = this.getAttribute('number');
    const description = this.getAttribute('description');

    this.innerHTML = `
      <span class="stat-item__number">${number}</span>
      <span class="stat-item__description">${description}</span>
    `;
  }
}
customElements.define('stat-item', StatItem);
```

**Usage:**
```html
<div class="stats-grid">
  <stat-item number="10+" description="Jahre Erfahrung"></stat-item>
  <stat-item number="50+" description="Glückliche Kunden"></stat-item>
</div>
```

---

### 5. HeroImage Component

**Architecture:** Custom Element with Lazy Loading Integration

**Reasoning:**
- Performance critical (images)
- Needs IntersectionObserver integration
- Supports optional features (overlay, play button)

**Implementation Pattern:**
```javascript
class HeroImage extends HTMLElement {
  connectedCallback() {
    const imageUrl = this.getAttribute('image-url');
    const alt = this.getAttribute('alt');
    const hasOverlay = this.hasAttribute('overlay');
    const isVideo = this.hasAttribute('video');

    this.innerHTML = `
      <img src="${imageUrl}" alt="${alt}" class="hero-image__img" loading="lazy">
      ${hasOverlay ? '<div class="hero-image__overlay"></div>' : ''}
      ${isVideo ? this.playButtonHtml() : ''}
    `;

    if (isVideo) {
      this.setupVideoClick();
    }
  }

  playButtonHtml() {
    return `
      <button class="hero-image__play-button" aria-label="Play video">
        <svg>...</svg>
      </button>
    `;
  }

  setupVideoClick() {
    this.querySelector('.hero-image__play-button')
        .addEventListener('click', () => {
          // Video play logic
        });
  }
}
customElements.define('hero-image', HeroImage);
```

**Usage:**
```html
<hero-image
  image-url="http://localhost:3845/assets/image1.png"
  alt="Hero Image"
  class="hero-image--portrait">
</hero-image>

<hero-image
  image-url="http://localhost:3845/assets/video-thumb.png"
  alt="Video Thumbnail"
  video
  class="hero-image--landscape">
</hero-image>
```

---

## Refactoring Process Flow

### Step 1: Pre-Validation Preparation (Current Phase)
- [x] Component templates created
- [x] Component styles extracted
- [x] JavaScript classes scaffolded
- [x] Documentation written
- [x] Best practices researched

### Step 2: Wait for Validation Pass
- [ ] Frontend-Dev completes implementation
- [ ] UI-Design-Validator runs tests
- [ ] Validation report shows >95% match
- [ ] All assets loaded correctly
- [ ] Responsive behavior verified

### Step 3: Analyze Validated Code
```bash
# Tasks to perform:
1. Read index.html - identify all component instances
2. Read styles.css - extract component-specific styles
3. Read script.js - identify interactive behaviors
4. Map exact usage patterns
5. Verify asset URLs match specification
```

### Step 4: Extract Components (Sequential)

**For each component:**

1. **Locate all instances in index.html**
   ```bash
   grep -n "logo-card" index.html
   # Identify pattern variations
   ```

2. **Extract to component file**
   - Move HTML to component class
   - Move CSS to component stylesheet
   - Move JS to component behavior

3. **Replace in main file**
   ```html
   <!-- Before -->
   <div class="logo-card">
     <img src="..." alt="...">
   </div>

   <!-- After -->
   <logo-card logo-url="..." logo-alt="..."></logo-card>
   ```

4. **Test replacement**
   - Visual comparison
   - Interaction testing
   - Performance check

5. **Commit changes**
   ```bash
   git add components/LogoCard/*
   git commit -m "Extract LogoCard component (15 instances)"
   ```

### Step 5: Optimize Performance

**CSS Optimization:**
```bash
# 1. Consolidate all component styles
cat components/**/*.css > components.css

# 2. Remove duplicates
# (manual deduplication of shared styles)

# 3. Minify
# Use online tool or build process
```

**JavaScript Optimization:**
```javascript
// 1. Bundle all component classes
// 2. Implement lazy registration
const components = {
  'logo-card': () => import('./components/LogoCard/logo-card.js'),
  'cta-button': () => import('./components/CtaButton/cta-button.js'),
  // ...
};

// 3. Register on-demand
function registerComponent(name) {
  if (!customElements.get(name)) {
    components[name]().then(module => {
      customElements.define(name, module.default);
    });
  }
}
```

**HTML Optimization:**
```html
<!-- 1. Add preload hints -->
<link rel="modulepreload" href="components.js">

<!-- 2. Add resource hints for images -->
<link rel="preload" as="image" href="http://localhost:3845/assets/hero.png">

<!-- 3. Inline critical CSS -->
<style>
  /* Critical component styles above-the-fold */
  .logo-card { /* ... */ }
</style>
```

### Step 6: Quality Assurance

**Visual Testing:**
```yaml
Tests:
  - [ ] Desktop (1920px): All components render correctly
  - [ ] Tablet (768px): Responsive behavior intact
  - [ ] Mobile (375px): Mobile optimizations work
  - [ ] Hover states: All interactions preserved
  - [ ] Animations: Smooth 60fps maintained
```

**Functional Testing:**
```yaml
Tests:
  - [ ] Buttons clickable
  - [ ] Images lazy load
  - [ ] Carousel scrolls infinitely
  - [ ] Problem cards hover correctly
  - [ ] Stats display with separators
```

**Performance Testing:**
```yaml
Metrics (must not regress):
  - [ ] Initial Load: < 2 seconds
  - [ ] Time to Interactive: < 3 seconds
  - [ ] LCP: < 2.5 seconds
  - [ ] CLS: < 0.1
  - [ ] FPS: 60 constant
```

**Code Quality:**
```yaml
Checks:
  - [ ] No console errors
  - [ ] No accessibility violations
  - [ ] Valid HTML
  - [ ] Valid CSS
  - [ ] ESLint clean (if configured)
```

---

## Performance Impact Predictions

### Before Refactoring (Estimated)
```
HTML Size: ~800 lines
CSS Size: ~1500 lines
JS Size: ~200 lines
Total: ~2500 lines
Duplication: ~65%
```

### After Refactoring (Predicted)
```
HTML Size: ~400 lines (-50%)
CSS Size: ~600 lines (-60%)
JS Size: ~400 lines (+100%, but modular)
Total: ~1400 lines (-44%)
Duplication: ~5%

Component Files: 12 new files
  - 6 HTML templates
  - 6 CSS files
  - components.css (consolidated)
  - components.js (library)
```

### Performance Metrics

**Load Time:**
- Before: ~2.0s (estimated)
- After: ~1.8s (predicted, -10%)
  - Reason: Better caching, smaller CSS

**Maintainability Score:**
- Before: 4/10 (high duplication)
- After: 9/10 (DRY, modular)

**Reusability:**
- Before: 0% (one-off code)
- After: 100% (all components reusable)

---

## Risk Assessment & Mitigation

### Risk 1: Breaking Visual Accuracy
**Probability:** Medium
**Impact:** Critical
**Mitigation:**
- Pixel-perfect comparison after each extraction
- Keep original HTML commented for rollback
- Test at all breakpoints

### Risk 2: Performance Regression
**Probability:** Low
**Impact:** High
**Mitigation:**
- Lighthouse testing before/after
- Monitor FPS during animations
- Lazy load components below fold

### Risk 3: Browser Compatibility
**Probability:** Low (Custom Elements well-supported)
**Impact:** Medium
**Mitigation:**
- Test in target browsers (Chrome, Firefox, Safari, Edge)
- Include polyfill for older browsers if needed
- Graceful degradation strategy

### Risk 4: Over-Engineering
**Probability:** Medium
**Impact:** Low
**Mitigation:**
- Follow YAGNI (You Aren't Gonna Need It)
- Only extract truly repeated patterns
- Keep components simple

---

## Success Metrics

### Quantitative
- **Code Reduction:** >40% fewer lines
- **Duplication:** <10% duplicated code
- **Performance:** No regression (<2s load time)
- **Component Count:** 6 components extracted
- **Instances Replaced:** 27 total (15+1+1+3+4+3)

### Qualitative
- **Maintainability:** Easier to update all instances
- **Consistency:** Guaranteed identical styling
- **Scalability:** Easy to add more components
- **Developer Experience:** Faster future development

---

## Timeline Estimate

| Phase | Task | Duration |
|-------|------|----------|
| 1 | Preparation (Templates) | **COMPLETE** |
| 2 | Wait for Validation | Variable |
| 3 | Extract LogoCard (15x) | 30 min |
| 4 | Extract StatItem (4x) | 15 min |
| 5 | Extract HeroImage (4x) | 30 min |
| 6 | Extract CtaButton (2x) | 20 min |
| 7 | Extract ProblemCard (3x) | 25 min |
| 8 | Consolidate CSS | 20 min |
| 9 | Performance Optimization | 30 min |
| 10 | Testing & QA | 45 min |
| 11 | Documentation | 30 min |
| **Total** | | **~4 hours** |

---

## Post-Refactoring Deliverables

### Files Created
1. `components/` directory with 6 component folders
2. `components.css` - Consolidated component styles
3. `components.js` - Component library
4. `COMPONENT_LIBRARY.md` - Component documentation
5. `REFACTORING_REPORT.md` - Final report with metrics

### Files Modified
1. `index.html` - Updated to use components
2. `styles.css` - Deduplicated, component styles removed
3. `script.js` - Component registration added

### Files Preserved
1. `index.html.backup` - Original for comparison
2. `styles.css.backup` - Original styles

---

## Future Enhancements (Out of Scope)

### Phase 2 (Future)
- Component versioning
- Unit testing framework
- Build process (minification, bundling)
- TypeScript definitions
- Storybook documentation
- NPM package publication

### Phase 3 (Future)
- Shadow DOM migration for full encapsulation
- Theming system with CSS variables
- Animation library integration
- Accessibility audit & improvements
- Internationalization support

---

## References

**Best Practices Sources:**
- Plain Vanilla JS (jsebrech/plainvanilla)
  - Custom Elements lifecycle
  - Template-based rendering
  - Component communication patterns

- Patterns.dev (devinschumacher/patterns.dev)
  - Component design patterns
  - Reusability principles
  - Composition strategies

**Project Documentation:**
- MASTER_SPEC.md - Design specifications
- CLAUDE.md - Workflow guidelines
- COMPONENT_LIBRARY.md - Usage documentation

---

## Conclusion

This refactoring strategy is designed to:
1. **Maximize code reuse** through component extraction
2. **Maintain visual fidelity** with the validated design
3. **Improve performance** through optimization
4. **Enhance maintainability** with modular architecture
5. **Enable scalability** for future development

The sequential, test-driven approach ensures we can catch and fix issues early, maintaining the >95% design match requirement while improving code quality.

**Status:** Ready to execute upon validation pass ✅