# Design Validation Test Plan

## Test Matrix Overview

### 4 Breakpoints × 7 Categories = 28 Test Suites

| Breakpoint | Width | Typography | Spacing | Colors | Layout | Assets | Responsive | Animations |
|------------|-------|------------|---------|--------|--------|--------|------------|------------|
| Mobile     | 375px | ✓          | ✓       | ✓      | ✓      | ✓      | ✓          | ✓          |
| Tablet     | 768px | ✓          | ✓       | ✓      | ✓      | ✓      | ✓          | ✓          |
| Desktop    | 1024px| ✓          | ✓       | ✓      | ✓      | ✓      | ✓          | ✓          |
| Large      | 1920px| ✓          | ✓       | ✓      | ✓      | ✓      | ✓          | ✓          |

---

## Phase 1: Browser Setup (Playwright MCP)

### Tool: mcp__playwright__browser_navigate
```
URL: file://C:/Users/PC/Projects/TestSite/index.html
```

### Tool: mcp__playwright__browser_resize
```
Breakpoint 1: 375 × 812 (Mobile - iPhone 13)
Breakpoint 2: 768 × 1024 (Tablet - iPad)
Breakpoint 3: 1024 × 768 (Desktop - Small)
Breakpoint 4: 1920 × 1080 (Large Desktop)
```

---

## Phase 2: Typography Validation

### Automated Measurements (JavaScript Evaluation)

```javascript
// Tool: mcp__playwright__browser_evaluate

// Test 1: H1 Title Font Size
const h1Title = document.querySelector('h1, .hero-title');
const h1Style = window.getComputedStyle(h1Title);
const h1FontSize = parseFloat(h1Style.fontSize);
const h1FontFamily = h1Style.fontFamily;
const h1FontWeight = h1Style.fontWeight;

// Expected: 58px ±2px, Poppins, 400 (Regular)
console.log(`H1: ${h1FontSize}px, ${h1FontFamily}, ${h1FontWeight}`);

// Test 2: H2 Subtitle Font Size
const subtitle = document.querySelector('.hero-subtitle, .subtitle');
const subStyle = window.getComputedStyle(subtitle);
const subFontSize = parseFloat(subStyle.fontSize);

// Expected: 22px ±2px
console.log(`Subtitle: ${subFontSize}px`);

// Test 3: Body Text
const bodyText = document.querySelector('.hero-description, p');
const bodyStyle = window.getComputedStyle(bodyText);
const bodyFontSize = parseFloat(bodyStyle.fontSize);

// Expected: 18px ±2px
console.log(`Body: ${bodyFontSize}px`);

// Test 4: Stats Numbers
const statNumber = document.querySelector('.stat-number, .stats-number');
const statStyle = window.getComputedStyle(statNumber);
const statFontSize = parseFloat(statStyle.fontSize);
const statWeight = statStyle.fontWeight;

// Expected: 24px ±2px, weight 600 (SemiBold)
console.log(`Stats: ${statFontSize}px, ${statWeight}`);

// Return all results
({
  h1: { size: h1FontSize, family: h1FontFamily, weight: h1FontWeight },
  subtitle: { size: subFontSize },
  body: { size: bodyFontSize },
  stats: { size: statFontSize, weight: statWeight }
});
```

---

## Phase 3: Spacing Validation

### Automated Measurements

