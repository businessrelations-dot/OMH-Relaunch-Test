# Master Specification: OMH Digital Landing Page

## 1. Visual Reference
![Figma Design](http://localhost:3845/screenshot.png)

**Design Dimensions:** 1920x1865px (Desktop)

---

## 2. Component Structure Tree

```
Container (1920px width, 100vw responsive)
├─ Menu (sticky header, backdrop-blur-25px, bg-rgba(1,15,7,0.3))
│  ├─ Logo (150px x 62px → 9.375rem x 3.875rem)
│  ├─ Navigation (gap: 50px → 3.125rem)
│  │  ├─ Services (dropdown with arrow)
│  │  ├─ Über uns
│  │  ├─ Portfolio
│  │  ├─ Blog
│  │  ├─ Hall of Fame
│  │  └─ Praxismarketing
│  └─ CTA Button "KONTAKT"
│     └─ bg-#00ff66, px-45px py-17px, rounded-10px
│
├─ Background Decorations
│  ├─ Stairs Animation (left: -210px, top: -540px, opacity: 70%)
│  └─ Green Glow Animations (2x, blur-325px)
│
├─ Main Content (padding: 240px → 15rem, top: 202px)
│  │
│  ├─ Hero Section (gap: 70px → 4.375rem)
│  │  ├─ Text Column (width: 685px → 42.8rem)
│  │  │  ├─ Title (Poppins 58px/Regular, line-height: 1.2)
│  │  │  │  • "Mehr Kunden" (#00ff66)
│  │  │  │  • "durch OMH Digital-marketing" (#ffffff)
│  │  │  │
│  │  │  ├─ Subtitle (Poppins 22px/Regular, color: #d9d9d9)
│  │  │  │  • "Durch Branding, Website & SEO-Marketing..."
│  │  │  │
│  │  │  ├─ Social Proof Avatars (10x 60px circles)
│  │  │  │  • Overlap: -15px margin-right
│  │  │  │  • Images: imgImage246-250, imgImage
│  │  │  │
│  │  │  ├─ Stats Grid (3 rows, gap: 20px)
│  │  │  │  Row 1: "10+ Jahre Erfahrung | 50+ Glückliche Kunden"
│  │  │  │  Row 2: "300+ Top 1 ranking pages | 56,000+ Traffic Wert"
│  │  │  │  • Number: Poppins 24px/SemiBold #ffffff
│  │  │  │  • Description: Poppins 18px/Regular #b9bab9
│  │  │  │  • Separator: vertical line (15px, 90deg rotate)
│  │  │  │
│  │  │  └─ CTA Buttons (gap: 20px)
│  │  │     • Button 1: "Kostenlose Beratung"
│  │  │     │  └─ bg-#00ff66, text-#010f07, 271px x 60px
│  │  │     • Button 2: "Umsatz-Potential Test"
│  │  │        └─ border-#00ff66(50%), text-#ffffff, 281px x 60px
│  │  │
│  │  └─ Image Grid (2 columns, gap: 29.15px)
│  │     ├─ Column 1 (328.41px width, gap: 30px)
│  │     │  ├─ Image 1 (aspect: 338/331, rounded-20px)
│  │     │  │  └─ imgImage1
│  │     │  └─ Image 2 (aspect: 338/187, rounded-20px)
│  │     │     └─ imgImage2 (with dark overlay)
│  │     │
│  │     └─ Column 2 (327.44px width, gap: 30px)
│  │        ├─ Video Thumbnail (aspect: 337/187, rounded-20px)
│  │        │  └─ imgImage3 + Play Button (50px, centered)
│  │        └─ Image 4 (aspect: 337/331, rounded-20px)
│  │           └─ imgImage4
│  │
│  ├─ Logo Carousel Section (gap: 131px between rows)
│  │  ├─ Scroll Left Animation (infinite scroll →)
│  │  │  └─ 15 Logo Cards (270px x 123px, gap: 8px)
│  │  │     • backdrop-blur-5px, padding: 35px 31px
│  │  │     • rounded-10px, aspect: 250/75
│  │  │
│  │  └─ Scroll Right Animation (infinite scroll ←)
│  │     └─ 15 Logo Cards (same pattern)
│  │
│  └─ Problems Section (2-column layout)
│     ├─ Title Column (width: 474px)
│     │  └─ "Kommen Ihnen diese" + "Probleme bekannt vor?" (#00ff66)
│     │     • Poppins 54px/Regular, line-height: 1.2
│     │
│     └─ Cards Column (width: 896px, 3 cards staggered)
│        ├─ Card 1 (offset: 0px, width: 856px)
│        │  ├─ Icon: Green X (40px, bg-opacity-10%)
│        │  ├─ Title: "Kaum Besucher & Anfragen" (24px/Medium)
│        │  └─ Text: "Du hast bereits eine Website..." (18px/Regular)
│        │
│        ├─ Card 2 (offset: 20px, width: 856px)
│        │  ├─ Icon: Green X
│        │  ├─ Title: "Starke Konkurrenz"
│        │  └─ Text: "Die Konkurrenz, die teilweise..."
│        │
│        └─ Card 3 (offset: 40px, width: 856px)
│           ├─ Icon: Green X
│           ├─ Title: "Kundengewinnung wird immer schwieriger"
│           └─ Text: "Du investierst viel Zeit..."
```

---

## 3. Precise Measurements (Converted to Responsive)

| Element | Figma Fixed | Responsive Desktop | Tablet | Mobile | Notes |
|---------|-------------|-------------------|--------|--------|-------|
| **Layout** |
| Container max-width | 1920px | 120rem | 100vw | 100vw | Full width on mobile |
| Section padding horizontal | 240px | 15rem | 3rem | 1.5rem | Adaptive |
| Section padding vertical | 202px (top) | 12.625rem | 6rem | 3rem | Reduce on mobile |
| Gap between sections | 120px | 7.5rem | 4rem | 2rem | Proportional scaling |
| **Menu** |
| Menu height | 112px | 7rem | 7rem | 5rem | Compact on mobile |
| Menu padding horizontal | 240px | 15rem | 2rem | 1rem | |
| Menu padding vertical | 25px | 1.5625rem | 1.5625rem | 1rem | |
| Logo width | 150px | 9.375rem | 8rem | 7rem | Scale down |
| Nav gap | 50px | 3.125rem | 2rem | - | Stack on mobile |
| Nav font size | 18px | 1.125rem | 1rem | 1rem | |
| Button padding | 45px 17px | 2.8125rem 1.0625rem | 2rem 1rem | 1.5rem 0.75rem | |
| **Hero Section** |
| Hero gap (text/images) | 70px | 4.375rem | 3rem | 2rem | |
| Text column width | 685px | 42.8rem | 100% | 100% | Full width on mobile |
| Title font size | 58px | clamp(2rem, 5vw, 3.625rem) | 2.5rem | 2rem | Fluid scaling |
| Subtitle font size | 22px | 1.375rem | 1.25rem | 1.125rem | |
| Avatar size | 60px | 3.75rem | 3rem | 2.5rem | |
| Avatar overlap | -15px | -0.9375rem | -0.75rem | -0.5rem | |
| Stats number size | 24px | 1.5rem | 1.25rem | 1.125rem | |
| Stats text size | 18px | 1.125rem | 1rem | 0.875rem | |
| Button height | 60px | 3.75rem | 3.5rem | 3rem | |
| Button width | 271px/281px | auto | auto | 100% | Full width on mobile |
| Image gap | 29.15px | 1.822rem | 1.5rem | 1rem | |
| Image border-radius | 20px | 1.25rem | 1rem | 0.75rem | |
| **Logo Carousel** |
| Card width | 270px | 16.875rem | 14rem | 12rem | |
| Card height | 123px | 7.6875rem | 6.5rem | 5.5rem | |
| Card padding | 35px 31px | 2.1875rem 1.9375rem | 1.5rem | 1rem | |
| Card gap | 8px | 0.5rem | 0.5rem | 0.5rem | |
| Row gap | 131px | 8.1875rem | 4rem | 2rem | |
| **Problems Section** |
| Title column width | 474px | 29.625rem | 100% | 100% | Full width on mobile |
| Title font size | 54px | clamp(1.75rem, 4.5vw, 3.375rem) | 2.25rem | 1.75rem | Fluid |
| Cards column width | 896px | 56rem | 100% | 100% | Stack on mobile |
| Card width | 856px | 53.5rem | 100% | 100% | |
| Card padding | 30px | 1.875rem | 1.5rem | 1rem | |
| Card offset increment | 20px | 1.25rem | 0 | 0 | No offset on mobile |
| Card title size | 24px | 1.5rem | 1.25rem | 1.125rem | |
| Card text size | 18px | 1.125rem | 1rem | 1rem | |
| Icon size | 40px | 2.5rem | 2.25rem | 2rem | |

---

## 4. Responsive Breakpoint Behavior

### Mobile (375px - 767px)
- Menu: Hamburger menu, logo centered
- Hero: Single column, text full width, images stack vertically (2 columns → 1 column)
- Stats: Stack vertically, remove separators
- Buttons: Full width, stack vertically
- Logo Carousel: Reduce card size to 12rem, maintain scroll
- Problems: Title + cards stack vertically, remove horizontal offset

### Tablet (768px - 1023px)
- Menu: Full navigation visible, reduce gaps
- Hero: Maintain 2-column layout but reduce gaps
- Section padding: 3rem horizontal
- Logo Carousel: Scale cards to 14rem
- Problems: Stack title above cards, cards remain staggered

### Desktop (1024px - 1439px)
- All elements scale proportionally
- Container: max-width 100vw
- Maintain all layout patterns

### Large Desktop (1440px+)
- Container: max-width 1920px (120rem), centered
- All padding and spacing at full scale
- Maintain horizontal constraints

---

## 5. Design Tokens

```css
:root {
  /* Colors */
  --color-neon-green: #00ff66;
  --color-bg-dark: #010f07;
  --color-white: #ffffff;
  --color-text-gray: #d9d9d9;
  --color-text-subtle: #b9bab9;
  --color-menu-bg: rgba(1, 15, 7, 0.3);
  --color-border-green: rgba(0, 255, 102, 0.5);

  /* Typography */
  --font-family: 'Poppins', sans-serif;
  --font-size-h1: clamp(2rem, 5vw, 3.625rem);
  --font-size-h2: clamp(1.75rem, 4.5vw, 3.375rem);
  --font-size-h3: clamp(1.125rem, 3vw, 1.5rem);
  --font-size-body-lg: 1.375rem;
  --font-size-body: 1.125rem;
  --font-size-body-sm: 1rem;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 900;
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;

  /* Spacing */
  --space-xs: 0.625rem;
  --space-sm: 1.25rem;
  --space-md: 1.875rem;
  --space-lg: 3.125rem;
  --space-xl: 4.375rem;
  --space-2xl: 7.5rem;
  --space-3xl: 12.625rem;

  /* Border Radius */
  --radius-sm: 0.625rem;
  --radius-md: 1.25rem;

  /* Effects */
  --blur-light: blur(5px);
  --blur-medium: blur(25px);
  --blur-heavy: blur(325px);
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
}
```

---

## 6. Asset Manifest (43 Assets from localhost:3845)

### Hero Images (4)
```javascript
const imgImage1 = "http://localhost:3845/assets/0f3ec225aff6b8489af2a30718435d769095208f.png"; // Main portrait
const imgImage2 = "http://localhost:3845/assets/ae6b23d4e24bf98b7c1c58c3cf121b83cacfe40d.png"; // Team photo
const imgImage3 = "http://localhost:3845/assets/e88a04a7e302251601952fb371f7df77c15d8ff5.png"; // Video thumbnail
const imgImage4 = "http://localhost:3845/assets/ded55b493b65f83a912e5c70f7995ac6efcfc7ea.png"; // Group photo
```

### Social Proof Avatars (10)
```javascript
const imgImage246 = "http://localhost:3845/assets/1225fb75873dc0691713fc3356a501966b05f990.png";
const imgImage242 = "http://localhost:3845/assets/8c9f39c9ed8dd79a26f34a644ce7fb8c86254140.png";
const imgImage243 = "http://localhost:3845/assets/71ca65462a7f2cb6f9b3f88b8ea9b651a66d82f3.png";
const imgImage244 = "http://localhost:3845/assets/4650517c46d96185577c86f0b38a9c06752e931e.png";
const imgImage245 = "http://localhost:3845/assets/a4ee474d6b994d73a020756233ed47dac4a4a37d.png";
const imgImage247 = "http://localhost:3845/assets/8e80d2df9fe14121833b4b81dcdc9b613cbfd072.png";
const imgImage248 = "http://localhost:3845/assets/71089e2193a2ce2f36b370c5c90b37bfeee57ca4.png";
const imgImage = "http://localhost:3845/assets/fb4d5979872d8f7e7ee7e3be45f2bd1b591dc710.png";
const imgImage249 = "http://localhost:3845/assets/259e76ab26ce1f8455cceb866a9777a381926057.png";
const imgImage250 = "http://localhost:3845/assets/7e3736ea669011e96d99d0acce76c4e29b1afb5e.png";
```

### Partner Logos (15 - SVG + PNG)
```javascript
const imgSamsungOnlineMarketingAgenturBerlin = "http://localhost:3845/assets/ebfd1afd58d03e9aad1902a00a16913fa73f4bdb.png";
const imgHauptstadtgoldWerbeagenturBerlin = "http://localhost:3845/assets/30004bf0786d054d70b2290913157b735f74a851.png";
const imgEdelopticsOnlineMarketingBerlin = "http://localhost:3845/assets/3626bda8ea1073cb41ab4c5b79d34e9d4ac4125d.png";
const imgDoctorBoxOnlineMarketingBerlin = "http://localhost:3845/assets/8f53c11249b7e31bf973cb3a7beb237c5e94eb11.png";
const imgOnlineMarketingStrategieMittelstandDigital1 = "http://localhost:3845/assets/582e0c828644d6d5f15d6fbc2ee0fcfff7f4cc8a.png";
const imgJelbiZusammenarbeitWerbeagenturBerlin1 = "http://localhost:3845/assets/bb64c81482bc0aad8d61adeaaa79f54d3f1bc9c0.png";
const imgUnmutePartnerOnlineMarketing = "http://localhost:3845/assets/9868b296381c5f8390d07006207b8511977b2484.png";
const imgOrthopaedeSchneiderhanOnlineMarketing = "http://localhost:3845/assets/f88379cce6b7082f0df0021ced9d767e8fe34dd0.png";
const imgOnlineMarketingAgenturUsenextPartner = "http://localhost:3845/assets/286f2364f1db9369337a2b080c42ae1bdca0fa21.png";
const img11FreundeLogoOnlineMarketingStrategie = "http://localhost:3845/assets/f20ebd8f6ebb708be1c6e379357f9ad9708af30a.png";
const imgPaniniZusammenarbeitOnlineMarketingAgenturBerlin = "http://localhost:3845/assets/155dd957c63be66c155b7648c47f23050e362bf0.png";
const imgStudiworkPartnerOnlineMarketingStrategie1 = "http://localhost:3845/assets/c61a903e12f25aad71bfd1b5a4ff7b544a465186.png";
const imgMillaniaECommerceOnlineMarketing1 = "http://localhost:3845/assets/e9e33cb73dfefd6b3ba79241c6fe4c6928b759e8.png";
const imgRiccardoCartilloneKundeOnlineMarketingAgentur = "http://localhost:3845/assets/18c5bc77528aa75682807286ec0bbe83a1b8eb53.png";
const imgImage64 = "http://localhost:3845/assets/253c76449285dad7faa0612da5ca2e8c1b2d2fa4.png";
```

### UI Icons & Background Elements (14)
```javascript
const img = "http://localhost:3845/assets/30894b6603396d7577454171fdda537b0d29603e.svg"; // Logo
const imgPlay = "http://localhost:3845/assets/dca92479d59dc74a08cadb2aacabc58347ec57ed.svg"; // Play button
const img23 = "http://localhost:3845/assets/e8ed009956dc15cc2caf38496b7e914b5eb58fea.svg"; // Close/X icon
const img1 = "http://localhost:3845/assets/979b8eba572ee9f37b989c0449cec0486ed3a119.svg"; // Arrow down
const imgLine2 = "http://localhost:3845/assets/70f13a3375e1229f4d7bdd0117b62485cd6cfbab.svg"; // Separator line
// ... + 9 more background stair SVGs (img2-img22)
```

---

## 7. Pre-Identified Component Patterns

### Pattern: `logo-card` (Used 15x in carousel)
```
Structure:
  <div class="logo-card">
    <img src="[partner-logo]" alt="Partner Logo">
  </div>

Style:
  - backdrop-filter: blur(5px)
  - background: rgba(255, 255, 255, 0.05)
  - padding: 2.1875rem 1.9375rem
  - border-radius: 0.625rem
  - width: 16.875rem
  - height: 7.6875rem
  - display: flex, align-items: center, justify-content: center

Responsive:
  - Tablet: width 14rem, height 6.5rem, padding 1.5rem
  - Mobile: width 12rem, height 5.5rem, padding 1rem
```

### Pattern: `cta-button-primary` (Used 1x)
```
Structure:
  <button class="cta-primary">
    Kostenlose Beratung
  </button>

Style:
  - background: #00ff66
  - color: #010f07
  - padding: 1.0625rem 2.8125rem
  - border-radius: 0.625rem
  - font: Poppins 1.125rem Medium
  - text-transform: uppercase
  - transition: transform 0.3s ease
  - hover: transform scale(1.05)

Responsive:
  - Mobile: width 100%, padding 0.75rem 1.5rem
```

### Pattern: `cta-button-secondary` (Used 1x)
```
Structure:
  <button class="cta-secondary">
    Umsatz-Potential Test
  </button>

Style:
  - background: transparent
  - border: 1px solid rgba(0, 255, 102, 0.5)
  - color: #ffffff
  - padding: 1.0625rem 2.8125rem
  - border-radius: 0.625rem
  - font: Poppins 1.125rem Medium
  - text-transform: uppercase
  - transition: background 0.3s ease
  - hover: background rgba(0, 255, 102, 0.1)

Responsive:
  - Mobile: width 100%, padding 0.75rem 1.5rem
```

### Pattern: `problem-card` (Used 3x)
```
Structure:
  <div class="problem-card">
    <div class="icon">
      <svg>[X icon]</svg>
    </div>
    <div class="content">
      <h3>[Title]</h3>
      <p>[Description]</p>
    </div>
  </div>

Style:
  - padding: 1.875rem
  - border-radius: 1.25rem
  - background: rgba(255, 255, 255, 0.02)
  - display: flex, gap: 0.9375rem
  - Icon:
    * width/height: 2.5rem
    * background: rgba(0, 255, 102, 0.1)
    * border-radius: 0.625rem
  - Title: Poppins 1.5rem Medium, color #ffffff
  - Description: Poppins 1.125rem Regular, color #d9d9d9, line-height 1.6

Responsive:
  - Mobile: padding 1rem, remove horizontal offset
```

### Pattern: `stat-item` (Used 4x)
```
Structure:
  <div class="stat-item">
    <span class="number">10+</span>
    <span class="description">Jahre Erfahrung</span>
  </div>

Style:
  - display: flex, gap: 0.625rem, align-items: center
  - Number: Poppins 1.5rem SemiBold, color #ffffff
  - Description: Poppins 1.125rem Regular, color #b9bab9

Responsive:
  - Mobile: Stack vertically, text-align center
```

### Pattern: `hero-image` (Used 4x)
```
Structure:
  <div class="hero-image">
    <img src="[image]" alt="Hero Image">
  </div>

Style:
  - border-radius: 1.25rem
  - overflow: hidden
  - object-fit: cover
  - aspect-ratio: varies (338/331 or 337/187)
  - hover: transform scale(1.02), transition 0.3s ease

Responsive:
  - Mobile: aspect-ratio: 1/1, width 100%
```

---

## 8. Animation Requirements

### Infinite Horizontal Scroll (Logo Carousel)
```javascript
// Animation 1: Scroll Left (→)
@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.scroll-left {
  animation: scrollLeft 60s linear infinite;
}

// Animation 2: Scroll Right (←)
@keyframes scrollRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.scroll-right {
  animation: scrollRight 60s linear infinite;
}
```

### Background Glow Animation
```javascript
@keyframes pulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.1); }
}

.glow {
  animation: pulse 4s ease-in-out infinite;
}
```

### Hover Effects
```css
/* Buttons */
.cta-primary:hover {
  transform: scale(1.05);
}

.cta-secondary:hover {
  background: rgba(0, 255, 102, 0.1);
}

/* Logo Cards */
.logo-card:hover {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.08);
}

/* Images */
.hero-image:hover {
  transform: scale(1.02);
}
```

---

## 9. Validation Criteria (95% Match Target)

### Typography Validation (±2px tolerance)
- ✅ H1 Title: 58px (±2px) = 56-60px acceptable
- ✅ H2 Subtitle: 22px (±2px) = 20-24px acceptable
- ✅ Body text: 18px (±2px) = 16-20px acceptable
- ✅ Stats numbers: 24px (±2px) = 22-26px acceptable
- ✅ Font family: Poppins (exact match required)
- ✅ Font weights: 400/500/600/900 (exact match required)

### Spacing Validation (±4px tolerance)
- ✅ Section padding: 240px (±4px) = 236-244px acceptable
- ✅ Hero gap: 70px (±4px) = 66-74px acceptable
- ✅ Element gaps: ±4px tolerance on all spacing

### Color Validation (Exact match required)
- ✅ Neon Green: #00ff66 (exact)
- ✅ Dark Background: #010f07 (exact)
- ✅ White: #ffffff (exact)
- ✅ Text Gray: #d9d9d9 (exact)

### Layout Structure (Must match)
- ✅ Menu: sticky header with backdrop blur
- ✅ Hero: 2-column layout (text left, images right)
- ✅ Logo carousel: 2 rows, opposite scroll directions
- ✅ Problems: 2-column with staggered cards
- ✅ All element hierarchy matches Figma structure

### Asset Integration
- ✅ All 43 assets loaded from localhost:3845
- ✅ No placeholder images
- ✅ Correct image in correct position
- ✅ SVG icons rendered properly

### Responsive Behavior
- ✅ Mobile (375px): Single column, stacked layout
- ✅ Tablet (768px): Adjusted gaps, maintained structure
- ✅ Desktop (1024px+): Full layout with all spacing
- ✅ Smooth transitions between breakpoints

---

## 10. Known Challenges & Special Attention

### Challenge 1: Infinite Scroll Performance
- **Issue:** 15 logos per row × 2 rows = heavy DOM
- **Solution:** Duplicate logo set for seamless loop, use CSS transform (hardware-accelerated)
- **Test:** Verify 60fps on mobile devices

### Challenge 2: Backdrop Blur Safari Support
- **Issue:** Safari has partial support for backdrop-filter
- **Solution:** Add `-webkit-backdrop-filter` prefix, provide fallback solid background
- **Test:** Verify on Safari iOS and macOS

### Challenge 3: Image Aspect Ratios
- **Issue:** Images have specific aspect ratios (338/331, 337/187)
- **Solution:** Use `aspect-ratio` CSS property with `object-fit: cover`
- **Test:** Check all breakpoints for image distortion

### Challenge 4: Overlapping Avatars
- **Issue:** 10 avatars with -15px negative margin
- **Solution:** Use flexbox with negative margin-right, ensure proper z-index stacking
- **Test:** Verify overlap on all screen sizes

### Challenge 5: Staggered Problem Cards
- **Issue:** 3 cards with incremental 20px horizontal offset
- **Solution:** Use absolute positioning or transform translateX
- **Test:** Remove offset on mobile, verify smooth transition

### Challenge 6: Font Loading
- **Issue:** Poppins from Google Fonts may cause FOUT
- **Solution:** Preload font with `<link rel="preload">`, use `font-display: swap`
- **Test:** Check Lighthouse performance score

---

## 11. Content (Original Texts from Figma)

### Menu
- Navigation: Services, Über uns, Portfolio, Blog, Hall of Fame, Praxismarketing
- Button: KONTAKT

### Hero Section
**Title:**
```
Mehr Kunden durch
OMH Digital-marketing
```

**Subtitle:**
```
Durch Branding, Website & SEO-Marketing automatisiert Neukunden gewinnen.
```

**Stats:**
- `10+` Jahre Erfahrung
- `50+` Glückliche Kunden
- `300+` Top 1 ranking pages
- `56,000+` Traffic Wert aller Kunden

**Buttons:**
- KOSTENLOSE BERATUNG
- UMSATZ-POTENTIAL TEST

### Problems Section
**Title:**
```
Kommen Ihnen diese Probleme bekannt vor?
```

**Card 1:**
- Title: `Kaum Besucher & Anfragen`
- Text: `Du hast bereits eine Website und diese vielleicht auch schon SEO-optimiert, aber es landen kaum Interessenten auf der Website und die Ergebnisse bleiben aus?`

**Card 2:**
- Title: `Starke Konkurrenz`
- Text: `Die Konkurrenz, die teilweise nicht so lange am Markt ist und schlechtere Qualität liefert wird immer stärker und schnappen sich immer mehr Marktanteile?`

**Card 3:**
- Title: `Kundengewinnung wird immer schwieriger`
- Text: `Du investierst viel Zeit und Geld in Kaltakquise und Marketing, läufst potentiellen Kunden ewig hinterher und bekommst viel Ablehnung?`

---

## 12. Performance Targets

- **Initial Load:** < 2 seconds
- **Time to Interactive:** < 3 seconds
- **Largest Contentful Paint:** < 2.5 seconds
- **Cumulative Layout Shift:** < 0.1
- **Animation Frame Rate:** 60fps constant
- **Lighthouse Score:** > 90 (Performance)

### Optimization Strategies
1. **Critical CSS:** Inline above-the-fold styles
2. **Lazy Loading:** Load images below fold with `loading="lazy"`
3. **Font Optimization:** Preload Poppins, subset to Latin characters
4. **Image Optimization:** Use WebP format where possible, provide fallbacks
5. **Minification:** Minify CSS and JS in production
6. **Compression:** Enable gzip/brotli compression

---

## END OF MASTER SPECIFICATION

**Next Phase:** Generate 3 Work Packages for parallel agent execution.