```javascript
// Tool: mcp__playwright__browser_evaluate

// Test 1: Section Padding (Desktop only - 1920px)
const mainContent = document.querySelector('main, .main-content');
const mainStyle = window.getComputedStyle(mainContent);
const paddingLeft = parseFloat(mainStyle.paddingLeft);
const paddingRight = parseFloat(mainStyle.paddingRight);

// Expected: 240px ±4px (15rem)
console.log(`Padding: ${paddingLeft}px, ${paddingRight}px`);

// Test 2: Hero Gap
const heroSection = document.querySelector('.hero, .hero-section');
const heroStyle = window.getComputedStyle(heroSection);
const heroGap = parseFloat(heroStyle.gap || heroStyle.columnGap);

// Expected: 70px ±4px (4.375rem)
console.log(`Hero Gap: ${heroGap}px`);

// Test 3: Logo Card Gap
const logoCarousel = document.querySelector('.logo-carousel, .logos');
const logoStyle = window.getComputedStyle(logoCarousel);
const logoGap = parseFloat(logoStyle.gap);

// Expected: 8px ±4px
console.log(`Logo Gap: ${logoGap}px`);

// Test 4: Problem Cards Offset
const problemCards = document.querySelectorAll('.problem-card');
if (problemCards.length >= 3) {
  const card1Rect = problemCards[0].getBoundingClientRect();
  const card2Rect = problemCards[1].getBoundingClientRect();
  const card3Rect = problemCards[2].getBoundingClientRect();

  const offset1to2 = card2Rect.left - card1Rect.left;
  const offset2to3 = card3Rect.left - card2Rect.left;

  // Expected: 20px ±4px incremental offset
  console.log(`Card Offsets: ${offset1to2}px, ${offset2to3}px`);
}

// Return results
({
  sectionPadding: { left: paddingLeft, right: paddingRight },
  heroGap: heroGap,
  logoGap: logoGap,
  cardOffsets: { offset1to2, offset2to3 }
});
```

---

## Phase 4: Color Validation

### Automated Color Extraction

```javascript
// Tool: mcp__playwright__browser_evaluate

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return rgb;
  const r = parseInt(result[0]).toString(16).padStart(2, '0');
  const g = parseInt(result[1]).toString(16).padStart(2, '0');
  const b = parseInt(result[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

// Test 1: Neon Green (#00ff66)
const neonGreenElement = document.querySelector('.hero-title span, h1 span');
const neonStyle = window.getComputedStyle(neonGreenElement);
const neonColor = rgbToHex(neonStyle.color);

// Test 2: Dark Background (#010f07)
const bodyBg = window.getComputedStyle(document.body).backgroundColor;
const bgColor = rgbToHex(bodyBg);

// Test 3: White Text (#ffffff)
const whiteText = document.querySelector('.hero-title, h1');
const whiteColor = rgbToHex(window.getComputedStyle(whiteText).color);

// Test 4: Text Gray (#d9d9d9)
const subtitle = document.querySelector('.subtitle, .hero-subtitle');
const grayColor = rgbToHex(window.getComputedStyle(subtitle).color);

// Test 5: Primary Button Background (#00ff66)
const primaryBtn = document.querySelector('.cta-primary, .btn-primary');
const btnBgColor = rgbToHex(window.getComputedStyle(primaryBtn).backgroundColor);

// Return all colors
({
  neonGreen: neonColor,
  background: bgColor,
  whiteText: whiteColor,
  grayText: grayColor,
  buttonBg: btnBgColor
});
```

---

## Phase 5: Layout Validation

### Visual Structure Tests

```javascript
// Tool: mcp__playwright__browser_evaluate

// Test 1: Menu Sticky Position
const menu = document.querySelector('nav, header, .menu');
const menuStyle = window.getComputedStyle(menu);
const menuPosition = menuStyle.position;
const menuBackdrop = menuStyle.backdropFilter || menuStyle.webkitBackdropFilter;

// Expected: position: sticky/fixed, backdrop-filter: blur(25px)
console.log(`Menu: ${menuPosition}, Backdrop: ${menuBackdrop}`);

// Test 2: Hero Layout (2-column)
const heroSection = document.querySelector('.hero');
const heroDisplay = window.getComputedStyle(heroSection).display;
const heroGrid = window.getComputedStyle(heroSection).gridTemplateColumns;

// Expected: display: grid/flex, 2 columns
console.log(`Hero: ${heroDisplay}, Columns: ${heroGrid}`);

// Test 3: Logo Carousel Animation
const scrollLeft = document.querySelector('.scroll-left, .carousel-left');
const scrollRight = document.querySelector('.scroll-right, .carousel-right');
const leftAnimation = window.getComputedStyle(scrollLeft).animation;
const rightAnimation = window.getComputedStyle(scrollRight).animation;

// Expected: Different animation directions
console.log(`Animations: Left=${leftAnimation}, Right=${rightAnimation}`);

// Test 4: Social Proof Avatars Overlap
const avatars = document.querySelectorAll('.avatar, .social-proof img');
if (avatars.length >= 2) {
  const avatar1 = avatars[0].getBoundingClientRect();
  const avatar2 = avatars[1].getBoundingClientRect();
  const overlap = avatar1.right - avatar2.left;

  // Expected: ~15px overlap (negative margin)
  console.log(`Avatar Overlap: ${overlap}px`);
}

// Test 5: Problem Cards Stagger
const problemCards = document.querySelectorAll('.problem-card');
const cardsStaggered = problemCards.length === 3 &&
  problemCards[1].getBoundingClientRect().left > problemCards[0].getBoundingClientRect().left;

// Return layout validation
({
  menu: { position: menuPosition, backdrop: menuBackdrop },
  hero: { display: heroDisplay, grid: heroGrid },
  carousel: { left: leftAnimation, right: rightAnimation },
  avatarOverlap: overlap,
  cardsStaggered: cardsStaggered
});
```

---

## Phase 6: Asset Validation

### Image Loading Tests

```javascript
// Tool: mcp__playwright__browser_evaluate

// Test 1: Count all images
const allImages = document.querySelectorAll('img');
const totalImages = allImages.length;

// Test 2: Check for 404 errors
const loadedImages = Array.from(allImages).filter(img => img.complete && img.naturalHeight > 0);
const failedImages = Array.from(allImages).filter(img => !img.complete || img.naturalHeight === 0);

// Test 3: Check localhost:3845 source
const assetsFromCorrectSource = Array.from(allImages).filter(img =>
  img.src.includes('localhost:3845')
);

// Test 4: Check for placeholder images
const placeholders = Array.from(allImages).filter(img =>
  img.src.includes('placeholder') ||
  img.alt.toLowerCase().includes('placeholder')
);

// Test 5: SVG Icon Validation
const svgIcons = document.querySelectorAll('svg, img[src$=".svg"]');
const svgCount = svgIcons.length;

// Return asset validation
({
  totalImages: totalImages,
  loadedImages: loadedImages.length,
  failedImages: failedImages.map(img => img.src),
  assetsFromLocalhost: assetsFromCorrectSource.length,
  placeholders: placeholders.length,
  svgIconsCount: svgCount,
  expectedTotal: 43
});
```

---

## Phase 7: Responsive Validation

### Breakpoint-Specific Tests

#### Mobile (375px)
```javascript
// Tool: mcp__playwright__browser_evaluate

// Test 1: Single Column Layout
const hero = document.querySelector('.hero');
const heroColumns = window.getComputedStyle(hero).gridTemplateColumns;
const isSingleColumn = heroColumns.includes('1fr') && !heroColumns.includes('1fr 1fr');

// Test 2: Buttons Full Width
const buttons = document.querySelectorAll('button, .btn');
const buttonsFullWidth = Array.from(buttons).every(btn => {
  return parseFloat(window.getComputedStyle(btn).width) > 300;
});

// Test 3: Stats Stacked
const statsContainer = document.querySelector('.stats, .hero-stats');
const statsDirection = window.getComputedStyle(statsContainer).flexDirection;

// Expected: column
console.log(`Stats Direction: ${statsDirection}`);

// Test 4: Logo Cards Scaled
const logoCard = document.querySelector('.logo-card');
const logoCardWidth = parseFloat(window.getComputedStyle(logoCard).width);

// Expected: ~12rem = 192px
console.log(`Logo Card Width: ${logoCardWidth}px`);

// Return mobile validation
({
  singleColumn: isSingleColumn,
  buttonsFullWidth: buttonsFullWidth,
  statsStacked: statsDirection === 'column',
  logoCardWidth: logoCardWidth
});
```

#### Tablet (768px)
```javascript
// Similar tests with tablet-specific expectations
// Full nav visible, reduced gaps, cards at 14rem
```

#### Desktop (1024px) & Large (1920px)
```javascript
// Full layout tests with complete spacing
```

---

## Phase 8: Screenshot Capture

### Tool: mcp__playwright__browser_take_screenshot

For each breakpoint:
1. Full page screenshot
2. Hero section screenshot
3. Logo carousel screenshot
4. Problems section screenshot

```
File naming convention:
- validation-mobile-fullpage.png
- validation-tablet-fullpage.png
- validation-desktop-fullpage.png
- validation-large-fullpage.png
- validation-{breakpoint}-hero.png
- validation-{breakpoint}-carousel.png
- validation-{breakpoint}-problems.png
```

---

## Phase 9: Score Calculation

### Scoring Algorithm

```javascript
const scoring = {
  categories: {
    typography: { weight: 15, items: 6, passed: 0 },
    spacing: { weight: 15, items: 5, passed: 0 },
    colors: { weight: 15, items: 6, passed: 0 },
    layout: { weight: 20, items: 5, passed: 0 },
    assets: { weight: 15, items: 4, passed: 0 },
    responsive: { weight: 15, items: 8, passed: 0 },
    animations: { weight: 5, items: 7, passed: 0 }
  }
};

function calculateScore() {
  let totalScore = 0;

  for (const [category, data] of Object.entries(scoring.categories)) {
    const categoryScore = (data.passed / data.items) * data.weight;
    totalScore += categoryScore;
  }

  return Math.round(totalScore);
}

// Target: >95%
```

---

## Phase 10: Report Generation

### Report Structure

```markdown
# Design Validation Report

## Executive Summary
- Overall Match: X%
- Status: PASS/FAIL
- Breakpoints Tested: 4/4
- Critical Issues: N
- Minor Issues: N

## Detailed Results by Breakpoint

### Mobile (375px) - Score: X%
#### Typography ✓/✗
- H1 Title: 58px → Actual: Xpx ✓/✗
- Subtitle: 22px → Actual: Xpx ✓/✗
...

#### Spacing ✓/✗
...

#### Colors ✓/✗
...

#### Layout ✓/✗
...

#### Assets ✓/✗
...

#### Responsive ✓/✗
...

#### Animations ✓/✗
...

#### Screenshots
![Mobile Fullpage](validation-mobile-fullpage.png)

---

[Repeat for Tablet, Desktop, Large]

---

## Issues Summary

### Critical Issues (Must Fix)
1. **Issue:** [Description]
   - **Expected:** [Value]
   - **Actual:** [Value]
   - **Fix:** [Specific instructions]

### Major Issues (Should Fix)
...

### Minor Issues (Nice to Have)
...

---

## Recommendations

✅ **PASS** - Proceed to Component Refactoring Phase
❌ **FAIL** - Return to Frontend-Dev with fix list

---

## Fix List for Frontend-Dev (if failed)

1. [Specific file and line number]
2. [Exact CSS property to change]
3. [Before and after values]
```

---

## Success Criteria Checklist

- [ ] All 4 breakpoints tested
- [ ] Typography validated (±2px tolerance)
- [ ] Spacing validated (±4px tolerance)
- [ ] Colors exact match verified
- [ ] Layout structure matches Figma
- [ ] All 43 assets loaded successfully
- [ ] Responsive behavior correct
- [ ] Animations smooth at 60fps
- [ ] Score >95% calculated
- [ ] Screenshots captured and saved
- [ ] Detailed report generated
- [ ] Clear pass/fail decision made

---

## Estimated Time per Breakpoint

- Setup & Navigation: 30s
- Typography Tests: 60s
- Spacing Tests: 60s
- Color Tests: 45s
- Layout Tests: 90s
- Asset Tests: 45s
- Responsive Tests: 60s
- Screenshots: 30s
- **Total per breakpoint: ~7 minutes**
- **Total for 4 breakpoints: ~30 minutes**

---

## End of Test Plan